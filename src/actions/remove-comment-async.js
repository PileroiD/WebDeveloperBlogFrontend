import { request } from "../utils/request";
import { deleteComment } from "./delete-comment";

export const removeCommentAsync = (commentId, postId) => (dispatch) => {
    request(`/posts/${postId}/comments/${commentId}`, "DELETE").then(() => {
        dispatch(deleteComment(commentId));
    });
};
