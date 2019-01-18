Plain JavaScript user profile UI
===

## What is this
![Mobile view](/public/imgs/previews/mobile.gif)
![Desktop view](/public/imgs/previews/desktop.gif)

This project comprises a user profile UI example done in about 20 work hours. The project contains all the HTML CSS along with the SASS source files and JavaScript for behavior and data manipulation. This project was originaly done as a code test for a front-end position and had to be done with Vanilla JS, SASS, Gulp and Webpack along with the requirements.

## How to test it
Run:

```bash
$ npm install
$ npm run build
$ npm run dev-server
```

## How it was done
Content and styling were made with HTML and SASS/CSS, theme colors were defined to take advantage of the flexibility of changing colors in the future. Behavior was done entirely in JavaScript by taking advantage of the ES6 features through Babel in order to build a responsive UX, along with some sort of data manipulation to give a proof of concept on how the UI should work.

Gulp was used as a requirement to build the .scss files into .css.
Webpack was used to modularize and make it easier to develop and separate file structures and architecture.

### Technology Stack:
- JavaScript ES6
- HTML/CSS with SASS and BEM 
- Webpack Babel and Gulp
- Live server for deployment testing
___

*Copyright Victor Feitosa 2018*