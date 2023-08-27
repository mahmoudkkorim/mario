import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../store/slices/authSlice";

// @ts-ignore
import { ReactComponent as Svg } from "../components/svgs/chatting.svg";
import Input from "../components/ui/Input";

const Login = () => {
    const navigate = useNavigate();

    // Redux
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    // State for hide error when any field has changed
    const [showError, setShowError] = useState(false);
    // State for formData (email and password)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;

    // Effect when login => store token in cookie
    useEffect(() => {
        if (auth.loginData?.access_token) {
            // navigate to main page
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.loginData?.access_token]);

    // Effect when cath login error => show error on UI
    useEffect(() => {
        if (auth.loginLoading) {
            return;
        }

        auth.loginError ? setShowError(true) : setShowError(false);
    }, [auth.loginError, auth.loginLoading]);

    // when change values of email or password it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));

        // when any input change make sure to hide error message
        if (showError) {
            setShowError(false);
        }
    };

    const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <section className='flex-1 bg-lightBlue flex justify-center items-center py-5'>
            <div className='bg-white p-12 px-5 md:px-14 2xl:px-28 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-10 2xl:gap-20 justify-between items-center  sm:mx-0 w-[90vw] sm:w-96 md:w-fit'>
                <div className='flex flex-col gap-8 order-2 md:order-1'>
                    <h2 className='font-semibold text-3xl border-b-2 border-lightBlue pb-2 w-fit'>
                        مرحباً بعودتك
                    </h2>
                    <h4 className='text-xl'>تسجيل الدخول</h4>
                    <form
                        onSubmit={loginHandler}
                        className='flex flex-col gap-5'
                    >
                        <Input
                            htmlFor='email'
                            id='email'
                            label='البريد الالكترونى'
                            name='email'
                            onChange={onChange}
                            value={email}
                            placeholder='*Email'
                            required
                            type='email'
                        />
                        <Input
                            htmlFor='password'
                            id='password'
                            label='الرقم السري'
                            name='password'
                            onChange={onChange}
                            value={password}
                            placeholder='*Password'
                            required
                            type='password'
                        />
                        <span
                            className={`${
                                (!auth.loginError || !showError) && "opacity-0"
                            } text-xs h-5 font-semibold text-darkRed `}
                        >
                            {auth.loginError}
                        </span>
                        <button className='mt-2 w-fit text-white rounded-md bg-lightBlue hover:shadow-xl p-5 py-2 hover:scale-[.98] hover:bg-lightBlue/90 duration-300'>
                            {auth.loginLoading
                                ? "الرجاء الانتظار..."
                                : "تسجل الدخول"}
                        </button>
                    </form>
                </div>
                <div className='order-1 md:order-2 flex justify-center'>
                    <Svg className='h-60 lg:h-72 xl:h-96 w-60 lg:w-72 xl:w-96' />
                </div>
            </div>
        </section>
    );
};

export default Login;
