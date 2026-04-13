
import { loadUsersByPage } from "../load-users/load-users";


const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {

    const nextPage = state.currentPage + 1;
    const users = await loadUsersByPage(nextPage);

   if(!users || users.length === 0){
        state.hasMore = false;
        return;
   }


   const currentUsers = state.users;
   const isSame = users[0]?.id === currentUsers[0]?.id;

   if(isSame){
    state.hasMore = false;
    return;
   }

   state.currentPage = nextPage;
   state.users = users;

   return users;
}


const loadPrevPage = async() => {

   const prevPage = state.currentPage - 1;
   const users = await loadUsersByPage(prevPage); 

   if(!users || users.length === 0){
    state.hasMore = false;
    return;
   }

   const currentUsers = state.users;
   const isSame = users[0]?.id === currentUsers[0]?.id;
   if(isSame){
    state.hasMore = false;
    return;
   }
   
   state.currentPage = prevPage;
   state.users = users;

   return users;
}


const onChangeUser = async ( updateUser ) => {

    let wasFound = false;

    state.users = state.users.map( user => {
        if(user.id === updateUser.id){
            wasFound = true;
            return updateUser;
        }
        return user;
    });

    if( state.users.length < 10 && !wasFound){
        state.users.push( updateUser);
    }
}


const reloadPage = async () => {

    const page = state.currentPage;
    const users = await loadUsersByPage(page);

    if( users.length === 0 && page > 1){
        page--;
        users = await loadUsersByPage(page);
    }
    state.users = users
    state.currentPage = page;
}


export default {
    loadNextPage,
    loadPrevPage,
    onChangeUser,
    reloadPage,

    getUsers: ()=> [...state.users],
    getCurrentPage: ()=> state.currentPage,
}