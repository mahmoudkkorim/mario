import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { allSpecialUids } from "../../../store/slices/specialUidsSlice";

// components
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import Pagination from "../../ui/pagination/Pagination";
import SpecialUidsTabelHeader from "./SpecialUidsTabelHeader";
import SpecialUidsTabelBody from "./SpecialUidsTabelBody";

const SpecialUidsTabel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const specialUids = useSelector((state: RootState) => state.specialUids);

    // useEffect to fetch all special uids
    useEffect(() => {
        dispatch(
            allSpecialUids({
                token: auth.loginData?.access_token!,
                page: page!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return specialUids.allSpecialUidsLoading ? (
        <Spinner />
    ) : specialUids.allSpecialUidsError ? (
        <Message>{specialUids.allSpecialUidsError}</Message>
    ) : specialUids.allSpecialUidsData?.total ? (
        <>
            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                <span>عدد الارقام المميزه :</span>
                <span>{specialUids.allSpecialUidsData?.total}</span>
            </div>
            <table className='w-full'>
                <SpecialUidsTabelHeader />
                <SpecialUidsTabelBody />
            </table>
            <Pagination
                total_pages={specialUids.allSpecialUidsData.total}
                items_per_page={specialUids.allSpecialUidsData.per_page}
            />
        </>
    ) : (
        <div className='mt-5'>
            <Message>لا يوجد ارقام مميزه.</Message>
        </div>
    );
};

export default SpecialUidsTabel;
