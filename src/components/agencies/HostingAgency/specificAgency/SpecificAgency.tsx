import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { specficHostingAgency } from "../../../../store/slices/agencies/hostingAgency/hostingAgenciesSlice";

// interfaces
import { SpecificAgencyI } from "../../../../interfaces/pages/agencies/ChargeAgencies";

// utils
import ConvertNumberWishK_M from "../../../utils/ConvertNumberWishK_M";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

// components
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import Button from "../../../ui/Button";
import MembersTabel from "./members/MembersTabel";
import PagesHeaders from "../../../ui/PagesHeaders";
import SpecifcRowDataForSpecifcItem from "../../../utils/SpecifcRowDataForSpecifcItem";

// icons
import { RiAdminFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { AiOutlineLink } from "react-icons/ai";

const SpecificAgency = (props: SpecificAgencyI) => {
    const { agency_id, token } = props;
    const { pathname, search } = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const hostingAgencies = useSelector(
        (state: RootState) => state.hostingAgencies
    );

    useEffect(() => {
        dispatch(specficHostingAgency({ id: agency_id, token: token }));
    }, [agency_id, dispatch, token]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            {hostingAgencies.hostingSpecificAgencyLoading ? (
                <Spinner />
            ) : hostingAgencies.hostingSpecificAgencyError ? (
                <Message>{hostingAgencies.hostingSpecificAgencyError}</Message>
            ) : hostingAgencies.hostingSpecificAgencyData?.name ? (
                <section className='mt-2 mr-5'>
                    <h3 className='my-2 pb-0.5 border-b-[1px] w-fit border-lightBlue'>
                        {hostingAgencies.hostingSpecificAgencyData?.name}
                    </h3>

                    {/* owner section */}
                    <PagesHeaders small>المالك</PagesHeaders>
                    <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-10 mt-5'>
                        <img
                            className='rounded-full w-52 h-52 bg-cover self-center'
                            src={
                                hostingAgencies.hostingSpecificAgencyData?.owner
                                    .profile_picture
                            }
                            alt={
                                hostingAgencies.hostingSpecificAgencyData?.owner
                                    .name
                            }
                        />
                        <div className='flex flex-col gap-2 mx-3 sm:mx-none'>
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.owner.name
                                }
                                text='الاسم'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.owner.phone
                                }
                                text='رقم التليفون'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={ConvertNumberWishK_M(
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.owner.gold_balance,
                                    1
                                )}
                                text='رصيد الذهب'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={ConvertNumberWishK_M(
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.owner.diamond_balance,
                                    1
                                )}
                                text='رصيد الماس'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            hostingAgencies
                                                .hostingSpecificAgencyData
                                                ?.owner.created_at
                                        }
                                    />
                                }
                                text='أنشئ في'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            hostingAgencies
                                                .hostingSpecificAgencyData
                                                ?.owner.updated_at
                                        }
                                    />
                                }
                                text='اخر تعديل في'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.owner.device_id
                                }
                                text='رقم الجهاز'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.owner.country_code
                                }
                                text='البلد'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <Link
                                        className='text-xs sm:text-sm border-b-[1px] hover:-translate-y-1 block duration-200'
                                        to={`/members/${hostingAgencies.hostingSpecificAgencyData.owner.id}`}
                                    >
                                        {`صفحه ${hostingAgencies.hostingSpecificAgencyData.owner.name}`}
                                    </Link>
                                }
                                text='صفحه المالك'
                            />
                        </div>
                    </div>
                    {/* owner section */}
                    <PagesHeaders small>الوكاله</PagesHeaders>
                    <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-10 mt-5'>
                        <img
                            className='rounded-full w-52 h-52 bg-cover self-center'
                            src={
                                hostingAgencies.hostingSpecificAgencyData?.cover
                            }
                            alt={
                                hostingAgencies.hostingSpecificAgencyData?.name
                            }
                        />
                        <div className='flex flex-col gap-2 mx-3 sm:mx-non'>
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.name
                                }
                                text='اسم الوكاله'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.description
                                }
                                text='وصف الوكاله'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.members_count
                                }
                                text='عدد الاعضاء'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    hostingAgencies.hostingSpecificAgencyData
                                        ?.aid
                                }
                                text='رقم الوكاله'
                            />
                            {hostingAgencies.hostingSpecificAgencyData
                                ?.created_at && (
                                <SpecifcRowDataForSpecifcItem
                                    data={
                                        <CreatedAt
                                            createdAt={
                                                hostingAgencies
                                                    .hostingSpecificAgencyData
                                                    ?.created_at!
                                            }
                                        />
                                    }
                                    text='أنشئت الوكاله فى'
                                />
                            )}
                            {hostingAgencies.hostingSpecificAgencyData
                                ?.updated_at && (
                                <SpecifcRowDataForSpecifcItem
                                    data={
                                        <CreatedAt
                                            createdAt={
                                                hostingAgencies
                                                    .hostingSpecificAgencyData
                                                    ?.updated_at!
                                            }
                                        />
                                    }
                                    text='التعديل الاخير للوكاله فى'
                                />
                            )}
                        </div>
                    </div>
                    {hostingAgencies.hostingSpecificAgencyData.members.length >
                        0 && (
                        <>
                            <h3 className='my-2 pb-0.5 border-b-[1px] mt-10 w-fit border-lightBlue'>
                                اعضاء الوكاله
                            </h3>
                            <div className='mt-10 flex justify-center gap-3 sm:gap-10 text-xs sm:text-sm'>
                                <MembersTabel
                                    members={
                                        hostingAgencies
                                            .hostingSpecificAgencyData.members
                                    }
                                />
                            </div>
                        </>
                    )}
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
