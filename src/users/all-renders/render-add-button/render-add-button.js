import '../render-add-button/render-add-button.css';
import { showModal } from '../render-modals/render-modal';

/**
 * @param {HTMLDivElement} element
 * @param { ()=> void } callback
 */


export const renderAddButton = ( element ) =>{

   
    const fabButton = document.createElement('button');
    fabButton.innerText = '+';
    fabButton.classList.add('fab-button');

    element.append(fabButton);

    fabButton.addEventListener('click', () => {
      
        showModal();

    });

}