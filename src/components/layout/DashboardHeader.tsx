import React from "react";

import { IoNotifications } from "react-icons/io5";

const DashboardHeader = () => {
    return (
        <header className="py-4 flex flex-col gap-5 bg-white pr-8">
            <h2 className="flex items-center gap-3">
                <span className="font-bold text-sm tracking-tight">
                    {process.env.REACT_APP_DASHBOARD_NAME} administrator
                </span>
                <IoNotifications className="opacity-60 scale-75" />
            </h2>
            <span className="font-extrabold text-lg">لوحه التحكم</span>
        </header>
    );
};

export default DashboardHeader;
