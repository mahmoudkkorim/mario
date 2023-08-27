import React from "react";

// components
import PagesHeaders from "../../../ui/PagesHeaders";
import UserData from "./UserData";
import Chat from "./Chat";

// interfaces
import { User } from "../../../../interfaces/pages/users/Users";

const SpecificConversationUi = () => {
    const userData = localStorage.getItem("chatUser")
        ? (JSON.parse(localStorage.getItem("chatUser")!) as User)
        : null;

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            {userData && (
                <>
                    <PagesHeaders small>معلومات عن العضو</PagesHeaders>
                    {/* userData */}
                    <UserData />

                    <PagesHeaders small>المحادثه</PagesHeaders>
                    <Chat />
                </>
            )}
        </section>
    );
};

export default SpecificConversationUi;
