import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import {
    blockUser,
    unblockUser,
} from "../../../../../store/slices/users/usersSlice";

// components
import Button from "../../../../ui/Button";
import CreateEditModel from "../../../../models/CreateEditModel";
import Input from "../../../../ui/Input";
import RadioInput from "../../../../ui/RadioInput";
import Backdrop from "../../../../models/Backdrop";

// icons
import { BiBlock } from "react-icons/bi";
import { CgUnblock } from "react-icons/cg";

// data
import { BLOCK_STATE } from "../../../../../data/members";

const BlockUnBlockUser = () => {
    const [showBlockModel, setShowBlockModel] = useState(false);
    const [showBlockWaitMsg, setShowBlockWaitMsg] = useState(false);
    const [showUnBlockWaitMsg, setShowUnBlockWaitMsg] = useState(false);
    const [blockFormdata, setBlockFormdata] = useState({
        type: BLOCK_STATE[0].type,
        date: "",
    });
    const [errorBlockFormdata, setErrorBlockFormdata] = useState({
        ErrorType: "",
        ErrorDate: "",
    });

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    const users = useSelector((state: RootState) => state.users);
    const auth = useSelector((state: RootState) => state.auth);

    // useEffect => check if the user is blocked or unBlocked close the model
    useEffect(() => {
        if (showBlockWaitMsg && !users.blockUserLoading) {
            // remove wait msg
            setShowBlockWaitMsg(false);
            setShowBlockModel(false);
        }
        if (showUnBlockWaitMsg && !users.unblockUserLoading) {
            setShowUnBlockWaitMsg(false);
        }
    }, [
        users.blockUserLoading,
        users.unblockUserLoading,
        showBlockWaitMsg,
        showUnBlockWaitMsg,
    ]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setErrorBlockFormdata({
            ErrorDate: "",
            ErrorType: "",
        });

        if (e.target.type === "radio") {
            setBlockFormdata((prevState) => ({
                ...prevState,
                [e.target.title]: e.target.value,
            }));
        } else {
            setBlockFormdata((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }
    };

    // toggle Block model handler
    const toggleBlockModelHandler = () => {
        setShowBlockModel((prevState) => !prevState);
    };

    const unblockHandler = () => {
        setShowUnBlockWaitMsg(true);
        dispatch(
            unblockUser({
                token: auth.loginData?.access_token!,
                userId: params.id!,
            })
        );
    };

    // confirm block user
    const confirmBlockUser = (type: boolean) => {
        // check to make sure the user if click more than one time the funcion will not run again
        if (showBlockWaitMsg) {
            return;
        }

        // if it true that means block the member, else close the model
        if (type) {
            // if you didn't enter the date make sure to  show error message
            if (
                blockFormdata.type !== BLOCK_STATE[0].type &&
                blockFormdata.date.length === 0
            ) {
                setErrorBlockFormdata({
                    ErrorDate: "الرجاء ادخال مده الحظر",
                    ErrorType: "",
                });
            } else {
                setShowBlockWaitMsg(true);
                let block_until;
                const permenant =
                    blockFormdata.type === BLOCK_STATE[0].type ? 1 : 0;

                // if the block is not permanent make sure to add the date
                if (blockFormdata.type !== BLOCK_STATE[0].type) {
                    block_until = blockFormdata.date;
                }

                dispatch(
                    blockUser({
                        userId: params.id!,
                        token: auth.loginData?.access_token!,
                        formData: { permenant, block_until },
                    })
                );
            }
            return;
        }

        // if type === false just close the model
        toggleBlockModelHandler();
    };

    return (
        <>
            {users.blockUserData && (
                <Button
                    onClick={unblockHandler}
                    createBtn
                    className="text-xs sm:text-sm p-1.5 px-3"
                >
                    <>
                        <CgUnblock />
                        <span>
                            {showUnBlockWaitMsg
                                ? "من فضلك انتظر ..."
                                : "إلغاء الحظر"}
                        </span>
                    </>
                </Button>
            )}
            {users.unblockUserData && (
                <Button
                    onClick={toggleBlockModelHandler}
                    deleteBtn
                    className="text-xs sm:text-sm p-1.5 px-3"
                >
                    <>
                        <BiBlock />
                        <span>حظر</span>
                    </>
                </Button>
            )}
            {users.specificUserData?.deactivated_until &&
                !users.blockUserData &&
                !users.unblockUserData && (
                    <Button
                        onClick={unblockHandler}
                        createBtn
                        className="text-xs sm:text-sm p-1.5 px-3"
                    >
                        <>
                            <CgUnblock />
                            <span>
                                {showUnBlockWaitMsg
                                    ? "من فضلك انتظر ..."
                                    : "إلغاء الحظر"}
                            </span>
                        </>
                    </Button>
                )}
            {!users.specificUserData?.deactivated_until &&
                !users.blockUserData &&
                !users.unblockUserData && (
                    <Button
                        onClick={toggleBlockModelHandler}
                        deleteBtn
                        className="text-xs sm:text-sm p-1.5 px-3"
                    >
                        <>
                            <BiBlock />
                            <span>حظر</span>
                        </>
                    </Button>
                )}

            {/* block Model */}
            {showBlockModel && <Backdrop onClose={toggleBlockModelHandler} />}
            <CreateEditModel
                header="حظر العضو"
                type="delete"
                createEditBtnContent={
                    showBlockWaitMsg ? "من فضلك انتظر ..." : "حظر العضو"
                }
                showCreateEditModel={showBlockModel}
                confirmCreateEditHandler={confirmBlockUser}
            >
                <div className="relative grid sm:grid-cols-2 gap-10">
                    <RadioInput
                        onChange={onChange}
                        title="type"
                        label="نوع الحظر"
                        ckeckedOne={blockFormdata.type}
                        types={BLOCK_STATE}
                        typeError={errorBlockFormdata.ErrorType}
                    />
                    {blockFormdata.type !== BLOCK_STATE[0].type && (
                        <div className="relative">
                            <Input
                                htmlFor="date"
                                id="date"
                                name="date"
                                label="مده الحظر"
                                type="datetime-local"
                                onChange={onChange}
                                placeholder="*ban duration"
                                labelBgColor="bg-gradient-to-b from-grayWhite to-white"
                                value={blockFormdata.date}
                                error={errorBlockFormdata.ErrorDate}
                            />
                            {errorBlockFormdata.ErrorDate.length > 0 && (
                                <span className="absolute h-5 -bottom-6 text-sm text-darkRed">
                                    {errorBlockFormdata.ErrorDate}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </CreateEditModel>
        </>
    );
};

export default BlockUnBlockUser;
