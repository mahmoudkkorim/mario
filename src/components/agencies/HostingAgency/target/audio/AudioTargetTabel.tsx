import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { allAudioTarget } from "../../../../../store/slices/agencies/hostingAgency/target/audioTarget-hostingAgenciesSlice";

// Components
import TargetTabel from "../mutual/tabel/TargetTabel";

const AudioTargetTabel = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const audioTarget_hostingAgencies = useSelector(
        (state: RootState) => state.audioTarget_hostingAgencies
    );

    useEffect(() => {
        dispatch(allAudioTarget({ token: auth.loginData?.access_token! }));
    }, [auth.loginData?.access_token, dispatch]);

    return (
        <TargetTabel
            loading={audioTarget_hostingAgencies.allAudioTargetLoading}
            allTargetData={audioTarget_hostingAgencies.allAudioTargetData}
            error={audioTarget_hostingAgencies.allAudioTargetError}
        />
    );
};

export default AudioTargetTabel;
