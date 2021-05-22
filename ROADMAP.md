# ROADMAP

## Creatures

- [x] Creatures definitions
- [x] Display creatures on the map
- [x] Info on hover
- [x] Attack a creature
- [x] Creature attacks
- [x] Creature movements
- [x] Fix creatures moving on same tile
- [x] Display death message on gameover screen
- [ ] Tick function
- [ ] Consider Player just as another creature? Sth like isPlayer = true
- [ ] Creatures can burn (like player)
- [ ] Creature status (idle, hostile)
- [ ] Some sort of effect (sound/animation) on attack?
- [ ] Math for attacks damage
- [ ] Display creature stat blocks
- [ ] Attack initiative
- [ ] Create 3 types of creatures with unique traits
- [x] Reset interactionText on death
- [x] Fix creatures can move through walls when packed?
- [ ] Fix creatures moving away when bumping into each other

## Map generation

- [x] Seed map with RNG
- [ ] Add downward staircases tile and in generateLevel
- [ ] Improve generateLevel's corridors
- [ ] Add doors in generateLevel
- [ ] Add grass in generateLevel
- [ ] Add items in generateLevel
- [ ] Predefined dungeon entry, with flames
- [ ] Add monsters in generateLevel

## Dijkstra Maps - getDijkstraMap(target, passible, impassible)

- [x] One goal
- [ ] Multiple goals
- [ ] Multiple priority levels
- [ ] Mouse pathfinding
- [ ] Pack behavior by adding costs around tiles occupied by an ally

## Improve game display

- [ ] Extend viewports (only 3 rows in eventLogs, use more width, only 2 rows down, increase cell width)
- [ ] Add scroll animation on move
- [ ] Add reveal animation on spawn
- [ ] Add blur on shadows?
- [ ] Add colors in eventLogs
- [ ] Scroll through eventLogs (and reset on next one)

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

- [ ] Remember high scores with local storage
- [ ] Hunger clock with impact on visibility
- [ ] Pillar tile to climb and increase visibility
- [ ] Burning entities can set flammable tiles on fire
- [ ] Fix can see through diagonal walls
- [ ] Why can see more on the left side at the end of corridors?
- [ ] Move over the map by moving Viewport (see https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation:_Scrolling_maps)
- [ ] NPCs
- [ ] Rest
