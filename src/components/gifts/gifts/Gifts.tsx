import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllGifts } from "../../../store/slices/gifts/giftsSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import CreateEditGift from "./CreateEditGift";
import Button from "../../ui/Button";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import Pagination from "../../ui/pagination/Pagination";
import SingleGift from "./SingleGift";

const Gifts = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const updateGift = query.get("updateGift");
    const createGift = query.get("createGift");
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const gifts = useSelector((state: RootState) => state.gifts);

    // useEffect => to get all gifts from store when reload the page
    useEffect(() => {
        dispatch(
            getAllGifts({
                page: page || 1,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <PagesHeaders>الهدايا</PagesHeaders>
            {updateGift || createGift ? (
                <CreateEditGift />
            ) : (
                <>
                    <div className="flex justify-end">
                        <Button
                            className="bg-success text-white"
                            to="/gifts?createGift=true"
                            type="link"
                        >
                            إنشاء هديه
                        </Button>
                    </div>
                    {gifts.allGiftsLoading ? (
                        <Spinner />
                    ) : gifts.allGiftsError ? (
                        <Message>{gifts.allGiftsError}</Message>
                    ) : gifts.allGiftsData?.current_page &&
                      gifts.allGiftsData.data.length > 0 ? (
                        <>
                            <div className="flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs">
                                <span>عدد هدايا :</span>
                                <span>{gifts.allGiftsData.total}</span>
                            </div>
                            <div className="mx-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-start justify-items-center mt-10">
                                {gifts.allGiftsData?.data.map((one, i) => (
                                    <SingleGift
                                        key={i}
                                        cover={one.cover}
                                        created_at={one.created_at}
                                        id={one.id}
                                        name={one.name}
                                        price={one.price}
                                        svga={one.svga}
                                        type={one.type}
                                        updated_at={one.updated_at}
                                    />
                                ))}
                            </div>
                            <Pagination
                                total_pages={gifts.allGiftsData.total!}
                                items_per_page={gifts.allGiftsData.per_page!}
                            />
                        </>
                    ) : gifts.allGiftsData?.data.length === 0 ? (
                        <Message>لا يوجد هدايا</Message>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </section>
    );
};

export default Gifts;
