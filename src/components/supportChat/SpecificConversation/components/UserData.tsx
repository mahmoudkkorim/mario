import React from "react";
import { Link } from "react-router-dom";

// components
import SpecifcRowDataForSpecifcItem from "../../../utils/SpecifcRowDataForSpecifcItem";

// utils
import ConvertNumberWishK_M from "../../../utils/ConvertNumberWishK_M";

// interfaces
import { User } from "../../../../interfaces/pages/users/Users";

const UserData = () => {
    const userData = localStorage.getItem("chatUser")
        ? (JSON.parse(localStorage.getItem("chatUser")!) as User)
        : null;

    return userData ? (
        <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-10 mt-5'>
            <img
                className='rounded-full w-52 h-52 bg-cover self-center'
                src={userData.profile_picture}
                alt={`${userData.name}_image`}
            />
            <div className='flex flex-col gap-2 mx-3 sm:mx-none'>
                <SpecifcRowDataForSpecifcItem
                    data={userData.uid}
                    text='الرقم التعريفى'
                />
                <SpecifcRowDataForSpecifcItem
                    data={userData.name}
                    text='الاسم'
                />
                <SpecifcRowDataForSpecifcItem
                    data={userData.email}
                    text='الايميل'
                />
                <SpecifcRowDataForSpecifcItem
                    data={userData.phone}
                    text='التليفون'
                />
                <SpecifcRowDataForSpecifcItem
                    data={ConvertNumberWishK_M(userData.money, 1)}
                    text='النقود'
                />
                <SpecifcRowDataForSpecifcItem
                    data={ConvertNumberWishK_M(userData.diamond_balance, 1)}
                    text='رصيد الماس'
                />
                <SpecifcRowDataForSpecifcItem
                    data={ConvertNumberWishK_M(userData.gold_balance, 1)}
                    text='رصيد الذهب'
                />
                <SpecifcRowDataForSpecifcItem
                    data={userData.gender}
                    text='النوع'
                />

                <SpecifcRowDataForSpecifcItem
                    data={
                        <Link
                            className='text-xs sm:text-sm border-b-[1px] hover:-translate-y-1 block duration-200'
                            to={`/members/${userData.id}`}
                        >
                            {`صفحه ${userData.name}`}
                        </Link>
                    }
                    text='صفحه العضو'
                />
            </div>
        </div>
    ) : (
        <></>
    );
};

export default UserData;
