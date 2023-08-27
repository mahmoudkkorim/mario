import React from "react";

// interface
import { FiterSortI } from "../../interfaces/public";

const FilterSort = (props: FiterSortI) => {
    const { Array, onChange, currentFilteredType } = props;

    return (
        <div className="my-5 flex flex-col gap-2">
            <h3 className="text-lg font-light">تصفية وفرز النوع</h3>
            <div className="flex flex-row flex-wrap gap-3 text-sm sm:text-base lg:gap-10 items-center ">
                {Array.map((type) => (
                    <div key={type.type} className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            id={type.type}
                            name={type.type}
                            value={type.type}
                            onChange={onChange}
                            checked={type.type === currentFilteredType}
                        />
                        <label className="font-extralight" htmlFor={type.type}>
                            {type.text}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterSort;
