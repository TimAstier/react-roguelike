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
- [x] Tick function
- [x] Creature status (idle, hostile)
- [x] Math for attacks damage
- [x] Miss / hit
- [x] Critical hits
- [ ] Create 3 types of creatures with unique traits
- [ ] Creatures can burn (like player)
- [ ] Consider Player just as another creature? Sth like isPlayer = true
- [x] Reset interactionText on death
- [x] Fix creatures can move through walls when packed?
- [x] Fix creatures moving away when bumping into each other

## Improve game display

- [x] Extend viewports (only 3 rows in eventLogs, use more width, only 2 rows down, increase cell width)
- [ ] Display creature stat blocks
- [ ] Some sort of effect (sound/animation) on attack?
- [ ] Add reveal animation on spawn and on gameover
- [ ] Add blur on shadows?
- [ ] Improve eventLogs
  - [ ] Display logs from same round on the same row.
  - [ ] Add colors in eventLogs
  - [ ] Make it more obvious which logs are from the previous round
  - [ ] Scroll through eventLogs (and reset on next one)
- [ ] Menus at bottom of screen

## Map generation

- [x] Seed map with RNG
- [ ] Add downward staircases tile and in generateLevel
- [ ] Improve generateLevel's corridors
- [ ] Add doors in generateLevel
- [ ] Add grass in generateLevel
- [ ] Add items in generateLevel
- [ ] Predefined dungeon entry, with flames
- [ ] Add monsters in generateLevel (use spawnNumber)

## Gameplay

- [ ] Hunger clock with impact on visibility
- [ ] Way to heal
- [ ] Way to regain hunger clock

## Dijkstra Maps - getDijkstraMap(target, passible, impassible)

- [x] One goal
- [ ] Multiple goals
- [ ] Multiple priority levels
- [ ] Mouse pathfinding
- [ ] Pack behavior by adding costs around tiles occupied by an ally

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
- [ ] Pillar tile to climb and increase visibility
- [ ] Burning entities can set flammable tiles on fire
- [ ] Fix can see through diagonal walls
- [ ] Why can see more on the left side at the end of corridors?
- [ ] NPCs
- [ ] Rest
