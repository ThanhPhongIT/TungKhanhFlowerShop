window.onload = () => {
  const tab = {
    init: function () {
      this.clickTab();
    },
    clickTab: function () {
      const tabBtn = document.querySelectorAll(
        ".dashboard__center__tabList .tabList__item  .item__link"
      );
      const tabPanel = document.querySelectorAll(".tabs__item");

      tabBtn.forEach(item =>
        item.addEventListener("click", e => {
          //add class activeTab by element's click and remove class activeTab other
          const self = e.target;

          tabBtn.forEach(btn => btn.classList.remove("activeTab"));
          self.classList.add("activeTab");
          const panel = document.getElementById(self.dataset.text);
          tabPanel.forEach(tab => tab.classList.remove("activeTab"));
          panel.classList.add("activeTab");
        })
      );
    }
  };
  tab.init();
  const accodions = {
    init: function () {
      this.subAccodion1(
        ".section",
        ".section li h2",
        ".section_lv2",
        ".arrow_lv1"
      );
      this.subAccodion1(
        ".section_lv2",
        ".section_lv2 li h4",
        ".section_lv3",
        ".arrow_lv2"
      );
    },
    subAccodion1: function (wrap, button, item, arrow) {
      const self = document.querySelectorAll(wrap);

      self.forEach(i => {
        const buttons = i.querySelectorAll(button);
        const items = i.querySelectorAll(item);
        const arrows = i.querySelector(arrow);
        buttons.forEach((btn, index) =>
          btn.addEventListener("click", () => {
            buttons[index].classList.toggle("active");
            items[index].classList.toggle("active");
            arrows.classList.toggle("active");
          })
        );
      });
    }
  };
  accodions.init();
  const menures = {
    init: function () {
      this.menuMb();
      this.close();
    },
    menuMb: function () {
      const humburger = document.querySelector(".test__menu__button");
      const menu = document.querySelector(".dashboard__left");
      const overlay = document.querySelector(".overlayMenu");
      humburger.addEventListener("click", function () {
        menu.classList.add("show");
        overlay.classList.add("show");
      });
    },
    close: function () {
      const overlay = document.querySelector(".overlayMenu");
      const menu = document.querySelector(".dashboard__left");
      overlay.addEventListener("click", function () {
        this.classList.remove("show");
        menu.classList.remove("show");
      });
    }
  };
  menures.init();
  const deleteItem = {
    init: function () {
      this.deleteChapter(
        ".section",
        ".section .options__section .bin",
        ".section .chapter "
      );
      this.deleteChapter(
        ".section_lv2",
        ".section_lv2 .options__section .delete2",
        ".section_lv2 .section_sub"
      );
      this.deleteChapter(
        ".section_lv3",
        ".section_lv3 .options__section .delete3",
        ".section_lv3 .lesson "
      );
    },
    deleteChapter: function (wrap, button, item) {
      const self = document.querySelectorAll(wrap);
      self.forEach(i => {
        const section = i;
        const buttons = i.querySelectorAll(button);
        const items = i.querySelectorAll(item);
        buttons.forEach((button, index) =>
          button.addEventListener("click", e => {
            if (confirm("Bạn có chắc chắn sẽ xóa?")) {
              items[index].style.display = "none";
            }
          })
        );
      });
    }
  };
  deleteItem.init();
  const edit = {
    init: function () {
      // this.displayModal(
      //   ".chapter",
      //   ".chapter .options__section .edit1",
      //   ".modal__edit__chapter"
      // );
      // this.displayModal(
      //   ".section_sub",
      //   ".section_sub .options__section .edit2",
      //   ".modal__edit__chapter"
      // );
      this.editClick('.tabs__item.activeTab .edit', '.tabs__item.activeTab .section__title');


      this.close();
    },
    displayModal: function (wrap, button, modal) {
      const self = document.querySelectorAll(wrap);
      const modals = document.querySelector(modal);
      self.forEach(i => {
        const buttons = i.querySelectorAll(button);
        buttons.forEach((btn, index) =>
          btn.addEventListener("click", e => {
            modals.style.display = "block";
          })
        );
      });
    },
    close: function () {
      const modal = document.querySelector(".modal__edit__chapter");
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
    editClick: function (btnEdit, chapter) {
      const editBtn = document.querySelectorAll(btnEdit);
      const sectionEdit = document.querySelectorAll(chapter);

      const modal = document.querySelector('.modal__edit__chapter');
      const input = modal.querySelector('#inputtext');
      const cfmBtn = modal.querySelector('.editNewsInfo');


      function getIndex(index){
        return index;
      }
      editBtn.forEach((btn, index) => btn.addEventListener('click', () => {
        modal.style.display = 'block';
        getIndex(index);
        
      }))

      
      cfmBtn.addEventListener('click', () => {
        const valueEdit = input.value;
        sectionEdit[index].textContent = valueEdit;
        modal.style.display = 'none';
      })
      input.value = '';
    }
  };
  edit.init();
  const weekly = {
    init: function () {
      this.week();
    },
    week: function () {
      const element = document.querySelector(".week");
      const elementFirst = document.querySelector(".week #first");
      const elementLast = document.querySelector(".week #last");
      const nextWeek = document.querySelector(
        ".dashboard__right__date .fa-angle-right"
      );
      const prevWeek = document.querySelector(
        ".dashboard__right__date .fa-angle-left"
      );

      let curr = new Date(); // get current date

      let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      let last = first + 6; // last day is the first day + 6
      let firstday = new Date(curr.setDate(first));
      let lastday = new Date(curr.setDate(last));

      nextWeek.addEventListener("click", () => {
        first++;
        last = first + 6;
        firstday = new Date(curr.setDate(first));
        lastday = new Date(curr.setDate(last));
        update(firstday, lastday);
      });

      prevWeek.addEventListener("click", () => {
        first--;
        last = first + 6;
        firstday = new Date(curr.setDate(first));
        lastday = new Date(curr.setDate(last));
        update(firstday, lastday);
      });

      function update(firstday, lastday) {
        function formatDate(date) {
          var monthNames = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ];

          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();

          return day + "/" + monthNames[monthIndex] + "/" + year;
        }

        elementFirst.innerHTML = formatDate(firstday);
        elementLast.innerHTML = formatDate(lastday);
      }

      update(firstday, lastday);
    }
  };
  weekly.init();
};