//Убираем скачек экрана при котрытии модального окна (скачет из-за полосы прокрутки)
//Функция вычисляющая ширину полосы прокруткиv
const calcScroll = () => {
   //создаем пустой блок
   const div = document.createElement('div');
   div.style.width = '50px';
   div.style.height = '50px';
   div.style.overflowY = 'scroll';
   div.style.visibility = 'hidden';

   document.body.appendChild(div);
   //Вычисляем ширину посолы прокрутки
   let scrollWidth = div.offsetWidth - div.clientWidth;
   div.remove();

   return scrollWidth;
}

export default calcScroll;