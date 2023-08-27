import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    createSpecialUid,
    editSpecialUid,
    resetCreateEditSpecialUidDataError,
} from "../../../store/slices/specialUidsSlice";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import CreateEditModel from "../../models/CreateEditModel";
import Input from "../../ui/Input";

// icons
import { CiEdit } from "react-icons/ci";
import { MdOutlineCreate } from "react-icons/md";

const CreateEditSpecialUid = () => {
    const [processType, setProcessType] = useState("create");
    const [showModel, setShowModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [hideModel, setHideModel] = useState(false);
    const [formData, setFormData] = useState({
        body: "",
        price: "",
    });
    const [formDataError, setFormDataError] = useState({
        bodyError: "",
        priceError: "",
    });

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const auth = useSelector((state: RootState) => state.auth);
    const specialUids = useSelector((state: RootState) => state.specialUids);

    // render data on inputs from specfic agency data that come from the backend
    useEffect(() => {
        if (processType === "create") return;

        setFormData({
            body: specialUids.specificSpecialUidData?.body || "",
            price: specialUids.specificSpecialUidData?.price.toString() || "",
        });
    }, [specialUids.specificSpecialUidData, processType, showModel]);

    // useEffect => check if specialUid is created and remove the button message and hide the model
    useEffect(() => {
        if (
            processType === "create" &&
            showWaitMsg &&
            !specialUids.createSpecialUidLoading
        ) {
            // remove wait msg in the button of create
            setShowWaitMsg(false);
            setHideModel(true);
        }

        if (
            processType === "edit" &&
            showWaitMsg &&
            !specialUids.editSpecialUidLoading
        ) {
            // remove wait msg in the button of udpate
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [
        specialUids.createSpecialUidLoading,
        specialUids.editSpecialUidLoading,
        processType,
        showWaitMsg,
    ]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setFormData({
                body: "",
                price: "",
            });
            setShowModel(false);
            setHideModel(false);
            // reset data and error of create specialUid => to not render again when create new specialUid
            dispatch(resetCreateEditSpecialUidDataError());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    // show and hide backdrop and createEditModel
    const toggleModelHandler = () => {
        setShowModel((prevState) => !prevState);
    };

    // show createModel
    const showCreateModel = () => {
        setProcessType("create");
        toggleModelHandler();
    };

    // show createModel
    const showEditModel = () => {
        setProcessType("edit");
        toggleModelHandler();
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // reset errors
        setFormDataError({
            bodyError: "",
            priceError: "",
        });

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // createEditModel response => if it true means create Edit specialUid, if false just close model
    const confirmCreateEditHandler = (confirm: boolean) => {
        // check to make sure the user if click more than one time the funcion will not run again
        if (showWaitMsg) {
            return;
        }

        if (confirm) {
            // show message alert the user that the input is empty
            if (!formData.body && formData.body.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    bodyError: "الرجاء ملئ حقل الجسم (الرقم المميز)",
                }));
                return;
            } else if (!formData.price || formData.price.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    priceError: "الرجاء ملئ حقل السعر",
                }));
                return;
            }

            const SubmitedFormDate = new FormData();

            // create hosting agency
            if (processType === "create") {
                SubmitedFormDate.append("body", formData.body);
                SubmitedFormDate.append("price", `${+formData.price}`);

                setShowWaitMsg(true);
                dispatch(
                    createSpecialUid({
                        token: auth.loginData?.access_token!,
                        formData: SubmitedFormDate,
                    })
                );
            }

            // edit hosting agency
            if (processType === "edit") {
                SubmitedFormDate.append("body", formData.body);
                SubmitedFormDate.append("price", `${+formData.price}`);

                setShowWaitMsg(true);
                dispatch(
                    editSpecialUid({
                        token: auth.loginData?.access_token!,
                        formData: SubmitedFormDate,
                        specialUid_id: specialUids.specificSpecialUidData?.id!,
                    })
                );
            }

            return;
        }

        // if type is false just close the modle
        toggleModelHandler();
    };

    return (
        <>
            <div className='flex flex-wrap justify-end gap-3 sm:gap-5'>
                <Button
                    onClick={showCreateModel}
                    createBtn
                    className='text-xs sm:text-sm p-1.5 px-3'
                >
                    <>
                        <MdOutlineCreate />
                        <span>إنشاء رقم مميز</span>
                    </>
                </Button>
                {specialUids.specificSpecialUidData?.id && params.id && (
                    <Button
                        onClick={showEditModel}
                        editBtn
                        className='text-xs sm:text-sm p-1.5 px-3'
                    >
                        <>
                            <CiEdit />
                            <span>تعديل رقم مميز</span>
                        </>
                    </Button>
                )}
            </div>

            {/* Model */}
            {showModel && <Backdrop onClose={toggleModelHandler} />}
            <CreateEditModel
                header={
                    processType === "create"
                        ? "إنشاء رقم مميز جديد"
                        : `تعديل الرقم الممي ${specialUids.specificSpecialUidData?.body}`
                }
                type={processType === "create" ? "create" : "edit"}
                createEditBtnContent={
                    showWaitMsg
                        ? "من فضلك انتظر ..."
                        : processType === "create"
                        ? "إنشاء رقم مميز"
                        : "تعديل الرقم المميز"
                }
                showCreateEditModel={showModel}
                confirmCreateEditHandler={confirmCreateEditHandler}
            >
                <div className='grid sm:grid-cols-2 gap-10'>
                    <Input
                        htmlFor='body'
                        id='body'
                        label='الرقم المميز'
                        name='body'
                        onChange={onChange}
                        value={formData.body}
                        placeholder='*Body (special user id)'
                        required
                        type='text'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.bodyError}
                    />
                    <Input
                        htmlFor='price'
                        id='price'
                        label='سعر الرقم المميز'
                        name='price'
                        onChange={onChange}
                        value={formData.price}
                        placeholder='*Price'
                        required
                        type='number'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.priceError}
                    />

                    <div className='sm:col-span-2'>
                        {(specialUids.createSpecialUidData ||
                            specialUids.createSpecialUidError) && (
                            <span
                                className={`${
                                    specialUids.createSpecialUidData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!specialUids.createSpecialUidError
                                    ? specialUids.createSpecialUidData?.msg ||
                                      "لقد تم إنشاء الرقم المميز"
                                    : specialUids.createSpecialUidError.msg ||
                                      "فشل إنشاء الرقم المميز"}
                            </span>
                        )}

                        {(specialUids.editSpecialUidData ||
                            specialUids.editSpecialUidError) && (
                            <span
                                className={`${
                                    specialUids.editSpecialUidData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!specialUids.editSpecialUidError
                                    ? specialUids.editSpecialUidData.msg ||
                                      "لقد تم تعديل الرقم المميز"
                                    : specialUids.editSpecialUidError.msg ||
                                      "فشل تعديل الرقم المميز"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default CreateEditSpecialUid;
