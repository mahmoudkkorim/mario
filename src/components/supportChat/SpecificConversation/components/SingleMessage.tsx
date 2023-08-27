import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { deleteMessage } from "../../../../store/slices/SupportChatSlice";

// component
import Backdrop from "../../../models/Backdrop";
import ConfirmDelete from "../../../models/ConfirmDelete";

// react icons
import { RiDeleteBin6Line } from "react-icons/ri";

// interfaces
import { SingleMessage as SingleMessageI } from "../../../../interfaces/pages/SupportChat";
import { User } from "../../../../interfaces/pages/users/Users";

const SingleMessage = (props: SingleMessageI) => {
    const [hideDeleteModel, setHideDeleteModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState({
        type: false,
        messageId: 0,
    });

    const {
        attachments,
        body,
        created_at,
        id,
        is_sender,
        support_conversation_id,
        updated_at,
    } = props;

    const userData = localStorage.getItem("chatUser")
        ? (JSON.parse(localStorage.getItem("chatUser")!) as User)
        : null;

    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const supportChat = useSelector((state: RootState) => state.supportChat);

    // reset  states
    useEffect(() => {
        if (hideDeleteModel && !supportChat.deleteMessageLoading) {
            setHideDeleteModel(true);
            setShowDeleteModel({ type: false, messageId: 0 });
        }
    }, [hideDeleteModel, supportChat.deleteMessageLoading]);

    // fun => show delete model
    const deleteMessageHandler = (messageId: number) => {
        setShowDeleteModel({ type: true, messageId: +messageId });
    };

    // fun => hide delete model
    const closeDeleteModelHandler = () => {
        setShowDeleteModel({ type: false, messageId: 0 });
    };

    // confirm delete => if the fun return true means delete message, if it false just close the model
    const confirmDeleteHandler = (deleteMessageType: boolean) => {
        if (deleteMessageType) {
            // delete user
            dispatch(
                deleteMessage({
                    message_id: showDeleteModel.messageId.toString(),
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel(true);
        } else {
            // close the model
            closeDeleteModelHandler();
        }
    };

    return (
        <>
            <div
                className={`${
                    is_sender === 0 ? "justify-end" : "justify-start"
                }  group flex items-center gap-3 w-full`}
            >
                {is_sender === 0 && (
                    <span
                        className='cursor-pointer'
                        onClick={deleteMessageHandler.bind(null, id)}
                    >
                        <RiDeleteBin6Line className='text-darkRed opacity-0 group-hover:opacity-100 duration-200' />
                    </span>
                )}

                {userData && is_sender !== 0 ? (
                    <img
                        className='w-5 sm:w-8 h-5 sm:h-8 rounded-full'
                        src={userData.profile_picture}
                        alt={`${userData.name}_image`}
                    />
                ) : (
                    <></>
                )}
                <div className={` w-fit p-2 px-5 max-w-[80%] sm:max-w-[50%]`}>
                    <div className='flex justify-start items-center'>
                        <div className='flex flex-col gap-2'>
                            <>
                                {attachments && attachments?.length > 0 ? (
                                    <div className='flex sm:gap-3 gap-1.5 justify-start items-center flex-wrap'>
                                        {attachments.map((img, i) => (
                                            <img
                                                className='sm:w-14  w-8 sm:h-14 h-8 rounded-md'
                                                key={i}
                                                src={img.path}
                                                alt={`${img.id}_image`}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {body ? (
                                    <p
                                        className={`${
                                            is_sender === 0
                                                ? "from-[#009ffd]/80 to-[#24357d]/80 rounded-br-md"
                                                : "to-lightDark/40 from-lightDark/60 rounded-bl-md"
                                        } bg-gradient-to-r rounded-t-md w-full p-2 px-5 text-sm sm:text-base font-semibold text-white`}
                                    >
                                        {body}
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </div>
            {/* model */}
            {showDeleteModel.type && (
                <Backdrop onClose={closeDeleteModelHandler} />
            )}
            <ConfirmDelete
                deleteBtnContent={
                    supportChat.deleteMessageLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel.type}
                confirmDeleteHandler={confirmDeleteHandler}
                header={"هل انت متاكد من حذف الرساله"}
                element={""}
                text='عند حذفك لهذ الرساله لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفها'
            />
        </>
    );
};

export default SingleMessage;
