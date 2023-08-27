import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { allDiamondPackages } from "../../store/slices/diamondSlice";

// components
import PagesHeaders from "../ui/PagesHeaders";
import Pagination from "../ui/pagination/Pagination";
import Message from "../ui/Message";
import Button from "../ui/Button";
import Spinner from "../ui/spinner/Spinner";
import SingleDiamond from "./SingleDiamond";
import CreateEditDiamond from "./CreateEditDiamond";
import ChargeRollBackBalance from "./charge-rollBack-balance/ChargeRollBackBalance";

const AllDiamond = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const updateDiamond = query.get("updateDiamond");
    const createDiamond = query.get("createDiamond");
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const diamond = useSelector((state: RootState) => state.diamond);

    // useEffect to get all diamond for api
    useEffect(() => {
        dispatch(
            allDiamondPackages({
                token: auth.loginData?.access_token!,
                page: page || 1,
            })
        );
    }, [auth.loginData?.access_token, dispatch, page]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>الماسات</PagesHeaders>
            {updateDiamond || createDiamond ? (
                <CreateEditDiamond />
            ) : (
                <>
                    <div className='flex justify-end'>
                        <Button
                            className='bg-success text-white'
                            to='/diamond?createDiamond=true'
                            type='link'
                        >
                            إنشاء ماسه
                        </Button>
                    </div>
                    {/* ChargeRollBackBalance */}
                    <ChargeRollBackBalance />
                    {diamond.allDiamondPackagesLoading ? (
                        <Spinner />
                    ) : diamond.allDiamondPackagesError ? (
                        <Message>{diamond.allDiamondPackagesError}</Message>
                    ) : diamond.allDiamondPackagesData?.current_page &&
                      diamond.allDiamondPackagesData.data.length > 0 ? (
                        <>
                            <div className='flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs'>
                                <span>عدد الماسات :</span>
                                <span>
                                    {diamond.allDiamondPackagesData.total}
                                </span>
                            </div>
                            <div className='mx-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-start justify-items-center mt-10'>
                                {diamond.allDiamondPackagesData?.data.map(
                                    (one, i) => (
                                        <SingleDiamond
                                            key={i}
                                            cover={one.cover}
                                            created_at={one.created_at}
                                            id={one.id}
                                            price={one.price}
                                            quantity={one.quantity}
                                            updated_at={one.updated_at}
                                        />
                                    )
                                )}
                            </div>
                            <Pagination
                                total_pages={
                                    diamond.allDiamondPackagesData.total!
                                }
                                items_per_page={
                                    diamond.allDiamondPackagesData.per_page!
                                }
                            />
                        </>
                    ) : diamond.allDiamondPackagesData?.data.length === 0 ? (
                        <Message>لا يوجد ماسات</Message>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </section>
    );
};

export default AllDiamond;
