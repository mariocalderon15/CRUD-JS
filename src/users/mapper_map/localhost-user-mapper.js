import { User } from "../models/user"

/**
 * @param {Like<User>} localhostUser
 * @return {User}
 */

 
export const localHostUserToModel = (localhostUser) => {  

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser

    // Importante ID es String!
    return new User({
        avatar,
        balance: Number(balance),
        firstName: first_name,
        gender,
        id,
        isActive: Boolean(isActive),
        lastName: last_name,
    })
}

