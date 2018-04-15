import _ from "lodash";
import { c } from "./createDungeon";

// create a function that places enemies, bosses, players, etc. onto the gameboard
const createEntities = (gameMap, level = 1) => {
  // our entities
  const bosses = [];
  const enemies = [];
  const exits = [];
  const players = [
    {
      type: "player"
    }
  ];
  const potions = [];
  const weapons = [];

  // bosses
  if (level === 4) {
    bosses.push({
      health: 400,
      level: 5,
      type: "boss"
    });
  }

  // enemies
  for (let index = 0; index < 7; index++) {
    enemies.push({
      health: level * 30 * 40,
      // half of the enemies will be a level higher or lower (except on
      // level 1, where 1/4 enemies are a level higher)
      level: _.random(
        level,
        _.random(level - 1 ? level - 1 : level, level + 1)
      ),
      type: "enemy"
    });
  }

  // exits
  if (level < 4) {
    exits.push({
      type: "exit"
    });
  }

  // potions
  for (let i = 0; i < 5; i++) {
    potions.push({ type: "potion" });
  }

  const weaponTypes = [
    {
      name: "Laser Pistol",
      damage: 15
    },
    {
      name: "Laser Rifle",
      damage: 19
    },
    {
      name: "Plasma Pistol",
      damage: 26
    },
    {
      name: "Plasma Rifle",
      damage: 28
    },
    {
      name: "Electric ChainSaw",
      damage: 31
    },
    {
      name: "Railgun",
      damage: 33
    },
    {
      name: "Dark Energy Cannon",
      damage: 40
    },
    {
      name: "B.F.G",
      damage: 43
    }
  ];

  const qualifying = weaponTypes
    .filter(weapon => weapon.damage < level * 10 + 10)
    .filter(weapon => weapon.damage > level * 10 - 10);

  // for loop that will generate 3 random weapons per level using the filtered qualifying array
  for (let i = 0; i < 3; i++) {
    const weapon = Object.assign(
      {},
      qualifying[_.random(0, qualifying.length - 1)]
    );
    weapon.type = "weapon";
    weapons.push(weapon);
    level - 1;
  }

  // 7 constant update of the player's starting co-ordinates
  let playerPosition = [];

  // create an array with all of our entities and run a function against array element
  [bosses, enemies, exits, players, potions, weapons].forEach(entities => {
    // while there are entities in the array...
    while (entities.length) {
      const x = Math.floor(Math.random() * c.GRID_WIDTH);
      const y = Math.floor(Math.random() * c.GRID_HEIGHT);

      // check if the entity type == 'floor'
      // we're reading first the row, then column
      if (gameMap[y][x].type === "floor") {
        // if the type the tile is a floor then check if the first element is a player
        // if it is update the player position
        if (entities[0].type === "player") {
          playerPosition = [x, y];
        }
        // pop off the last element in entities and "grab" it
        gameMap[y][x] = entities.pop();
      }
    }
  });

  // loop over the gameMap array
  for (let i = 0; i < gameMap.length; i++) {
    // check the array inside gameMap and loop over that
    for (let j = 0; j < gameMap[0].length; j++) {
      // if the type is door, reassign it to 'floor' * WHY?
      if (gameMap[i][j].type === "door") {
        gameMap[i][j].type = "floor";
      }
    }
  }

  return { entities: gameMap, playerPosition };
};

export default createEntities;
