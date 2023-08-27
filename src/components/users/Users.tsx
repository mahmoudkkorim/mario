import React from "react";

// components
import UsersTabel from "./users/usersTabel/UsersTabel";
import PagesHeaders from "../ui/PagesHeaders";
import ChargeRollBackBalance from "../diamond/charge-rollBack-balance/ChargeRollBackBalance";
import SearchForUser from "./users/SearchForUser";

const Users = () => {
    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>الاعضاء</PagesHeaders>
            {/* search for user */}
            <SearchForUser />
            {/* ChargeRollBackBalance */}
            <ChargeRollBackBalance />
            <UsersTabel />
        </section>
    );
};

export default Users;
