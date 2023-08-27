import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { deleteConversation } from "../../../../store/slices/SupportChatSlice";

// components
import Button from "../../../ui/Button";
import Backdrop from "../../../models/Backdrop";
import ConfirmDelete from "../../../models/ConfirmDelete";

// react icons
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteConversation = () => {
    const [hideDeleteModel, setHideDeleteModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState({
        type: false,
        conversationId: 0,
    });

    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();
    const params = useParams();

    const auth = useSelector((state: RootState) => state.auth);
    const supportChat = useSelector((state: RootState) => state.supportChat);

    // reset  states
    useEffect(() => {
        if (hideDeleteModel && supportChat.deleteConversationData) {
            setHideDeleteModel(true);
            setShowDeleteModel({ type: false, conversationId: 0 });
        }
    }, [hideDeleteModel, supportChat.deleteConversationData]);

    // fun => show delete model
    const deleteConversationHandler = () => {
        setShowDeleteModel({
            type: true,
            conversationId: +supportChat.userConversationData?.conversation.id!,
        });
    };

    // fun => hide delete model
    const closeDeleteModelHandler = () => {
        setShowDeleteModel({ type: false, conversationId: 0 });
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
            <Button
                onClick={deleteConversationHandler}
                deleteBtn
                className='text-xs sm:text-sm p-1.5 px-3'
            >
                <>
                    <RiDeleteBin6Line />
                    <span>مسح المحادثه</span>
                </>
            </Button>

            {/* model */}
            {showDeleteModel.type && (
                <Backdrop onClose={closeDeleteModelHandler} />
            )}
            <ConfirmDelete
                deleteBtnContent={
                    supportChat.deleteConversationLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel.type}
                confirmDeleteHandler={confirmDeleteHandler}
                header={"هل انت متاكد من حذف المحادثه"}
                element={""}
                text='عند حذفك لهذ المحادثه لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفها'
            />
        </>
    );
};

export default DeleteConversation;
