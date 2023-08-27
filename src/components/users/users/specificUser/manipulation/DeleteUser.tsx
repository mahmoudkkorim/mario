import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { deleteUser } from "../../../../../store/slices/users/usersSlice";

// components
import Button from "../../../../ui/Button";
import Backdrop from "../../../../models/Backdrop";
import ConfirmDelete from "../../../../models/ConfirmDelete";

// icons
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteUser = () => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    const users = useSelector((state: RootState) => state.users);
    const auth = useSelector((state: RootState) => state.auth);

    // useEffect => check if the user is deleted close the model
    useEffect(() => {
        if (!users.deleteUserLoading) {
            setShowDeleteModel(false);
        }
    }, [users.deleteUserLoading]);

    const toggleDeleteModelHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete user handler
    const confirmDeleteHandler = (type: boolean) => {
        // if server is loading delete user make sure not send any more requests
        if (users.deleteUserLoading) {
            return;
        }

        if (type) {
            dispatch(
                deleteUser({
                    token: auth.loginData?.access_token!,
                    userId: params.id!,
                })
            );
            return;
        }

        // if type is false means close the model
        toggleDeleteModelHandler();
    };

    return (
        <>
            <Button
                onClick={toggleDeleteModelHandler}
                deleteBtn
                className="text-xs sm:text-sm p-1.5 px-3"
            >
                <>
                    <RiDeleteBin6Line />
                    <span>مسح العضو</span>
                </>
            </Button>
            {showDeleteModel && <Backdrop onClose={toggleDeleteModelHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    users.deleteUserLoading ? "الرجاء الانتظار..." : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={
                    users.specificUserData?.name
                        ? "هل انت متاكد من حذف العضو ذو الاسم"
                        : "هل انت متاكد من حذف العضو ذو الرقم"
                }
                element={
                    users.specificUserData?.name ||
                    users.specificUserData?.id.toString() ||
                    ""
                }
                text="عند حذفك لهذ العضو لايمكنك استرجاعه مره اخرى هل انت متاكد من انك تريد حذفه"
            />
        </>
    );
};

export default DeleteUser;
