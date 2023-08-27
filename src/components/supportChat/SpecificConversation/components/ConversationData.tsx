import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

// components
import SpecifcRowDataForSpecifcItem from "../../../utils/SpecifcRowDataForSpecifcItem";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

const ConversationData = () => {
    const supportChat = useSelector((state: RootState) => state.supportChat);

    return supportChat.userConversationData ? (
        <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-10 mt-5'>
            <div className='flex flex-col gap-2 mx-3 sm:mx-none'>
                <SpecifcRowDataForSpecifcItem
                    data={supportChat.userConversationData.conversation.id}
                    text='الرقم التعريفى'
                />

                <SpecifcRowDataForSpecifcItem
                    data={
                        <CreatedAt
                            createdAt={
                                supportChat.userConversationData.conversation
                                    .created_at
                            }
                        />
                    }
                    text='أنشئت في'
                />
                <SpecifcRowDataForSpecifcItem
                    data={
                        <CreatedAt
                            createdAt={
                                supportChat.userConversationData.conversation
                                    .updated_at
                            }
                        />
                    }
                    text='اخر رساله ارسله فى'
                />
            </div>
        </div>
    ) : (
        <></>
    );
};

export default ConversationData;
