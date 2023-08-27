import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { allRooms } from "../../store/slices/roomsSlice";

// components
import PagesHeaders from "../ui/PagesHeaders";
import Pagination from "../ui/pagination/Pagination";
import Message from "../ui/Message";
import Button from "../ui/Button";
import Spinner from "../ui/spinner/Spinner";
import SingleRoom from "./SingleRoom";
import CreateEditRoom from "./CreateEditRoom";

const Rooms = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const updateRoom = query.get("updateRoom-background");
    const createRoom = query.get("createRoom-background");
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const rooms = useSelector((state: RootState) => state.rooms);

    useEffect(() => {
        dispatch(
            allRooms({ token: auth.loginData?.access_token!, page: page! })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>خلفيات الغرف</PagesHeaders>
            {updateRoom || createRoom ? (
                <CreateEditRoom />
            ) : (
                <>
                    <div className='flex justify-end'>
                        <Button
                            className='bg-success text-white'
                            to='/room-backgrounds?createRoom-background=true'
                            type='link'
                        >
                            إنشاء خلفيه غرفه
                        </Button>
                    </div>
                    {rooms.allRoomsLoading ? (
                        <Spinner />
                    ) : rooms.allRoomsError ? (
                        <Message>{rooms.allRoomsError}</Message>
                    ) : rooms.allRoomsData?.current_page &&
                      rooms.allRoomsData.data.length > 0 ? (
                        <>
                            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                                <span>عدد خلفيات الغرف :</span>
                                <span>{rooms.allRoomsData.total}</span>
                            </div>
                            <div className='mx-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-start justify-items-center mt-10'>
                                {rooms.allRoomsData?.data.map((one, i) => (
                                    <SingleRoom
                                        key={i}
                                        created_at={one.created_at}
                                        id={one.id}
                                        is_free={one.is_free}
                                        name={one.name}
                                        path={one.path}
                                        price={one.price}
                                        updated_at={one.updated_at}
                                    />
                                ))}
                            </div>
                            <Pagination
                                total_pages={rooms.allRoomsData.total!}
                                items_per_page={rooms.allRoomsData.per_page!}
                            />
                        </>
                    ) : rooms.allRoomsData?.data.length === 0 ? (
                        <Message>لا يوجد خلفيات غرف </Message>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </section>
    );
};

export default Rooms;
