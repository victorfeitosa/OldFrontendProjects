import './utils';

export let Environment = {
  isMobile() {
    return window.screen.width < 768;
  },
};

export default {
  construct() {
    this.sections = Array
      .from(document.querySelectorAll('.profile-body__option-section'))
      .map((o) => o.id);
  },
  init() {
    this.construct();

    // Hides other sections that are not the first one
    for (let i = 1; i < this.sections.length; i++) {
      let section = document.getElementById(this.sections[i]);
      section.style.transform = `translateX(calc(100% * ${i}))`;
      section.style.opacity = 0;
    }
  },
};
