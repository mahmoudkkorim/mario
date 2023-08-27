import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/store";
import { deleteUser } from "../../../../store/slices/users/usersSlice";

// utils
import ConvertNumberWishK_M from "../../../utils/ConvertNumberWishK_M";

// components
import Button from "../../../ui/Button";
import Backdrop from "../../../models/Backdrop";
import ConfirmDelete from "../../../models/ConfirmDelete";

// react icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";

const UsersTabelBody = () => {
    const [hideDeleteModel, setHideDeleteModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState({
        type: false,
        userId: 0,
    });

    const dispatch = useDispatch<AppDispatch>();
    const { pathname, search } = useLocation();

    const auth = useSelector((state: RootState) => state.auth);
    const users = useSelector((state: RootState) => state.users);

    // reset  states
    useEffect(() => {
        if (hideDeleteModel && !users.deleteUserLoading) {
            setHideDeleteModel(true);
            setShowDeleteModel({ type: false, userId: 0 });
        }
    }, [hideDeleteModel, users.deleteUserLoading]);

    // fun => show delete model
    const deleteUserHandler = (userId: number) => {
        setShowDeleteModel({ type: true, userId: userId });
    };

    // fun => hide delete model
    const closeDeleteModelHandler = () => {
        setShowDeleteModel({ type: false, userId: 0 });
    };

    // confirm delete => if the fun return true means delete user, if it false just close the model
    const confirmDeleteHandler = (deleteuser: boolean) => {
        if (deleteuser) {
            // delete user
            dispatch(
                deleteUser({
                    userId: showDeleteModel.userId.toString(),
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
            {users.allUsersData?.data && users.allUsersData?.data.length > 0 ? (
                <tbody className='font-light text-sm'>
                    {users.allUsersData?.data.map((user, i) => (
                        <tr
                            key={i}
                            className={`border-b-[1px] hover:bg-white/30 border-white`}
                        >
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                {i +
                                    1 +
                                    users.allUsersData?.per_page! *
                                        (+users.allUsersData?.current_page! -
                                            1)}
                            </td>
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell'>
                                {user.uid}
                            </td>
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden sm:table-cell'>
                                {ConvertNumberWishK_M(user.diamond_balance, 1)}
                            </td>
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden sm:table-cell'>
                                {ConvertNumberWishK_M(user.gold_balance, 1)}
                            </td>
                            <td className='mx-auto py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-l-[1px] border-white'>
                                <img
                                    loading='lazy'
                                    className='rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto'
                                    src={user.profile_picture}
                                    alt={`${user.name}_image`}
                                />
                            </td>

                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base  border-l-[1px] border-r-[1px] border-white'>
                                {user.name && user.name.length > 10
                                    ? user.name.slice(0, 5) + "..."
                                    : user.name}
                            </td>

                            <td className='py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white'>
                                <Button
                                    className='mx-auto text-xs p-1 sm:p-1.5 font-normal sm:text-sm'
                                    deleteBtn
                                    onClick={deleteUserHandler.bind(
                                        null,
                                        user.id
                                    )}
                                >
                                    <RiDeleteBin5Line />
                                </Button>
                            </td>
                            <td className=' py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white'>
                                <Button
                                    type='link'
                                    className='text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white'
                                    to={`${pathname}/${user.id}`}
                                >
                                    <AiOutlineLink />
                                </Button>
                            </td>
                        </tr>
                    ))}
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
                                users.deleteUserLoading
                                    ? "الرجاء الانتظار..."
                                    : "أحذف"
                            }
                            showDeleteModel={showDeleteModel.type}
                            confirmDeleteHandler={confirmDeleteHandler}
                            header={"هل انت متاكد من حذف العضو ذو الرقم"}
                            element={showDeleteModel.userId.toString() || ""}
                            text='عند حذفك لهذ العضو لايمكنك استرجاعه مره اخرى هل انت متاكد من انك تريد حذفه'
                        />
                    </td>
                </tr>
            </tfoot>
        </>
    );
};

export default UsersTabelBody;
