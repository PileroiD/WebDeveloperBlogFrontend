import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import styled from "styled-components";
import { Input } from "../../input-component/input-component";
import { Button } from "../../button-component/button-component";
import { setUser } from "../../../actions";
import { selectUserRole } from "../../../selectors";
import { ROLE } from "../../../constants/role";
import { AuthFormError } from "../../auth-form-error/auth-form-error";
import { useResetForm } from "../../../hooks/use-reset-form";
import { request } from "../../../utils/request";

const StyledLink = styled(Link)`
    text-decoration: underline;
    font-size: 15px;
`;

const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Login is required")
        .matches(/^\w+$/, "Only letters and numbes are available for login")
        .min(3, "Invalid login. Minimum 3 symbols")
        .max(20, "Invalid login. Max 20 symbols"),
    password: yup
        .string()
        .required("Password is required")
        .matches(
            /^[\w#%]+$/,
            "Only letters, numbes and (#, %) symbols are available for password"
        )
        .min(8, "Invalid password. Minimum 8 symbols")
        .max(30, "Invalid password. Max 30 symbols"),
});

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema),
    });

    const [serverError, setServerError] = useState(null);
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);

    useResetForm(reset);

    const onSubmit = ({ login, password }) => {
        request("/login", "POST", { login, password }).then((response) => {
            if (response.error) {
                setServerError(`Request error: ${response.error}`);
                return;
            }

            localStorage.setItem(
                "token",
                JSON.stringify(response.headers.get("Set-Cookie"))
            );

            dispatch(setUser(response.user));
            sessionStorage.setItem("userData", JSON.stringify(response.user));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div className={className}>
            <h2>Authorization</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Login"
                    name="login"
                    id="login"
                    {...register("login", {
                        onChange: () => setServerError(null),
                    })}
                />
                {/* {errors.login && <span>{errors.login.message}</span>} */}

                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />
                {/* {errors.password && <span>{errors.password.message}</span>} */}

                <Button disabled={!!formError} type="submit">
                    Log in
                </Button>

                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

                <StyledLink to="/register">Sign in</StyledLink>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    text-align: center;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > form {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        width: 256px;
    }
`;
