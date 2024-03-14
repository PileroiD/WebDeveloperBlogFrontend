import { request } from "../utils/request";
import { setPostData } from "./set-post-data";

export const savePostAsync = (id, newPostData) => async (dispatch) => {
    const requestUrl = id ? `/posts/${id}` : "/posts";
    const method = id ? "PATCH" : "POST";

    const response = await request(requestUrl, method, newPostData);
    dispatch(setPostData(response.data));

    return response.data;
};
