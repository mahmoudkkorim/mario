import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { chargeIndexCopy } from "../../store/slices/agencies/chargeAgenciesSlice";

// components

// charge agency
import ChargeAgenciesTabel from "./chargeAgencies/chargeAgenciesTabel/ChargeAgenciesTabel";
import SpecificAgency from "./chargeAgencies/specificAgency/SpecificAgency";
import AdminHistory from "./chargeAgencies/history/admin/AdminHistory";
import UserHistory from "./chargeAgencies/history/users/UserHistory";

// hosting agency
import HostingAgenciesTabel from "./HostingAgency/hostingAgenciesTabel/HostingAgenciesTabel";
import SpecificHostingAgency from "./HostingAgency/specificAgency/SpecificAgency";

// targets
import AudioTargetTabel from "./HostingAgency/target/audio/AudioTargetTabel";
import VideoTargetTabel from "./HostingAgency/target/video/VideoTargetTabel";
import SpecificAudioTarget from "./HostingAgency/target/audio/SpecificAudioTarget";
import SpecificVideoTarget from "./HostingAgency/target/video/SpecificVideoTarget";

const Agencies = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const currentAgency = query.get("type");
    const agency_id = query.get("agency_id");
    const target_id = query.get("target_id");
    const target = query.get("target");
    const deal = query.get("deal");
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(
            chargeIndexCopy({
                token: auth.loginData?.access_token!,
                page: page || 1,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return (
        <div className="w-full relative">
            {currentAgency === "charge" && !agency_id ? (
                <ChargeAgenciesTabel />
            ) : currentAgency === "charge" && agency_id && !deal ? (
                <SpecificAgency
                    agency_id={agency_id}
                    token={auth.loginData?.access_token!}
                />
            ) : currentAgency === "charge" && agency_id && deal === "admin" ? (
                <AdminHistory
                    agency_id={agency_id}
                    token={auth.loginData?.access_token!}
                />
            ) : currentAgency === "charge" && agency_id && deal === "user" ? (
                <UserHistory
                    id={agency_id}
                    token={auth.loginData?.access_token!}
                />
            ) : currentAgency === "hosting" && !agency_id && !target ? (
                <HostingAgenciesTabel />
            ) : currentAgency === "hosting" && agency_id && !target ? (
                <SpecificHostingAgency
                    agency_id={agency_id}
                    token={auth.loginData?.access_token!}
                />
            ) : currentAgency === "hosting" &&
              !agency_id &&
              !target_id &&
              target === "video" ? (
                <VideoTargetTabel />
            ) : currentAgency === "hosting" &&
              !agency_id &&
              !target_id &&
              target === "audio" ? (
                <AudioTargetTabel />
            ) : currentAgency === "hosting" &&
              !agency_id &&
              target_id &&
              target === "video" ? (
                <SpecificVideoTarget />
            ) : (
                <SpecificAudioTarget />
            )}
        </div>
    );
};

export default Agencies;
