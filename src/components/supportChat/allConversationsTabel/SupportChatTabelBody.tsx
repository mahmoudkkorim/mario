import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteConversation } from "../../../store/slices/SupportChatSlice";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";

// react icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";

const SupportChatTabelBody = () => {
    const [hideDeleteModel, setHideDeleteModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState({
        type: false,
        conversationId: 0,
    });

    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();

    const auth = useSelector((state: RootState) => state.auth);
    const supportChat = useSelector((state: RootState) => state.supportChat);

    // reset  states
    useEffect(() => {
        if (hideDeleteModel && !supportChat.deleteConversationData) {
            setHideDeleteModel(true);
            setShowDeleteModel({ type: false, conversationId: 0 });
        }
    }, [hideDeleteModel, supportChat.deleteConversationData]);

    // fun => show delete model
    const deleteConversationHandler = (conversationId: number) => {
        setShowDeleteModel({ type: true, conversationId: conversationId });
    };

    // fun => hide delete model
    const closeDeleteModelHandler = () => {
        setShowDeleteModel({ type: false, conversationId: 0 });
    };

    // storeUserDataInLocalStorageHandler
    const storeUserDataInLocalStorageHandler = (userData: object) => {
        localStorage.setItem("chatUser", JSON.stringify(userData));
    };

    // confirm delete => if the fun return true means delete conversation, if it false just close the model
    const confirmDeleteHandler = (deleteConversationType: boolean) => {
        if (deleteConversationType) {
            // delete user
            dispatch(
                deleteConversation({
                    conversation_id: showDeleteModel.conversationId.toString(),
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
            {supportChat.allConversationsData?.data &&
            supportChat.allConversationsData?.data.length > 0 ? (
                <tbody className='font-light text-sm'>
                    {supportChat.allConversationsData?.data.map(
                        (conversation, i) => (
                            <tr
                                key={i}
                                className={`border-b-[1px] hover:bg-white/30 border-white`}
                            >
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {i +
                                        1 +
                                        supportChat.allConversationsData
                                            ?.per_page! *
                                            (+supportChat.allConversationsData
                                                ?.current_page! -
                                                1)}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {conversation.id}
                                </td>
                                {/* <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {conversation.last_message.length}
                                </td> */}
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    <img
                                        loading='lazy'
                                        className='rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto'
                                        src={conversation.user.profile_picture}
                                        alt={`${conversation.user.name}_image`}
                                    />
                                </td>

                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base  border-l-[1px] border-r-[1px] border-white'>
                                    {conversation.user.name &&
                                    conversation.user.name.length > 10
                                        ? conversation.user.name.slice(0, 5) +
                                          "..."
                                        : conversation.user.name}
                                </td>

                                <td className='py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white'>
                                    <Button
                                        className='mx-auto text-xs p-1 sm:p-1.5 font-normal sm:text-sm'
                                        deleteBtn
                                        onClick={deleteConversationHandler.bind(
                                            null,
                                            conversation.id
                                        )}
                                    >
                                        <RiDeleteBin5Line />
                                    </Button>
                                </td>
                                <td className=' py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white'>
                                    <Button
                                        onClick={storeUserDataInLocalStorageHandler.bind(
                                            null,
                                            conversation.user
                                        )}
                                        type='link'
                                        className='text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white'
                                        to={`${pathname}/${conversation.user.id}`}
                                    >
                                        <AiOutlineLink />
                                    </Button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            ) : (
                <tbody></tbody>
            )}
            {showDeleteModel.type && (
                <Backdrop onClose={closeDeleteModelHandler} />
            )}
            <tfoot>
                <tr>
                    <td>
                        <ConfirmDelete
                            deleteBtnContent={
                                supportChat.deleteConversationLoading
                                    ? "الرجاء الانتظار..."
                                    : "أحذف"
                            }
                            showDeleteModel={showDeleteModel.type}
                            confirmDeleteHandler={confirmDeleteHandler}
                            header={"هل انت متاكد من حذف المحادئه ذات الرقم"}
                            element={
                                showDeleteModel.conversationId.toString() || ""
                            }
                            text='عند حذفك لهذ المحادئه لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفها'
                        />
                    </td>
                </tr>
            </tfoot>
        </>
    );
};

export default SupportChatTabelBody;
