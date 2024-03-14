import { ACTION_TYPE } from "./action-type";

export const setNewComment = (commentData) => {
    return {
        type: ACTION_TYPE.ADD_COMMENT,
        payload: commentData,
    };
};
