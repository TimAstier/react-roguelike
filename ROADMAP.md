# ROADMAP

## Game improvements

- [ ] Hunger clock (with impact on visibility)?
- [ ] Way to regain hunger clock
- [ ] Add doors in generateLevel
- [ ] Make depths harder and harder
- [ ] Leave bones/blood permanently on ground when creature dies
- [ ] Press key to go downstairs

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

- [ ] Add grass in generateLevel
- [ ] Something to set fire
- [ ] Throw items
- [ ] Equip items (in any hand)
- [ ] Add items in generateLevel

## Ability ideas

- Shields up: Block and counterattack against any ennemy next turn.

## Spell ideas

- Wormhole. You use it on a wall, and it creates a temporary tunnel to the other side. It works like a normal corridor, but after some time it closes and places the wall tiles back. You can use it to skip rooms, to shoot through it, to make shortcuts, to escape from danger, or even lure monsters there and then let it close while they are inside so they get crushed by the wall.
- Clone. Creates your clone that you can control. Every turn you have to make a move for yourself, and then for your clone too. After some time it disappears.
- Time stop. For some time gives you infinite speed, or, in other words, stops everything except you. You are the only one who get to move. You can do sequential attacks, knowing for the next few turns no one can move. For monsters it will look just like you did it all in one turn.
- Wall. Well, it basically creates temporary wall. Or may be something more interesting, like it can only shift already existing walls. After some time everything returns to normal.
- Blink spell, the ability to teleport instantly a short distance.
- Stone Wall

## Others

- [ ] Keep spawning creatures during play?
- [ ] Unstable terrain - Unstable condition - all attack are crits
- [ ] BUG: Goblins placed in front of rat even if further away?
- [ ] Creatures can burn (like player)
- [ ] Predefined dungeon entry, with flames
- [ ] Improve generateLevel's corridors
- [ ] Consider Player just as another creature? Sth like isPlayer = true
- [ ] Menus at bottom of screen
- [ ] Remember high scores with local storage
- [ ] Pillar tile to climb and increase visibility
- [ ] Burning entities can set flammable tiles on fire
- [ ] Fix can see through diagonal walls
- [ ] Why can see more on the left side at the end of corridors?
