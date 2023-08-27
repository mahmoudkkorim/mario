import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    changeUserLevel,
    resetChargeUserLevelDataError,
} from "../../../../store/slices/levelsSlice";

// components
import Button from "../../../ui/Button";
import Backdrop from "../../../models/Backdrop";
import SearchInputByUId from "../../../ui/SearchInputByUId";
import Input from "../../../ui/Input";
import CreateEditModel from "../../../models/CreateEditModel";

// icons
import { MdOutlineModeEdit } from "react-icons/md";

const ChangeUserLevel = () => {
    const [showChargeModel, setShowChargeModel] = useState(false);
    const [hideModel, setHideModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [formData, setFormData] = useState({
        level_id: "",
        user_id: "",
        user_uid: "",
    });
    const [formDataError, setFormDataError] = useState({
        level_idError: "",
        user_idError: "",
    });

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const levels = useSelector((state: RootState) => state.levels);

    // make sure to put the level id in form when route changes
    useEffect(() => {
        setFormData((prevState) => ({ ...prevState, level_id: params.id! }));
    }, [params.id]);

    // useEffect => check if process of charge done the button message and hide the model
    useEffect(() => {
        if (showWaitMsg && !levels.changeUserLevelLoading) {
            // remove wait msg in the button of create
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [levels.changeUserLevelLoading, showWaitMsg]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setFormData({ level_id: "", user_id: "", user_uid: "" });
            setShowChargeModel(false);
            setHideModel(false);
            // reset data and error of rollback and charge diamond => to not render again when rollback and charge new diamond
            dispatch(resetChargeUserLevelDataError());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // reset errors
        setFormDataError({
            level_idError: "",
            user_idError: "",
        });

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // bearor is transfare id to parent element
    const bearorIdHandler = (id: number, uid: string) => {
        setFormData((prevState) => ({
            ...prevState,
            user_id: id.toString(),
            user_uid: uid,
        }));
    };

    // open and close the model of charge user level
    const toggleChangeUserLeveModel = () => {
        setShowChargeModel((prevState) => !prevState);
    };

    // confirm charge user level
    const confirmChargeUserLevel = (type: boolean) => {
        // make sure when charge user level not send any requests to server again
        if (showWaitMsg) {
            return;
        }

        // show message alert to user that the input is empty
        if (!formData.level_id) {
            setFormDataError((prevState) => ({
                ...prevState,
                amountError: "الرجاء ملئ حقل المستوى",
            }));
            return;
        } else if (!formData.user_id) {
            setFormDataError((prevState) => ({
                ...prevState,
                user_idError: "الرجاء اختيار الرقم التعرفى من الصندوق",
            }));
            return;
        }

        const SubmitedFormDate = new FormData();
        SubmitedFormDate.append("level_id", formData.level_id);
        SubmitedFormDate.append("user_id", formData.user_id.toString());

        if (type) {
            // charge use level
            setShowWaitMsg(true);
            dispatch(
                changeUserLevel({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );

            return;
        }

        // if type is false just close the modle
        toggleChangeUserLeveModel();
    };

    return (
        <>
            <Button
                onClick={toggleChangeUserLeveModel}
                createBtn
                className='text-xs sm:text-sm p-1.5 px-3 bg-grayWhite'
            >
                <>
                    <MdOutlineModeEdit />
                    <span>شحن مستوى العضو</span>
                </>
            </Button>

            {/* change user level */}
            {showChargeModel && (
                <Backdrop onClose={toggleChangeUserLeveModel} />
            )}
            <CreateEditModel
                header='عمليه شحن المستوى'
                type='edit'
                createEditBtnContent={
                    showWaitMsg ? "من فضلك انتظر ..." : "شحن مستوى العضو"
                }
                showCreateEditModel={showChargeModel}
                confirmCreateEditHandler={confirmChargeUserLevel}
            >
                <div className='grid sm:grid-cols-2 gap-10'>
                    <Input
                        htmlFor='level_id'
                        id='level_id'
                        label='المستوى المراد اعطائه للعضو'
                        name='level_id'
                        onChange={onChange}
                        value={formData.level_id}
                        placeholder='*Level Id'
                        required
                        type='text'
                        readOnly
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.level_idError}
                    />
                    <div className='relative'>
                        <SearchInputByUId
                            htmlFor='user_uid'
                            id='user_uid'
                            label='الرقم التعريفى للعضو'
                            name='user_uid'
                            onChange={onChange}
                            bearorIdFun={bearorIdHandler}
                            value={formData.user_uid}
                            title={formData.user_id}
                            placeholder='*User Id'
                            required
                            type='number'
                            // readOnly={processType === "edit" ? true : false}
                            labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                            error={formDataError.user_idError}
                        />
                    </div>
                    <div className='sm:col-span-2'>
                        {(levels.changeUserLevelData ||
                            levels.changeUserLevelError) && (
                            <span
                                className={`${
                                    levels.changeUserLevelData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!levels.changeUserLevelError
                                    ? levels.changeUserLevelData?.msg ||
                                      "لقد تم إعطاء المستوى للعضو"
                                    : levels.changeUserLevelError ||
                                      "فشل إعطاء المستوى للعضو"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default ChangeUserLevel;
