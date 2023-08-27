import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { RiDeleteBinLine } from "react-icons/ri";

import Button from "../ui/Button";

import { ConfirmDeleteInterface } from "../../interfaces/public";

const ConfirmDelete = (props: ConfirmDeleteInterface): JSX.Element => {
    const {
        header,
        text,
        element,
        showDeleteModel,
        loading,
        deleteBtnContent,
    } = props;

    const deleteHandler = () => {
        props.confirmDeleteHandler(true);
    };

    const closeHandler = () => {
        props.confirmDeleteHandler(false);
    };

    return (
        <AnimatePresence>
            {showDeleteModel && (
                <motion.div
                    className="fixed z-50 border-darkRed/25 bg-grayWhite w-72 sm:w-96 p-4 sm:p-8 px-2 sm:px-5 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] border-[1px] rounded-lg"
                    initial={{
                        opacity: 0,
                        top: "0",
                    }}
                    animate={{
                        opacity: 1,
                        top: "300px",
                    }}
                    exit={{
                        opacity: 0,
                        top: "0",
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                >
                    <h1 className="pb-3">
                        {header}{" "}
                        <span className="font-semibold text-darkRed">
                            {element.length > 15
                                ? element.slice(0, 15) + "..."
                                : element}
                        </span>
                    </h1>
                    <div className="px-1 sm:px-2 pt-5">
                        <p className="opacity-50 text-sm">{text}</p>
                        <div className="flex justify-center gap-2 items-center w-full mt-5">
                            <Button
                                className="flex-1 text-sm sm:text-base"
                                deleteBtn={true}
                                onClick={deleteHandler}
                            >
                                {deleteBtnContent}
                            </Button>
                            <Button
                                className="flex-1 text-sm sm:text-base"
                                onClick={closeHandler}
                            >
                                ألغاء
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDelete;
