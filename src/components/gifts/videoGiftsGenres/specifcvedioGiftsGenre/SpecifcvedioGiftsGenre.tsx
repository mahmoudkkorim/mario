import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { specificVideoGiftsGenre } from "../../../../store/slices/gifts/videoGiftsGenresSlice";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

// components
import PagesHeaders from "../../../ui/PagesHeaders";
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import SpecifcRowDataForSpecifcItem from "../../../utils/SpecifcRowDataForSpecifcItem";
import SpecifcvedioGiftsGenreTabel from "./specifcvedioGiftsGenreTabel/SpecifcvedioGiftsGenreTabel";
import Manipulation from "../manipulation/Manipulation";

const SpecifcvedioGiftsGenre = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    // selectors
    const auth = useSelector((state: RootState) => state.auth);
    const videoGiftsGenres = useSelector(
        (state: RootState) => state.videoGiftsGenres
    );

    // useEffect to fetch data specific videoGiftsGenres from Redux
    useEffect(() => {
        dispatch(
            specificVideoGiftsGenre({
                token: auth.loginData?.access_token!,
                gift_id: params.id!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, params.id]);

    console.log(videoGiftsGenres.specficVideoGiftsGenreData);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>{`نوع هدايا الفيديو ${params.id}`}</PagesHeaders>
            {/* <Mapnipulation /> */}
            <Manipulation />
            {videoGiftsGenres.specficVideoGiftsGenreLoading ? (
                <Spinner />
            ) : videoGiftsGenres.specficVideoGiftsGenreError ? (
                <Message>
                    {videoGiftsGenres.specficVideoGiftsGenreError}
                </Message>
            ) : videoGiftsGenres.specficVideoGiftsGenreData?.id ? (
                <section className='mt-2 mr-5'>
                    <PagesHeaders small>
                        معلومات عن نوع هدايا الفيديو
                    </PagesHeaders>
                    <div className='flex flex-col justify-start gap-1 mt-5'>
                        <SpecifcRowDataForSpecifcItem
                            data={
                                videoGiftsGenres.specficVideoGiftsGenreData.name
                            }
                            text='الاسم'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={
                                videoGiftsGenres.specficVideoGiftsGenreData.id
                            }
                            text='الرقم التعريفى لنوع الهداديا الفيديو'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={`${videoGiftsGenres.specficVideoGiftsGenreData.precentage}%`}
                            text='النسبه'
                        />
                        {videoGiftsGenres.specficVideoGiftsGenreData
                            .created_at && (
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            videoGiftsGenres
                                                .specficVideoGiftsGenreData
                                                .created_at
                                        }
                                    />
                                }
                                text='إنشئ في'
                            />
                        )}
                        {videoGiftsGenres.specficVideoGiftsGenreData
                            .updated_at && (
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            videoGiftsGenres
                                                .specficVideoGiftsGenreData
                                                .updated_at
                                        }
                                    />
                                }
                                text='اخر تحديث في'
                            />
                        )}
                    </div>
                    {/* video gifts tabel */}
                    {videoGiftsGenres.specficVideoGiftsGenreData.gifts.length >
                        0 && (
                        <>
                            <PagesHeaders small>
                                معلومات عن هدايا الفيديو
                            </PagesHeaders>
                            <>
                                <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                                    <span>عدد هدايا الفيديو :</span>
                                    <span>
                                        {
                                            videoGiftsGenres
                                                .specficVideoGiftsGenreData
                                                .gifts.length
                                        }
                                    </span>
                                </div>
                                <SpecifcvedioGiftsGenreTabel />
                            </>
                        </>
                    )}
                </section>
            ) : (
                <div className='mt-5'>
                    <Message>نوع الهداديا الفيديو غير موجوده.</Message>
                </div>
            )}
        </section>
    );
};

export default SpecifcvedioGiftsGenre;
