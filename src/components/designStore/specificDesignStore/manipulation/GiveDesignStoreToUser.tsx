import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    giveDesignStoreToUser,
    resetgiveDesignStoreDataError,
} from "../../../../store/slices/designStoreSlice";

// components
import PagesHeaders from "../../../ui/PagesHeaders";
import Button from "../../../ui/Button";
import Backdrop from "../../../models/Backdrop";
import CreateEditModel from "../../../models/CreateEditModel";
import SearchInputByUId from "../../../ui/SearchInputByUId";

const GiveDesignStoreToUser = () => {
    const [showModel, setShowModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [hideModel, setHideModel] = useState(false);
    const [formData, setFormData] = useState({ user_id: "", user_uid: "" });
    const [formDataError, setFormDataError] = useState({
        user_idError: "",
    });

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const designStore = useSelector((state: RootState) => state.designStore);

    // useEffect => check if process is done the button message and hide the model
    useEffect(() => {
        if (showWaitMsg && !designStore.giveDesignStoreToUserLoading) {
            // remove wait msg in the button
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [designStore.giveDesignStoreToUserLoading, showWaitMsg]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setFormData({ user_id: "", user_uid: "" });
            setShowModel(false);
            setHideModel(false);
            // reset data and error of give design to user => to not render again when make this process
            dispatch(resetgiveDesignStoreDataError());
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

    const confirmGiveDesignToUser = (confirm: boolean) => {
        // make sure not give it to user twice
        if (designStore.giveDesignStoreToUserLoading) {
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
                giveDesignStoreToUser({
                    token: auth.loginData?.access_token!,
                    designStore_id: params.id!,
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
            <PagesHeaders small>إعطاء التصميم الى عضو</PagesHeaders>
            <Button
                onClick={toggleModel}
                createBtn
                className="text-xs sm:text-sm p-1.5 px-3 bg-grayWhite mr-auto"
            >
                إعطاء التصصميم الى عضو
            </Button>

            {/* Model */}
            {showModel && <Backdrop onClose={toggleModel} />}
            <CreateEditModel
                header={`عمليه إعطاء التصميم ${
                    designStore.specificDesignStoreData?.name
                        ? designStore.specificDesignStoreData?.name
                        : ""
                } الى العضو`}
                type="create"
                createEditBtnContent={
                    showWaitMsg ? "من فضلك انتظر ..." : "إعطاء التصميم للعضو"
                }
                showCreateEditModel={showModel}
                confirmCreateEditHandler={confirmGiveDesignToUser}
            >
                <div className="grid sm:grid-cols-2 gap-10">
                    <div className="relative">
                        <SearchInputByUId
                            htmlFor="user_uid"
                            id="user_uid"
                            label="الرقم التعريفى للعضو"
                            name="user_uid"
                            onChange={onChange}
                            bearorIdFun={bearorIdHandler}
                            value={formData.user_uid}
                            title={formData.user_id}
                            placeholder="*User Id"
                            required
                            type="number"
                            // readOnly={processType === "edit" ? true : false}
                            labelBgColor="bg-gradient-to-b from-grayWhite to-white"
                            error={formDataError.user_idError}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        {(designStore.giveDesignStoreToUserData ||
                            designStore.giveDesignStoreToUserError) && (
                            <span
                                className={`${
                                    designStore.giveDesignStoreToUserData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!designStore.giveDesignStoreToUserError
                                    ? designStore.giveDesignStoreToUserData
                                          ?.msg || "لقد تم إعطاء التصميم للعضو"
                                    : designStore.giveDesignStoreToUserError
                                          .msg || "فشل إعطاء التصميم للعضو"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default GiveDesignStoreToUser;
