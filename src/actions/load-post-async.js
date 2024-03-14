import { request } from "../utils/request";
import { setPostData } from "./set-post-data";

export const loadPostAsync = (postId) => (dispatch) =>
    request(`/posts/${postId}`).then((response) => {
        if (response) {
            dispatch(setPostData(response.data));
        }

        return response;
    });
