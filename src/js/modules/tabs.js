const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
   const header = document.querySelector(headerSelector);
   const tab = document.querySelectorAll(tabSelector);
   const content = document.querySelectorAll(contentSelector);

   function hideTabContent(i) {
      //hide all content
      content.forEach(item => {
         item.style.display = 'none';
      });

      //hide active class from all tabs
      tab.forEach(item => {
         item.classList.remove(activeClass);
      });
   }

   function showTabContent(i = 0) {
      //show choosen content
      content[i].style.display = display;
      //add active class to tab
      tab[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   //Навешиваем обработчик событий на общую область которая объеденяет все табы.
   header.addEventListener('click', (e) => {
      const target = e.target;
      //Проверяем что кликнули в один из табов.
      if (target && (target.classList.contains(tabSelector.replace(/\./, "")) ||
         target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
         //Перебор всех табов и определение по какому кликнули.
         tab.forEach((item, i) => {
            if (target == item || target.parentNode == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
};

export default tabs;