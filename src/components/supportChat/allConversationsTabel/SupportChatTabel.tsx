import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { allConversations } from "../../../store/slices/SupportChatSlice";

// components
import SupportChatTabelHeader from "./SupportChatTabelHeader";
import SupportChatTabelBody from "./SupportChatTabelBody";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import Pagination from "../../ui/pagination/Pagination";

const SupportChatTabel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const supportChat = useSelector((state: RootState) => state.supportChat);

    useEffect(() => {
        dispatch(
            allConversations({
                token: auth.loginData?.access_token!,
                page: page!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    console.log(supportChat.allConversationsData);

    return supportChat.allConversationsLoading ? (
        <Spinner />
    ) : supportChat.allConversationsError ? (
        <Message>{supportChat.allConversationsError}</Message>
    ) : supportChat.allConversationsData?.total ? (
        <>
            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                <span>عدد المحادثات :</span>
                <span>{supportChat.allConversationsData?.total}</span>
            </div>
            <table className='w-full'>
                <SupportChatTabelHeader />
                <SupportChatTabelBody />
            </table>
            <Pagination
                total_pages={supportChat.allConversationsData.total}
                items_per_page={supportChat.allConversationsData.per_page}
            />
        </>
    ) : (
        <div className='mt-5'>
            <Message>لا يوجد رسائل.</Message>
        </div>
    );
};

export default SupportChatTabel;
