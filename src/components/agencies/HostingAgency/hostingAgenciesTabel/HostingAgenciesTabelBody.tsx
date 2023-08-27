import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/store";
import { deleteHostingAgency } from "../../../../store/slices/agencies/hostingAgency/hostingAgenciesSlice";

// utils
import ConvertNumberWishK_M from "../../../utils/ConvertNumberWishK_M";

// components
import Button from "../../../ui/Button";
import Backdrop from "../../../models/Backdrop";
import ConfirmDelete from "../../../models/ConfirmDelete";

// react icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";

const HostingAgenciesTabelBody = () => {
    const [showDeleteModel, setShowDeleteModel] = useState({
        type: false,
        agency_id: 0,
    });
    const [hideDeleteModel, setHideDeleteModel] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { pathname, search } = useLocation();

    const auth = useSelector((state: RootState) => state.auth);
    const hostingAgencies = useSelector(
        (state: RootState) => state.hostingAgencies
    );

    useEffect(() => {
        if (hideDeleteModel && !hostingAgencies.hostingDeleteAgencyLoading) {
            setHideDeleteModel(true);
            setShowDeleteModel({ type: false, agency_id: 0 });
        }
    }, [hideDeleteModel, hostingAgencies.hostingDeleteAgencyLoading]);

    // fun => show delete model
    const deleteAgencyHandler = (agency_id: number) => {
        setShowDeleteModel({ type: true, agency_id: agency_id });
    };

    // fun => hide delete model
    const closeDeleteModelHandler = () => {
        setShowDeleteModel({ type: false, agency_id: 0 });
    };

    // confirm delete => if the fun return true means delete desgin, if it false just close the model
    const confirmDeleteHandler = (deleteAgency: boolean) => {
        if (deleteAgency) {
            // delete agency
            dispatch(
                deleteHostingAgency({
                    id: showDeleteModel.agency_id,
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
            {hostingAgencies.hostingAllAgenciesData?.data &&
            hostingAgencies.hostingAllAgenciesData?.data.length > 0 ? (
                <tbody className="font-light text-sm">
                    {hostingAgencies.hostingAllAgenciesData?.data.map(
                        (agency, i) => (
                            <tr
                                key={i}
                                className={`border-b-[1px] hover:bg-white/30 border-white`}
                            >
                                <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                                    {i +
                                        1 +
                                        hostingAgencies.hostingAllAgenciesData
                                            ?.per_page! *
                                            (+hostingAgencies
                                                .hostingAllAgenciesData
                                                ?.current_page! -
                                                1)}
                                </td>
                                <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell">
                                    {agency.aid}
                                </td>
                                <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                                    {agency.members_count}
                                </td>
                                <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base  border-l-[1px] border-r-[1px] border-white">
                                    {agency.name.length > 10
                                        ? agency.name.slice(0, 5) + "..."
                                        : agency.name}
                                </td>
                                <td className="hidden mx-auto lg:table-cell py-3 pl-1 sm:pl-3 text-[10px] sm:text-base  border-l-[1px] border-white">
                                    <img
                                        loading="lazy"
                                        className="rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto"
                                        src={agency.owner.profile_picture}
                                        alt={`${agency.owner.name}_image`}
                                    />
                                </td>
                                <td className="hidden text-center sm:table-cell py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white">
                                    {agency.owner.name}
                                </td>
                                <td className="py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white">
                                    <Button
                                        className="mx-auto text-xs p-1 sm:p-1.5 font-normal sm:text-sm"
                                        deleteBtn
                                        onClick={deleteAgencyHandler.bind(
                                            null,
                                            agency.id
                                        )}
                                    >
                                        <RiDeleteBin5Line />
                                    </Button>
                                </td>
                                <td className=" py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white">
                                    <Button
                                        type="link"
                                        className="text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white"
                                        to={`${pathname + search}&agency_id=${
                                            agency.id
                                        }`}
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
                                hostingAgencies.hostingDeleteAgencyLoading
                                    ? "الرجاء الانتظار..."
                                    : "أحذف"
                            }
                            showDeleteModel={showDeleteModel.type}
                            confirmDeleteHandler={confirmDeleteHandler}
                            header={`هل انت متاكد من حذف الوكاله ذات الرقم التعرفيفى`}
                            element={showDeleteModel.agency_id.toString()}
                            text="عند حذفك لهذه الوكاله لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفها"
                        />
                    </td>
                </tr>
            </tfoot>
        </>
    );
};

export default HostingAgenciesTabelBody;
