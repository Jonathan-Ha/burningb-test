import {
    ActionSignIn
} from "@/stores/actions/type";
import {takeLatest} from "redux-saga/effects";

function* SignIn(action: any) {
    try {

    } catch (error) {

    }
}

export function* WatchUser() {
    yield takeLatest(ActionSignIn, SignIn);
}
