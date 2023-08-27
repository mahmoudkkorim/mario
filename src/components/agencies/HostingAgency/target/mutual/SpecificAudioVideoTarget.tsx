import React from "react";

// components
import Spinner from "../../../../ui/spinner/Spinner";
import Message from "../../../../ui/Message";
import PagesHeaders from "../../../../ui/PagesHeaders";
import SpecifcRowDataForSpecifcItem from "../../../../utils/SpecifcRowDataForSpecifcItem";
import SpecficTargetTabel from "./specificTabel/SpecificTargetTabel";

// utils
import CreatedAt from "../../../../helpers/CreatedAt";
import ConvertNumberWishK_M from "../../../../utils/ConvertNumberWishK_M";

// interface
import { SpecficTargetI } from "../../../../../interfaces/pages/agencies/hostingAgencies/target/AudioVideoTarget";

const SpecificAudioVideoTarget = (props: SpecficTargetI) => {
    const { error, loading, specifcTarget } = props;

    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            {loading ? (
                <Spinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : specifcTarget ? (
                <>
                    <PagesHeaders small>معلومات عن التارجت</PagesHeaders>
                    <div className="flex flex-col gap-2 mx-3 sm:mx-none">
                        <SpecifcRowDataForSpecifcItem
                            data={specifcTarget.target_no}
                            text="رقم التارجت"
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={ConvertNumberWishK_M(
                                specifcTarget.diamonds_required,
                                1
                            )}
                            text="الماسات المطلوبه"
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={`${ConvertNumberWishK_M(
                                specifcTarget.hours_required,
                                1
                            )} ساعه`}
                            text="الساعات المطلوبه"
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={ConvertNumberWishK_M(specifcTarget.salary, 1)}
                            text="الراتب"
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={ConvertNumberWishK_M(
                                specifcTarget.owner_salary,
                                1
                            )}
                            text="راتب المالك"
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={
                                <CreatedAt
                                    createdAt={specifcTarget.created_at}
                                />
                            }
                            text="إنشئت فى"
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={
                                <CreatedAt
                                    createdAt={specifcTarget.updated_at!}
                                />
                            }
                            text="اخر تعديل فى"
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={specifcTarget?.agencies_members_count}
                            text="عدد اعضاء الوكالات"
                        />
                    </div>
                    <PagesHeaders small>معلومات عن اعضاء الوكالات</PagesHeaders>
                    <SpecficTargetTabel
                        agencies_members={specifcTarget.agencies_members}
                    />
                </>
            ) : (
                <div className="mt-5">
                    <Message>التارجت غير موجوده.</Message>
                </div>
            )}
        </section>
    );
};

export default SpecificAudioVideoTarget;
