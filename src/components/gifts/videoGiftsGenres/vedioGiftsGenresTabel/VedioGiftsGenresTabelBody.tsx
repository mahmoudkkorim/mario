import React from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

// components
import Button from "../../../ui/Button";

// react icons
import { AiOutlineLink } from "react-icons/ai";

const VedioGiftsGenresTabelBody = () => {
    const { pathname, search } = useLocation();

    const videoGiftsGenres = useSelector(
        (state: RootState) => state.videoGiftsGenres
    );

    return (
        <>
            {videoGiftsGenres.allVideoGiftsGenresData?.data &&
            videoGiftsGenres.allVideoGiftsGenresData?.data.length > 0 ? (
                <tbody className='font-light text-sm'>
                    {videoGiftsGenres.allVideoGiftsGenresData?.data.map(
                        (genre, i) => (
                            <tr
                                key={i}
                                className={`border-b-[1px] hover:bg-white/30 border-white`}
                            >
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {i +
                                        1 +
                                        videoGiftsGenres.allVideoGiftsGenresData
                                            ?.per_page! *
                                            (+videoGiftsGenres
                                                .allVideoGiftsGenresData
                                                ?.current_page! -
                                                1)}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {genre.name.length > 10
                                        ? genre.name.slice(0, 5) + "..."
                                        : genre.name}
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    {genre.precentage}
                                    <span className='font-semibold'>%</span>
                                </td>

                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    <CreatedAt createdAt={genre.created_at} />
                                </td>
                                <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                    <CreatedAt createdAt={genre.updated_at} />
                                </td>

                                <td className=' py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-r-[1px] border-white'>
                                    <Button
                                        type='link'
                                        className='text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white'
                                        to={`${pathname}/${genre.id}`}
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

export default VedioGiftsGenresTabelBody;
