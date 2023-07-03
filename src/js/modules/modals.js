import calcScroll from "./calcScroll";

const modals = () => {
   //ф-ция модального окна

   function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
      const trigger = document.querySelectorAll(triggerSelector);
      const modal = document.querySelector(modalSelector);
      const close = document.querySelector(closeSelector);
      const windows = document.querySelectorAll('[data-modal]');
      const scroll = calcScroll();

      trigger.forEach(item => {
         item.addEventListener('click', (e) => {
            if (e.target) {
               e.preventDefault(); // отмена стандартного поведения, если цель- ссылка.
            }

            //Закрытие всех модальных окон
            windows.forEach(item => {
               item.style.display = 'none';
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
         });
      });

      close.addEventListener('click', () => {
         //Закрытие всех модальных окон при клике на крестик
         windows.forEach(item => {
            item.style.display = 'none';
         });

         modal.style.display = 'none';
         document.body.style.overflow = '';
         document.body.style.marginRight = '0px';
      });

      //Закрытие модального окна при клике на подложку
      modal.addEventListener('click', (e) => {
         if (e.target === modal && closeClickOverlay) {
            //Закрытие всех модальных окон при клике на подложку
            windows.forEach(item => {
               item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
         }
      });
   }

   function showModalByTime(selector, time) {
      setTimeout(() => {
         document.querySelector(selector).style.display = 'block';
         document.body.style.overflow = 'hidden';
      }, time);
   }

   bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
   bindModal('.phone_link', '.popup', '.popup .popup_close');
   bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
   bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
   bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
   // showModalByTime('.popup', 60000);
};

export default modals;