import React, { useState, useEffect, useCallback } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { normalVideoGifts } from "../../../store/slices/gifts/videoGiftsSlice";

// components
import Spinner from "../spinner/Spinner";

// interface
import { SearchInputInterface } from "../../../interfaces/public";

const SearchInpuVidoGifttByUId = (props: SearchInputInterface): JSX.Element => {
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
    const videoGifts = useSelector((state: RootState) => state.videoGifts);

    // show spinner if users ids are loading
    useEffect(() => {
        if (videoGifts.normalVideoGifstLoading) {
            setShowSpinner(true);
        } else {
            setShowSpinner(false);
        }
    }, [videoGifts.normalVideoGifstLoading]);

    // useEffect to render all users id
    useEffect(() => {
        // is cleced just close the model and not render model of search again and spinner
        // if (idClicked) {
        //     setIdIsClecked(false);
        //     return;
        // }

        if (value?.toString().length! > 0) {
            setShowSearchModel(true);
        } else {
            setShowSearchModel(false);
        }

        dispatch(
            normalVideoGifts({
                token: auth.loginData?.access_token!,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.loginData?.access_token, dispatch, value]);

    const focusOnInputHandler = () => {
        setFirstRender(true);
        setFocusOnInput(true);
        setToogleLabel(true);
        setInputHighlited(true);
    };

    const blurOfInputHandler = () => {
        setFocusOnInput(false);
        setInputHighlited(false);
        if (value) {
            setFocusOnInput(true);
        }
        setTimeout(() => {
            setShowSearchModel(false);
        }, 150);
    };

    const closeSearchModel = () => {
        setShowSearchModel(false);
    };

    // bearor id to parent element
    const getIdHandler = useCallback((id: number, uid: string) => {
        bearorIdFun(id, uid);
        closeSearchModel();
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
                        {videoGifts.normalVideoGifstData && (
                            <span className='text-end block px-3 py-2 text-xs font-semibold text-smothDark'>
                                عدد النتائج{" "}
                                {videoGifts.normalVideoGifstData.length}
                            </span>
                        )}
                        <div className='hideScrollBar relative w-full h-full overflow-y-scroll flex flex-col px-3 gap-1.5 font-semibold pb-0.5'>
                            {videoGifts.normalVideoGifstData && !showSpinner ? (
                                <>
                                    {videoGifts.normalVideoGifstData?.map(
                                        (one, i) => (
                                            <div
                                                onClick={getIdHandler.bind(
                                                    null,
                                                    one.id,
                                                    one.id.toString()
                                                )}
                                                key={one.id}
                                                id={one.id.toString()}
                                                className='flex justify-start items-center gap-3 cursor-pointer rounded-md p-1 px-2 hover:bg-lightBlue/80 hover:text-white duration-150 border-t-[1px] border-b-[1px] border-lightBlue/20'
                                            >
                                                <img
                                                    className='w-10 h-10 rounded-full'
                                                    src={one.cover}
                                                    alt={`${one.name}_image`}
                                                />
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

export default SearchInpuVidoGifttByUId;
