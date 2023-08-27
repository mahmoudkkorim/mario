import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { chargeUserHistory } from "../../../../../store/slices/agencies/chargeAgenciesSlice";

// components
import Spinner from "../../../../ui/spinner/Spinner";
import Message from "../../../../ui/Message";
import UserHistoryBody from "./UserHistoryBody";
import UserHistoryHeader from "./UserHistoryHeader";
import Pagination from "../../../../ui/pagination/Pagination";

// interfaces
import { UserHistoryTabel } from "../../../../../interfaces/pages/agencies/ChargeAgencies";

const UserHistory = (props: UserHistoryTabel) => {
    const { id, token } = props;
    const dispatch = useDispatch<AppDispatch>();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const chargeAgencies = useSelector(
        (state: RootState) => state.chargeAgencies
    );

    useEffect(() => {
        dispatch(chargeUserHistory({ id: id, token, page: page || 1 }));
    }, [dispatch, id, page, token]);

    console.log(chargeAgencies.ChargeUserHistoryData);
    // chargeAgencies.ChargeUserHistoryData?.history.total
    return (
        <>
            <h3 className='my-2 mt-10 pb-0.5 border-b-[1px] w-fit border-lightBlue'>
                تعاملات المسئول
            </h3>
            {chargeAgencies.ChargeUserHistoryLoading ? (
                <Spinner />
            ) : chargeAgencies.ChargeUserHistoryError ? (
                <Message>{chargeAgencies.ChargeUserHistoryError}</Message>
            ) : chargeAgencies.ChargeUserHistoryData?.history.total ? (
                <>
                    <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                        <span>عدد تعاملات الوكيل :</span>
                        <span>
                            {
                                chargeAgencies.ChargeUserHistoryData?.history
                                    .total
                            }
                        </span>
                    </div>
                    <table className='w-full mt-10'>
                        <>
                            <UserHistoryHeader />
                            <UserHistoryBody />
                        </>
                    </table>
                    <Pagination
                        total_pages={
                            chargeAgencies.ChargeUserHistoryData?.history.total
                        }
                        items_per_page={
                            chargeAgencies.ChargeUserHistoryData?.history
                                .per_page
                        }
                    />
                </>
            ) : (
                <div className='mt-5'>
                    <Message>لا يوجد تعاملات للمستخدم.</Message>
                </div>
            )}
        </>
    );
};

export default UserHistory;
