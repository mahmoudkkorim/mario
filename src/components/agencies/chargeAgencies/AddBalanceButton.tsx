import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import Input from "../../ui/Input";
import CreateEditModel from "../../models/CreateEditModel";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    chargeUpdateBalance,
    resetUpdateBalanceDataError,
} from "../../../store/slices/agencies/chargeAgenciesSlice";

// data
import { BALANCE_TYPES } from "../../../data/agencies";

// icons
import { IoMdAddCircle } from "react-icons/io";

const AddBalanceButton = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const agency_id = query.get("agency_id");

    const [showEditModel, setShowEditModel] = useState(false);
    const [formData, setFormData] = useState({
        userId: agency_id!,
        type: BALANCE_TYPES[0].type,
        amount: "",
    });
    const [formDataError, setFormDataError] = useState({
        userIdError: "",
        typeError: "",
        amountError: "",
    });
    const { amount, type, userId } = formData;
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [hideModel, setHideModel] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const chargeAgencies = useSelector(
        (state: RootState) => state.chargeAgencies
    );

    // useEffect => check if balance is added and remove the button message and hide the model
    useEffect(() => {
        if (showWaitMsg && !chargeAgencies.ChargeUpdateBalanceLoading) {
            // remove wait msg in the button of create
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [chargeAgencies.ChargeUpdateBalanceLoading, showWaitMsg]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }

        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setFormData((prevState) => ({
                ...prevState,
                amount: "",
                userId: "",
            }));
            setShowEditModel(false);
            setHideModel(false);
            // reset data and error of balance => to not render again when make new process
            dispatch(resetUpdateBalanceDataError());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    // show and hide backdrop and editEditModel
    const toggleEditModelHandler = () => {
        setShowEditModel((prevState) => !prevState);
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.type === "radio") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.title]: e.target.value,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }

        // remove all error messages if exist
        setFormDataError({ amountError: "", typeError: "", userIdError: "" });
    };

    // createEditModel response => if it true means add balance to agency, if false just close model
    const confirmCreateHandler = (type: boolean) => {
        // check to make sure the user if click more than one time the funcion will not run again
        if (showWaitMsg) {
            return;
        }

        if (type) {
            // show message alert the user that the input is empty
            if (userId.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    userIdError: "من فضلك ادخل الرقم التعريفى للمستخدم",
                }));
                return;
            } else if (amount.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    amountError: `من فضلك ادخل القميه المراد ${
                        formData.type === "deposit" ? "إيداعها" : "سحبها"
                    }`,
                }));
                return;
            } else {
                setShowWaitMsg(true);
                dispatch(
                    chargeUpdateBalance({
                        amount: +amount,
                        id: formData.userId,
                        token: auth.loginData?.access_token!,
                        type: formData.type === "deposit" ? 0 : 1,
                    })
                );
            }
            return;
        }

        // if type is false just close the model
        toggleEditModelHandler();
    };

    return (
        <>
            <Button
                onClick={toggleEditModelHandler}
                className='text-white bg-darkRed'
            >
                <>
                    <IoMdAddCircle />
                    إضافه رصيد للوكاله
                </>
            </Button>
            {showEditModel && <Backdrop onClose={toggleEditModelHandler} />}
            <CreateEditModel
                header={
                    formData.type === "deposit"
                        ? "إيداع رصيد للوكاله"
                        : "سحب رصيد من الوكاله"
                }
                type={formData.type === "deposit" ? "edit" : "create"}
                createEditBtnContent={
                    showWaitMsg
                        ? "من فضلك انتظر ..."
                        : formData.type === "deposit"
                        ? "إيداع"
                        : "سحب"
                }
                showCreateEditModel={showEditModel}
                confirmCreateEditHandler={confirmCreateHandler}
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 relative'>
                    <div className='relative'>
                        <Input
                            htmlFor='userId'
                            id='userId'
                            label='الرقم التعريفى للمستخدم'
                            name='userId'
                            onChange={onChange}
                            value={userId}
                            placeholder='*User id'
                            required
                            type='number'
                            readOnly
                            labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        />
                        {formDataError.userIdError.length > 0 && (
                            <span className='absolute h-5 -bottom-6 text-sm text-darkRed'>
                                {formDataError.userIdError}
                            </span>
                        )}
                    </div>
                    <div className='relative'>
                        <Input
                            htmlFor='amount'
                            id='amount'
                            label={`قيمه  ${
                                formData.type === "deposit"
                                    ? "الإيداع"
                                    : "السحب"
                            }`}
                            name='amount'
                            onChange={onChange}
                            value={amount}
                            placeholder='*Amount'
                            required
                            type='number'
                            labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        />
                        {formDataError.amountError.length > 0 && (
                            <span className='absolute h-5 -bottom-6 text-sm text-darkRed'>
                                {formDataError.amountError}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor='room_background w-fit'>
                            نوع العمليه
                        </label>
                        <div className='flex gap-2 flex-wrap mr-3'>
                            {BALANCE_TYPES.map(
                                (one) =>
                                    one.type !== "all" && (
                                        <Input
                                            key={one.type}
                                            title='type'
                                            htmlFor={one.type}
                                            type='radio'
                                            id={one.type}
                                            label={one.text}
                                            onChange={onChange}
                                            checked={type === one.type}
                                            value={one.type}
                                        />
                                    )
                            )}
                        </div>
                        {formDataError.typeError.length > 0 && (
                            <span className='absolute h-5 -bottom-6 text-sm text-darkRed'>
                                {formDataError.typeError}
                            </span>
                        )}
                    </div>
                    <div className='sm:col-span-2'>
                        {(chargeAgencies.ChargeUpdateBalanceData ||
                            chargeAgencies.ChargeUpdateBalanceError) && (
                            <span
                                className={`${
                                    chargeAgencies.ChargeUpdateBalanceData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!chargeAgencies.ChargeUpdateBalanceError
                                    ? chargeAgencies.ChargeUpdateBalanceData
                                          ?.msg || "success"
                                    : chargeAgencies.ChargeUpdateBalanceError
                                          .user_id[0]}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default AddBalanceButton;
