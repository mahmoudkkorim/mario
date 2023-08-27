import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store/store";

// icons
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { IoLogOut } from "react-icons/io5";

// components
import Logout from "../utils/Logout";

// data
import navListHeaderData from "../../data/navListHeaderData";

const Nav = () => {
    const [toggleNavContent, SetToggleNavContent] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { pathname } = useLocation();

    // Redux login state
    const auth = useSelector((state: RootState) => state.auth);

    // in small screens its hide and show nav menu
    const toggleMenuHandler = () => {
        setShowMenu((prevState) => !prevState);
    };

    // make nav with only icons or icons and content
    const toggleNavContentHandler = () => {
        SetToggleNavContent((prevState) => !prevState);
    };

    const closeNavHandler = () => {
        setShowMenu(false);
    };

    return (
        <section className="relative z-40">
            {auth.loginData?.access_token && (
                <div
                    className={
                        !toggleNavContent ? "w-0 sm:w-14" : "w-0 sm:w-52"
                    }
                ></div>
            )}
            <aside
                className={`${!auth.loginData?.access_token && "hidden"} ${
                    toggleNavContent ? "w-fit sm:w-52" : "sm:w-fit"
                } fixed`}
            >
                <span
                    className={`${
                        !showMenu && "bg-lightGray"
                    } fixed top-2 left-2 rounded-full z-20 p-2 flex sm:hidden cursor-pointer`}
                    onClick={toggleMenuHandler}
                >
                    {showMenu ? (
                        <RxCross2 className="text-white scale-150" />
                    ) : (
                        <FiMenu className="text-white scale-150" />
                    )}
                </span>
                <section
                    className={`${
                        !showMenu ? "hidden" : "absolute w-screen"
                    }  bg-[#153854] hideScrollBar overflow-y-auto h-screen z-10 text-white sm:block  w-full ml-5`}
                >
                    <h2 className="flex fixed sm:relative w-full justify-evenly z-10 shadow-lg items-center py-3 h-12 text-center font-bold bg-gradient-to-l from-[#10abaf] to-[#390037] ">
                        <span
                            className={`${
                                !toggleNavContent && "sm:hidden"
                            } capitalize`}
                        >
                            {process.env.REACT_APP_DASHBOARD_NAME} voice chat
                        </span>
                        <span onClick={toggleNavContentHandler}>
                            <MdOutlineKeyboardDoubleArrowLeft
                                className={`${
                                    toggleNavContent && "rotate-180"
                                } hidden sm:inline-block opacity-80 cursor-pointer ease-in duration-150`}
                            />
                        </span>
                    </h2>
                    <span
                        className={`${
                            !toggleNavContent && "sm:hidden"
                        } w-full inline-block py-5 pt-8 mt-10 sm:mt-0 pr-5 text-sm opacity-70`}
                    >
                        لوحه التحكم
                    </span>

                    <nav>
                        <ul className="flex flex-col hideScrollBar overflow-y-auto h-full">
                            {navListHeaderData.map((item) => (
                                <NavLink
                                    onClick={closeNavHandler}
                                    key={item.content}
                                    className={`${
                                        ((pathname.split("/")[1] !== "" &&
                                            item.to.includes(
                                                pathname.split("/")[1]
                                            )) ||
                                            item.to === pathname) &&
                                        "from-[#009ffd] to-[#24357d]"
                                    } hover:from-[#009ffd]/50 h-12  hover:to-[#24357d]/50 duration-300 flex justify-start gap-2 items-center py-2 pr-5 bg-gradient-to-r`}
                                    to={item.to}
                                >
                                    <span>{item.JSXicon}</span>
                                    <span
                                        className={`${
                                            !toggleNavContent && "sm:hidden"
                                        }`}
                                    >
                                        {item.content}
                                    </span>
                                </NavLink>
                            ))}
                            {auth.loginData?.access_token ? (
                                <Logout>
                                    <>
                                        <span>
                                            <IoLogOut />
                                        </span>
                                        <span
                                            className={`${
                                                !toggleNavContent && "sm:hidden"
                                            }`}
                                        >
                                            تسجيل الخروج
                                        </span>
                                    </>
                                </Logout>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </nav>
                </section>
            </aside>
        </section>
    );
};

export default Nav;
