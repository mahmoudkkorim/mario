import React from "react";

const SpecificTargetHeader = () => {
    return (
        <thead className="border-b-[1px] bg-lightDark/5 border-white">
            <tr className="text-[10px] font-semibold sm:font-normal sm:text-base">
                <td className="capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-l-[1px] border-white">
                    الرقم
                </td>
                <td className="capitalize text-center hidden lg:table-cell pb-3 pl-1 sm:pl-3 border-l-[1px] border-white">
                    الوكاله
                </td>
                <td className="capitalize text-center pb-3  border-l-[1px] border-white">
                    اسم الوكاله
                </td>
                <td className="capitalize text-center pb-3 hidden lg:table-cell border-l-[1px] border-white">
                    العضو
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px] border-white">
                    اسم العضو
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px] border-white">
                    صفحه العضو
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px] border-white">
                    صفحه الوكاله
                </td>
            </tr>
        </thead>
    );
};

export default SpecificTargetHeader;
