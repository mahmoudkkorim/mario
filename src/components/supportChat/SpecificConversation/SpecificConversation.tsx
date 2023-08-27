import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { userConversation } from "../../../store/slices/SupportChatSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import DeleteConversation from "./manipulation/DeleteConversation";
import SpecificConversationUi from "./components/SpecificConversationUi";
import ConversationData from "./components/ConversationData";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";

const SpecificConversation = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const supportChat = useSelector((state: RootState) => state.supportChat);

    useEffect(() => {
        dispatch(
            userConversation({
                token: auth.loginData?.access_token!,
                user_id: params.id!,
                page: page || 1,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page, params.id]);

    return (
        <>
            {supportChat.userConversationLoading &&
            !supportChat.userConversationData ? (
                <Spinner />
            ) : supportChat.userConversationError ? (
                <Message>{supportChat.userConversationError}</Message>
            ) : supportChat.userConversationData ? (
                <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
                    <PagesHeaders>دعم الدردشه</PagesHeaders>
                    {/* delete conversation */}
                    <div className='flex flex-wrap justify-end gap-3 sm:gap-5 mt-5'>
                        <DeleteConversation />
                    </div>

                    <PagesHeaders
                        small
                    >{`المحادثه رقم ${params.id}`}</PagesHeaders>
                    {/* Conversation Data */}
                    <ConversationData />

                    <SpecificConversationUi />
                </section>
            ) : (
                <div className='mt-5'>
                    <Message>لا يوجد محادثه</Message>
                </div>
            )}
        </>
    );
};

export default SpecificConversation;
