import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllVidoGifts } from "../../../store/slices/gifts/videoGiftsSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import CreateEditVideoGift from "./CreateEditVideoGift";
import Button from "../../ui/Button";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import SingleVideoGift from "./SingleVideoGift";
import Pagination from "../../ui/pagination/Pagination";

const VideoGifts = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const updateVideoGift = query.get("updateVideoGift");
    const createVideoGift = query.get("createVideoGift");
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const videoGifts = useSelector((state: RootState) => state.videoGifts);

    // useEffect => to get all video gifs from store
    useEffect(() => {
        dispatch(
            getAllVidoGifts({
                token: auth.loginData?.access_token!,
                page: page || 1,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>هدايا الفيديو</PagesHeaders>
            {updateVideoGift || createVideoGift ? (
                <CreateEditVideoGift />
            ) : (
                <>
                    <div className='flex justify-end'>
                        <Button
                            className='bg-success text-white'
                            to='/videoGifts?createVideoGift=true'
                            type='link'
                        >
                            إنشاء هديه فيديو جديده
                        </Button>
                    </div>
                    {videoGifts.allVideoGiftsLoading ? (
                        <Spinner />
                    ) : videoGifts.allVideoGiftsError ? (
                        <Message>{videoGifts.allVideoGiftsError}</Message>
                    ) : videoGifts.allVideoGiftsData?.current_page &&
                      videoGifts.allVideoGiftsData?.data.length > 0 ? (
                        <>
                            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                                <span>عدد هدايا الفيديو :</span>
                                <span>
                                    {videoGifts.allVideoGiftsData?.total}
                                </span>
                            </div>
                            <div className='mx-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-start justify-items-center mt-10'>
                                {videoGifts.allVideoGiftsData?.data.map(
                                    (one, i) => (
                                        <SingleVideoGift
                                            key={i}
                                            cover={one.cover}
                                            created_at={one.created_at}
                                            id={one.id}
                                            name={one.name}
                                            price={one.price}
                                            related_gift_ids={
                                                one.related_gift_ids
                                            }
                                            required_sending_counter={
                                                one.required_sending_counter
                                            }
                                            sending_counter={
                                                one.sending_counter
                                            }
                                            surprise_gift_id={
                                                one.surprise_gift_id
                                            }
                                            svga={one.svga}
                                            type={one.type}
                                            updated_at={one.updated_at}
                                            video_gift_genere_id={
                                                one.video_gift_genere_id
                                            }
                                        />
                                    )
                                )}
                            </div>
                            <Pagination
                                total_pages={
                                    videoGifts.allVideoGiftsData?.total!
                                }
                                items_per_page={
                                    videoGifts.allVideoGiftsData?.per_page!
                                }
                            />
                        </>
                    ) : videoGifts.allVideoGiftsData?.data.length === 0 ? (
                        <Message>لا يوجد هدايا</Message>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </section>
    );
};

export default VideoGifts;
