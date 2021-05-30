# alexzenin.com

This is my personal website, and the first project (in hopefully a line of projects) that I've build to play around with some cool new technologies! The goal of this site was to create a very simple, single page, hero website, while using only a minimal amount of additional modules.

This site is build using [react](https://reactjs.org/) and [create-react-app](https://github.com/facebook/create-react-app). All functional components contain CSS within the same file thanks to [styled-components](https://styled-components.com). For the overall layout I've used **CSS Grid**, while **Flexbox** is used for positioning elements in one dimension. I've also used [Semantic-UI](https://semantic-ui.com) for overall styling, and the menu component. The site is fully responsive.

### Installing & Running

Install Dependencies:

```
$ yarn install
```

Start the development server:

```
$ yarn start
```

Run `gulp build` inside `example-app/src/semantic/` to build `semantic.min.css`.


Build production files for deployment:

```
$ yarn run build
```

### Directory

```
/src
.
├── About.js                // About component of page
├── App.js
├── Contact.js              // Contact component of page
├── ContentContainer.js     // Wrapper for each page section
│                           //  Adds padding and waypoints (anchors) to each component
├── Footer.js
├── Hero.js
├── MainMenu.js             // Container component for the 2 types of menus
│                           //  Manages menu state
├── components
│   ├── Heading.js          // Hero heading
│   ├── media.js            // Handles media breakpoints 
│   └── menus
│       ├── Burger.js       // Burger animation in compact menu
│       ├── CompactMenu.js  // Menu for mobile devices
│       └── FullMenu.js     // Menu for desktop resolutions
├── images
│   ├── introBG.jpg
│   └── alex-circle.png
├── index.js
└── registerServiceWorker.js
```


### Styling

* Overall styling of the website can be found under `src/semantic/src/site/globals/site.variables`
    * This is for elements such as `font, p, h1, h2`, etc.
* Styling of individual components, including semantic components can be
    found inside the component's file. This is to be consistent with `styled components`'s
    philosophy of the style of a component being contained within the component
    itself.
    * Might sometimes have to use `&& {...}` to "win" in specificity over semantic-ui


Semantic-ui:

* Edit variables in `src/semantic/src/site/globals/site.overrides`
* See what variables can be changed in `src/semantic/src/themes/default/globals/site.variables`
* See how variables affect the styling in `src/semantic/src/definitions/globals/site.less`
