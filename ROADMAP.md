# ROADMAP

## MVP playable version

- [x] Display current depth
- [x] Add downward staircases tile
- [x] Generate maps for multiple depths in generate level
- [ ] Switch between maps when depth increases
- [ ] Add monsters in generateLevel (use spawnNumber)
- [ ] Add doors in generateLevel
- [ ] Add grass in generateLevel
- [ ] Add gold in generateLevel
- [ ] Add downward staircase in generateLevel
- [ ] Hunger clock (with impact on visibility)?
- [ ] Way to heal (rest, item)?
- [ ] Way to regain hunger clock

## Improve eventLogs

- [ ] Display logs from same round on the same row.
- [ ] Add colors in eventLogs
- [ ] Make it more obvious which logs are from the previous round
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
- [ ] Add items in generateLevel

## Others

- [ ] Hover on creatures highlight creature block
- [ ] Hover on creature block highlightd creature
- [ ] Creatures can burn (like player)
- [ ] Predefined dungeon entry, with flames
- [ ] Improve generateLevel's corridors
- [ ] Consider Player just as another creature? Sth like isPlayer = true
- [ ] Menus at bottom of screen
- [ ] Bug: Creature moving away if no space available because blocked by ally
- [ ] Improve: Creature should not move where another creature died
- [ ] Remember high scores with local storage
- [ ] Pillar tile to climb and increase visibility
- [ ] Burning entities can set flammable tiles on fire
- [ ] Fix can see through diagonal walls
- [ ] Why can see more on the left side at the end of corridors?
