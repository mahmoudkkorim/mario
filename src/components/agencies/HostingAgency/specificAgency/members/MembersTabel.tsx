import React from "react";

// components
import MembersTabelHeader from "./MembersTabelHeader";
import MembersTabelBody from "./MembersTabelBody";

// interfaces
import { specficHostingAgencyMembersTabel } from "../../../../../interfaces/pages/agencies/hostingAgencies/HostingAgencies";

const MembersTabel = (props: specficHostingAgencyMembersTabel) => {
    const { members } = props;

    return (
        <table className="w-full">
            <>
                <MembersTabelHeader />
                <MembersTabelBody members={members} />
            </>
        </table>
    );
};

export default MembersTabel;
