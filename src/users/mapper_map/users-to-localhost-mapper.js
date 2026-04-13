import { User } from "../models/user"


/** 
 * 
 * @param {User} user 
 * @returns 
 */

export const userToLocalhost = ( user)=>{

    const {
        id,
        isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
    } = user

    return {
        id: id ? String(id) : null,
      isActive,
      balance,
      avatar,
     first_name: firstName,
        last_name: lastName,
        gender,
    }
}