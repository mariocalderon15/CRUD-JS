import stateUsers from '../../store/state-users';
import { showModal } from '../render-modals/render-modal';
import { deleteUser } from '../../store/delete-user-by-id';
import '../render-table/render-table.css';


let table;

const createTable = () => {

    
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');

  
    tableHeader.innerHTML = `
        <tr>
            <th>#ID</th>
            <th> Balance </th>
            <th>FirstName</th> 
            <th>LastName</th>
            <th> Gender </th>
            <th>Active</th>
            <th> Action </th>     
        </tr>
     `;

   
    const tbody = document.createElement('tbody');

    table.append(tableHeader, tbody);

    return table;

}

const tableDeleteListener = async (event) => {
   
    const element = event.target.closest('.delete-user');
    if (!element) return;

    const id = element.dataset.id;

    try {
        if (confirm('Seguro que quieres eliminar?')) {
            await deleteUser(id);
        }
        setTimeout(async()=>{

        await stateUsers.reloadPage();
        document.querySelector('#current-page').innerText = stateUsers.getCurrentPage();
        renderTable();

        });

    } catch (err) {
        console.log(err);
        alert('No se pudo Eliminar');
    }
}

const tableSelectListener = (event) => {

    const element = event.target.closest('.select-user');
    if (!element) return;

    const id = element.dataset.id;
    showModal(id);
}


export const renderTable = (element) => {

   
    const user = stateUsers.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }


    let elementHTML = '';
   
    user.forEach(user => {
        elementHTML += `
        
        <tr>
            <td>${user.id}</td>
            <td> ${user.balance} </td>
            <td>${user.firstName}</td> 
            <td>${user.lastName}</td>
            <td>${user.gender}</td>
            <td>${user.isActive}</td>

            <td> 
             <a href="#/" class="select-user" data-id="${user.id}">Select</a>
             |
             <a href="#/" class="delete-user" data-id="${user.id}">Delete</a>
            </td>     
        </tr>
        `;
    });
   
    table.querySelector('tbody').innerHTML = elementHTML;

}


