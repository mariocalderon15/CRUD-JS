import { renderAddButton } from "./all-renders/render-add-button/render-add-button";
import { renderButton } from "./all-renders/render-button/render-button";
import { renderModal } from "./all-renders/render-modals/render-modal";
import { renderTable } from "./all-renders/render-table/render-table";
import { saveUser } from "./store/save-users";
import stateUsers from "./store/state-users";



export const usersApp = async( element )=>{

    //element.innerHTML = 'Loading...';

    await stateUsers.loadNextPage();
    renderTable(element);
    renderButton( element );
    renderAddButton( element );

    //inversion de control / callback / separar logica de UI 
    renderModal( element, async( userLike ) => {
        const user = await saveUser( userLike );
        stateUsers.onChangeUser( user );
        renderTable();
        
    });
}   