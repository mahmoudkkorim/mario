import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { chargeShowCopy } from "../../../../store/slices/agencies/chargeAgenciesSlice";

// interface
import { SpecificAgencyI } from "../../../../interfaces/pages/agencies/ChargeAgencies";

// utils
import ConvertNumberWishK_M from "../../../utils/ConvertNumberWishK_M";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

// components
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import Button from "../../../ui/Button";

// icons
import { RiAdminFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import SpecifcRowDataForSpecifcItem from "../../../utils/SpecifcRowDataForSpecifcItem";

const SpecificAgency = (props: SpecificAgencyI) => {
    const { agency_id, token } = props;
    const { pathname, search } = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const chargeAgencies = useSelector(
        (state: RootState) => state.chargeAgencies
    );

    useEffect(() => {
        dispatch(chargeShowCopy({ id: agency_id, token: token }));
    }, [agency_id, dispatch, token]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            {chargeAgencies.ChargeShowCopyLoading ? (
                <Spinner />
            ) : chargeAgencies.ChargeShowCopyError ? (
                <Message>{chargeAgencies.ChargeShowCopyError}</Message>
            ) : chargeAgencies.ChargeShowCopyData?.charge_agent_no ? (
                <section className='mt-2 mr-5'>
                    <h3 className='my-2 pb-0.5 border-b-[1px] w-fit border-lightBlue'>
                        وكيل{" "}
                        {chargeAgencies.ChargeShowCopyData?.charge_agent_no}
                    </h3>
                    {/* owner section */}
                    <h3 className='my-2 pb-0.5 text-sm font-semibold mt-10 border-b-[1px] w-fit border-lightBlue'>
                        المالك
                    </h3>
                    <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-10 mt-5'>
                        <img
                            className='rounded-full w-52 h-52 bg-cover self-center'
                            src={
                                chargeAgencies.ChargeShowCopyData?.owner
                                    .profile_picture
                            }
                            alt={chargeAgencies.ChargeShowCopyData?.owner.name}
                        />
                        <div className='flex flex-col gap-2 mx-3 sm:mx-none'>
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    chargeAgencies.ChargeShowCopyData?.owner
                                        .name
                                }
                                text='الاسم'
                            />
                            {chargeAgencies.ChargeShowCopyData?.owner.phone && (
                                <SpecifcRowDataForSpecifcItem
                                    data={
                                        chargeAgencies.ChargeShowCopyData?.owner
                                            .phone
                                    }
                                    text='رقم التليفون'
                                />
                            )}

                            <SpecifcRowDataForSpecifcItem
                                data={ConvertNumberWishK_M(
                                    chargeAgencies.ChargeShowCopyData?.owner
                                        .gold_balance!,
                                    1
                                )}
                                text='رصيد الذهب'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={ConvertNumberWishK_M(
                                    chargeAgencies.ChargeShowCopyData?.owner
                                        .diamond_balance!,
                                    1
                                )}
                                text='رصيد الماس'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            chargeAgencies.ChargeShowCopyData
                                                ?.owner.created_at!
                                        }
                                    />
                                }
                                text='إنشئ في'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            chargeAgencies.ChargeShowCopyData
                                                ?.owner.created_at!
                                        }
                                    />
                                }
                                text='إنشئ في'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    chargeAgencies.ChargeShowCopyData?.owner
                                        .device_id
                                }
                                text='رقم الجهاز'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    chargeAgencies.ChargeShowCopyData?.owner
                                        .country_code
                                }
                                text='البلد'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <Link
                                        className='text-xs sm:text-sm border-b-[1px] hover:-translate-y-1 block duration-200'
                                        to={`/members/${chargeAgencies.ChargeShowCopyData?.owner.id}`}
                                    >
                                        {`صفحه ${chargeAgencies.ChargeShowCopyData?.owner.name}`}
                                    </Link>
                                }
                                text='صفحه المالك'
                            />
                        </div>
                    </div>
                    {/* owner section */}
                    <h3 className='my-2 pb-0.5 text-sm font-semibold mt-10 border-b-[1px] w-fit border-lightBlue'>
                        الوكاله
                    </h3>
                    <div className='flex flex-col gap-2 mx-3 sm:mx-non'>
                        <SpecifcRowDataForSpecifcItem
                            data={
                                chargeAgencies.ChargeShowCopyData
                                    ?.charge_agent_no
                            }
                            text='رقم الوكاله'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={chargeAgencies.ChargeShowCopyData?.balance}
                            text='رصيد الوكاله'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={
                                <CreatedAt
                                    createdAt={
                                        chargeAgencies.ChargeShowCopyData
                                            ?.created_at!
                                    }
                                />
                            }
                            text='إنشئت الوكاله فى'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={
                                <CreatedAt
                                    createdAt={
                                        chargeAgencies.ChargeShowCopyData
                                            ?.updated_at!
                                    }
                                />
                            }
                            text='التعديل الاخير للوكاله فى'
                        />
                    </div>
                    <h3 className='my-2 pb-0.5 border-b-[1px] mt-10 w-fit border-lightBlue'>
                        التعاملات
                    </h3>
                    <div className='mt-10 flex justify-center gap-3 sm:gap-10 text-xs sm:text-sm'>
                        <Button
                            type='link'
                            className='bg-darkRed text-white'
                            to={`${pathname + search}&deal=admin`}
                        >
                            <>
                                <RiAdminFill />
                                تعاملاته مع الاداره
                            </>
                        </Button>
                        <Button
                            type='link'
                            className='text-white bg-success'
                            to={`${pathname + search}&deal=user`}
                        >
                            <>
                                <PiUsersThreeFill />
                                تعاملاته مع المستخدمين
                            </>
                        </Button>
                    </div>
                </section>
            ) : (
                <div className='mt-5'>
                    <Message>الوكاله غير موجوده.</Message>
                </div>
            )}
        </section>
    );
};

export default SpecificAgency;
