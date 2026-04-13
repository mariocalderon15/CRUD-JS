import { getUserById } from '../../store/get-user-by-id';
import '../render-modals/render-modal.css';
import modalHTML from '../render-modals/render-modal.html?raw';

/**
 * @param {HTMLDivElement} element
 */


let modal, form;
let loadedUser = {};

export const showModal = async (id) => {


    modal?.classList.remove('hide-modal');
    loadedUser = {};

    if (!id) {
        return;
    }

    const user = await getUserById(id);

    setFormValue(user);

}

export const hideModal = () => {

    modal?.classList.add('hide-modal');
    form?.reset();
}

const setFormValue = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="gender"]').value = user.gender;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;

}

document.addEventListener('keydown', ({ key }) => {

    if (key === 'Escape') hideModal();
});


export const renderModal = (element, callbackPadre) => {

    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.classList.add('modal-container', 'hide-modal');

    element.append(modal);

    form = modal.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

       
        const formData = new FormData(form);
        const userLike = { ...loadedUser };

    
        for (const [key, value] of formData) {
            if (key === 'balance') {

                const numeberValue = +value;
                const balanceInput = document.getElementById('balance');

                if (isNaN(numeberValue)) {
                    balanceInput.setCustomValidity('El balance tiene que ser de tipo numerico');
                    balanceInput.reportValidity();
                    return;
                }


                balanceInput.setCustomValidity('');
                userLike[key] = numeberValue;
                continue;

                
            }
           
            userLike[key] = value;
        }
        userLike.isActive = formData.has('isActive');

        await callbackPadre(userLike)
        hideModal();

    });

    
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    })
}


