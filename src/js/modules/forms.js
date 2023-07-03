import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
   //Получаем все формы которые есть на странице и все инпуты
   //Навешиваем обработчик событий на все формы

   const form = document.querySelectorAll('form');
   const inputs = document.querySelectorAll('input'); //Для очищения инпутов после отправки данных на сервер

   checkNumInputs('input[name="user_phone"]');

   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   // Функция отправки данных
   const postData = async (url, data) => { //async- внутри функции есть асинхронные операции
      //Вывод сообщения о начале отправки
      //Находим блок созданный для вывода сообщений
      document.querySelector('.status').textContent = message.loading;

      //Отправка запроса
      let res = await fetch(url, { //await перед асинхронной операцией. Ждет ответа на запрос
         method: "POST",
         body: data
      });

      return await res.text(); //скрипт ждет выполнение фетча, а затем возвращает обработанный результат
   };

   //функция очистки инпутов
   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   };


   //Навешиваем обработчик событий на каждую форму
   form.forEach(item => {
      item.addEventListener('submit', (e) => {
         e.preventDefault(); //Отмена перезагрузки страницы при отправке формы

         //Создаем блок в который будем помещать статус отправки формы
         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.appendChild(statusMessage); //appendChild помещаем блок в конец формы

         //Собираем все данные formData
         const formData = new FormData(item); //Конструктор FormData соберет все данные из выбранной формы

         //Проверка отправляемой формы. Если форма последняя из калькулятора, то к отправке добавляем обьект данных modalState
         if (item.getAttribute('data-calc') === "end") {
            //append значений в formData. append(значение, ключ)
            for (let key in state) {
               formData.append(key, state[key]);
            }
         }

         //Отправка собранной formData на сервер средствами fetch
         postData('assets/server.php', formData)
            .then(res => {
               console.log(res);
               statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove(); // Удаление блока с сообщением о статусе отправки
               }, 5000);
            });
      });
   });
};

export default forms;
