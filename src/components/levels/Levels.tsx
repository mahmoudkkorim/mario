import React from "react";

// components
import PagesHeaders from "../ui/PagesHeaders";
import LevelsTabel from "./levelsTabel/LevelsTabel";

const Levels = () => {
    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>المستويات</PagesHeaders>
            <LevelsTabel />
        </section>
    );
};

export default Levels;
