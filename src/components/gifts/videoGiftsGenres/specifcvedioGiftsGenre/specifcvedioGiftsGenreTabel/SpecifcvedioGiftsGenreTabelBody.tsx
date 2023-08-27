import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

// helpers
import CreatedAt from "../../../../helpers/CreatedAt";

// components
import Button from "../../../../ui/Button";

// utils
import ConvertNumberWishK_M from "../../../../utils/ConvertNumberWishK_M";

// react icons
import { AiOutlineLink } from "react-icons/ai";

const SpecifcvedioGiftsGenreTabelBody = () => {
    const videoGiftsGenres = useSelector(
        (state: RootState) => state.videoGiftsGenres
    );

    return (
        <>
            {videoGiftsGenres.specficVideoGiftsGenreData?.gifts &&
            videoGiftsGenres.specficVideoGiftsGenreData?.gifts.length > 0 ? (
                <tbody className='font-light text-sm'>
                    {videoGiftsGenres.specficVideoGiftsGenreData?.gifts.map(
                        (gift, i) => (
                            <tr
                                key={i}
                                className={`border-b-[1px] hover:bg-white/30 border-white`}
                            >
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {i + 1}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {gift.name
                                        ? gift.name.length > 10
                                            ? gift.name.slice(0, 5) + "..."
                                            : gift.name
                                        : ""}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {ConvertNumberWishK_M(gift.price, 1)}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    <img
                                        loading='lazy'
                                        className='rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto'
                                        src={gift.cover}
                                        alt={`${gift.id}_image`}
                                    />
                                </td>

                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell'>
                                    <CreatedAt createdAt={gift.created_at} />
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell'>
                                    <CreatedAt createdAt={gift.updated_at} />
                                </td>

                                <td className=' py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-r-[1px] border-white'>
                                    <Button
                                        type='link'
                                        className='text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white'
                                        to={`/videoGifts/${gift.id}`}
                                    >
                                        <AiOutlineLink />
                                    </Button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            ) : (
                <tbody></tbody>
            )}
        </>
    );
};

export default SpecifcvedioGiftsGenreTabelBody;
