import React from "react";

// interfaces
import { SingleDiamond as SingleDiamondI } from "../../interfaces/pages/diamond";

// components
import Button from "../ui/Button";

// icons
import { IoDiamondSharp } from "react-icons/io5";

const SingleDiamond = (props: SingleDiamondI) => {
    const { cover, created_at, id, price, quantity, updated_at } = props;
    return (
        <div className="border-[1px] bg-white border-smothDark/10 shadow-md rounded-md pb-5 hover:scale-[1.01] duration-300">
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
                <div className="flex gap-3">
                    {price > 0 ? (
                        <div className="flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                            <span className="capitalize">
                                <IoDiamondSharp />
                            </span>
                            <span className="">{price}</span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-success p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                        <span className="">{quantity}</span>
                        <span className="capitalize">quantity</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <Button
                    className="bg-success text-white py-1 pb-1.5"
                    to={`/diamond/${id}`}
                    type="link"
                >
                    عرض
                </Button>
            </div>
        </div>
    );
};

export default SingleDiamond;
