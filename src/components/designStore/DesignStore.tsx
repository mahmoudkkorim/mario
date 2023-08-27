import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    allDesignsStore as allDesignsStoreFun,
    sortedFilteredDesignsStore as sortedFilteredDesignsStoreFun,
} from "../../store/slices/designStoreSlice";

// components
import SingleDesign from "./SingleDesign";
import Spinner from "../ui/spinner/Spinner";
import Button from "../ui/Button";
import Message from "../ui/Message";
import CreateEditStore from "./CreateEditStore";
import PagesHeaders from "../ui/PagesHeaders";
import Pagination from "../ui/pagination/Pagination";
import FilterSort from "../ui/FilterSort";

// interfaces
import { AllDesignsStore } from "../../interfaces/pages/DesignStore";

// data
import { FILTER_TYPES } from "../../data/filterTypes";

const DesignStore = () => {
    // This state will handle designsStore without sorting and with sorting
    const [currentDesignsStore, setCurrentDesignsStore] =
        useState<null | AllDesignsStore>(null);
    // current filtered type
    const [currentFilteredType, setCurrentFilteredType] = useState("all");

    const location = useLocation();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const updateStore = query.get("updateStore");
    const createStore = query.get("createStore");
    const page = query.get("page");

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const designStore = useSelector((state: RootState) => state.designStore);

    // effect => to get all designs store
    useEffect(() => {
        dispatch(
            allDesignsStoreFun({
                token: auth.loginData?.access_token!,
                page: page || 1,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    // effect => to get all design store or fitlerd sored designs store
    useEffect(() => {
        if (currentFilteredType === "all") {
            dispatch(
                allDesignsStoreFun({
                    token: auth.loginData?.access_token!,
                    page: page || 1,
                })
            );
        } else {
            dispatch(
                sortedFilteredDesignsStoreFun({
                    token: auth.loginData?.access_token!,
                    type: currentFilteredType,
                    page: page || 1,
                })
            );
        }
    }, [auth.loginData?.access_token, currentFilteredType, dispatch, page]);

    useEffect(() => {
        if (currentFilteredType === "all") {
            setCurrentDesignsStore(designStore.allDesignsStoreData);
        } else {
            setCurrentDesignsStore(designStore.sortedFilteredDesignsStoreData);
        }
    }, [
        currentFilteredType,
        designStore.allDesignsStoreData,
        designStore.sortedFilteredDesignsStoreData,
    ]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFilteredType(e.target.value);
    };

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>متجر التصاميم</PagesHeaders>
            {updateStore || createStore ? (
                <CreateEditStore />
            ) : (
                <>
                    <div className='flex justify-end'>
                        <Button
                            className='bg-success text-white'
                            to='/designStore?createStore=true'
                            type='link'
                        >
                            إنشاء تصميم جديد
                        </Button>
                    </div>
                    {/* Filter and sort */}
                    <FilterSort
                        Array={FILTER_TYPES}
                        onChange={onChange}
                        currentFilteredType={currentFilteredType}
                    />
                    {(
                        currentFilteredType === "all"
                            ? designStore.allDesignsStoreLoading
                            : designStore.sortedFilteredDesignsStoreLoading
                    ) ? (
                        <Spinner />
                    ) : (
                          currentFilteredType === "all"
                              ? designStore.allDesignsStoreError
                              : designStore.sortedFilteredDesignsStoreError
                      ) ? (
                        <Message>
                            {currentFilteredType === "all"
                                ? designStore.allDesignsStoreError
                                : designStore.sortedFilteredDesignsStoreError}
                        </Message>
                    ) : currentDesignsStore !== null &&
                      currentDesignsStore?.data &&
                      currentDesignsStore?.data.length > 0 ? (
                        <>
                            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                                <span>عدد التصميمات :</span>
                                <span>{currentDesignsStore.total}</span>
                            </div>
                            <div className='mx-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-start justify-items-center mt-10'>
                                {currentDesignsStore.data.map((one, i) => (
                                    <SingleDesign
                                        key={i}
                                        cover={one.cover}
                                        created_at={one.created_at}
                                        currency_type={one.currency_type}
                                        id={one.id}
                                        is_free={one.is_free}
                                        name={one.name}
                                        price={one.price}
                                        svga={one.svga}
                                        type={one.type}
                                        updated_at={one.updated_at}
                                        users_count={one.users_count}
                                        valid_days={one.valid_days}
                                    />
                                ))}
                            </div>
                            <Pagination
                                total_pages={
                                    designStore.allDesignsStoreData?.total!
                                }
                                items_per_page={
                                    designStore.allDesignsStoreData?.per_page!
                                }
                            />
                        </>
                    ) : currentDesignsStore?.data.length === 0 ? (
                        <Message> لا يوجد تصميمات </Message>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </section>
    );
};

export default DesignStore;
