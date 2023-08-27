import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { specifcVideoGift } from "../../../../store/slices/gifts/videoGiftsSlice";

// components
import PagesHeaders from "../../../ui/PagesHeaders";
import Message from "../../../ui/Message";
import Spinner from "../../../ui/spinner/Spinner";
import SpecificVideoGiftUi from "./SpecificVideoGiftUi";

const SpecificVideoGift = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const videoGifts = useSelector((state: RootState) => state.videoGifts);
    const { id } = useParams();

    // Efftect => to get the specfic video gift data from store
    useEffect(() => {
        dispatch(
            specifcVideoGift({
                gift_id: id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, id]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>{`هديه فيديو ${id}`}</PagesHeaders>

            {videoGifts.specificVideoGiftLoading ? (
                <Spinner />
            ) : videoGifts.specificVideoGiftError ? (
                <Message>{videoGifts.specificVideoGiftError}</Message>
            ) : videoGifts.specificVideoGiftData ? (
                <SpecificVideoGiftUi
                    cover={videoGifts.specificVideoGiftData.cover}
                    created_at={videoGifts.specificVideoGiftData.created_at}
                    id={videoGifts.specificVideoGiftData.id}
                    name={videoGifts.specificVideoGiftData.name}
                    price={videoGifts.specificVideoGiftData.price}
                    svga={videoGifts.specificVideoGiftData.svga}
                    type={videoGifts.specificVideoGiftData.type}
                    updated_at={videoGifts.specificVideoGiftData.updated_at}
                    related_gift_ids={
                        videoGifts.specificVideoGiftData.related_gift_ids
                    }
                    required_sending_counter={
                        videoGifts.specificVideoGiftData
                            .required_sending_counter
                    }
                    sending_counter={
                        videoGifts.specificVideoGiftData.sending_counter
                    }
                    surprise_gift_id={
                        videoGifts.specificVideoGiftData.surprise_gift_id
                    }
                    video_gift_genere_id={
                        videoGifts.specificVideoGiftData.video_gift_genere_id
                    }
                />
            ) : (
                <Message>التصميم غير موجود</Message>
            )}
        </section>
    );
};

export default SpecificVideoGift;
