import React from "react";

const MembersTabelHeader = () => {
    return (
        <thead className="border-b-[1px] bg-lightDark/50 text-white">
            <tr className="text-[10px] font-semibold sm:font-normal sm:text-base">
                <td className="capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-white border-l-[1px]">
                    الرقم
                </td>
                <td className="capitalize text-center pb-3 pl-1 sm:pl-3 border-l-[1px]">
                    الرقم التعريفى للعضو
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px]">
                    العضو
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px]">
                    اسم العضو
                </td>
                <td className="capitalize text-center pb-3 pl-1 sm:pl-3 border-l-[1px]">
                    صفحه العضو
                </td>
            </tr>
        </thead>
    );
};

export default MembersTabelHeader;
