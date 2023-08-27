import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    giveSpecialUidToUser,
    resetGiveSpecialUidToUserDataError,
} from "../../../store/slices/specialUidsSlice";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import CreateEditModel from "../../models/CreateEditModel";
import SearchInputByUId from "../../ui/SearchInputByUId";

// icons
import { MdOutlineAddCircleOutline } from "react-icons/md";

const GiveSpecialUidToUser = () => {
    const [showModel, setShowModel] = useState(false);
    const [hideModel, setHideModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [formData, setFormData] = useState({
        specialUid_id: "",
        user_id: "",
        user_uid: "",
    });
    const [formDataError, setFormDataError] = useState({
        user_idError: "",
    });

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const specialUids = useSelector((state: RootState) => state.specialUids);

    // useEffect => check if process is done the button message and hide the model
    useEffect(() => {
        if (showWaitMsg && !specialUids.giveSpecialUidToUserLoading) {
            // remove wait msg in the button
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [specialUids.giveSpecialUidToUserLoading, showWaitMsg]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setFormData({ specialUid_id: "", user_id: "", user_uid: "" });
            setShowModel(false);
            setHideModel(false);
            // reset data and error of give specialUid to user => to not render again when make this process
            dispatch(resetGiveSpecialUidToUserDataError());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // reset errors
        setFormDataError({
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

    const toggleModel = () => {
        setShowModel((prevState) => !prevState);
    };

    const confirmGiveSepcialUidToUser = (confirm: boolean) => {
        // make sure not give it to user twice
        if (specialUids.giveSpecialUidToUserLoading) {
            return;
        }

        // show message alert to user that the input is empty
        if (!formData.user_id) {
            setFormDataError((prevState) => ({
                ...prevState,
                user_idError: "الرجاء اختيار الرقم التعرفى من الصندوق",
            }));
            return;
        }

        if (confirm) {
            const SubmitedFormDate = new FormData();
            SubmitedFormDate.append("user_id", formData.user_id.toString());
            setShowWaitMsg(true);
            dispatch(
                giveSpecialUidToUser({
                    token: auth.loginData?.access_token!,
                    specialUid_id: params.id!,
                    formData: SubmitedFormDate,
                })
            );

            return;
        }

        // if type is false just close the modle
        toggleModel();
    };

    return (
        <>
            {!specialUids.specificSpecialUidData?.user && (
                <Button
                    onClick={toggleModel}
                    createBtn
                    className='text-xs sm:text-sm p-1.5 px-3'
                >
                    <>
                        <MdOutlineAddCircleOutline />
                        <span>إعطاء عضو رقم مميز</span>
                    </>
                </Button>
            )}

            {/* Model */}
            {showModel && <Backdrop onClose={toggleModel} />}
            <CreateEditModel
                header={`عمليه إعطاء الرقم المميز ${specialUids.specificSpecialUidData?.body} الى العضو`}
                type='create'
                createEditBtnContent={
                    showWaitMsg ? "من فضلك انتظر ..." : "إعطاء رقم مميز للعضو"
                }
                showCreateEditModel={showModel}
                confirmCreateEditHandler={confirmGiveSepcialUidToUser}
            >
                <div className='grid sm:grid-cols-2 gap-10'>
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
                        {(specialUids.giveSpecialUidToUserData ||
                            specialUids.giveSpecialUidToUserError) && (
                            <span
                                className={`${
                                    specialUids.giveSpecialUidToUserData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!specialUids.giveSpecialUidToUserError
                                    ? specialUids.giveSpecialUidToUserData
                                          ?.msg ||
                                      "لقد تم إعطاء الرقم المميز للعضو"
                                    : specialUids.giveSpecialUidToUserError
                                          .msg ||
                                      "فشل إعطاء الرقم المميز للعضو"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default GiveSpecialUidToUser;
