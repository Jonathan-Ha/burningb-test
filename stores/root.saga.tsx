import {all} from "redux-saga/effects";
import {WatchUser} from "@/stores/user/saga";

export default function* rootSaga() {
    yield all([
        WatchUser()
    ]);
}
