import { ImHome3, ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import {
    BsFillCameraVideoOffFill,
    BsFillBuildingFill,
    BsEmojiHeartEyesFill,
    BsFillChatFill
} from "react-icons/bs";
import { MdDesignServices, MdOutlineEmojiEvents } from "react-icons/md";
import { PiArrowsLeftRight } from "react-icons/pi";
import { GiLevelEndFlag } from "react-icons/gi";
import { CiMoneyBill } from "react-icons/ci";
import { AiFillCamera, AiOutlineNumber } from "react-icons/ai";
import { BiSolidReport, BiSolidVideo } from "react-icons/bi";
import { FaMoneyBillAlt, FaGifts } from "react-icons/fa";
import { CgTranscript } from "react-icons/cg";
import { IoGiftSharp, IoDiamondSharp } from "react-icons/io5";

const navListHeaderData = [
    {
        content: "الرئيسيه",
        JSXicon: <ImHome3 />,
        to: "/",
    },
    {
        content: "ارقام مميزه",
        JSXicon: <AiOutlineNumber />,
        to: "/special-uids",
    },
    {
        content: "الاعضاء",
        JSXicon: <HiUserGroup />,
        to: "/members",
    },
    {
        content: "دعم الدردشة",
        JSXicon: <BsFillChatFill />,
        to: "/supportChat",
    },
    {
        content: "خلفيات الغرف",
        JSXicon: <BiSolidVideo />,
        to: "/room-backgrounds",
    },
    {
        content: "متجر التصاميم",
        JSXicon: <MdDesignServices />,
        to: "/designStore",
    },
    {
        content: "الماسات",
        JSXicon: <IoDiamondSharp />,
        to: "/diamond",
    },
    {
        content: "الهدايا",
        JSXicon: <IoGiftSharp />,
        to: "/gifts",
    },
    {
        content: "هدايا الفيديو",
        JSXicon: <IoGiftSharp />,
        to: "/videoGifts",
    },
    {
        content: "انواع هدايا الفيديو",
        JSXicon: <FaGifts />,
        to: "/video-GiftsGenres",
    },
    // {
    //     content: "تاريخ تحويلات الهدايا",
    //     JSXicon: <PiArrowsLeftRight />,
    //     to: "/historyOfGiftTransfers",
    // },
    {
        content: "المستويات",
        JSXicon: <GiLevelEndFlag />,
        to: "/levels",
    },
    {
        content: "الوكالات",
        JSXicon: <BsFillBuildingFill />,
        to: "/agencies/?type=charge",
    },
    {
        content: "التعبيرات (الايموجى)",
        JSXicon: <BsEmojiHeartEyesFill />,
        to: "/emojis",
    },
    // {
    //     content: "إيفنتات والعاب",
    //     JSXicon: <MdOutlineEmojiEvents />,
    //     to: "/eventsAndGames",
    // },
    // {
    //     content: "الجروبات",
    //     JSXicon: <HiUserGroup />,
    //     to: "/groups",
    // },
    // {
    //     content: "الارستقراطيه",
    //     JSXicon: <CiMoneyBill />,
    //     to: "/aristocracy",
    // },
    {
        content: "البنرات",
        JSXicon: <AiFillCamera />,
        to: "/banners",
    },
    // {
    //     content: "تقارير وإبلاغات",
    //     JSXicon: <BiSolidReport />,
    //     to: "/reportsAndNotifications",
    // },
    // {
    //     content: "المديرين",
    //     JSXicon: <ImUserTie />,
    //     to: "/managers",
    // },
    // {
    //     content: "متجر العملات",
    //     JSXicon: <FaMoneyBillAlt />,
    //     to: "/currencyStore",
    // },
    // {
    //     content: "التحويلات الماليه",
    //     JSXicon: <CgTranscript />,
    //     to: "/moneyTransfers",
    // },
    // {
    //     content: "تاريخ تحويلات العملات",
    //     JSXicon: <PiArrowsLeftRight />,
    //     to: "/historyOfCurrencyConversions",
    // },
];

export default navListHeaderData;
