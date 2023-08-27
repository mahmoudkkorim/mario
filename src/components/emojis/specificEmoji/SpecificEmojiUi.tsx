import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteEmoji } from "../../../store/slices/emojisSlice";

// components
import Message from "../../ui/Message";
import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";
import SpecificItem from "../../ui/SpecificItem";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// interfaces
import { SingleEmoji } from "../../../interfaces/pages/emoji";

const SpecificEmojiUi = (props: SingleEmoji) => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const emojis = useSelector((state: RootState) => state.emojis);

    const { body, cover, created_at, id, updated_at } = props;

    useEffect(() => {
        if (hideDeleteModel.type && !emojis.deleteEmojiLoading) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح الايموجى" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, emojis.deleteEmojiLoading]);

    // store background emoji data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeEmojiInLocalStorageHandler = () => {
        localStorage.setItem("emoji", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteEmojiHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete emoji, if it false just close the model
    const confirmDeleteHandler = (type: boolean) => {
        if (type) {
            // delete emoji
            dispatch(
                deleteEmoji({
                    emoji_id: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteEmojiHandler();
        }
    };

    return (
        <>
            {hideDeleteModel.text.length > 0 ? (
                <Message>{hideDeleteModel.text}</Message>
            ) : (
                <SpecificItem
                    title={`إيموجى ${id}`}
                    subTitle={`${id}`}
                    deleteText='حذف الإيموجى'
                    delteItem={deleteEmojiHandler}
                    editText='تعديل الإيموجى'
                    StoreItemInLocaStorage={storeEmojiInLocalStorageHandler}
                    imgSrc={body ? body : cover}
                    imgAlt={`${id}_image`}
                    editLink={`/emojis?updateEmoji=true&id=${params.id}`}
                >
                    <>
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
            {showDeleteModel && <Backdrop onClose={deleteEmojiHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    emojis.deleteEmojiLoading ? "الرجاء الانتظار..." : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={`هل انت متاكد من حذف الإيموجى ذو ارقم `}
                element={`${id}`}
                text='عند حذفك للإيموجى لايمكنك استرجاعه مره اخرى هل انت متاكد من انك تريد حذفه'
            />
        </>
    );
};

export default SpecificEmojiUi;
