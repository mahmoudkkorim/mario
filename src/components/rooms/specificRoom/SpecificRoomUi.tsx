import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteRoom } from "../../../store/slices/roomsSlice";

// components
import Message from "../../ui/Message";
import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";
import SpecificItem from "../../ui/SpecificItem";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// icons
import { IoDiamondSharp } from "react-icons/io5";

// interfaces
import { SingleRoom } from "../../../interfaces/pages/Rooms";

const SpecificRoomUi = (props: SingleRoom) => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const { created_at, id, is_free, name, path, price, updated_at } = props;

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const rooms = useSelector((state: RootState) => state.rooms);

    useEffect(() => {
        if (hideDeleteModel.type && !rooms.deleteRoomLoading) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح خلفيه الغرفه" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, rooms.deleteRoomLoading]);

    // store background room data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeRoomsInLocalStorageHandler = () => {
        localStorage.setItem("rooms", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteRoomHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete background room, if it false just close the model
    const confirmDeleteHandler = (deleteDesign: boolean) => {
        if (deleteDesign) {
            // delete gift
            dispatch(
                deleteRoom({
                    room_id: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteRoomHandler();
        }
    };

    return (
        <>
            {hideDeleteModel.text.length > 0 ? (
                <Message>{hideDeleteModel.text}</Message>
            ) : (
                <SpecificItem
                    title={name}
                    subTitle={""}
                    deleteText='حذف خلفيه الغرفه'
                    delteItem={deleteRoomHandler}
                    editText='تعديل خلفيه الغرفه'
                    StoreItemInLocaStorage={storeRoomsInLocalStorageHandler}
                    imgSrc={path}
                    imgAlt={name}
                    editLink={`/room-backgrounds?updateRoom-background=true&id=${params.id}`}
                >
                    <>
                        <div className='flex gap-5 flex-col-reverse'>
                            {price && price > 0 ? (
                                <div className='flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                    <IoDiamondSharp />
                                    <span className=''>{price}</span>
                                </div>
                            ) : (
                                <></>
                            )}
                            <span
                                className={`${
                                    is_free === 0 ? "bg-success" : "bg-darkRed"
                                } text-white w-fit p-0.5 px-2 rounded-md text-sm font-extrabold hover:scale-95 duration-150`}
                            >
                                {is_free !== 0 ? "غير مجانى" : "مجانى"}
                            </span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span>تم إنشاؤه في</span>
                            <span className='tracking-tighter'>
                                <CreatedAt createdAt={created_at} />
                            </span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span>تم تعديله في</span>
                            <span className='tracking-tighter'>
                                <CreatedAt createdAt={updated_at} />
                            </span>
                        </div>
                    </>
                </SpecificItem>
            )}
            {showDeleteModel && <Backdrop onClose={deleteRoomHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    rooms.deleteRoomLoading ? "الرجاء الانتظار..." : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={`هل انت متاكد من حذف خلفيه الغرفه ذات الاسم `}
                element={name}
                text='عند حذفك لخلفيه الغرفه لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفها'
            />
        </>
    );
};

export default SpecificRoomUi;
