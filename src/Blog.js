import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components";
import { Footer } from "./components/footer/Footer";
import { Authorization } from "./components/pages/auth/auth";
import { Registration } from "./components/pages/registration/Registration";
import { Users } from "./components/pages/users/Users";
import { Post } from "./components/pages/post/Post";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import { Modal } from "./components/modal/Modal";
import { Main } from "./components/pages/main/Main";
import { Error } from "./components/error/Error";
import { ERROR } from "./constants/error";

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
`;

const Page = styled.div`
    padding: 120px 0 40px 0;
`;

function Blog() {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const currentUserData = JSON.parse(sessionStorage.getItem("userData"));

        if (!currentUserData) return;

        dispatch(
            setUser({
                ...currentUserData,
                roleId: Number(currentUserData.roleId),
            })
        );
    }, []);

    return (
        <AppColumn>
            <Header />

            <Page>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/post/:id/edit" element={<Post />} />
                    <Route
                        path="*"
                        element={<Error error={ERROR.PAGE_NOT_FOUND} />}
                    />
                </Routes>
            </Page>

            <Footer />

            <Modal />
        </AppColumn>
    );
}

export default Blog;
