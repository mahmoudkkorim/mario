import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { specificEmoji } from "../../../store/slices/emojisSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import SpecificEmojiUi from "./SpecificEmojiUi";

const SpecificEmoji = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const emojis = useSelector((state: RootState) => state.emojis);
    const { id } = useParams();

    // Efftect => to get the specfic room data from store
    useEffect(() => {
        dispatch(
            specificEmoji({
                emoji_id: id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, id]);
    console.log(emojis.specificEmojiData);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>{`إيموجى ${id}`}</PagesHeaders>

            {emojis.specificEmojiLoading ? (
                <Spinner />
            ) : emojis.specificEmojiError ? (
                <Message>{emojis.specificEmojiError}</Message>
            ) : emojis.specificEmojiData ? (
                <SpecificEmojiUi
                    body={emojis.specificEmojiData.body}
                    id={emojis.specificEmojiData.id}
                    cover={emojis.specificEmojiData.cover}
                    created_at={emojis.specificEmojiData.created_at}
                    updated_at={emojis.specificEmojiData.updated_at}
                />
            ) : (
                <Message>خلفيه الغرفه غير موجوده</Message>
            )}
        </section>
    );
};

export default SpecificEmoji;
