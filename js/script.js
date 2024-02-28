window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const menuItem = document.querySelectorAll('.menu_item');
    const hamburger = document.querySelector('.hamburger');
    const popupOverlay = document.querySelector('.popup_overlay');
    const cross = document.querySelector('.popup_close');
    const contactForm = document.querySelector('#contactForm');
    const originalFormText = contactForm.children[0].textContent;
    const originalButtonText = document.querySelector('#submit_form').textContent;


    const openModal = () => {
        const btnRequestCall = document.querySelector('.btn_subheader');

        btnRequestCall.addEventListener('click', () => popupOverlay.style.display = 'block');

        const btnSubmit = document.querySelector('.btn_request');
        const btnMenuCall = document.querySelectorAll('.menu_link');

        const openModalFormAndChangeH2 = (btn) => {
            btn.addEventListener('click', () => {
                popupOverlay.style.display = 'block';
                contactForm.children[0].textContent = `Введите ваши данные и нажмите отправить заявку`;
                document.querySelector('#submit_form').textContent = 'отправить заявку';
            })
        }
        openModalFormAndChangeH2(btnMenuCall[5]);
        openModalFormAndChangeH2(btnSubmit);
    }

    const closeModal = () => {
        popupOverlay.classList.add('in_out');
        setTimeout(() => {
            popupOverlay.style.display = 'none';
            popupOverlay.classList.remove('in_out');
            contactForm.children[0].textContent = originalFormText
            document.querySelector('#submit_form').textContent = originalButtonText;
        }, 800);
    }

    const thanksModal = () => {
        const div = document.createElement('div')
        const message = `<span class="modal_message">Спасибо, ваша заявка принята, скоро мы c вами свяжемся!</span>`
        div.innerHTML = `<h3 class="modal_message_thanks">${message}</h3>`;

        const crossThanks = cross.cloneNode(true);
        crossThanks.classList.add('thanks_modal_cross');
        div.querySelector('.modal_message_thanks').appendChild(crossThanks);

        document.body.append(div);

        crossThanks.addEventListener('click', () => div.remove())

        setTimeout(() => div.remove(), 3000);
    }

    cross.addEventListener('click', () => closeModal());

    popupOverlay.addEventListener('click', e => {
        if (e.target.classList.contains("popup_overlay")) {
            closeModal()
        }
    })

    contactForm.addEventListener('submit', e => {
        e.preventDefault()
        const name = contactForm.user_name.value.trim();
        const phone = contactForm.user_phone.value.trim();
        const checkPhone = /^\+375\s?(\d{2})\s?(\d{3})\s?(\d{2,3})\s?(\d{2})$/;
        const phoneErrorMsg = document.querySelector('.phone_error')
        if (checkPhone.test(phone)) {
            phoneErrorMsg.classList.remove('display_block')
            closeModal()
            contactForm.user_name.value = "";
            contactForm.user_phone.value = "";
            thanksModal();
        } else {
            phoneErrorMsg.classList.add('display_block')
        }


    })



    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    });

    openModal()

})