import {Environment} from '../../generic/generic';

export default {
  construct() {
    this.menu = document.getElementById('menu-list');
    this.menuSelector = document.querySelector('#menu-selector');
    this.parentMenu = this.menuSelector.parentElement;
    this.menuItems = this.menu.querySelectorAll('.profile-head__menu__item');
    this.selectedItem = 0;
  },

  init() {
    this.construct();

    for (let el of this.menuItems) {
      el.onclick = () => this.move(el);
    }

    this.menu.addEventListener('touchstart', () => {
      this.menuSelector.style.left = `${this.menuItems[this.selectedItem]
                                        .offsetLeft}px`;
    });
    this.menu.addEventListener('touchmove', () => {
      this.menuSelector.style.left = `${this.menuItems[this.selectedItem]
        .offsetLeft}px`;
      });
    this.menu.addEventListener('touchend', (e) => {
      console.log(e);
      setTimeout(() => {
        let left = this.menuItems[this.selectedItem].offsetLeft;
        this.menuSelector.style.left = `${left}px`;
      }, 100);
    });

    this.move(this.menuItems[0]);
  },

  move(menuItem) {
    this.menuSelector.style.width = `${menuItem.offsetWidth}px`;
    this.menuSelector.style.left = `${menuItem.offsetLeft}px`;
    if (!Environment.isMobile()) {
      const padding = parseInt(
        window.getComputedStyle(this.parentMenu)['padding-left']);
      this.menuSelector.style.left = `${menuItem.offsetLeft + padding}px`;
    }
    this.selectedItem = Array.from(this.menuItems).indexOf(menuItem);
  },
};
