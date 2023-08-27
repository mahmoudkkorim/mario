import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { allVideoGiftsGenres } from "../../../../store/slices/gifts/videoGiftsGenresSlice";

// components
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import Pagination from "../../../ui/pagination/Pagination";
import VedioGiftsGenresTabelHeader from "./VedioGiftsGenresTabelHeader";
import VedioGiftsGenresTabelBody from "./VedioGiftsGenresTabelBody";

const VedioGiftsGenresTabel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const videoGiftsGenres = useSelector(
        (state: RootState) => state.videoGiftsGenres
    );

    useEffect(() => {
        dispatch(
            allVideoGiftsGenres({
                token: auth.loginData?.access_token!,
                page: page!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return videoGiftsGenres.allVideoGiftsGenresLoading ? (
        <Spinner />
    ) : videoGiftsGenres.allVideoGiftsGenresError ? (
        <Message>{videoGiftsGenres.allVideoGiftsGenresError}</Message>
    ) : videoGiftsGenres.allVideoGiftsGenresData?.total ? (
        <>
            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                <span>عدد انواع هدايا الفيديو :</span>
                <span>{videoGiftsGenres.allVideoGiftsGenresData?.total}</span>
            </div>
            <table className='w-full'>
                <VedioGiftsGenresTabelHeader />
                <VedioGiftsGenresTabelBody />
            </table>
            <Pagination
                total_pages={videoGiftsGenres.allVideoGiftsGenresData.total}
                items_per_page={
                    videoGiftsGenres.allVideoGiftsGenresData.per_page
                }
            />
        </>
    ) : (
        <div className='mt-5'>
            <Message>لا يوجد انواع هدايا فيديو.</Message>
        </div>
    );
};

export default VedioGiftsGenresTabel;
