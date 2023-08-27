import React from "react";

// components
import PagesHeaders from "../ui/PagesHeaders";
import SupportChatTabel from "./allConversationsTabel/SupportChatTabel";

const SupportChat = () => {
    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>دعم الدردشه</PagesHeaders>
            <SupportChatTabel />
        </section>
    );
};

export default SupportChat;
