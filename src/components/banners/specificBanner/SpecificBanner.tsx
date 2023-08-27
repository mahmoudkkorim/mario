import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { specificBanner } from "../../../store/slices/bannersSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import Message from "../../ui/Message";
import Spinner from "../../ui/spinner/Spinner";
import SpecificBannerUi from "./SpecificBannerUi";

const SpecificBanner = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const banners = useSelector((state: RootState) => state.banners);
    const { id } = useParams();

    // Efftect => to get the specfic banner data from store
    useEffect(() => {
        dispatch(
            specificBanner({
                banner_id: id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, id]);

    console.log(banners.specificBannerData);

    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <PagesHeaders>{`بانر ${id}`}</PagesHeaders>

            {banners.specificBannerLoading ? (
                <Spinner />
            ) : banners.specificBannerError ? (
                <Message>{banners.specificBannerError}</Message>
            ) : banners.specificBannerData ? (
                <SpecificBannerUi
                    cover={banners.specificBannerData.cover}
                    created_at={banners.specificBannerData.created_at}
                    id={banners.specificBannerData.id}
                    related_to_id={banners.specificBannerData.related_to_id}
                    related_to_type={banners.specificBannerData.related_to_type}
                    updated_at={banners.specificBannerData.updated_at}
                    valid_to={banners.specificBannerData.valid_to}
                />
            ) : (
                <Message>البنر غير موجود</Message>
            )}
        </section>
    );
};

export default SpecificBanner;
