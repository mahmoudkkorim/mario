import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { specificAudioTarget } from "../../../../../store/slices/agencies/hostingAgency/target/audioTarget-hostingAgenciesSlice";

// components
import SpecificAudioVideoTarget from "../mutual/SpecificAudioVideoTarget";

const SpecificAudioTarget = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const target_id = query.get("target_id");

    const auth = useSelector((state: RootState) => state.auth);
    const audioTarget_hostingAgencies = useSelector(
        (state: RootState) => state.audioTarget_hostingAgencies
    );

    useEffect(() => {
        dispatch(
            specificAudioTarget({
                target_id: target_id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, target_id]);

    return (
        <SpecificAudioVideoTarget
            loading={audioTarget_hostingAgencies.specificAudioTargetLoading}
            specifcTarget={audioTarget_hostingAgencies.specificAudioTargetData}
            error={audioTarget_hostingAgencies.specificAudioTargetError}
        />
    );
};

export default SpecificAudioTarget;
