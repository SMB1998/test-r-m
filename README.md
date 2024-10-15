# Rick and Morty Character Viewer

This project is a web application developed as part of a **technical test for Qubilo**. It allows users to view characters from the “Rick and Morty” series. It uses the Rick and Morty API to get information about the characters and presents the data interactively. This project is presented by **Santiago Muñoz B.**.

## Table of Contents

- [Technologies used](#technologies-used)
- [Installation](#installation)
- [Use](#use)

## Technologies used

- Frontend:
  - React
  - Redux
  - CSS
- **API**:
  - Rick and Morty API (https://rickandmortyapi.com/)
- **Tools**:
  - Node.js
  - npm

## Installation

To install and run the application, follow these steps:

1. **Clone the repository**.  
    Clone the repository on your local machine:

   ````bash
   git clone https://github.com/tuusuario/rick-and-morty-character-viewer.git

   ```

1. **Installation**  
   npm install &&
   npm run dev

1. **Performance Answer**:

   - Regarding the performance question, if we were to render a million of these cards, we could face significant performance issues due to the load on the DOM and rendering time. To optimize this, we could:
     - **Virtualization**: Use virtualization techniques, such as `react-window` or `react-virtualized`, to render only the elements visible in the window, reducing the number of elements in the DOM.
     - Memoization\*\*: Use `React.memo` and `useMemo` to avoid unnecessary rendering of unchanged components.
     - Deferred loading\*\*: Implement lazy loading to load only the cards that are in the view, thus improving the initial loading time.

1. **Demo**:

- https://test-r-m.vercel.app/
