import { request } from "../utils/request";
import { ACTION_TYPE } from "./action-type";

export const logOut = () => {
    request("/logout", "POST");

    return {
        type: ACTION_TYPE.LOG_OUT,
    };
};
