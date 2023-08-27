import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { allBanners, activeBanners } from "../../store/slices/bannersSlice";

// Components
import PagesHeaders from "../ui/PagesHeaders";
import Button from "../ui/Button";
import FilterSort from "../ui/FilterSort";
import FilteredBanners from "./FilteredBanners";
import CreateEditBanner from "./CreateEditBanner";

// data
import { FILTER_BANNERS } from "../../data/filterTypes";

const Banners = () => {
    // current filtered type
    const [currentFilteredType, setCurrentFilteredType] = useState("all");

    const dispatch = useDispatch<AppDispatch>();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const updateBanner = query.get("updateBanner");
    const createBanner = query.get("createBanner");
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const banners = useSelector((state: RootState) => state.banners);

    // useEffect to get all diamond for api
    useEffect(() => {
        if (currentFilteredType === "all") {
            dispatch(
                allBanners({
                    token: auth.loginData?.access_token!,
                    page: page || 1,
                })
            );
        } else {
            dispatch(
                activeBanners({
                    token: auth.loginData?.access_token!,
                    page: page || 1,
                })
            );
        }
    }, [auth.loginData?.access_token, dispatch, page, currentFilteredType]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFilteredType(e.target.value);
    };

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>البنرات</PagesHeaders>
            {updateBanner || createBanner ? (
                <CreateEditBanner />
            ) : (
                <>
                    <div className='flex justify-end'>
                        <Button
                            className='bg-success text-white'
                            to='/banners?createBanner=true'
                            type='link'
                        >
                            إنشاء بانر
                        </Button>
                    </div>
                    {/* Filter and sort */}
                    <FilterSort
                        Array={FILTER_BANNERS}
                        onChange={onChange}
                        currentFilteredType={currentFilteredType}
                    />
                    <FilteredBanners
                        error={
                            currentFilteredType === "all"
                                ? banners.allBannersError
                                : banners.activeBannersError
                        }
                        filteredBanners={
                            currentFilteredType === "all"
                                ? banners.allBannersData
                                : banners.activeBannersData
                        }
                        loading={
                            currentFilteredType === "all"
                                ? banners.allBannersLoading
                                : banners.activeBannersLoading
                        }
                    />
                </>
            )}
        </section>
    );
};

export default Banners;
