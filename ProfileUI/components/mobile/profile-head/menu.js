import Selector from './menuSelector';
import Scroller from './menuScroller';
import {
  MenuOptions,
  SectionValues,
} from '../../generic/menuOptions';


export default {

  construct() {
    this.options = MenuOptions;
  },

  init() {
    this.construct();

    // Init selectors and scrollers
    Selector.init();
    Scroller.init();

    // sets onclick to menu options
    this.options.forEach((id, key) => {
      const option = document.getElementById(`menu-option-${id}`);
      option.addEventListener('click', (e) => {
        this.changeMenu(id);
        Scroller.scrollTo(key);
      });
    });
  },

  changeMenu(menu) {
    let pos = this.options.indexOf(menu);
    for (const id of this.options) {
      let section = document.getElementById(`section-${id}`);
      const finalPos = this.options.indexOf(id) - pos;
      section.style.transform = `translateX(calc(${finalPos} * 100%)`;
      section.style.opacity = 0;
    }
    document.getElementById(`section-${menu}`).style.opacity = 1;
  },

  run() {
    this.init();
  },
};
