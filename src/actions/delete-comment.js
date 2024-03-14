import { ACTION_TYPE } from "./action-type";

export const deleteComment = (commentId) => {
    return {
        type: ACTION_TYPE.REMOVE_COMMENT,
        payload: commentId,
    };
};
