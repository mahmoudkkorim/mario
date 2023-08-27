import React, { useState } from "react";

import { ImParagraphRight } from "react-icons/im";
import { MdGraphicEq } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

const PERIOD_OF_DATA = [
    {
        content: "اليوم",
        filter: "today",
    },
    {
        content: "أخر 7 ايام",
        filter: "last 7 days",
    },
    {
        content: "الشهر",
        filter: "month",
    },
    {
        content: "الكل",
        filter: "all",
    },
];

const Main = () => {
    const [currentFiltered, setCurrentFiltered] = useState(PERIOD_OF_DATA[0]);

    // function to toggle the current filterd preiod
    const togglePeriodHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        setCurrentFiltered(JSON.parse(e.currentTarget.id));
    };

    return (
        <section className="px-8 text-white">
            <div className="w-full">
                <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-2 p-5 py-10 rounded-md bg-gradient-to-tl from-[#10abaf] to-[#390037]">
                        <ImParagraphRight className="rotate-90 text-success scale-150" />
                        <span>عدد الغرف النشطه حاليا</span>
                        <span className="font-extrabold text-xl">0</span>
                    </div>
                    <div className="flex flex-col gap-2 p-5 py-10 rounded-md bg-lightBlue">
                        <MdGraphicEq className="scale-150 text-darkRed" />
                        <span>عدد المتحدثين النشطين داخل الغرف</span>
                        <span className="font-extrabold text-xl">0</span>
                    </div>
                    <div className="flex flex-col gap-2 p-5 py-10 rounded-md bg-darkBody">
                        <FaUserPlus className="scale-150 text-lightBlue" />
                        <span>اعضاء {currentFiltered.content}</span>
                        <span className="font-extrabold text-xl">0</span>
                    </div>
                    <div className="flex flex-col gap-2 p-5 py-10 rounded-md bg-stars">
                        <HiUserGroup className="scale-150 text-lightBlue" />
                        <span>جميع الاعضاء</span>
                        <span className="font-extrabold text-xl">0</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap mt-16 gap-3">
                {PERIOD_OF_DATA.map((period) => (
                    <span
                        onClick={togglePeriodHandler}
                        className={`${
                            period.filter === currentFiltered.filter
                                ? "bg-lightBlue"
                                : "bg-smothDark"
                        } cursor-pointer w-fit text-sm p-3 py-1 rounded-md`}
                        id={JSON.stringify(period)}
                        key={period.filter}
                    >
                        {period.content}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Main;
