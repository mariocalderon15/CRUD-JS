import { localHostUserToModel } from "../mapper_map/localhost-user-mapper";
import { userToLocalhost } from "../mapper_map/users-to-localhost-mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} userLike 
 */

export const saveUser = async (userLike) => {

    const user = new User(userLike);

    if(!user.firstName || !user.lastName){
        throw ' Implementar validacion en pantalla, campo obligatorio';
    }

    const userToSave = userToLocalhost( user );
    let userUpdated;

    if(user.id){
       userUpdated = await updateUser(userToSave);
    }else{
        userUpdated = await createUser(userToSave);
    }
   

   return localHostUserToModel( userUpdated );
    
}

/**
 * @param {Like<User>} user
 */

const createUser = async (user) => {


    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok){
        throw new Error('Error al crear el usuario');
    }

    const newUser = await res.json();
    return newUser;
}


/**
 * @param {Like<User>} user
 */

const updateUser = async ( user ) => {


    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updateUser = await res.json();
    console.log({ updateUser });
    return updateUser;
}