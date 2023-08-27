import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

// components
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import SingleMessage from "./SingleMessage";
import Pagination from "../../../ui/pagination/Pagination";
import SendMessage from "../manipulation/SendMessage";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

const Chat = () => {
    const supportChat = useSelector((state: RootState) => state.supportChat);

    return supportChat.userConversationLoading &&
        !supportChat.userConversationData ? (
        <Spinner />
    ) : supportChat.userConversationError ? (
        <Message>{supportChat.userConversationError}</Message>
    ) : supportChat.userConversationData ? (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <div className=''>
                <div className='w-[90%] sm:w-[70%] border-[1px] shadow-md border-lightBlue/50 mx-auto rounded-md'>
                    {supportChat.userConversationData.messages.data.length >
                    0 ? (
                        <>
                            <div className='flex flex-col-reverse items-start gap-5 p-[3%] py-[5%] max-h-[80vh] sm:max-h-[60vh] overflow-y-scroll hideScrollBar'>
                                {supportChat.userConversationData.messages.data.map(
                                    (message, i) => (
                                        <div key={i} className='w-full'>
                                            <span className='text-center text-xs font-semibold'>
                                                <CreatedAt
                                                    createdAt={
                                                        message.created_at
                                                    }
                                                />
                                            </span>

                                            <SingleMessage
                                                attachments={
                                                    message.attachments
                                                }
                                                body={message.body}
                                                created_at={message.created_at}
                                                id={message.id}
                                                is_sender={message.is_sender}
                                                support_conversation_id={
                                                    message.support_conversation_id
                                                }
                                                updated_at={message.updated_at}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                            <SendMessage />
                        </>
                    ) : (
                        <div className='mt-5'>
                            <Message>لا يوجد رسائل.</Message>
                        </div>
                    )}
                </div>
            </div>
            {/* paginaton */}
            {supportChat.userConversationData.messages.data.length > 0 ? (
                <Pagination
                    total_pages={
                        supportChat.userConversationData.messages.total
                    }
                    items_per_page={
                        supportChat.userConversationData.messages.per_page
                    }
                />
            ) : (
                <></>
            )}
        </section>
    ) : (
        <div className='mt-5'>
            <Message>لا يوجد رسائل.</Message>
        </div>
    );
};

export default Chat;
