import React from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";

import { Children } from "../../interfaces/public";

const Logout = (props: Children) => {
    const { children } = props;

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    // logout
    const logoutHandler = () => {
        dispatch(logout(auth.loginData?.access_token!));
    };

    return (
        <button
            onClick={logoutHandler}
            className="hover:text-lightRed hover:from-[#009ffd]/50 h-12  hover:to-[#24357d]/50 duration-300 flex justify-start gap-2 items-center py-2 pr-5 bg-gradient-to-r"
        >
            {children}
        </button>
    );
};

export default Logout;
