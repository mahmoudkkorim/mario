import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { deleteVideoGiftsGenre } from "../../../../store/slices/gifts/videoGiftsGenresSlice";

// components
import Button from "../../../ui/Button";
import Backdrop from "../../../models/Backdrop";
import ConfirmDelete from "../../../models/ConfirmDelete";

// icons
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteVideoGiftsGenre = () => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    const auth = useSelector((state: RootState) => state.auth);
    const videoGiftsGenres = useSelector(
        (state: RootState) => state.videoGiftsGenres
    );

    // useEffect => check if the user is deleted close the model
    useEffect(() => {
        if (!videoGiftsGenres.deleteVideoGiftsGenreLoading) {
            setShowDeleteModel(false);
        }
    }, [videoGiftsGenres.deleteVideoGiftsGenreLoading]);

    const toggleDeleteModelHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete video gift genre handler
    const confirmDeleteHandler = (type: boolean) => {
        // if server is loading delete video gift genre make sure not send any more requests
        if (videoGiftsGenres.deleteVideoGiftsGenreLoading) {
            return;
        }

        if (type) {
            dispatch(
                deleteVideoGiftsGenre({
                    token: auth.loginData?.access_token!,
                    gift_id: params.id!,
                })
            );
            return;
        }

        // if type is false means close the model
        toggleDeleteModelHandler();
    };

    return (
        <>
            {videoGiftsGenres.specficVideoGiftsGenreData?.name && (
                <Button
                    onClick={toggleDeleteModelHandler}
                    deleteBtn
                    className='text-xs sm:text-sm p-1.5 px-3'
                >
                    <>
                        <RiDeleteBin6Line />
                        <span>مسح نوع هديه الفيديو</span>
                    </>
                </Button>
            )}
            {showDeleteModel && <Backdrop onClose={toggleDeleteModelHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    videoGiftsGenres.deleteVideoGiftsGenreLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={
                    videoGiftsGenres.specficVideoGiftsGenreData?.name
                        ? "هل انت متاكد من حذف نوع هديه الفيديو ذات اسم"
                        : "هل انت متاكد من حذف نوع هديه الفيديو ذات الرقم"
                }
                element={
                    videoGiftsGenres.specficVideoGiftsGenreData?.name ||
                    videoGiftsGenres.specficVideoGiftsGenreData?.id.toString() ||
                    ""
                }
                text='عند حذفك لهذ النوع من انواع هدايا الفيديو لايمكنك استرجاعه مره اخرى هل انت متاكد من انك تريد حذفه'
            />
        </>
    );
};

export default DeleteVideoGiftsGenre;
