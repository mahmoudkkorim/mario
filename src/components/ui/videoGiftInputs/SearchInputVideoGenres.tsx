import React, { useState, useEffect, useCallback } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { allVideoGiftsGenres } from "../../../store/slices/gifts/videoGiftsGenresSlice";

// components
import Spinner from "../spinner/Spinner";

// interface
import { SearchInputVideoGenresInterface } from "../../../interfaces/public";

const SearchInputVideoGenres = (
    props: SearchInputVideoGenresInterface
): JSX.Element => {
    const [focusOnInput, setFocusOnInput] = useState(false);
    const [toogleLabel, setToogleLabel] = useState(true);
    const [inputHighlited, setInputHighlited] = useState(false);
    const [showSearchModel, setShowSearchModel] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    // make state change when change input to make sure when we in edit zone not render models
    const [firstRender, setFirstRender] = useState(false);

    const {
        htmlFor,
        label,
        type,
        id,
        name,
        placeholder,
        value,
        onChange,
        minLength,
        min,
        max,
        step,
        readOnly,
        error,
        required,
        title,
        labelBgColor,
        pattern,
        bearorIdFun,
    } = props;

    // make sure not show model in first render when we in edit mode
    useEffect(() => {
        if (!firstRender) {
            setShowSearchModel(false);
        }
    }, [firstRender, showSearchModel]);

    // make sure to hide input label
    useEffect(() => {
        if (focusOnInput) {
            return;
        }

        let timer = setTimeout(() => {
            setToogleLabel(false);
        }, 150);

        return () => {
            clearTimeout(timer);
        };
    }, [focusOnInput]);

    useEffect(() => {
        if (value) {
            setFocusOnInput(true);
        }
    }, [value]);

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const videoGiftsGenres = useSelector(
        (state: RootState) => state.videoGiftsGenres
    );

    // show spinner if video gifts ids are loading
    useEffect(() => {
        if (videoGiftsGenres.allVideoGiftsGenresLoading) {
            setShowSpinner(true);
        } else {
            setShowSpinner(false);
        }
    }, [videoGiftsGenres.allVideoGiftsGenresLoading]);

    // useEffect to render all video gifts id
    useEffect(() => {
        dispatch(
            allVideoGiftsGenres({
                token: auth.loginData?.access_token!,
                page: 1,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.loginData?.access_token, dispatch]);

    const focusOnInputHandler = () => {
        setFirstRender(true);
        setFocusOnInput(true);
        setToogleLabel(true);
        setInputHighlited(true);
        setShowSearchModel(true);
    };

    const blurOfInputHandler = () => {
        setFocusOnInput(false);
        setInputHighlited(false);
        setTimeout(() => {
            setShowSearchModel(false);
        }, 150);
    };

    // bearor id to parent element
    const getIdHandler = useCallback((id: number) => {
        bearorIdFun(id);
        setShowSearchModel(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='flex flex-col gap-2'>
                <label htmlFor={htmlFor}>{label}</label>
                <div className='relative w-full'>
                    <label
                        htmlFor={htmlFor}
                        className={`
          ${inputHighlited && "text-lightBlue"}
          ${
              focusOnInput
                  ? "opacity-100 -left-1 top-0 scale-75"
                  : "opacity-100 top-[48%] left-1"
          } ${!toogleLabel && "-z-10"} ${
                            labelBgColor && focusOnInput
                                ? labelBgColor
                                : "bg-white"
                        } text-darkGray/50 absolute z-10 px-1 text-xl -translate-y-[50%] duration-200`}
                    >
                        {placeholder}
                    </label>

                    <span className='absolute -bottom-6 text-sm text-darkRed'>
                        {error}
                    </span>

                    <input
                        dir='ltr'
                        pattern={pattern}
                        onFocus={focusOnInputHandler}
                        onBlur={blurOfInputHandler}
                        className={`${
                            inputHighlited && "border-lightBlue"
                        } border-[1px] w-full placeholder:text-xl rounded-sm focus:placeholder:opacity-0 border-darkGray/50 outline-none flex  p-2 py-3`}
                        type={type}
                        id={id}
                        name={name}
                        placeholder={!toogleLabel ? placeholder : ""}
                        required={required}
                        value={value}
                        title={title}
                        onChange={onChange}
                        readOnly={readOnly}
                        minLength={minLength}
                        min={min}
                        max={max}
                        step={step}
                    />
                </div>
            </div>
            {/* show and hide search model */}
            {showSearchModel && (
                <>
                    <div
                        className='rotate-180 sm:rotate-0 absolute bg-lightDark/20 w-3 h-3 left-[50%] -translate-x-[50%]'
                        style={{
                            clipPath: "polygon(51% 49%, 0% 100%, 100% 100%)",
                        }}
                    ></div>
                    <div className='absolute z-[100] left-[50%] select-none -translate-x-[50%] translate-y-1.5 sm:translate-y-3 w-64 h-60 sm:h-80 rounded-md bg-grayWhite border-[1px] border-lightDark/20 flex flex-col'>
                        {videoGiftsGenres.allVideoGiftsGenresData &&
                            videoGiftsGenres.allVideoGiftsGenresData.data && (
                                <span className='text-end block px-3 py-2 text-xs font-semibold text-smothDark'>
                                    عدد النتائج{" "}
                                    {
                                        videoGiftsGenres.allVideoGiftsGenresData
                                            .data.length
                                    }
                                </span>
                            )}
                        <div className='hideScrollBar relative w-full h-full overflow-y-scroll flex flex-col px-3 gap-1.5 font-semibold pb-0.5'>
                            {videoGiftsGenres.allVideoGiftsGenresData &&
                            videoGiftsGenres.allVideoGiftsGenresData.data &&
                            !showSpinner ? (
                                <>
                                    {videoGiftsGenres.allVideoGiftsGenresData.data?.map(
                                        (one, i) => (
                                            <div
                                                onClick={getIdHandler.bind(
                                                    null,
                                                    one.id
                                                )}
                                                key={one.id}
                                                id={one.id.toString()}
                                                className='flex justify-start items-center gap-3 cursor-pointer rounded-md p-1 px-2 hover:bg-lightBlue/80 hover:text-white duration-150 border-t-[1px] border-b-[1px] border-lightBlue/20'
                                            >
                                                <div className='flex flex-col gap-0.5'>
                                                    <p className='text-sm'>
                                                        {one.name &&
                                                        one.name.length > 20
                                                            ? one.name.slice(
                                                                  0,
                                                                  15
                                                              ) + "..."
                                                            : one.name}
                                                    </p>
                                                    <span className='text-xs font-light'>
                                                        {one.id}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <Spinner />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SearchInputVideoGenres;
