import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteHostingAgency } from "../../../store/slices/agencies/hostingAgency/hostingAgenciesSlice";

// Componnets
import Button from "../../ui/Button";
import ConfirmDelete from "../../models/ConfirmDelete";
import Backdrop from "../../models/Backdrop";

// icons
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteAgencyButton = () => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showMsg, setShowMsg] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const agency_id = query.get("agency_id");

    const auth = useSelector((state: RootState) => state.auth);
    const hostingAgencies = useSelector(
        (state: RootState) => state.hostingAgencies
    );

    // useEffect => to close the modle and setShowMsg state to be false
    useEffect(() => {
        if (showMsg && !hostingAgencies.hostingDeleteAgencyLoading) {
            setShowMsg(false);
            toggleDeleteModel();
        }
    }, [showMsg, hostingAgencies.hostingDeleteAgencyLoading]);

    // Open and close the delete modle
    const toggleDeleteModel = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete agency
    const confirmDeleteHandler = (type: boolean) => {
        if (type) {
            dispatch(
                deleteHostingAgency({
                    id: agency_id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setShowMsg(true);
            return;
        }
        toggleDeleteModel();
    };

    return (
        <>
            <Button
                onClick={toggleDeleteModel}
                className="bg-darkRed text-white text-xs sm:text-sm"
            >
                <>
                    <RiDeleteBin6Line />
                    مسح الوكاله
                </>
            </Button>
            {/* Delete modle */}
            {showDeleteModel && <Backdrop onClose={toggleDeleteModel} />}
            <ConfirmDelete
                deleteBtnContent={
                    hostingAgencies.hostingDeleteAgencyLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={`هل انت متاكد من حذف الوكاله ذات الرقم التعرفيفى`}
                element={agency_id!}
                text="عند حذفك لهذه الوكاله لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفها"
            />
        </>
    );
};

export default DeleteAgencyButton;
