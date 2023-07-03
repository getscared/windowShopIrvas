const timer = (id, deadline) => {
   //Добавляем 0 к однозначному числу
   const addZero = (num) => {
      if (num < 9) {
         return '0' + num;
      } else {
         return num;
      }
   };

   //Функция расчета времени до дедлайна
   const getTimeRemaining = (endTime) => {
      const time = Date.parse(endTime) - Date.parse(new Date());
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / (1000 * 60)) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor((time / (1000 * 60 * 60 * 24)));

      return {
         'total': time,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds,
      }
   };

   //Функция вывода расчитаного времени на экран
   const setTime = (selector, endtime) => {
      const timer = document.querySelector(selector);
      const days = timer.querySelector('#days');
      const hours = timer.querySelector('#hours');
      const minutes = timer.querySelector('#minutes');
      const seconds = timer.querySelector('#seconds');
      const timeInterval = setInterval(updateClock, 1000); // Функция обновления счетчика

      //вызов функции что бы не дергался таймер на странице
      updateClock();
      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.textContent = addZero(t.days);
         hours.textContent = addZero(t.hours);
         minutes.textContent = addZero(t.minutes);
         seconds.textContent = addZero(t.seconds);

         if (t.total <= 0) {
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';

            clearInterval(timeInterval);
         };
      };
   };

   setTime(id, deadline);
};

export default timer;
