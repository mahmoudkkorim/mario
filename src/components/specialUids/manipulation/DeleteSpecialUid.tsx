import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteSpecialUid } from "../../../store/slices/specialUidsSlice";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";

// icons
import { RiDeleteBin6Line } from "react-icons/ri";

const DeletespecialUid = () => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    const auth = useSelector((state: RootState) => state.auth);
    const specialUids = useSelector((state: RootState) => state.specialUids);

    // useEffect => check if the specialUid is deleted close the model
    useEffect(() => {
        if (!specialUids.deleteSpecialUidLoading) {
            setShowDeleteModel(false);
        }
    }, [specialUids.deleteSpecialUidLoading]);

    const toggleDeleteModelHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete user handler
    const confirmDeleteHandler = (type: boolean) => {
        // if server is loading delete specialUid make sure not send any more requests
        if (specialUids.deleteSpecialUidLoading) {
            return;
        }

        if (type) {
            dispatch(
                deleteSpecialUid({
                    token: auth.loginData?.access_token!,
                    uid: params.id!,
                })
            );
            return;
        }

        // if type is false means close the model
        toggleDeleteModelHandler();
    };

    return (
        <>
            {params.id && (
                <>
                    <Button
                        onClick={toggleDeleteModelHandler}
                        deleteBtn
                        className="text-xs sm:text-sm p-1.5 px-3"
                    >
                        <>
                            <RiDeleteBin6Line />
                            <span>مسح الرقم المميز</span>
                        </>
                    </Button>
                    {showDeleteModel && (
                        <Backdrop onClose={toggleDeleteModelHandler} />
                    )}
                    <ConfirmDelete
                        deleteBtnContent={
                            specialUids.deleteSpecialUidLoading
                                ? "الرجاء الانتظار..."
                                : "أحذف"
                        }
                        showDeleteModel={showDeleteModel}
                        confirmDeleteHandler={confirmDeleteHandler}
                        header={"هل انت متاكد من حذف الرقم المميز"}
                        element={specialUids.specificSpecialUidData?.body || ""}
                        text="عند حذفك لهذ الرقم المميز يمكنك استرجاعه مره اخرى. ولاكن هل انت متاكد من انك تريد حذفه"
                    />
                </>
            )}
        </>
    );
};

export default DeletespecialUid;
