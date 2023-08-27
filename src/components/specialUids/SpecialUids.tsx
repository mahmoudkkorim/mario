import React from "react";

// components
import PagesHeaders from "../ui/PagesHeaders";
import SpecialUidsTabel from "./SpecialUidsTabel/SpecialUidsTabel";
import CreateEditSpecialUid from "./manipulation/CreateEditSpecialUid";

const SpecialUids = () => {
    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <>
                <PagesHeaders>الارقام المميزه</PagesHeaders>
                {/* CreateEditSpecialUid */}
                <CreateEditSpecialUid />
                <SpecialUidsTabel />
            </>
        </section>
    );
};

export default SpecialUids;
