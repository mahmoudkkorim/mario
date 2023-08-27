import React from "react";

import AgenciesNav from "../components/agencies/AgenciesNav";
import Agencies from "../components/agencies/Agencies";

const AgenciesPage = () => {
    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <AgenciesNav />
            <Agencies />
        </section>
    );
};

export default AgenciesPage;
