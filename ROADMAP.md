# ROADMAP

## Creatures

- [ ] Creatures
- [ ] Creatures' AI
- [ ] Attacks

## Map generation

- [ ] Seed map with RNG
- [ ] Add downward staircases tile and in generateLevel
- [ ] Improve generateLevel's corridors
- [ ] Add items in generateLevel
- [ ] Add monsters in generateLevel
- [ ] Add doors in generateLevel
- [ ] Add grass in generateLevel
- [ ] Predefined dungeon entry, with flames

## Improve game display

- [ ] Extend viewports (only 3 rows in eventLogs, use more width, only 2 rows down, increase cell width)
- [ ] Add scroll animation on move
- [ ] Add reveal animation on spawn
- [ ] Add blur on shadows?
- [ ] Add colors in eventLogs

## Debug mode

- [ ] Load game from test map
- [ ] Has BGM: off by default
- [ ] Possibility to edit cells in game

## Races

- [ ] Add UI to pick race/name
- [ ] Possibility to get a random name
- [ ] Preview of Player (different size and colors)
- [ ] Impact on
  - [ ] Initial CON (Health)
  - [ ] Max visibility
  - [ ] Initial STR (carrying capacity)
- [ ] First races: Elf / Goliath / Gnome / Human

## Items

- [ ] Something to set fire
- [ ] Throw items
- [ ] Equip items (in any hand)

## Others

- [ ] Hunger clock with impact on visibility
- [ ] Pillar tile to climb and increase visibility
- [ ] Burning entities can set flammable tiles on fire
- [ ] Fix can see through diagonal walls
- [ ] Why can see more on the left side at the end of corridors?
- [ ] Move over the map by moving Viewport (see https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation:_Scrolling_maps)
- [ ] NPCs
- [ ] Rest
- [ ] Use requestAnimationFrame for player movement. See for example [this code](https://github.com/KilroggD/rpg-react-redux/blob/master/src/tile-view/GameLoop.js) and [explanations](https://levelup.gitconnected.com/rpg-game-with-react-redux-html5-part-1-build-a-tile-map-9144fd867830), or [this code](https://github.com/ASteinheiser/react-rpg.com/blob/edd9d6f2af131822f97b3b49eb91696ec5e3f497/src/features/player/index.js).
