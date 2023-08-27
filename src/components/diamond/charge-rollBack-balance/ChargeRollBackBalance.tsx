import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    rollBackFromUser,
    chargeUserBalance,
    resetRollbackChargeDataError,
} from "../../../store/slices/diamondSlice";

// components
import Button from "../../ui/Button";
import PagesHeaders from "../../ui/PagesHeaders";
import Backdrop from "../../models/Backdrop";
import CreateEditModel from "../../models/CreateEditModel";
import Input from "../../ui/Input";
import SearchInputByUId from "../../ui/SearchInputByUId";

// icons
import { RiLuggageDepositLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";

const ChargeRollBackBalance = () => {
    const [showModel, setShowModel] = useState(false);
    const [hideModel, setHideModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [processType, setProcessType] = useState("");
    const [formData, setFormData] = useState({
        amount: "",
        owner_id: "",
        owner_uid: "",
    });
    const [formDataError, setFormDataError] = useState({
        amountError: "",
        user_idError: "",
    });

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const diamond = useSelector((state: RootState) => state.diamond);

    // useEffect => check if process of roll back or charge done the button message and hide the model
    useEffect(() => {
        if (
            showWaitMsg &&
            !diamond.chargeUserBalanceLoading &&
            !diamond.rollBackFromUserLoading
        ) {
            // remove wait msg in the button of create
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [
        diamond.chargeUserBalanceLoading,
        diamond.rollBackFromUserLoading,
        showWaitMsg,
    ]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setFormData({ amount: "", owner_id: "", owner_uid: "" });
            setShowModel(false);
            setHideModel(false);
            // reset data and error of rollback and charge diamond => to not render again when rollback and charge new diamond
            dispatch(resetRollbackChargeDataError());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // reset errors
        setFormDataError({
            amountError: "",
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
            owner_id: id.toString(),
            owner_uid: uid,
        }));
    };

    // open and close the model of charge balance and roll back
    const toggleModel = () => {
        setShowModel((prevState) => !prevState);
    };

    // make process to be charge
    const chargeBalanceHandler = () => {
        setProcessType("charge");
        toggleModel();
    };

    // make process to be rollback
    const rollBackHandler = () => {
        setProcessType("rollback");
        toggleModel();
    };

    // confirm charge balance and roll back
    const confirmChargeBalanceRollBack = (type: boolean) => {
        // make sure when charge balance or rollback not send any requests to server again
        if (showWaitMsg) {
            return;
        }

        // show message alert to user that the input is empty
        if (!formData.amount && formData.amount.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                amountError: "الرجاء ملئ حقل الكميه",
            }));
            return;
        } else if (!formData.owner_id) {
            setFormDataError((prevState) => ({
                ...prevState,
                user_idError: "الرجاء اختيار الرقم التعرفى من الصندوق",
            }));
            return;
        }

        const SubmitedFormDate = new FormData();
        // @ts-ignore
        SubmitedFormDate.append("amount", +formData.amount);
        SubmitedFormDate.append("user_id", formData.owner_id.toString());

        if (type) {
            if (processType === "charge") {
                // charge balance
                setShowWaitMsg(true);
                dispatch(
                    chargeUserBalance({
                        formData: SubmitedFormDate,
                        token: auth.loginData?.access_token!,
                    })
                );
            } else {
                // roll back
                setShowWaitMsg(true);
                dispatch(
                    rollBackFromUser({
                        formData: SubmitedFormDate,
                        token: auth.loginData?.access_token!,
                    })
                );
            }
            return;
        }

        // if type is false just close the modle
        toggleModel();
    };

    return (
        <>
            <PagesHeaders small>ايداع وسحب رصيد</PagesHeaders>
            <div className='flex flex-wrap justify-end gap-3 sm:gap-5 mb-5'>
                <Button
                    editBtn
                    onClick={rollBackHandler}
                    className='text-xs sm:text-sm'
                >
                    <>
                        <BiMoneyWithdraw />
                        سحب ماسات من الاعضاء
                    </>
                </Button>
                <Button
                    createBtn
                    onClick={chargeBalanceHandler}
                    className='text-xs sm:text-sm'
                >
                    <>
                        <RiLuggageDepositLine />
                        إيداع ماسات للاعضاء
                    </>
                </Button>
            </div>
            {/* roll back and charge balnace */}
            {showModel && <Backdrop onClose={toggleModel} />}
            <CreateEditModel
                header={
                    processType === "charge"
                        ? "عمليه شحن رصيد"
                        : "عمليه سحب رصيد"
                }
                type={processType === "charge" ? "create" : "edit"}
                createEditBtnContent={
                    showWaitMsg
                        ? "من فضلك انتظر ..."
                        : processType === "charge"
                        ? "شحن رصيد"
                        : "سحب رصيد"
                }
                showCreateEditModel={showModel}
                confirmCreateEditHandler={confirmChargeBalanceRollBack}
            >
                <div className='grid sm:grid-cols-2 gap-10'>
                    <Input
                        htmlFor='amount'
                        id='amount'
                        label={
                            processType === "charge"
                                ? "كميه الرصيد المراد شحنه"
                                : "كميه الرصيد المراد سحبه"
                        }
                        name='amount'
                        onChange={onChange}
                        value={formData.amount}
                        placeholder='*Amount'
                        required
                        type='text'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.amountError}
                    />
                    <div className='relative'>
                        <SearchInputByUId
                            htmlFor='owner_uid'
                            id='owner_uid'
                            label='الرقم التعريفى للعضو'
                            name='owner_uid'
                            onChange={onChange}
                            bearorIdFun={bearorIdHandler}
                            value={formData.owner_uid}
                            title={formData.owner_id}
                            placeholder='*Owner Id'
                            required
                            type='number'
                            // readOnly={processType === "edit" ? true : false}
                            labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                            error={formDataError.user_idError}
                        />
                    </div>
                    <div className='sm:col-span-2'>
                        {(diamond.chargeUserBalanceData ||
                            diamond.chargeUserBalanceError) && (
                            <span
                                className={`${
                                    diamond.chargeUserBalanceData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!diamond.chargeUserBalanceError
                                    ? diamond.chargeUserBalanceData?.msg ||
                                      "لقد تم إضافه الرصيد"
                                    : diamond.chargeUserBalanceError ||
                                      "فشل إضافه رصيد"}
                            </span>
                        )}
                        {(diamond.rollBackFromUserData ||
                            diamond.rollBackFromUserError) && (
                            <span
                                className={`${
                                    diamond.rollBackFromUserData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!diamond.rollBackFromUserError
                                    ? diamond.rollBackFromUserData?.msg ||
                                      "لقد تم سحب الرصيد"
                                    : diamond.rollBackFromUserError ||
                                      "فشل سحب رصيد"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default ChargeRollBackBalance;
