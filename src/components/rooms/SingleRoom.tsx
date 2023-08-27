import React from "react";

// components
import Button from "../ui/Button";

// icons
import { HiBadgeCheck, HiUserGroup } from "react-icons/hi";
import { IoDiamondSharp } from "react-icons/io5";

// interfaces
import { SingleRoom as SingleRoomI } from "../../interfaces/pages/Rooms";

const SingleRoom = (props: SingleRoomI) => {
    const { created_at, id, is_free, name, path, price, updated_at } = props;

    return (
        <div className='border-[1px] bg-white border-smothDark/10 shadow-md rounded-md pb-5 hover:scale-[1.01] duration-300'>
            <img className='w-80 h-80' src={path} alt={name} />
            <div className='px-3 flex flex-col gap-2'>
                <div className='flex flex-col gap-0'>
                    <span className='flex justify-end text-lg font-semibold tracking-wide'>
                        {name}
                    </span>
                    {/* <span className='flex justify-end text-sm font-light opacity-50'>
                        {id}
                    </span> */}
                </div>
                <div className='flex gap-3'>
                    {price && price > 0 ? (
                        <div className='flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                            <IoDiamondSharp />
                            <span className=''>{price}</span>
                        </div>
                    ) : (
                        <></>
                    )}
                    <span
                        className={`${
                            is_free === 0 ? "bg-success" : "bg-darkRed"
                        } text-white w-fit p-0.5 px-2 rounded-md text-sm font-extrabold hover:scale-95 duration-150`}
                    >
                        {is_free !== 0 ? "غير مجانى" : "مجانى"}
                    </span>
                </div>
                {/* 
                <div className='flex justify-start items-center gap-2'>
                    <HiUserGroup className='text-darkBody w-5 h-5' />
                    <span className='tracking-tighter'>
                        {users_count === 0
                            ? "لا يوجد مستخدمين"
                            : users_count === 1
                            ? "مستخدم واحد"
                            : `${users_count} مستخدمين`}
                    </span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <HiBadgeCheck className='text-success w-5 h-5' />
                    <span className='tracking-tighter'>
                        صالحه لمده {valid_days} يوم
                    </span>
                </div> */}
            </div>
            <div className='flex justify-center mt-10'>
                <Button
                    className='bg-success text-white py-1 pb-1.5'
                    to={`/room-backgrounds/${id}`}
                    type='link'
                >
                    عرض
                </Button>
            </div>
        </div>
    );
};

export default SingleRoom;
