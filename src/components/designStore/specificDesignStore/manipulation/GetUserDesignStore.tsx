import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { getUserDesignStore } from "../../../../store/slices/designStoreSlice";

// components
import PagesHeaders from "../../../ui/PagesHeaders";
import UserDesignStoreTabel from "./userDesignStoreTabel/UserDesignStoreTabel";

const GetUserDesignStore = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const designStore = useSelector((state: RootState) => state.designStore);

    // get design for this user
    useEffect(() => {
        dispatch(
            getUserDesignStore({
                token: auth.loginData?.access_token!,
                user_id: params.id!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, params.id]);

    return (
        <>
            {designStore.getUserDesignStoreData?.decorations &&
                designStore.getUserDesignStoreData?.decorations.length > 0 && (
                    <>
                        <PagesHeaders small>
                            متجر التصميمات للمستخدم
                        </PagesHeaders>
                        <UserDesignStoreTabel />
                    </>
                )}
        </>
    );
};

export default GetUserDesignStore;
