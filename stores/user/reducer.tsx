import {
    ActionSignIn,
    ActionSignOut
} from "@/stores/actions/type";

let DEFAULT = {
    personal: "",
    avatar: "",
    auth: false,
    type: "",
    message: "",
    sign_in: "sign_out"
}

if (typeof window !== 'undefined' && localStorage.getItem("user")){
    DEFAULT = JSON.parse(localStorage.getItem("user") as string);
}

const UserReducer = (state = DEFAULT, action: any) => {
    switch (action.type) {
        case ActionSignIn:
            return state;

        case ActionSignOut:
            return {...state, personal: "", auth: false, type: "", message: "", sign_in: action.data.type};

        default:
            return state;
    }
}

export default UserReducer;
