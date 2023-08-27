import React from "react";

import { SingleVideoGift as SingleVideoGiftI } from "../../../interfaces/pages/gifts/videoGifts";

// icons
import { HiBadgeCheck, HiUserGroup } from "react-icons/hi";
import { IoDiamondSharp } from "react-icons/io5";

// components
import Button from "../../ui/Button";

const SingleVideoGift = (props: any) => {
    const {
        cover,
        created_at,
        id,
        name,
        price,
        related_gift_ids,
        required_sending_counter,
        sending_counter,
        surprise_gift_id,
        svga,
        type,
        updated_at,
        video_gift_genere_id,
    } = props;

    return (
        <div className='border-[1px] bg-white border-smothDark/10 shadow-md rounded-md pb-5 hover:scale-[1.01] duration-300'>
            <img className='w-80 h-80' src={cover} alt={name} />
            <div className='px-3 flex flex-col gap-2'>
                <div className='flex flex-col gap-0'>
                    <span className='text-lg font-semibold tracking-wide'>
                        {name}
                    </span>
                    <span className='text-sm font-light opacity-50'>
                        {type === 0
                            ? "هديه عاديه"
                            : type === 1
                            ? "هديه صناديق"
                            : "هديه تضاعف"}
                    </span>
                </div>
                <div className='flex gap-3'>
                    {price > 0 ? (
                        <div className='flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                            <IoDiamondSharp />
                            <span className=''>{price}</span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                {/* <div className='flex justify-start items-center gap-2'>
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
            <div className='flex justify-center mt-5'>
                <Button
                    className='bg-success text-white py-1 pb-1.5'
                    to={`/videoGifts/${id}`}
                    type='link'
                >
                    عرض
                </Button>
            </div>
        </div>
    );
};

export default SingleVideoGift;
