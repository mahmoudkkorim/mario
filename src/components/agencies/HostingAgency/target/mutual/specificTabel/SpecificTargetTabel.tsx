import React from "react";

// components
import SpecificTargetHeader from "./SpecificTargetHeader";
import SpecificTargetBody from "./SpecificTargetBody";
import Message from "../../../../../ui/Message";

// interface
import { SpecficTargetTabelI } from "../../../../../../interfaces/pages/agencies/hostingAgencies/target/AudioVideoTarget";

const SpecficTargetTabel = (props: SpecficTargetTabelI) => {
    const { agencies_members } = props;

    return (
        <>
            {agencies_members && agencies_members.length > 0 ? (
                <>
                    <table className="w-full mt-5">
                        <SpecificTargetHeader />
                        <SpecificTargetBody
                            agencies_members={agencies_members}
                        />
                    </table>
                </>
            ) : (
                <Message>لا يوجد اعضاء وكلات</Message>
            )}
        </>
    );
};

export default SpecficTargetTabel;
