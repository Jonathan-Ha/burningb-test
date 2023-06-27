import UserReducer from "@/stores/user/reducer";
import {combineReducers} from "redux";

const reducer = combineReducers({
    user: UserReducer
});

export default reducer;
