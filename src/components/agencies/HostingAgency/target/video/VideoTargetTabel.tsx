import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { allVideoTarget } from "../../../../../store/slices/agencies/hostingAgency/target/videoTarget-hostingAgenciesSlice";

// Components
import TargetTabel from "../mutual/tabel/TargetTabel";

const VideoTargetTabel = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const videoTarget_hostingAgencies = useSelector(
        (state: RootState) => state.videoTarget_hostingAgencies
    );

    useEffect(() => {
        dispatch(allVideoTarget({ token: auth.loginData?.access_token! }));
    }, [auth.loginData?.access_token, dispatch]);

    return (
        <TargetTabel
            loading={videoTarget_hostingAgencies.allVideoTargetLoading}
            allTargetData={videoTarget_hostingAgencies.allVideoTargetData}
            error={videoTarget_hostingAgencies.allVideoTargetError}
        />
    );
};

export default VideoTargetTabel;
