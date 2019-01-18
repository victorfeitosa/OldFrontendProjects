import {
  Environment
} from './generic';

export const MenuOptions = ['about', 'settings', 'option1',
  'option2', 'option3',
];

let sectionVals = {};
// NOTE: values for each sections are defined here
MenuOptions.forEach((v) => {
  sectionVals[v] = {};
});

sectionVals.about = {
  firstName: 'Victor',
  lastName: 'Feitosa',
  website: 'www.victorfeitosa.com',
  phone: '(949) 325-68594',
  location: 'Newport Beach, CA',
  setValues(self, element=document) {
    console.log('Mobile value set');
    self.firstName =
      element.querySelector('#input-firstname') ?
      element.querySelector('#input-firstname').value : self.firstName;
    self.lastName =
      element.querySelector('#input-lastname') ?
      element.querySelector('#input-lastname').value : self.lastName;
    self.website =
      element.querySelector('#input-website') ?
      element.querySelector('#input-website').value : self.website;
    self.phone =
      element.querySelector('#input-phone') ?
      element.querySelector('#input-phone').value : self.phone;
    self.location =
      element.querySelector('#input-address') ?
      element.querySelector('#input-address').value : self.location;
  },
  valuesSetup() {
    // NOTE: Name property
    document.getElementById('profile-head-name').textContent =
      `${sectionVals.about.firstName} ${sectionVals.about.lastName}`;
    document.getElementById('profile-value-name').textContent =
      `${sectionVals.about.firstName} ${sectionVals.about.lastName}`;
    document.getElementById('value-name').textContent =
      `${sectionVals.about.firstName} ${sectionVals.about.lastName}`;
    // Name input values
    document.getElementById('input-firstname').value =
      sectionVals.about.firstName;
    document.getElementById('input-lastname').value =
      sectionVals.about.lastName;

    // NOTE: Website property
    document.getElementById('value-website').textContent =
      `${sectionVals.about.website}`;
    // Website input values
    document.getElementById('input-website').value = sectionVals.about.website;

    // NOTE: Phone property
    document.getElementById('profile-value-phone').textContent =
      `${sectionVals.about.phone}`;
    document.getElementById('value-phone').textContent =
      `${sectionVals.about.phone}`;
    // Phone input value
    document.getElementById('input-phone').value = `${sectionVals.about.phone}`;


    // NOTE: Location property
    document.getElementById('profile-value-location').textContent =
      `${sectionVals.about.location}`;
    document.getElementById('value-location').textContent =
      `${sectionVals.about.location}`;
    // Location input value
    document.getElementById('input-address').value =
      `${sectionVals.about.location}`;
  },
};
sectionVals.settings = {
  setValues: () => {},
  valuesSetup: (container, inputList) => {},
};
sectionVals.option1 = {
  setValues: () => {},
  valuesSetup: (container, inputList) => {},
};
sectionVals.option2 = {
  setValues: () => {},
  valuesSetup: (container, inputList) => {},
};
sectionVals.option3 = {
  setValues: () => {},
  valuesSetup: (container, inputList) => {},
};

export let SectionValues = sectionVals;