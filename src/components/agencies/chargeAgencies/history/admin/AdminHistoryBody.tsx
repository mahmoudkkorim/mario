import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

// utils
import ConvertNumberWishK_M from "../../../../utils/ConvertNumberWishK_M";
import CreatedAt from "../../../../helpers/CreatedAt";

const AdminHistoryBody = () => {
    const chargeAgencies = useSelector(
        (state: RootState) => state.chargeAgencies
    );

    return (
        <tbody className="font-light text-sm">
            {chargeAgencies.ChargeAdminHistoryData?.history.data.map(
                (process, i) => (
                    <tr
                        key={i}
                        className={`border-b-[1px] border-white hover:bg-white/30 `}
                    >
                        <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                            {i +
                                1 +
                                chargeAgencies.ChargeAdminHistoryData?.history
                                    ?.per_page! *
                                    (+chargeAgencies.ChargeAdminHistoryData
                                        ?.history?.current_page! -
                                        1)}
                        </td>
                        <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] hidden lg:table-cell border-white">
                            {process.charge_agent_id}
                        </td>
                        <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                            {CreatedAt({ createdAt: process.created_at })}
                        </td>

                        <td className="py-3 text-center pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-l-[1px] border-white">
                            <span
                                className={`${
                                    process.type === 0
                                        ? "bg-success/20 text-success"
                                        : "bg-stars/20 text-stars"
                                } p-2 py-0.5 pb-1 rounded-sm sm:font-semibold text-xs`}
                            >
                                {process.type === 0 ? "إيداع" : "سحب"}
                            </span>
                        </td>
                        <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-r-[1px] border-white">
                            {ConvertNumberWishK_M(process.amount, 1)}
                        </td>
                    </tr>
                )
            )}
        </tbody>
    );
};

export default AdminHistoryBody;
