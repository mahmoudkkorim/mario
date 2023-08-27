import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteSpecialUid } from "../../../store/slices/specialUidsSlice";

// component
import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";
import SpecificItem from "../../ui/SpecificItem";
import Message from "../../ui/Message";
import SpecifcRowDataForSpecifcItem from "../../utils/SpecifcRowDataForSpecifcItem";
import PagesHeaders from "../../ui/PagesHeaders";
import Manipulaton from "../manipulation/Manipulaton";

// utils
import ConvertNumberWishK_M from "../../utils/ConvertNumberWishK_M";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// icons
import { IoDiamondSharp } from "react-icons/io5";

// interfaces
import { SingleSpecialUid } from "../../../interfaces/pages/specialUids";

const SpecificSpecialUidUi = (props: SingleSpecialUid) => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const {
        body,
        created_at,
        id,
        is_purchased,
        price,
        updated_at,
        user,
        user_id,
    } = props;

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const specialUids = useSelector((state: RootState) => state.specialUids);

    useEffect(() => {
        if (hideDeleteModel.type && !specialUids.deleteSpecialUidLoading) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح الرقم المميز" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, specialUids.deleteSpecialUidLoading]);

    // store special uid data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeSpecialUidInLocalStorageHandler = () => {
        localStorage.setItem("SpecialUid", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteSpecialUiHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete desgin, if it false just close the model
    const confirmDeleteHandler = (deleteSpecialUi: boolean) => {
        if (deleteSpecialUi) {
            // delete deleteSpecialUi
            dispatch(
                deleteSpecialUid({
                    uid: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteSpecialUiHandler();
        }
    };

    return (
        <>
            {hideDeleteModel.text.length > 0 ? (
                <Message>{hideDeleteModel.text}</Message>
            ) : (
                <>
                    {/* Manipulaton */}
                    <Manipulaton />

                    <>
                        <PagesHeaders
                            small
                        >{`الرقم المميز ${body}`}</PagesHeaders>
                        <div className='flex gap-5 flex-col'>
                            {price > 0 ? (
                                <div className='flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                    <span className='capitalize'>
                                        <IoDiamondSharp />
                                    </span>
                                    <span className=''>
                                        {ConvertNumberWishK_M(price, 1)}
                                    </span>
                                </div>
                            ) : (
                                <></>
                            )}
                            <span
                                className={`${
                                    is_purchased === 0
                                        ? "bg-success"
                                        : "bg-darkRed"
                                } text-white w-fit p-0.5 px-2 rounded-md text-sm font-extrabold hover:scale-95 duration-150`}
                            >
                                {is_purchased === 0 ? "لم يباع بعد" : "مُباع"}
                            </span>
                            {created_at && (
                                <div className='flex bg-success p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                    <span>تم إنشاؤه في</span>
                                    <span className='tracking-tighter'>
                                        <CreatedAt createdAt={created_at} />
                                    </span>
                                </div>
                            )}
                            {updated_at && (
                                <div className='flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                    <span>تم تعديله في</span>
                                    <span className='tracking-tighter'>
                                        <CreatedAt createdAt={updated_at} />
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* user data */}
                        <>
                            {user && (
                                <>
                                    <PagesHeaders small>
                                        بيانات مالك الرقم المميز
                                    </PagesHeaders>
                                    <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-10 mt-5'>
                                        <img
                                            className='rounded-full w-52 h-52 bg-cover self-center'
                                            src={user?.profile_picture}
                                            alt={`${user?.name}_image`}
                                        />
                                        <div className='flex flex-col gap-2 mx-3 sm:mx-none'>
                                            <SpecifcRowDataForSpecifcItem
                                                data={user?.uid}
                                                text='الرقم التعريفى'
                                            />
                                            <SpecifcRowDataForSpecifcItem
                                                data={user?.name}
                                                text='الاسم'
                                            />
                                            <SpecifcRowDataForSpecifcItem
                                                data={user?.email}
                                                text='الايميل'
                                            />
                                            <SpecifcRowDataForSpecifcItem
                                                data={user?.phone}
                                                text='التليفون'
                                            />
                                            <SpecifcRowDataForSpecifcItem
                                                data={user?.gender}
                                                text='النوع'
                                            />
                                            <SpecifcRowDataForSpecifcItem
                                                data={
                                                    <Link
                                                        className='text-xs sm:text-sm border-b-[1px] hover:-translate-y-1 block duration-200'
                                                        to={`/members/${user.id}`}
                                                    >
                                                        {`صفحه ${user.name}`}
                                                    </Link>
                                                }
                                                text='صفحه العضو'
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    </>
                </>
            )}
            {showDeleteModel && <Backdrop onClose={deleteSpecialUiHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    specialUids.deleteSpecialUidLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={`هل انت متاكد من حذف`}
                element={`رقم مميز ${body}`}
                text='عند حذفك لهذا الرقم المميز يمكنك إنشائه مره اخرى ولاكن هل انت متاكد من انك تريد حذفه'
            />
        </>
    );
};

export default SpecificSpecialUidUi;
