import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { allLevels } from "../../../store/slices/levelsSlice";

// components
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import Pagination from "../../ui/pagination/Pagination";
import LevelsTabelHeader from "./LevelsTabelHeader";
import LevelsTabelBody from "./LevelsTabelBody";

const LevelsTabel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const levels = useSelector((state: RootState) => state.levels);

    useEffect(() => {
        dispatch(
            allLevels({ token: auth.loginData?.access_token!, page: page! })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return levels.allLevelsLoading ? (
        <Spinner />
    ) : levels.allLevelsError ? (
        <Message>{levels.allLevelsError}</Message>
    ) : levels.allLevelsData?.total ? (
        <>
            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                <span>عدد المستويات :</span>
                <span>{levels.allLevelsData?.total}</span>
            </div>
            <table className='w-full'>
                <LevelsTabelHeader />
                <LevelsTabelBody />
            </table>
            <Pagination
                total_pages={levels.allLevelsData.total}
                items_per_page={levels.allLevelsData.per_page}
            />
        </>
    ) : (
        <div className='mt-5'>
            <Message>لا يوجد مستويات.</Message>
        </div>
    );
};

export default LevelsTabel;
