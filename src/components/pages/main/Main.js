import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PostCard } from "./PostCard";
import { Pagination } from "./Pagination";
import { Search } from "./Search";
import { debounce } from "../../utils/debounce";
import { request } from "../../../utils/request";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState(null);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");

    useEffect(() => {
        request(`/posts?search=${searchPhrase}&limit=${9}&page=${page}`).then(
            ({ posts, lastPage }) => {
                setPosts(posts);
                setLastPage(Number(lastPage));
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, shouldSearch]);

    const startDelayedSearch = useMemo(
        () => debounce(setShouldSearch, 2000),
        []
    );

    const onSearch = ({ target }) => {
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
    };

    return (
        <div className={className}>
            <Search searchPhrase={searchPhrase} onChange={onSearch} />
            {posts?.length ? (
                <div className="post-list">
                    {posts &&
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                </div>
            ) : (
                <div className="nothing-found">Nothing found</div>
            )}
            {lastPage > 0 ? (
                <Pagination
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                    setLastPage={setLastPage}
                />
            ) : null}
        </div>
    );
};

export const Main = styled(MainContainer)`
    margin-top: 30px;

    & .post-list {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(3, 280px);
        grid-template-rows: repeat(auto-fill, 220px);
        column-gap: 35px;
        row-gap: 35px;
    }

    & .nothing-found {
        text-align: center;
        font-size: 30px;
        color: gray;
    }
`;
