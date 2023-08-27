import React from "react";

import { SingleBanner as SingleBannerI } from "../../interfaces/pages/banners";

// components
import Button from "../ui/Button";

// helpers
import CreatedAt from "../helpers/CreatedAt";

const SingleBanner = (props: SingleBannerI) => {
    const {
        cover,
        created_at,
        id,
        related_to_id,
        related_to_type,
        updated_at,
        valid_to,
    } = props;
    return (
        <div className="border-[1px] bg-white border-smothDark/10 shadow-md overflow-hidden rounded-md pb-5 hover:scale-[1.01] duration-300">
            <img className="w-80 h-80" src={cover} alt={`${id}_image`} />
            <div className="px-3 flex flex-col gap-2">
                {/* <div className="flex flex-col gap-0">
                    <span className="flex text-lg font-semibold tracking-wide">
                        {id}
                    </span>
                    <span className="flex text-sm font-light opacity-50">
                        {id}
                    </span>
                </div> */}
                <div className="flex gap-3 mt-5">
                    <div className="flex bg-darkRed p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                        <span className="capitalize">تنتهى صلاحيته فى</span>
                        <span className="">
                            <CreatedAt createdAt={valid_to} />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    {created_at && (
                        <div className="flex bg-success p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                            <span className="capitalize">انشئ فى</span>
                            <span className="">
                                <CreatedAt createdAt={created_at} />
                            </span>
                        </div>
                    )}
                    {updated_at && created_at !== updated_at && (
                        <div className="flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                            <span className="capitalize">تم التحديث في</span>
                            <span className="">
                                <CreatedAt createdAt={updated_at} />
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <Button
                    className="bg-success text-white py-1 pb-1.5"
                    to={`/banners/${id}`}
                    type="link"
                >
                    عرض
                </Button>
            </div>
        </div>
    );
};

export default SingleBanner;
