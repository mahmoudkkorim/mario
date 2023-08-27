import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    chargeCreateAgency,
    resetCreateDataError,
} from "../../../store/slices/agencies/chargeAgenciesSlice";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import CreateEditModel from "../../models/CreateEditModel";
import SearchInputByUId from "../../ui/SearchInputByUId";

// icons
import { IoMdCreate } from "react-icons/io";

const CreateChargeAgencyButton = () => {
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [userIdIsEmpty, setUserIdIsEmpty] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [hideModel, setHideModel] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const chargeAgencies = useSelector(
        (state: RootState) => state.chargeAgencies
    );
    const auth = useSelector((state: RootState) => state.auth);

    // useEffect => check if agency is created and remove the button message and hide the model
    useEffect(() => {
        if (showWaitMsg && !chargeAgencies.ChargeCreateAgencyLoading) {
            // remove wait msg in the button of create
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [chargeAgencies.ChargeCreateAgencyLoading, showWaitMsg]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setUserId("");
            setShowCreateModel(false);
            setHideModel(false);
            // reset data and error of create agency => to not render again when create new agency
            dispatch(resetCreateDataError());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    // show and hide backdrop and createEditModel
    const toggleCreateModelHandler = () => {
        setShowCreateModel((prevState) => !prevState);
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setUserId(e.currentTarget.value);
        if (userIdIsEmpty) {
            setUserIdIsEmpty(false);
        }
    };

    // bearor is transfare id to parent element
    const bearorIdHandler = (id: number, uid: string) => {
        setTitle(id.toString());
        setUserId(uid);
    };

    // createEditModel response => if it true means create agency, if false just close model
    const confirmCreateHandler = (type: boolean) => {
        // check to make sure the user if click more than one time the funcion will not run again
        if (showWaitMsg) {
            return;
        }

        if (type) {
            // show message alert the user that the input is empty
            if (userId.trim().length === 0) {
                setUserIdIsEmpty(true);
            } else {
                setShowWaitMsg(true);
                dispatch(
                    chargeCreateAgency({
                        token: auth.loginData?.access_token!,
                        user_id: +title,
                    })
                );
            }
            return;
        }

        // if type is false just close the modle
        toggleCreateModelHandler();
    };

    return (
        <>
            <Button
                onClick={toggleCreateModelHandler}
                className='bg-success text-white'
            >
                <>
                    <IoMdCreate />
                    إنشاء وكاله شحن
                </>
            </Button>
            {showCreateModel && <Backdrop onClose={toggleCreateModelHandler} />}
            <CreateEditModel
                header='إنشاء وكاله جديده'
                type='create'
                createEditBtnContent={
                    showWaitMsg ? "من فضلك انتظر ..." : "إنشاء وكاله"
                }
                showCreateEditModel={showCreateModel}
                confirmCreateEditHandler={confirmCreateHandler}
            >
                <div className=''>
                    <SearchInputByUId
                        htmlFor='user id'
                        id='user id'
                        label='الرقم التعريفى للمستخدم'
                        name='user id'
                        onChange={onChange}
                        value={userId}
                        title={title}
                        placeholder='*User id'
                        required
                        type='number'
                        bearorIdFun={bearorIdHandler}
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                    />
                    {(chargeAgencies.ChargeCreateAgencyData ||
                        chargeAgencies.ChargeCreateAgencyError) && (
                        <span
                            className={`${
                                chargeAgencies.ChargeCreateAgencyData
                                    ? "text-success"
                                    : "text-darkRed"
                            } text-center mt-5 w-full font-semibold text-sm inline-block`}
                        >
                            {!chargeAgencies.ChargeCreateAgencyError
                                ? chargeAgencies.ChargeCreateAgencyData?.msg ||
                                  "success"
                                : chargeAgencies.ChargeCreateAgencyError
                                      .user_id[0]}
                        </span>
                    )}
                    {userIdIsEmpty && (
                        <span className='absolute h-5 -bottom-6 text-sm text-darkRed'>
                            من فضلك ادخل الرقم التعريفى للمستخدم
                        </span>
                    )}
                </div>
            </CreateEditModel>
        </>
    );
};

export default CreateChargeAgencyButton;
