import {
  MenuOptions,
  SectionValues,
} from '../../generic/menuOptions';

export default {
  toggleButtons(section) {
    let editBlock = section.querySelector('.profile-body__edit-buttons');
    if (editBlock) {
      let editButtons = Array.from(editBlock.children);
      const blockDisplay = window.getComputedStyle(editBlock).display;
      if (blockDisplay === 'none') {
        editBlock.style.display = 'inline-block';
        setTimeout(() => {
          editButtons.forEach((v, k) => {
            v.style.opacity = 1;
          });
        }, 100);
      } else {
        editButtons.forEach((v, k) => {
          v.style.opacity = 0;
        });
        setTimeout(() => {
          editBlock.style.display = 'none';
        }, 300);
      }
    }
  },
  toggleFields(section) {
    let fieldsBlock = section.querySelector('.profile-body__info');

    let inputNames = [].concat(
      Array.from(fieldsBlock.querySelectorAll('.info__name-field')),
      Array.from(fieldsBlock.querySelectorAll('.info__other-field')));
    let inputFields = Array.from(
      fieldsBlock.querySelectorAll('.profile-body__info__label'));

    for (let name of inputNames) {
      if (window.getComputedStyle(name).display === 'none') {
        name.style.display = 'initial';
      } else {
        name.style.display = 'none';
      }
    }
    for (let input of inputFields) {
      if (window.getComputedStyle(input).display === 'none') {
        input.style.display = 'block';
      } else {
        input.style.display = 'none';
      }
    }
  },
  createModal(field, inputId,
              onSave = () => {}, onCancel = () => {}, delay = 100) {
    let backdrop = document.createElement('div');
    let modal = document.createElement('div');
    let modalContainer = document.createElement('div');
    let modalTitle = document.createElement('h1');
    let modalInput = document.createElement('input');
    // NOTE: Modal content
    backdrop.className = 'profile-body__info__info-field__backdrop';
    modal.className = 'profile-body__info__info-field__modal';
    modal.id = `${field.id}-modal`;
    modalContainer.className =
      'profile-body__info__info-field__modal__container';
    modalTitle.className =
      'profile-body__info__info-field__modal__title';
    modalInput.className =
      'profile-body__info__info-field__modal__input';
    modalInput.id = inputId || 'modal-input';

    modalTitle.innerText = field.parentElement
      .querySelector('label').textContent;
    modalInput.value = field.parentElement
      .querySelector('input').value;

    // NOTE: Buttons
    let buttonContainer = document.createElement('div');
    let save = document.createElement('button');
    let cancel = document.createElement('button');
    buttonContainer.className = '';
    save.className = 'profile-body__info__info-field__modal__save-button';
    cancel.className = 'profile-body__info__info-field__modal__cancel-button';
    save.id = `${field.id}-save`;
    save.textContent = 'Save';
    cancel.id = `${field.id}-cancel`;
    cancel.textContent = 'Cancel';
    save.addEventListener('click', () => {
      onSave();
      this.closeModal(modal, delay);
    });
    cancel.addEventListener('click', () => {
      onCancel();
      this.closeModal(modal, delay);
    });

    // NOTE: setup
    backdrop.appendChild(modal);
    backdrop.addEventListener('click', () => {
      this.closeModal(modal, delay);
    });
    setTimeout(() => {
      modal.classList.add('modal-open');
    }, delay);
    modal.addEventListener('click', (e)=> {
      e.preventDefault();
      e.stopPropagation();
    });

    modal.appendChild(modalContainer);
    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(modalInput);
    modalContainer.appendChild(save);
    modalContainer.appendChild(cancel);

    document.body.appendChild(backdrop);

    return modal;
  },
  closeModal(modal, delay) {
    modal.classList.remove('modal-open');
    modal.classList.add('modal-closing');
    setTimeout(() => {
      document.body.removeChild(modal.parentElement);
    }, delay);
  },
  toggleFieldModal(field) {
    // NOTE: modal creation and setup
    // TODO: implement modal element and open it for edition
    let modal = this.createModal(field,
      field.parentElement.querySelector('input').id,
      () => {
        const section = field.closest('.profile-body__option-section');
        if (section) {
          const sectionKey = section.id.replace('section-', '');
          const sectionValue = SectionValues[sectionKey];
          console.log('Section Key', sectionKey);
          sectionValue.setValues(sectionValue, modal);
          sectionValue.valuesSetup();
        }
      });
    modal.style.display = ('inline-block');
    const fieldPos = field.getBoundingClientRect();
    const modalWidth = parseInt(window.getComputedStyle(modal).width) + 80;
    modal.style.top = `${fieldPos.top-16}px`;
    modal.style.left = `${fieldPos.left + modalWidth/2}px`;
  },
  construct() {
    const sectionId = `section-${MenuOptions[0]}`;
    this.editButton = document.getElementById(`${sectionId}-btn-edit`);
    this.buttonsBlock = document.getElementById(`${sectionId}-buttons-block`);
    this.saveButton = document.getElementById(`${sectionId}-btn-save`);
    this.cancelButton = document.getElementById(`${sectionId}-btn-cancel`);

    this.aboutSection = document.getElementById(sectionId);
  },

  init() {
    this.construct();

    for (const v of Object.keys(SectionValues)) {
      SectionValues[v]
        .valuesSetup(document.getElementById(`section-${v}`));
    }

    this.editButton.addEventListener('click', () => {
      this.toggleButtons(this.aboutSection);
      this.toggleFields(this.aboutSection);
      this.editButton.style.display = 'none';
    });
    this.saveButton.addEventListener('click', () => {
      for (const v of Object.keys(SectionValues)) {
        SectionValues[v].setValues(SectionValues[v]);
        SectionValues[v]
          .valuesSetup();
      }

      this.toggleButtons(this.aboutSection);
      this.toggleFields(this.aboutSection);
      setTimeout(() => {
        this.editButton.style.display = 'inline-block';
      }, 300);
    });
    this.cancelButton.addEventListener('click', () => {
      this.toggleButtons(this.aboutSection);
      this.toggleFields(this.aboutSection);
      setTimeout(() => {
        this.editButton.style.display = 'inline-block';
      }, 300);
    });

    // TODO: select all edit buttons for desktop and add the toggleDesktopInput
    const editButtons = document
      .querySelectorAll('.profile-body__edit.desktop');
    for (let button of editButtons) {
      button.addEventListener('click', () => {
        this.toggleFieldModal(button);
      });
    }
  },

  run() {
    this.init();
  },
};