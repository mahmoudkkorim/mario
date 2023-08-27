import React from "react";

const HostingAgenciesTabelHeader = () => {
    return (
        <thead className="border-b-[1px] bg-lightDark/5 border-white">
            <tr className="text-[10px] font-semibold sm:font-normal sm:text-base">
                <td className="capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-l-[1px] border-white">
                    الرقم
                </td>
                <td className="capitalize text-center hidden lg:table-cell pb-3 pl-1 sm:pl-3 border-l-[1px] border-white">
                    الرقم التعريفى للوكاله
                </td>
                <td className="capitalize text-center pb-3  border-l-[1px] border-white">
                    افراد الوكاله
                </td>
                <td className="capitalize text-center pb-3  border-l-[1px] border-white">
                    اسم الوكاله
                </td>
                <td className="capitalize text-center pb-3 hidden lg:table-cell border-l-[1px] border-white">
                    المالك
                </td>
                <td className="capitalize text-center pb-3 hidden sm:table-cell border-l-[1px] border-white">
                    اسم المالك
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px] border-white">
                    حذف الوكاله
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px] border-white">
                    صفحه الوكاله
                </td>
            </tr>
        </thead>
    );
};

export default HostingAgenciesTabelHeader;
