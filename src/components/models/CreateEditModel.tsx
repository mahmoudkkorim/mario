import React from "react";

import { motion, AnimatePresence } from "framer-motion";

// Components
import Button from "../ui/Button";

// interface
import { ConfirmCreateEdit } from "../../interfaces/public";

const CreateEditModel = (props: ConfirmCreateEdit) => {
    const {
        header,
        showCreateEditModel,
        createEditBtnContent,
        type, //edit or create
        element,
        children,
    } = props;

    const createEditHandler = () => {
        props.confirmCreateEditHandler(true);
    };

    const closeHandler = () => {
        props.confirmCreateEditHandler(false);
    };

    return (
        <AnimatePresence>
            {showCreateEditModel && (
                <motion.div
                    className={`${
                        type === "create"
                            ? "border-success/25"
                            : type === "edit"
                            ? "border-stars/25"
                            : "border-darkRed/25"
                    } fixed z-50 bg-grayWhite w-[90vw] p-4 sm:p-8 px-2 sm:px-5 top-[50%] left-[50%] -translate-y-[25%] -translate-x-[50%] border-[1px] rounded-lg`}
                    initial={{
                        opacity: 0,
                        top: "0",
                    }}
                    animate={{
                        opacity: 1,
                        top: "200px",
                    }}
                    exit={{
                        opacity: 0,
                        top: "0",
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                >
                    <h1
                        className={`${
                            type === "create"
                                ? "text-success"
                                : type === "edit"
                                ? "text-stars"
                                : "text-darkRed"
                        } font-semibold border-b-[1px] border-lightBlue w-fit pb-0.5 mb-3`}
                    >
                        {header}
                    </h1>
                    <div className='px-1 sm:px-2 pt-5'>
                        <div className='py-5 hideScrollBar overflow-y-scroll  max-h-80 sm:max-h-[40vh]'>
                            {children}
                            {element && (
                                <>
                                    {" "}
                                    <span className='font-semibold text-stars'>
                                        {element.length > 15
                                            ? element.slice(0, 15) + "..."
                                            : element}
                                    </span>
                                </>
                            )}
                        </div>
                        <span className='flex justify-center gap-2 sm:gap-10 items-center w-full mt-5'>
                            <Button
                                className='px-5 sm:px-10 text-sm sm:text-base'
                                createBtn={type === "create"}
                                editBtn={type === "edit"}
                                deleteBtn={type === "delete"}
                                onClick={createEditHandler}
                            >
                                {createEditBtnContent}
                            </Button>
                            <Button
                                className='px-5 sm:px-10 text-sm sm:text-base'
                                onClick={closeHandler}
                            >
                                ألغاء
                            </Button>
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateEditModel;
