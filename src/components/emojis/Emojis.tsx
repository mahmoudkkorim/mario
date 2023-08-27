import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { allEmojis } from "../../store/slices/emojisSlice";

// components
import PagesHeaders from "../ui/PagesHeaders";
import Pagination from "../ui/pagination/Pagination";
import Message from "../ui/Message";
import Button from "../ui/Button";
import Spinner from "../ui/spinner/Spinner";
import CreateEditEmoji from "./CreateEditEmoji";
import SingleEmoji from "./SingleEmoji";

const Emojis = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const updateEmoji = query.get("updateEmoji");
    const createEmoji = query.get("createEmoji");
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const emojis = useSelector((state: RootState) => state.emojis);

    useEffect(() => {
        dispatch(
            allEmojis({ token: auth.loginData?.access_token!, page: page! })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>التعبيرات (الايموجى)</PagesHeaders>
            {updateEmoji || createEmoji ? (
                <CreateEditEmoji />
            ) : (
                <>
                    <div className='flex justify-end'>
                        <Button
                            className='bg-success text-white'
                            to='/emojis?createEmoji=true'
                            type='link'
                        >
                            إنشاء ايموجى
                        </Button>
                    </div>
                    {emojis.allEmojisLoading ? (
                        <Spinner />
                    ) : emojis.allEmojisError ? (
                        <Message>{emojis.allEmojisError}</Message>
                    ) : emojis.allEmojisData?.current_page &&
                      emojis.allEmojisData.data.length > 0 ? (
                        <>
                            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                                <span>عدد التعبيرات (الايموجى) :</span>
                                <span>{emojis.allEmojisData.total}</span>
                            </div>
                            <div className='mx-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-start justify-items-center mt-10'>
                                {emojis.allEmojisData?.data.map((one, i) => (
                                    <SingleEmoji
                                        key={i}
                                        body={one.body}
                                        cover={one.cover}
                                        created_at={one.created_at}
                                        id={one.id}
                                        updated_at={one.updated_at}
                                    />
                                ))}
                            </div>
                            <Pagination
                                total_pages={emojis.allEmojisData.total!}
                                items_per_page={emojis.allEmojisData.per_page!}
                            />
                        </>
                    ) : emojis.allEmojisData?.data.length === 0 ? (
                        <Message>لا يوجد تعبيرات (إيموجى) </Message>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </section>
    );
};

export default Emojis;
