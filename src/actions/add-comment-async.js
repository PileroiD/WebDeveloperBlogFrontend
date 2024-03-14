import { request } from "../utils/request";
import { setNewComment } from "./set-new-comment";

export const addCommentAsync = (postId, content) => (dispatch) => {
    request(`/posts/${postId}/comments`, "POST", { content }).then(
        (response) => {
            dispatch(setNewComment(response.data));
        }
    );
};
