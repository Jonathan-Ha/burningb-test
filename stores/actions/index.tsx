import {ActionSignIn, ActionSignOut} from "@/stores/actions/type";

export const _SignIn = (data: any) => {
    return {
        type: ActionSignIn,
        data: data
    }
}

export const _SignOut = (data: any) => {
    return {
        type: ActionSignOut,
        data: data
    }
}
