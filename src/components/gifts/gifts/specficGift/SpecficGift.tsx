import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { specficGift } from "../../../../store/slices/gifts/giftsSlice";

// components
import PagesHeaders from "../../../ui/PagesHeaders";
import Message from "../../../ui/Message";
import Spinner from "../../../ui/spinner/Spinner";
import SpecificGiftUi from "./SpecificGiftUi";

const SpecficGift = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const gifts = useSelector((state: RootState) => state.gifts);
    const { id } = useParams();

    // Efftect => to get the specfic gift data from store
    useEffect(() => {
        dispatch(
            specficGift({ gift_id: id!, token: auth.loginData?.access_token! })
        );
    }, [auth.loginData?.access_token, dispatch, id]);

    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <PagesHeaders>{`هديه ${id}`}</PagesHeaders>

            {gifts.specficGiftLoading ? (
                <Spinner />
            ) : gifts.specficGiftError ? (
                <Message>{gifts.specficGiftError}</Message>
            ) : gifts.specficGiftData ? (
                <SpecificGiftUi
                    cover={gifts.specficGiftData.cover}
                    created_at={gifts.specficGiftData.created_at}
                    id={gifts.specficGiftData.id}
                    name={gifts.specficGiftData.name}
                    price={gifts.specficGiftData.price}
                    svga={gifts.specficGiftData.svga}
                    type={gifts.specficGiftData.type}
                    updated_at={gifts.specficGiftData.updated_at}
                />
            ) : (
                <Message>التصميم غير موجود</Message>
            )}
        </section>
    );
};

export default SpecficGift;
