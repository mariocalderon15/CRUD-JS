import stateUsers from '../../store/state-users';
import { renderTable } from '../render-table/render-table';
import '../render-button/render-button.css';



/**
 * 
 * @param {HTMLDivElement} element 
 */


export const renderButton = (element) => {

    const nextButton = document.createElement('button');
    nextButton.innerHTML = ' Next > ';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = ' < prev ';

   
    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.textContent = stateUsers.getCurrentPage();



    element.append(prevButton, currentPageLabel, nextButton);

        nextButton.addEventListener('click', async () => {

            const loadUsersNext = await stateUsers.loadNextPage();

            if (!loadUsersNext || loadUsersNext === 0) {
                nextButton.disabled = true;
            } 

            currentPageLabel.innerText = stateUsers.getCurrentPage();
            renderTable(element);

        });

        prevButton.addEventListener('click', async () => {

            if (stateUsers.getCurrentPage() <= 1) return;
               
           const loadPrevPage = await stateUsers.loadPrevPage();

           if(loadPrevPage){
            nextButton.disabled = false;
           }

            currentPageLabel.innerText = stateUsers.getCurrentPage();
            
            renderTable(element);
   
        });

    
}
