import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../../store/store";
import {
    removeDesignStoreFromUser,
    getUserDesignStore,
} from "../../../../../store/slices/designStoreSlice";

// components
import Button from "../../../../ui/Button";
import Backdrop from "../../../../models/Backdrop";
import ConfirmDelete from "../../../../models/ConfirmDelete";

// react icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";

const UserDesignStoreTabelBody = () => {
    const [hideDeleteModel, setHideDeleteModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState({
        type: false,
        decoration_id: 0,
        decoration_name: "",
    });

    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const designStore = useSelector((state: RootState) => state.designStore);
    const users = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (hideDeleteModel && !designStore.removeDesignStoreFromUserLoading) {
            setHideDeleteModel(true);
            setShowDeleteModel({
                type: false,
                decoration_id: 0,
                decoration_name: "",
            });
        }
    }, [hideDeleteModel, designStore.removeDesignStoreFromUserLoading]);

    // fun => show delete model
    const deleteDecorationFromUserHandler = (
        decoration_id: number,
        decoration_name: string
    ) => {
        setShowDeleteModel({
            type: true,
            decoration_id: decoration_id,
            decoration_name: decoration_name,
        });
    };

    // fun => hide delete model
    const closeDeleteModelHandler = () => {
        setShowDeleteModel({
            type: false,
            decoration_id: 0,
            decoration_name: "",
        });
    };

    // confirm delete => if the fun return true means delete desgin from user, if it false just close the model
    const confirmDeleteHandler = (deleteAgency: boolean) => {
        if (deleteAgency) {
            // delete design from user
            const formData = new FormData();
            formData.append("user_id", `${users.specificUserData?.id!}`);
            dispatch(
                removeDesignStoreFromUser({
                    designStore_id: showDeleteModel.decoration_id,
                    token: auth.loginData?.access_token!,
                    formData: formData,
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
            {designStore.getUserDesignStoreData?.decorations &&
            designStore.getUserDesignStoreData?.decorations.length > 0 ? (
                <tbody className='font-light text-sm'>
                    {designStore.getUserDesignStoreData?.decorations.map(
                        (decoration, i) => (
                            <tr
                                key={i}
                                className={`border-b-[1px] hover:bg-white/30 border-white`}
                            >
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {i + 1}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {decoration.name}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    <img
                                        loading='lazy'
                                        className='rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto'
                                        src={decoration.cover}
                                        alt={`${decoration.name}_image`}
                                    />
                                </td>

                                <td className='py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-r-[1px] border-white'>
                                    <Button
                                        className='mx-auto text-xs p-1 sm:p-1.5 font-normal sm:text-sm'
                                        deleteBtn
                                        onClick={deleteDecorationFromUserHandler.bind(
                                            null,
                                            decoration.id,
                                            decoration.name
                                        )}
                                    >
                                        <RiDeleteBin5Line />
                                    </Button>
                                </td>
                                <td className=' py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white'>
                                    <Button
                                        type='link'
                                        className='text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white'
                                        to={`/designStore/${decoration.id}`}
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
                                designStore.removeDesignStoreFromUserLoading
                                    ? "الرجاء الانتظار..."
                                    : "أحذف"
                            }
                            showDeleteModel={showDeleteModel.type}
                            confirmDeleteHandler={confirmDeleteHandler}
                            header={`هل انت متاكد من حذف التصميم من العضو ذو الاسم`}
                            element={showDeleteModel.decoration_name}
                            text='عند حذفك لهذا التصميم يمكنك استرجاعه مره اخرى'
                        />
                    </td>
                </tr>
            </tfoot>
        </>
    );
};

export default UserDesignStoreTabelBody;
