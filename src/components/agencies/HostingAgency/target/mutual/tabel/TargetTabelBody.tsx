import React from "react";
import { useLocation } from "react-router-dom";

// icons
import { AiOutlineLink } from "react-icons/ai";

// components
import Button from "../../../../../ui/Button";

// helpers
import ConvertNumberWishK_M from "../../../../../utils/ConvertNumberWishK_M";

// interfaces
import { targetI } from "../../../../../../interfaces/pages/agencies/hostingAgencies/target/AudioVideoTarget";

const TargetTabelBody = (props: targetI) => {
    const { allTargetData, error, loading } = props;
    const { search, pathname } = useLocation();

    return (
        <>
            {allTargetData && allTargetData.length > 0 ? (
                <tbody className="font-light text-sm">
                    {allTargetData.map((target, i) => (
                        <tr
                            key={i}
                            className={`border-b-[1px] hover:bg-white/30 border-white`}
                        >
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                                {i + 1}
                            </td>
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell">
                                {target.target_no}
                            </td>
                            <td className="capitalize hidden lg:table-cell text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base  border-l-[1px] border-r-[1px] border-white">
                                {target.agencies_members_count}
                            </td>
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                                {ConvertNumberWishK_M(target.salary, 1)}
                            </td>
                            <td className="capitalize hidden lg:table-cell text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base  border-l-[1px] border-r-[1px] border-white">
                                {ConvertNumberWishK_M(target.owner_salary, 1)}
                            </td>

                            <td className="text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-l-[1px] border-white">
                                {ConvertNumberWishK_M(target.hours_required, 1)}
                            </td>
                            <td className="text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-l-[1px] border-white">
                                {ConvertNumberWishK_M(
                                    target.diamonds_required,
                                    1
                                )}
                            </td>
                            <td className=" py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white">
                                <Button
                                    type="link"
                                    className="text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white"
                                    to={`${pathname + search}&target_id=${
                                        target.id
                                    }`}
                                >
                                    <AiOutlineLink />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            ) : (
                <tbody></tbody>
            )}
        </>
    );
};

export default TargetTabelBody;
