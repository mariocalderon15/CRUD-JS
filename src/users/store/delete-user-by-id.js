

/**
 * 
 * @param {String|Number} id 
 * @returns 
 */

export const deleteUser = async( id )=>{

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
    });

    if(!res.ok){
        throw new Error('Error al eliminar');
    }
    return true;
}
