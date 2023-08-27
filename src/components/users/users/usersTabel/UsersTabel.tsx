import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { getAllUsers } from "../../../../store/slices/users/usersSlice";

// Components
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import Pagination from "../../../ui/pagination/Pagination";
import UsersTabelHeader from "./UsersTabelHeader";
import UsersTabelBody from "./UsersTabelBody";

const UsersTabel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const users = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(
            getAllUsers({ token: auth.loginData?.access_token!, page: page! })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return users.allUsersLoading ? (
        <Spinner />
    ) : users.allUsersError ? (
        <Message>{users.allUsersError}</Message>
    ) : users.allUsersData?.total ? (
        <>
            <div className="flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs">
                <span>عدد الاعضاء :</span>
                <span>{users.allUsersData?.total}</span>
            </div>
            <table className="w-full">
                <UsersTabelHeader />
                <UsersTabelBody />
            </table>
            <Pagination
                total_pages={users.allUsersData.total}
                items_per_page={users.allUsersData.per_page}
            />
        </>
    ) : (
        <div className="mt-5">
            <Message>لا يوجد اعضاء.</Message>
        </div>
    );
};

export default UsersTabel;
