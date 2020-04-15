# Swiper Select component

A component that handles user's drag (or arrows) navigation to select one of the provided options.
Only React and plain Typescript/Javascript is used, no third-party plugins involved.

The elements are interactive, utilizes animation and are configurable with custom set of options.
The current version accept optional settings as a strings key/value object (see the table below), or fall back to defaults when none provided.

| Setting key     | Default value           | Description                           |
| --------------- | ----------------------- | ------------------------------------- |
| width           | "80%"                   | Width in % of relative parent wrapper |
| height          | "100px"                 | Height in px                          |
| backgroundColor | "#285194"               | Background color of all elements      |
| fontFamily      | "Montserrat,sans-serif" | Font of all elements                  |
| fontColor       | "white"                 | Color of text                         |
| activeFontColor | "white"                 | Color of highlighted text             |
| fontSize        | "24px"                  | Font size                             |
| units           | "Year"                  | Additional units of values chosen     |

The home page of the demo app has two examples of using the Select component: one with default styling and the other with custom styling (the same options object is used for both examples).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Runs the installation of all dependancies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
