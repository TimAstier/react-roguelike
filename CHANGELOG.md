# Changelog

## 🎮 🎨 🔊 **Playable version** - [0.2.0] - 2021-06-15

### Game

- New tile - Downward staircase
- Display current depth
- Gold and creatures are spawned randomly in the game
- Small improvements to creatures movement
- New action - Wait
- Waiting for more than 3 rounds will start regenerating HP

### UI

- Creature blocks are shown on the left side of the screen
- Increased dimensions of the viewport
- Use more of the empty screen space for UI elements
- Hover on creatures highlights creature block
- Hover on creature block highlights creature

### Animations

- Short blink animation when a creature or the player is hit
- Shake animation when player deals damage
- Fadein animation when changing depths and when the game ends

### New sounds

- Player hits
- Player misses
- Player critc
- Creature hits
- Creature misses
- Creature dies
- Gameover theme
- Loot gold
- Descending to the next depth

## 👾 **Creatures** - [0.1.3] - 2021-05-23

### Game

- Add creatures into the game
- New creature - Goblin - a rather robust standard opponent
- New creature - Rat - spawn in large groups and have keen sense trait
- Creatures have different max HP, base attack, base AC, aggro ranges and traits
- New trait - keen sense - aggro from far away without needing LOS
- Creatures follow the player when they become hostile
- Calculate attack damages based on dice system
- Attacks can miss (based on AC) and crit (if roll 20)
- GAMEOVER screen shows the cause of death and the depth

### MapEditor

- Possibility to seed the rng with a seed string
- Possibility to add creatures on the map

## 🔥 **Fire update** - [0.1.2] - 2021-05-12

### Game

- New tile - Grass
- New tile - Ashes
- Some tiles can be set on fire (Grass, WoodenDoor)
- Tiles on fire burn and eventually become Ashes
- Fire propagates to adjacent flammable tiles
- New condition - Burning
- Player starts burning when moving on a burning tile
- Player loses a random % of health each turn when burning
- GAMEOVER screen shows when Player's HP reaches 0

### MapEditor

- Set tiles on fire

## 🚀 **First live release** - [0.1.1] - 2021-05-08

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
