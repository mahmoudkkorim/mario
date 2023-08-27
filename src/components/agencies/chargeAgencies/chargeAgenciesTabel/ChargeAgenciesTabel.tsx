import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

// components
import ChargeAgenciesTabelHeader from "./ChargeAgenciesTabelHeader";
import ChargeAgenciesTabelBody from "./ChargeAgenciesTabelBody";
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import Pagination from "../../../ui/pagination/Pagination";

const ChargeAgenciesTabel = () => {
    const chargeAgencies = useSelector(
        (state: RootState) => state.chargeAgencies
    );

    return chargeAgencies.ChargeIndexCopyLoading ? (
        <Spinner />
    ) : chargeAgencies.ChargeIndexCopyError ? (
        <Message>{chargeAgencies.ChargeIndexCopyError}</Message>
    ) : chargeAgencies.ChargeIndexCopyData?.total ? (
        <>
            <div className="flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs">
                <span>عدد وكلاء الشحن :</span>
                <span>{chargeAgencies.ChargeIndexCopyData?.total}</span>
            </div>
            <table className="w-full">
                <ChargeAgenciesTabelHeader />
                <ChargeAgenciesTabelBody />
            </table>
            <Pagination
                total_pages={chargeAgencies.ChargeIndexCopyData.total}
                items_per_page={chargeAgencies.ChargeIndexCopyData.per_page}
            />
        </>
    ) : (
        <div className="mt-5">
            <Message>لا يوجد وكالات.</Message>
        </div>
    );
};

export default ChargeAgenciesTabel;
