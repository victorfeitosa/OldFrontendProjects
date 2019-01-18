export default {
  construct() {
    this.menu = document.getElementById('menu-list');
    this.menuItems = document.querySelectorAll('.profile-head__menu__item');
    this.menuPos = 0;
  },
  init() {
    this.construct();

    this.menu.addEventListener('touchstart', (e) => {
      this.menuPos = e.touches[0].clientX;
    });
    this.menu.addEventListener('touchmove', (e) => {
      let dx = this.menuPos - e.touches[0].clientX;
      this.menuItems.forEach((element) => {
        let left = parseInt(element.style.left) | 0;
        let px = left - dx;
        px = Math.min(0, px);
        px = Math.max(-(this.menu.offsetWidth - 40), px);
        element.style.left = `${px}px`;
      });
      this.menuPos = e.touches[0].clientX;
    });
  },
  scrollTo(menuItem) {
    if (this.menuItems[menuItem].offsetLeft > (window.innerWidth * .6)) {
      this.menuItems.forEach((element, key) => {
        const left = parseInt(element.style.left) | 0;
        const dx = left - this.menuItems[menuItem].offsetLeft;
        element.style.left = `${dx + 16}px`;
      });
    }
  },
};
