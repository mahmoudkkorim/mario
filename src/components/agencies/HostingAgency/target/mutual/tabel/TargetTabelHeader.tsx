import React from "react";

const TargetTabelHeader = () => {
    return (
        <thead className='border-b-[1px] bg-lightDark/5 border-white'>
            <tr className='text-[10px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-l-[1px] border-white'>
                    الرقم
                </td>
                <td className='capitalize text-center hidden lg:table-cell pb-3 pl-1 sm:pl-3 border-l-[1px] border-white'>
                    رقم التارجت
                </td>
                <td className='capitalize text-center hidden lg:table-cell pb-3 pl-1 sm:pl-3 border-l-[1px] border-white'>
                    عدد اعضاء الوكاله
                </td>
                <td className='capitalize text-center pb-3  border-l-[1px] border-white'>
                    الراتب
                </td>
                <td className='capitalize text-center pb-3 hidden lg:table-cell border-l-[1px] border-white'>
                    راتب المالك
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    الساعات المطلوبه
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    الماسات المطلوبه
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    صفحه التارجت
                </td>
            </tr>
        </thead>
    );
};

export default TargetTabelHeader;
