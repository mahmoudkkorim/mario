import React from "react";

const AdminHistoryHeader = () => {
    return (
        <thead className='border-b-[1px] bg-lightDark/50 text-white'>
            <tr className='text-[10px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-white border-l-[1px]'>
                    الرقم
                </td>
                <td className='capitalize text-center hidden lg:table-cell pb-3 pl-1 sm:pl-3 border-l-[1px]'>
                    الرقم التعريفى للوكاله
                </td>
                <td className='capitalize text-center pb-3  border-l-[1px]'>
                    تاريخ العمليه
                </td>
                {/* <td className="capitalize text-center pb-3 hidden lg:table-cell   border-l-[1px]">
                    تاريخ اخر تعديل
                </td> */}
                <td className='capitalize text-center pb-3  border-l-[1px]'>
                    نوع العمليه
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px]'>
                    الكميه
                </td>
            </tr>
        </thead>
    );
};

export default AdminHistoryHeader;
