import React from "react";
import { Link } from "react-router-dom";

// components
import Button from "./Button";

// interfaces
import { SpecificItem as SpecificItemI } from "../../interfaces/public";

const SpecificItem = (props: SpecificItemI) => {
    const {
        title,
        subTitle,
        children,
        editLink,
        editText,
        StoreItemInLocaStorage,
        deleteText,
        delteItem,
        imgSrc,
        imgAlt,
    } = props;

    const editHandler = () => {
        StoreItemInLocaStorage();
    };

    const deleteHandler = () => {
        delteItem();
    };

    return (
        <div className="flex flex-col-reverse sm:flex-row justify-start items-center sm:items-start">
            <div className="px-3 flex flex-col gap-5 w-full sm:w-[50%] mt-5 sm:mt-16">
                <div className="flex flex-col gap-2">
                    <span className="flex text-xl font-semibold tracking-widest">
                        {title}
                    </span>
                    {subTitle ? (
                        <span className="flex justify-end text-sm opacity-50">
                            {subTitle}
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
                <>{children}</>

                <div className="w-full mt-10 sm:mt-0 flex sm:flex-col justify-center items-center sm:items-start gap-5">
                    <Link
                        onClick={editHandler}
                        className="bg-stars p-1.5 px-5 w-fit rounded-md text-white my-2 hover:bg-stars/80 hover:rounded-sm duration-300"
                        to={editLink}
                    >
                        {editText}
                    </Link>
                    <Button
                        className="py-2 px-5 text-sm font-semibold h-fit"
                        deleteBtn
                        onClick={deleteHandler}
                    >
                        {deleteText}
                    </Button>
                </div>
            </div>
            {imgSrc && (
                <img
                    className="w-full sm:w-[50%] max-h-96 sm:max-h-[80vh] "
                    src={imgSrc}
                    alt={imgAlt}
                />
            )}
        </div>
    );
};

export default SpecificItem;
