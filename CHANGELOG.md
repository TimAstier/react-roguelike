# Changelog

## [0.1.2] - 2021-XX-XX - **Fire update**

### Game

- New tile - Grass
- New tile - Ashes
- Some tiles can be set on fire (Grass, WoodenDoor)
- Tiles on fire burn and eventually become Ashes
- Fire propagates to adjacent flammable tiles
- New condition - Burning
- Player starts burning when moving on a burning tile
- Player loses health each turn when burning
- GAMEOVER screen shows when Player's HP reaches 0

### MapEditor

- Set tiles on fire

## [0.1.1] - 2021-05-08 - **First live release**

### Game

- New tile - WoodenDoor
- Keep track of revealed cells in fog of war
- Inspect tiles by hovering on them with the mouse
- Display interaction texts at the bottom of the screen
- Possibility to loot items
- Possibility to loot small and big amounts of gold
- Show event logs when looting items
- Items in dim light are now only partially revealed
- Improve graphics performance

### MapEditor

- Show all tiles and items in the Toolbar

### Tech

- Render the map with HTML-5 canvas via react-konva
- Make game state immutable via use-immer
- Reorganise files
- Allow viewport having different width and height
- Add tests for getVisibility
- Add tests for game logic
- Make live playable version load faster
- Wait for fonts to be loaded before rendering the game
