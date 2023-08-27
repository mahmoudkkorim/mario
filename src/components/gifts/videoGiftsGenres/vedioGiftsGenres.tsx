import React from "react";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import VedioGiftsGenresTabel from "./vedioGiftsGenresTabel/VedioGiftsGenresTabel";
import Manipulation from "./manipulation/Manipulation";

const VedioGiftsGenres = () => {
    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>انواع هدايا الفيديو</PagesHeaders>
            {/* Manipulation */}
            <Manipulation />
            <VedioGiftsGenresTabel />
        </section>
    );
};

export default VedioGiftsGenres;
