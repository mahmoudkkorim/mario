import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { specificVideoTarget } from "../../../../../store/slices/agencies/hostingAgency/target/videoTarget-hostingAgenciesSlice";

// components
import SpecificAudioVideoTarget from "../mutual/SpecificAudioVideoTarget";

const SpecificVideoTarget = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const target_id = query.get("target_id");

    const auth = useSelector((state: RootState) => state.auth);
    const videoTarget_hostingAgencies = useSelector(
        (state: RootState) => state.videoTarget_hostingAgencies
    );

    useEffect(() => {
        dispatch(
            specificVideoTarget({
                target_id: target_id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, target_id]);

    return (
        <SpecificAudioVideoTarget
            loading={videoTarget_hostingAgencies.specificVideoTargetLoading}
            specifcTarget={videoTarget_hostingAgencies.specificVideoTargetData}
            error={videoTarget_hostingAgencies.specificVideoTargetError}
        />
    );
};

export default SpecificVideoTarget;
