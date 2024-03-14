import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../icon-component/icon-component";
import { Comment } from "./components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../../selectors";
import {
    addCommentAsync,
    closeModal,
    openModal,
    removeCommentAsync,
} from "../../../../actions";
import { checkAccess } from "../../../utils/check-access";
import { ROLE } from "../../../../constants/role";
import { PROP_TYPE } from "../../../../constants/prop-type";

const CommentsContainer = ({ className, comments, postId }) => {
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);
    const isAllowedToAddComment = checkAccess(
        [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER],
        roleId
    );
    const isAdminOrModerator = checkAccess([ROLE.ADMIN], roleId);

    const onNewCommentAdd = (postId, content) => {
        dispatch(addCommentAsync(postId, content));
        setNewComment("");
    };

    const onCommentRemove = (commentId, postId) => {
        dispatch(
            openModal({
                text: "Delete comment?",
                onConfirm: () => {
                    dispatch(removeCommentAsync(commentId, postId));
                    dispatch(closeModal);
                },
                onCancel: () => dispatch(closeModal),
            })
        );
    };

    return (
        <div className={className}>
            {isAllowedToAddComment ? (
                <div className="new-comment">
                    <textarea
                        name="newComment"
                        value={newComment}
                        placeholder="Your comment..."
                        onChange={({ target }) => setNewComment(target.value)}
                    ></textarea>
                    <Icon
                        id={"fa-paper-plane-o"}
                        styledicon="true"
                        size={"18px"}
                        onClick={() => onNewCommentAdd(postId, newComment)}
                    />
                </div>
            ) : null}

            <div className="comments">
                {comments.map(({ id, ...commentData }) => (
                    <Comment
                        key={id}
                        id={id}
                        {...commentData}
                        isAdminOrModerator={isAdminOrModerator}
                        onCommentRemove={() => onCommentRemove(id, postId)}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsContainer)`
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    width: 560px;

    & .new-comment {
        display: flex;
        column-gap: 6px;

        & i {
            height: 25px;
        }
    }

    & textarea {
        height: 100px;
        width: 100%;
        resize: none;
        padding: 7px;
        border: 1px solid #000;
        border-radius: 5px;
    }

    & .comments {
        width: 100%;
    }
`;

Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
    postId: PropTypes.string.isRequired,
};
