import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { chargeAdminHistory } from "../../../../../store/slices/agencies/chargeAgenciesSlice";

// interfaces
import { SpecificAgencyI } from "../../../../../interfaces/pages/agencies/ChargeAgencies";

// components
import AdminHistoryHeader from "./AdminHistoryHeader";
import AdminHistoryBody from "./AdminHistoryBody";
import Spinner from "../../../../ui/spinner/Spinner";
import Message from "../../../../ui/Message";
import Pagination from "../../../../ui/pagination/Pagination";

const AdminHistory = (props: SpecificAgencyI) => {
    const { agency_id, token } = props;
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const chargeAgencies = useSelector(
        (state: RootState) => state.chargeAgencies
    );

    useEffect(() => {
        dispatch(chargeAdminHistory({ id: agency_id, token, page: page || 1 }));
    }, [agency_id, dispatch, page, token]);

    return (
        <>
            <h3 className='my-2 mt-10 pb-0.5 border-b-[1px] w-fit border-lightBlue'>
                تعاملات المسئول
            </h3>
            {chargeAgencies.ChargeAdminHistoryLoading ? (
                <Spinner />
            ) : chargeAgencies.ChargeAdminHistoryError ? (
                <Message>{chargeAgencies.ChargeAdminHistoryError}</Message>
            ) : chargeAgencies.ChargeAdminHistoryData?.history.total ? (
                <>
                    <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                        <span>عدد تعاملات المسئول :</span>
                        <span>
                            {
                                chargeAgencies.ChargeAdminHistoryData?.history
                                    .total
                            }
                        </span>
                    </div>
                    <table className='w-full'>
                        <>
                            <AdminHistoryHeader />
                            <AdminHistoryBody />
                        </>
                    </table>
                    <Pagination
                        total_pages={
                            chargeAgencies.ChargeAdminHistoryData?.history.total
                        }
                        items_per_page={
                            chargeAgencies.ChargeAdminHistoryData?.history
                                .per_page
                        }
                    />
                </>
            ) : (
                <div className='mt-5'>
                    <Message>لا يوجد تعاملات للمسئول.</Message>
                </div>
            )}
        </>
    );
};

export default AdminHistory;
