import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/layout/Nav";
import Layout from "./components/layout/Layout";
import DashboardHeader from "./components/layout/DashboardHeader";
import Spinner from "./components/ui/spinner/Spinner";

// Redux
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "./store/store";

// private route
import AuthRoute from "./components/private/Auth";

// Pages
const Login = lazy(() => import("./pages/Login"));
const Main = lazy(() => import("./pages/Main"));
const Users = lazy(() => import("./pages/Users"));
const SpecifcUserPage = lazy(() => import("./pages/SpecifcUser"));
const SpecialUidsPage = lazy(() => import("./pages/SpecialUids"));
const SpecificSpecialUidPage = lazy(() => import("./pages/SpecificSpecialUid"));
const Rooms = lazy(() => import("./pages/Rooms"));
const SpecificRoom = lazy(() => import("./pages/SpecificRoom"));
const DesignStore = lazy(() => import("./pages/DesignStore"));
const SpecificDesignStore = lazy(() => import("./pages/SpecificDesignStore"));
const Diamond = lazy(() => import("./pages/Diamond"));
const SpecificDiamond = lazy(() => import("./pages/SpecificDiamond"));
const Gifts = lazy(() => import("./pages/Gifts"));
const SpecificGift = lazy(() => import("./pages/SpecificGift"));
const VideoGifs = lazy(() => import("./pages/VideoGifs"));
const SpecificVideoGift = lazy(() => import("./pages/SpecificVideoGift"));
const Emojis = lazy(() => import("./pages/Emojis"));
const SpecificEmoji = lazy(() => import("./pages/SpecificEmoji"));
const Levels = lazy(() => import("./pages/Levels"));
const SpecificLevel = lazy(() => import("./pages/SpecificLevel"));
const Agencies = lazy(() => import("./pages/Agencies"));
const Banners = lazy(() => import("./pages/Banners"));
const SpecificBanner = lazy(() => import("./pages/SpecificBanner"));
const NotFound = lazy(() => import("./pages/404"));
const VideoGiftsGenres = lazy(() => import("./pages/VideoGiftsGenres"));
const SpecificVideoGiftsGenres = lazy(
    () => import("./pages/SpecificVideoGiftsGenres")
);
const SupportChat = lazy(() => import("./pages/SupportChat"));
const SpecificConversation = lazy(() => import("./pages/SpecificConversation"));

function App() {
    const auth = useSelector((state: RootState) => state.auth);
    return (
        <>
            <Layout>
                <Nav />
                <main
                    className={`flex flex-col flex-1 bg-lightDark/10 min-h-screen ${
                        auth.loginData?.access_token && "pb-16"
                    }`}
                >
                    <DashboardHeader />
                    <Suspense
                        fallback={
                            <div className='mt-20 relative flex items-center justify-center'>
                                <Spinner />
                            </div>
                        }
                    >
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route path='/' element={<AuthRoute />}>
                                <Route path='/' element={<Main />} />
                            </Route>
                            <Route path='/special-uids' element={<AuthRoute />}>
                                <Route
                                    path='/special-uids'
                                    element={<SpecialUidsPage />}
                                />
                            </Route>
                            <Route
                                path='/special-uids/:id'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/special-uids/:id'
                                    element={<SpecificSpecialUidPage />}
                                />
                            </Route>
                            <Route path='/members' element={<AuthRoute />}>
                                <Route path='/members' element={<Users />} />
                            </Route>
                            <Route path='/members/:id' element={<AuthRoute />}>
                                <Route
                                    path='/members/:id'
                                    element={<SpecifcUserPage />}
                                />
                            </Route>
                            <Route path='/supportChat' element={<AuthRoute />}>
                                <Route
                                    path='/supportChat'
                                    element={<SupportChat />}
                                />
                            </Route>
                            <Route
                                path='/supportChat/:id'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/supportChat/:id'
                                    element={<SpecificConversation />}
                                />
                            </Route>
                            <Route
                                path='/room-backgrounds'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/room-backgrounds'
                                    element={<Rooms />}
                                />
                            </Route>
                            <Route
                                path='/room-backgrounds/:id'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/room-backgrounds/:id'
                                    element={<SpecificRoom />}
                                />
                            </Route>
                            <Route path='/designStore' element={<AuthRoute />}>
                                <Route
                                    path='/designStore'
                                    element={<DesignStore />}
                                />
                            </Route>
                            <Route
                                path='/designStore/:id'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/designStore/:id'
                                    element={<SpecificDesignStore />}
                                />
                            </Route>
                            <Route path='/diamond' element={<AuthRoute />}>
                                <Route path='/diamond' element={<Diamond />} />
                            </Route>
                            <Route path='/diamond/:id' element={<AuthRoute />}>
                                <Route
                                    path='/diamond/:id'
                                    element={<SpecificDiamond />}
                                />
                            </Route>
                            <Route path='/gifts' element={<AuthRoute />}>
                                <Route path='/gifts' element={<Gifts />} />
                            </Route>
                            <Route path='/gifts/:id' element={<AuthRoute />}>
                                <Route
                                    path='/gifts/:id'
                                    element={<SpecificGift />}
                                />
                            </Route>
                            <Route
                                path='/video-giftsGenres'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/video-giftsGenres'
                                    element={<VideoGiftsGenres />}
                                />
                            </Route>
                            <Route
                                path='/video-giftsGenres/:id'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/video-giftsGenres/:id'
                                    element={<SpecificVideoGiftsGenres />}
                                />
                            </Route>
                            <Route path='/videoGifts' element={<AuthRoute />}>
                                <Route
                                    path='/videoGifts'
                                    element={<VideoGifs />}
                                />
                            </Route>
                            <Route
                                path='/videoGifts/:id'
                                element={<AuthRoute />}
                            >
                                <Route
                                    path='/videoGifts/:id'
                                    element={<SpecificVideoGift />}
                                />
                            </Route>
                            <Route path='/emojis' element={<AuthRoute />}>
                                <Route path='/emojis' element={<Emojis />} />
                            </Route>
                            <Route path='/emojis/:id' element={<AuthRoute />}>
                                <Route
                                    path='/emojis/:id'
                                    element={<SpecificEmoji />}
                                />
                            </Route>
                            <Route path='/levels' element={<AuthRoute />}>
                                <Route path='/levels' element={<Levels />} />
                            </Route>
                            <Route path='/levels/:id' element={<AuthRoute />}>
                                <Route
                                    path='/levels/:id'
                                    element={<SpecificLevel />}
                                />
                            </Route>
                            <Route path='/agencies' element={<AuthRoute />}>
                                <Route
                                    path='/agencies'
                                    element={<Agencies />}
                                />
                            </Route>
                            <Route path='/banners' element={<AuthRoute />}>
                                <Route path='/banners' element={<Banners />} />
                            </Route>
                            <Route path='/banners/:id' element={<AuthRoute />}>
                                <Route
                                    path='/banners/:id'
                                    element={<SpecificBanner />}
                                />
                            </Route>
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
            </Layout>
        </>
    );
}

export default App;
