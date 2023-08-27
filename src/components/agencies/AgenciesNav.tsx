import React from "react";
import { Link, useLocation } from "react-router-dom";

// components
import PagesHeaders from "../ui/PagesHeaders";
import AddBalanceButton from "./chargeAgencies/AddBalanceButton";
import CreateChargeAgencyButton from "./chargeAgencies/CreateChargeAgencyButton";
import CreateEditHostingAgencyButton from "./HostingAgency/CreateEditHostingAgencyButton";
import DeleteAgencyButton from "./HostingAgency/DeleteAgencyButton";
import CreateEditTargetButton from "./HostingAgency/target/mutual/createEditTarget/CreateEditTargetButton";

// data
import { AGENCIES_NAV_DATA } from "../../data/agencies";

const AgenciesNav = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const currentAgency = query.get("type");
    const target = query.get("target");
    const agency_id = query.get("agency_id");
    const target_id = query.get("target_id");

    return (
        <div>
            <PagesHeaders>الوكلات</PagesHeaders>
            <ul className="flex text-sm sm:text-base gap-3 sm:gap-10 justify-center my-5 mb-10 sm:my-10 sm:mb-14">
                {AGENCIES_NAV_DATA.map((one, i) => (
                    <li key={i} className="hover:-translate-y-2 duration-300">
                        <Link
                            className={`${
                                one.type === currentAgency &&
                                one.target === target &&
                                "border-success border-b-[2px] text-success"
                            } pb-0.5 text-xs sm:text-base font-semibold`}
                            to={`/agencies/${one.to}`}
                        >
                            {one.text}
                        </Link>
                    </li>
                ))}
            </ul>
            <h3 className="my-2 pb-0.5 border-b-[1px] w-fit border-lightBlue">
                {currentAgency === "charge" && !target
                    ? "وكلاء الشحن"
                    : currentAgency === "hosting" && !target
                    ? "وكلاء الاستضافة"
                    : target === "audio"
                    ? "تارجت الصوتى"
                    : "تارجت الفيديو"}
            </h3>
            {currentAgency && !target ? (
                <div className="flex justify-start gap-3 sm:gap-5 mt-5 flex-wrap">
                    {currentAgency === "hosting" ? (
                        <>
                            <CreateEditHostingAgencyButton processType="create" />
                            {agency_id && (
                                <>
                                    <CreateEditHostingAgencyButton processType="edit" />
                                    <DeleteAgencyButton />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <CreateChargeAgencyButton />
                            {agency_id && <AddBalanceButton />}
                        </>
                    )}
                </div>
            ) : (
                <></>
            )}
            {target ? (
                <div className="flex justify-start gap-3 sm:gap-5 mt-5 flex-wrap">
                    {target === "audio" ? (
                        <>
                            <CreateEditTargetButton processType="create" />
                            {target_id && (
                                <CreateEditTargetButton processType="edit" />
                            )}
                        </>
                    ) : (
                        <>
                            <CreateEditTargetButton processType="create" />
                            {target_id && (
                                <CreateEditTargetButton processType="edit" />
                            )}
                        </>
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AgenciesNav;
