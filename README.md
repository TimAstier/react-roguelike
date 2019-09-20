<div align="center">
<h1>React RPG game</h1>

<p>A RPG game built with TypeScript, React and Redux.</p>
<p>Demo: <a href="https://react-redux-rpg.herokuapp.com/">https://react-redux-rpg.herokuapp.com</a><p/>
</div>

[![CircleCI](https://circleci.com/gh/TimAstier/react-rpg-game.svg?style=svg)](https://circleci.com/gh/TimAstier/react-rpg-game)  
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

## Description

This is a hobby project to see how React can be used to create a game.

_Inspired by [the Danger Crew](https://thedangercrew.com/) and [react-rpg](https://github.com/ASteinheiser/react-rpg.com)._

## Contributing

You are welcome to contribute to this project :)  
See [CONTRIBUTING](./CONTRIBUTING.md).

## Roadmap

- [x] Create basic grid
- [x] Move with arrow keys
- [x] Smooth move animation
- [x] Add Redux to the project
- [x] Add Prettier
- [x] Live demo with auto-deploy when merge into master
- [x] Debounce keypress handler
- [x] Protect master branch
- [x] Auto deploy development and review app
- [x] Setup Circle CI
- [x] Add CONRIBUTING file and @all-contributors bot
- [ ] Fixed viewport and moving background
- [ ] Fog of war
- [ ] Walls
- [ ] NPCs
- [ ] PlayerProfile component
- [ ] AdventureLogs component
- [ ] Enter other maps
- [ ] Monsters and attacks
- [ ] Add sound manager (use Howler)

## Installation

```sh
# Clone the repository
$ git clone https://github.com/TimAstier/react-rpg-game

# Install dependencies
$ cd react-rpg-game
$ npm install

# Start the app
$ npm start

# Opens a browser tab at http://localhost:3000/
```

## Deployments:

Review apps will be deployed when opening a PR on the development branch.

Merging commits to `development` will auto-deploy to:  
https://react-rpg-game-development.herokuapp.com

Merging commits to `master` will auto-deploy to:  
https://react-redux-rpg.herokuapp.com

## Built with

- [react](https://reactjs.org/) - a JavaScript library for building user interfaces
- [redux](https://redux.js.org/) - a predictable state container for JavaScript apps
- [styled-components](https://www.styled-components.com/) - a convenient way to style components with CSS
- [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript

## License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://timotheeastier.com"><img src="https://avatars1.githubusercontent.com/u/8555097?v=4" width="100px;" alt="Timothée Astier"/><br /><sub><b>Timothée Astier</b></sub></a><br /><a href="https://github.com/TimAstier/react-rpg-game/commits?author=TimAstier" title="Code">💻</a> <a href="https://github.com/TimAstier/react-rpg-game/commits?author=TimAstier" title="Documentation">📖</a> <a href="#maintenance-TimAstier" title="Maintenance">🚧</a> <a href="#ideas-TimAstier" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
