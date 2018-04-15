import { reduxPage } from "../config/redux";
import Dungeon from "../containers/Dungeon";

import { firstStore } from "../gameplay/createDungeon";

export default reduxPage(Dungeon);
