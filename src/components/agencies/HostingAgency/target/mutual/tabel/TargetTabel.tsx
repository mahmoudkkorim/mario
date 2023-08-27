import React from "react";
import { useLocation } from "react-router-dom";

// components
import TargetTabelHeader from "./TargetTabelHeader";
import TargetTabelBody from "./TargetTabelBody";
import Spinner from "../../../../../ui/spinner/Spinner";
import Message from "../../../../../ui/Message";

// interfaces
import { targetI } from "../../../../../../interfaces/pages/agencies/hostingAgencies/target/AudioVideoTarget";

const TargetTabel = (props: targetI) => {
    const { allTargetData, error, loading } = props;

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const target = query.get("target");

    return loading ? (
        <Spinner />
    ) : error ? (
        <Message>{error}</Message>
    ) : allTargetData ? (
        <>
            <div className="flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs">
                <span>
                    عدد تارجيت {target === "audio" ? "الصوتيه" : "الفيديوهات"} :
                </span>
                <span>{allTargetData?.length}</span>
            </div>
            <table className="w-full ">
                <TargetTabelHeader />
                <TargetTabelBody
                    allTargetData={allTargetData}
                    error={error}
                    loading={loading}
                />
            </table>
        </>
    ) : (
        <div className="mt-5">
            <Message>لا يوجد تارجيت فيديوهات.</Message>
        </div>
    );
};

export default TargetTabel;
