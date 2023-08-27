import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// interfaces
import { SingleVideoGift } from "../../../../interfaces/pages/gifts/videoGifts";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { deleteVideoGift } from "../../../../store/slices/gifts/videoGiftsSlice";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

// components
import Message from "../../../ui/Message";
import ConfirmDelete from "../../../models/ConfirmDelete";
import Backdrop from "../../../models/Backdrop";
import SpecificItem from "../../../ui/SpecificItem";

const SpecificVideoGiftUi = (props: SingleVideoGift) => {
    const {
        cover,
        created_at,
        id,
        name,
        price,
        svga,
        type,
        updated_at,
        related_gift_ids,
        required_sending_counter,
        sending_counter,
        surprise_gift_id,
        video_gift_genere_id,
    } = props;

    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const videoGifts = useSelector((state: RootState) => state.videoGifts);

    useEffect(() => {
        if (hideDeleteModel.type && !videoGifts.deleteVideoGiftData) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح هديه الفيديو" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, videoGifts.deleteVideoGiftData]);

    // store video gift data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeVideoGiftInLocalStorageHandler = () => {
        localStorage.setItem("videoGift", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteVideoGiftHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete video gift, if it false just close the model
    const confirmDeleteHandler = (deleteDesign: boolean) => {
        if (deleteDesign) {
            // delete video gift
            dispatch(
                deleteVideoGift({
                    gift_id: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteVideoGiftHandler();
        }
    };

    return (
        <>
            {hideDeleteModel.text.length > 0 ? (
                <Message>{hideDeleteModel.text}</Message>
            ) : (
                <SpecificItem
                    title={name}
                    subTitle={type ? "" : ""}
                    deleteText='حذف الهديه'
                    delteItem={deleteVideoGiftHandler}
                    editText='تعديل الهديه'
                    StoreItemInLocaStorage={storeVideoGiftInLocalStorageHandler}
                    imgSrc={cover}
                    imgAlt={name}
                    editLink={`/videoGifts?updateVideoGift=true&id=${params.id}`}
                >
                    <>
                        <div className='flex gap-5 flex-col-reverse'>
                            {price > 0 ? (
                                <div className='flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                    <span className='capitalize'>diamond</span>
                                    <span className=''>{price}</span>
                                </div>
                            ) : (
                                <></>
                            )}
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
            {showDeleteModel && <Backdrop onClose={deleteVideoGiftHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    videoGifts.deleteVideoGiftLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={`هل انت متاكد من حذف`}
                element={name}
                text='عند حذفك لهذه الهديه لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفه'
            />
        </>
    );
};

export default SpecificVideoGiftUi;
