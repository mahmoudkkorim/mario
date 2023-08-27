import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { deleteSpecialUid } from "../../../store/slices/specialUidsSlice";

// utils
import ConvertNumberWishK_M from "../../utils/ConvertNumberWishK_M";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";

// react icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";

const SpecialUidsTabelBody = () => {
    const [hideDeleteModel, setHideDeleteModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState({
        type: false,
        numberId: 0,
    });

    const dispatch = useDispatch<AppDispatch>();
    const { pathname, search } = useLocation();

    const auth = useSelector((state: RootState) => state.auth);
    const specialUids = useSelector((state: RootState) => state.specialUids);

    // reset  states
    useEffect(() => {
        if (hideDeleteModel && !specialUids.deleteSpecialUidLoading) {
            setHideDeleteModel(true);
            setShowDeleteModel({ type: false, numberId: 0 });
        }
    }, [hideDeleteModel, specialUids.deleteSpecialUidLoading]);

    // fun => show delete model
    const deleteNumberHandler = (numberId: number) => {
        setShowDeleteModel({ type: true, numberId: numberId });
    };

    // fun => hide delete model
    const closeDeleteModelHandler = () => {
        setShowDeleteModel({ type: false, numberId: 0 });
    };

    // confirm delete => if the fun return true means delete number, if it false just close the model
    const confirmDeleteHandler = (deletenumber: boolean) => {
        if (deletenumber) {
            // delete user
            dispatch(
                deleteSpecialUid({
                    uid: showDeleteModel.numberId.toString(),
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel(true);
        } else {
            // close the model
            closeDeleteModelHandler();
        }
    };

    return (
        <>
            {specialUids.allSpecialUidsData?.data &&
            specialUids.allSpecialUidsData?.data.length > 0 ? (
                <tbody className='font-light text-sm'>
                    {specialUids.allSpecialUidsData?.data.map(
                        (specialId, i) => (
                            <tr
                                key={i}
                                className={`border-b-[1px] hover:bg-white/30 border-white`}
                            >
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {i +
                                        1 +
                                        specialUids.allSpecialUidsData
                                            ?.per_page! *
                                            (+specialUids.allSpecialUidsData
                                                ?.current_page! -
                                                1)}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {specialId.body &&
                                    specialId.body.length > 10
                                        ? specialId.body.slice(0, 10) + "..."
                                        : specialId.body}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {ConvertNumberWishK_M(+specialId.price, 1)}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    <span
                                        className={`${
                                            specialId.is_purchased === 0
                                                ? "bg-success/60"
                                                : "bg-darkRed/60"
                                        } text-white p-1.5 py-0.5 pb-1 rounded-md `}
                                    >
                                        {specialId.is_purchased === 0
                                            ? "لم يباع بعد"
                                            : "مُباع"}
                                    </span>
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden sm:table-cell'>
                                    {specialId.user ? (
                                        <img
                                            loading='lazy'
                                            className='rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto'
                                            src={specialId.user.profile_picture}
                                            alt='user_image'
                                        />
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td className='hidden sm:table-cell capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {specialId.user ? specialId.user.name : ""}
                                </td>

                                <td className='py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-r-[1px] border-white'>
                                    <Button
                                        className='mx-auto text-xs p-1 sm:p-1.5 font-normal sm:text-sm'
                                        deleteBtn
                                        onClick={deleteNumberHandler.bind(
                                            null,
                                            specialId.id
                                        )}
                                    >
                                        <RiDeleteBin5Line />
                                    </Button>
                                </td>
                                <td className=' py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white'>
                                    <Button
                                        type='link'
                                        className='text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white'
                                        to={`${pathname}/${specialId.id}`}
                                    >
                                        <AiOutlineLink />
                                    </Button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            ) : (
                <tbody></tbody>
            )}
            {showDeleteModel.type && (
                <Backdrop onClose={closeDeleteModelHandler} />
            )}
            <tfoot>
                <tr>
                    <td>
                        <ConfirmDelete
                            deleteBtnContent={
                                specialUids.deleteSpecialUidLoading
                                    ? "الرجاء الانتظار..."
                                    : "أحذف"
                            }
                            showDeleteModel={showDeleteModel.type}
                            confirmDeleteHandler={confirmDeleteHandler}
                            header={
                                "هل انت متاكد من حذف الرقم ذو الرقم التعريفى"
                            }
                            element={showDeleteModel.numberId.toString() || ""}
                            text='عند حذفك لهذ الرقم المميز لايمكنك استرجاعه مره اخرى هل انت متاكد من انك تريد حذفه'
                        />
                    </td>
                </tr>
            </tfoot>
        </>
    );
};

export default SpecialUidsTabelBody;
