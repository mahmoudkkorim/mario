import React from "react";

// interface
import { FilteredBannersI } from "../../interfaces/pages/banners";

// components
import Spinner from "../ui/spinner/Spinner";
import Message from "../ui/Message";
import SingleBanner from "./SingleBanner";
import Pagination from "../ui/pagination/Pagination";

const FilteredBanners = (props: FilteredBannersI) => {
    const { error, filteredBanners, loading } = props;

    return loading ? (
        <Spinner />
    ) : error ? (
        <Message>{error}</Message>
    ) : filteredBanners?.current_page && filteredBanners.data.length > 0 ? (
        <>
            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                <span>عدد البنرات :</span>
                <span>{filteredBanners.total}</span>
            </div>
            <div className='mx-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-start justify-items-center mt-10'>
                {filteredBanners?.data.map((one, i) => (
                    <SingleBanner
                        key={i}
                        cover={one.cover}
                        created_at={one.created_at}
                        id={one.id}
                        related_to_id={one.related_to_id}
                        related_to_type={one.related_to_type}
                        updated_at={one.updated_at}
                        valid_to={one.valid_to}
                    />
                ))}
            </div>
            <Pagination
                total_pages={filteredBanners.total!}
                items_per_page={filteredBanners.per_page!}
            />
        </>
    ) : filteredBanners?.data.length === 0 ? (
        <Message>لا يوجد برنات</Message>
    ) : (
        <></>
    );
};

export default FilteredBanners;
