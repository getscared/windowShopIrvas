import calcScroll from "./calcScroll";

const images = () => {
   const workSection = document.querySelector('.works');
   const imgPopup = document.createElement('div');
   const bigImg = document.createElement('img');
   const scroll = calcScroll();

   imgPopup.classList.add('popup');
   workSection.appendChild(imgPopup);

   imgPopup.style.justifyContent = 'center';
   imgPopup.style.alignItems = 'center';
   imgPopup.style.display = 'none';

   imgPopup.appendChild(bigImg);

   workSection.addEventListener('click', (e) => {
      e.preventDefault();

      let target = e.target;
      if (target && target.classList.contains('preview')) {
         imgPopup.style.display = 'flex';
         document.body.style.overflow = 'hidden';
         document.body.style.marginRight = `${scroll}px`;
         //получаем ссылку на большое изображение
         const path = target.parentNode.getAttribute('href');
         //передаем полученную ссылку в bigImg
         bigImg.setAttribute('src', path);
         bigImg.setAttribute('height', '600px');
      }

      //При клике на подложку модальное окно закрывается
      //Проверка клика на подложку
      if (target && target.matches('div.popup')) { //если target совдает с div с классом .popup
         imgPopup.style.display = 'none';
         document.body.style.overflow = '';
         document.body.style.marginRight = '0px';
      }
   });
};

export default images;