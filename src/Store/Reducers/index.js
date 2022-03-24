import {combineReducers} from "redux";

import game from "./game.reducer";
// import user from "./user.reducer";

const reducer = combineReducers({
    game,
    // user,
});

export default reducer;