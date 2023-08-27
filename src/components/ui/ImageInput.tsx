import React from "react";

// icons
import { BsCamera, BsCloudUpload } from "react-icons/bs";

// interfaces
import { ImageInputI } from "../../interfaces/public";

const ImageInput = (props: ImageInputI) => {
    const {
        cover_image,
        localImage,
        name,
        onChange,
        cover_imageError,
        bg_camera,
        accept,
        id,
    } = props;

    return (
        <div className='mb-5'>
            <div className='relative w-28 h-28'>
                {cover_image || localImage ? (
                    <img
                        className='h-full w-full rounded-full object-cover'
                        src={
                            localImage
                                ? window.URL.createObjectURL(localImage)
                                : cover_image
                        }
                        alt={`${name}_image`}
                    />
                ) : (
                    <span className='absolute top-0 left-0 h-full w-full rounded-full border-[1px] border-darkGray/50'>
                        <label
                            htmlFor={id ? id : "cover_image"}
                            className='cursor-pointer'
                        >
                            <BsCloudUpload className='absolute top-0 left-0 h-[50%] translate-x-[50%] w-[50%] translate-y-[50%] text-darkGray/20' />
                        </label>
                    </span>
                )}
                <span
                    className={`${
                        bg_camera ? bg_camera : "bg-lighterGray"
                    } absolute -bottom-1 -right-1.5 w-12 h-12 rounded-full`}
                >
                    <label
                        htmlFor={id ? id : "cover_image"}
                        className='cursor-pointer'
                    >
                        <BsCamera className='absolute top-1.5 left-2 w-7 h-7 text-lightDark/80' />
                    </label>
                    <input
                        name={id ? id : "cover_image"}
                        className='hidden'
                        type='file'
                        id={id ? id : "cover_image"}
                        accept={accept ? accept : ".jpg,.png,.jpeg,.webp"}
                        multiple={false}
                        max='1'
                        onChange={onChange}
                    />
                </span>
                <span className='absolute h-5 -bottom-6 text-sm text-darkRed'>
                    {cover_imageError}
                </span>
            </div>
        </div>
    );
};

export default ImageInput;
