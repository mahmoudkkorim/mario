import React from "react";

//  interfaces
import { SingleEmoji as SingleEmojiI } from "../../interfaces/pages/emoji";

// components
import Button from "../ui/Button";

const SingleEmoji = (props: SingleEmojiI) => {
    const { body, cover, created_at, id, updated_at } = props;

    return (
        <div className='border-[1px] bg-white border-smothDark/10 shadow-md rounded-md pb-5 hover:scale-[1.01] duration-300'>
            {body ? (
                <img className='w-80 h-80' src={body} alt={`${id}_image`} />
            ) : (
                <img className='w-80 h-80' src={cover} alt={`${id}_image`} />
            )}

            <div className='flex justify-center mt-10'>
                <Button
                    className='bg-success text-white py-1 pb-1.5'
                    to={`/emojis/${id}`}
                    type='link'
                >
                    عرض
                </Button>
            </div>
        </div>
    );
};

export default SingleEmoji;
