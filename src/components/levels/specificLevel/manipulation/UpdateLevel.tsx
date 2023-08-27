import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { updateLevel } from "../../../../store/slices/levelsSlice";

// components
import Button from "../../../ui/Button";
import Backdrop from "../../../models/Backdrop";
import Input from "../../../ui/Input";
import CreateEditModel from "../../../models/CreateEditModel";

// icons
import { MdOutlineModeEdit } from "react-icons/md";

const UpdateLevel = () => {
    const [showUpdateModel, setShowUpdateModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [formData, setFormData] = useState({ required_exp: "" });
    const [formDataError, setFormDataError] = useState({
        required_expError: "",
    });

    const { required_exp } = formData;
    const { required_expError } = formDataError;

    const auth = useSelector((state: RootState) => state.auth);
    const levels = useSelector((state: RootState) => state.levels);

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    // render the specifc level exp when open the page
    useEffect(() => {
        if (levels.specificLevelData?.required_exp) {
            setFormData((prevState) => ({
                ...prevState,
                required_exp: `${levels.specificLevelData?.required_exp}`,
            }));
        }
    }, [levels.specificLevelData?.required_exp]);

    useEffect(() => {
        if (showWaitMsg && !levels.updateLevelLoading) {
            setShowUpdateModel(false);
            setShowWaitMsg(false);
        }
    }, [showWaitMsg, levels.updateLevelLoading]);

    const toggleUpdateModel = () => {
        setShowUpdateModel((prevState) => !prevState);
    };

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataError({
            required_expError: "",
        });

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // confrim edit user
    const confirmUpdateLevel = (type: boolean) => {
        // make sure when update level is loading not send any requests to server again
        if (levels.updateLevelLoading) {
            return;
        }

        if (type) {
            // handling error
            if (!required_exp && required_exp.toString().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    required_expError: "الرجاء ملئ حقل الاكسبى المطلوب",
                }));
                return;
            }

            setShowWaitMsg(true);
            // udpate the changes only
            const SubmitedFormDate = new FormData();
            +required_exp !== levels.specificLevelData?.required_exp &&
                SubmitedFormDate.append("required_exp", `${+required_exp}`);

            dispatch(
                updateLevel({
                    token: auth.loginData?.access_token!,
                    level_id: params.id!,
                    formData: SubmitedFormDate,
                })
            );
            return;
        }

        toggleUpdateModel();
    };

    return (
        <>
            <Button
                onClick={toggleUpdateModel}
                editBtn
                className='text-xs sm:text-sm p-1.5 px-3 bg-grayWhite'
            >
                <>
                    <MdOutlineModeEdit />
                    <span>تحديث المستوى</span>
                </>
            </Button>

            {/* update level */}
            {showUpdateModel && <Backdrop onClose={toggleUpdateModel} />}
            <CreateEditModel
                header='تحديث المستوى'
                type='edit'
                createEditBtnContent={
                    showWaitMsg ? "من فضلك انتظر ..." : "تحديث المستوى"
                }
                showCreateEditModel={showUpdateModel}
                confirmCreateEditHandler={confirmUpdateLevel}
            >
                <Input
                    htmlFor='required_exp'
                    id='required_exp'
                    name='required_exp'
                    label='الاكسبى المطلوب'
                    type='number'
                    onChange={onChange}
                    placeholder='*Required Exp'
                    labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                    value={required_exp}
                    error={required_expError}
                />
            </CreateEditModel>
        </>
    );
};

export default UpdateLevel;
