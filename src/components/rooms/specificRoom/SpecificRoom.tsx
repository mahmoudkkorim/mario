import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { specificRoom } from "../../../store/slices/roomsSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import SpecificRoomUi from "./SpecificRoomUi";

const SpecificRoom = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const rooms = useSelector((state: RootState) => state.rooms);
    const { id } = useParams();

    // Efftect => to get the specfic room data from store
    useEffect(() => {
        dispatch(
            specificRoom({ room_id: id!, token: auth.loginData?.access_token! })
        );
    }, [auth.loginData?.access_token, dispatch, id]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>{`خلفيه غرفه ${id}`}</PagesHeaders>

            {rooms.specificRoomLoading ? (
                <Spinner />
            ) : rooms.specificRoomError ? (
                <Message>{rooms.specificRoomError}</Message>
            ) : rooms.specificRoomData ? (
                <SpecificRoomUi
                    created_at={rooms.specificRoomData.created_at}
                    id={rooms.specificRoomData.id}
                    is_free={rooms.specificRoomData.is_free}
                    name={rooms.specificRoomData.name}
                    path={rooms.specificRoomData.path}
                    price={rooms.specificRoomData.price}
                    updated_at={rooms.specificRoomData.updated_at}
                />
            ) : (
                <Message>خلفيه الغرفه غير موجوده</Message>
            )}
        </section>
    );
};

export default SpecificRoom;
