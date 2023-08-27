import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { AllHostingAgencies } from "../../../../store/slices/agencies/hostingAgency/hostingAgenciesSlice";

// components
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import Pagination from "../../../ui/pagination/Pagination";
import HostingAgenciesTabelHeader from "./HostingAgenciesTabelHeader";
import HostingAgenciesTabelBody from "./HostingAgenciesTabelBody";

const HostingAgenciesTabel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const hostingAgencies = useSelector(
        (state: RootState) => state.hostingAgencies
    );

    useEffect(() => {
        dispatch(
            AllHostingAgencies({
                token: auth.loginData?.access_token!,
                page: page || 1,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return hostingAgencies.hostingAllAgenciesLoading ? (
        <Spinner />
    ) : hostingAgencies.hostingAllAgenciesError ? (
        <Message>{hostingAgencies.hostingAllAgenciesError}</Message>
    ) : hostingAgencies.hostingAllAgenciesData?.total ? (
        <>
            <div className="flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs">
                <span>عدد وكلاء المضيفين :</span>
                <span>{hostingAgencies.hostingAllAgenciesData?.total}</span>
            </div>
            <table className="w-full">
                <HostingAgenciesTabelHeader />
                <HostingAgenciesTabelBody />
            </table>
            <Pagination
                total_pages={hostingAgencies.hostingAllAgenciesData.total}
                items_per_page={hostingAgencies.hostingAllAgenciesData.per_page}
            />
        </>
    ) : (
        <div className="mt-5">
            <Message>لا يوجد وكالات.</Message>
        </div>
    );
};

export default HostingAgenciesTabel;
