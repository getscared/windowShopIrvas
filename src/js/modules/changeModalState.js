import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
   const windowForm = document.querySelectorAll('.balcon_icons_img');
   const windowWidth = document.querySelectorAll('#width');
   const windowHeight = document.querySelectorAll('#height');
   const windowType = document.querySelectorAll('#view_type');
   const windowProfile = document.querySelectorAll('.checkbox');
   const btnParrent = document.querySelector('.popup_calc_content');
   const btn = btnParrent.querySelector('.popup_calc_button');

   checkNumInputs('#width');
   checkNumInputs('#height');

   //перебор окон и запись выбранного варианта в обьект modalState in main.js
   function bindActionToElem(event, elem, prop) {
      elem.forEach((item, i) => {
         item.addEventListener(event, () => {
            switch (item.nodeName) {
               case 'SPAN':
                  state[prop] = i;
                  break;
               case 'INPUT':
                  if (item.getAttribute('type') === 'checkbox') {
                     //Определяем какой чекбокс выборан
                     if (i === 0) {
                        state[prop] = 'Холодное';
                     } else {
                        state[prop] = 'Теплое';
                     }
                     //Делаем возможным checked только одного checkbox
                     elem.forEach((box, j) => {
                        box.checked = false;
                        if (i == j) {
                           box.checked = true;
                        }
                     });
                  } else {
                     state[prop] = item.value;
                  }
                  break;
               case 'SELECT':
                  state[prop] = item.value;
                  break;
            }
         });
      });
   };

   bindActionToElem('click', windowForm, 'form');
   bindActionToElem('input', windowWidth, 'width');
   bindActionToElem('input', windowHeight, 'height');
   bindActionToElem('change', windowType, 'type');
   bindActionToElem('change', windowProfile, 'profile');
};

export default changeModalState;