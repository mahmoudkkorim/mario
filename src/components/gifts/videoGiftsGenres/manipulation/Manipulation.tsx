import React from "react";

// components
import CreateEditVideoGiftsGenre from "./CreateEditVideoGiftsGenre";
import DeleteVideoGiftsGenre from "./DeleteVideoGiftsGenre";

const Manipulation = () => {
    return (
        <div className='flex flex-wrap justify-end gap-3 sm:gap-5 mt-5'>
            <CreateEditVideoGiftsGenre />
            <DeleteVideoGiftsGenre />
        </div>
    );
};

export default Manipulation;
