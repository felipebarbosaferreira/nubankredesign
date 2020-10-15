/** Sizing Scale Details
 * Class	Size	Other Notes
 * fa-xs	.75em	
 * fa-sm	.875em	
 * fa-lg	1.33em	Also applies vertical-align: -25%
 * fa-2x	2em	
 * fa-3x	3em	
 * fa-4x	4em	
 * fa-5x	5em	
 * fa-6x	6em	
 * fa-7x	7em	
 * fa-8x	8em	
 * fa-9x	9em	
 * fa-10x	10em	
 */
import {
    faStickyNote,
    faUtensils,
    faBook,
    faBell,
    faCalendar,
    faClock,
    faFilter,
    faFootballBall,
    faBriefcase,
    faMusic,
    faShoppingCart,
    faBiking,
    faDumbbell,
    faPlane,
    faQrcode,
    faArrowLeft,
    faPlus,
    faSave,
    faCheck,
    faChevronCircleDown,
    faChevronCircleUp,
    faCreditCard,
    faPiggyBank,
    faEye,
    faEyeSlash,
    faCircle,
    faGift,
    faCoins,
    faDonate,
    faGamepad,
    faKissWinkHeart,
} from '@fortawesome/free-solid-svg-icons';

import * as Regular from '@fortawesome/free-regular-svg-icons';


export const iconDefault = 1
export const iconFood = 2
export const iconStudy = 3
export const iconBell = 4
export const iconCalendar = 5
export const iconClock = 6
export const iconFilter = 7
export const iconFooteball = 8
export const iconJob = 9
export const iconParty = 10
export const iconShopping = 11
export const iconBiking = 12
export const iconDumbbell = 13
export const iconTravel = 14
export const iconQrCode = 15
export const iconArrowLeft = 16
export const iconPlus = 17
export const iconSave = 18
export const iconCheck = 19
export const iconChevronCircleDown = 20
export const iconChevronCircleUp = 21
export const iconCreditCard = 22
export const iconMoneySavings = 23
export const iconEye = 24
export const iconEyeSlash = 25
export const iconCircle = 26
export const iconGift = 27
export const iconCoins = 28
export const iconDonate = 28
export const iconGamepad = 29
export const iconKissWinkHeart = 30


const mapIcons = new Map();
mapIcons.set(iconDefault, faStickyNote);
mapIcons.set(iconDefault, faStickyNote);
mapIcons.set(iconFood, faUtensils);
mapIcons.set(iconStudy, faBook);
mapIcons.set(iconBell, faBell);
mapIcons.set(iconCalendar, faCalendar);
mapIcons.set(iconClock, faClock);
mapIcons.set(iconFilter, faFilter);
mapIcons.set(iconFooteball, faFootballBall);
mapIcons.set(iconJob, faBriefcase);
mapIcons.set(iconParty, faMusic);
mapIcons.set(iconShopping, faShoppingCart);
mapIcons.set(iconBiking, faBiking);
mapIcons.set(iconDumbbell, faDumbbell);
mapIcons.set(iconTravel, faPlane);
mapIcons.set(iconQrCode, faQrcode);
mapIcons.set(iconArrowLeft, faArrowLeft);
mapIcons.set(iconPlus, faPlus);
mapIcons.set(iconSave, faSave);
mapIcons.set(iconCheck, faCheck);
mapIcons.set(iconChevronCircleDown, faChevronCircleDown);
mapIcons.set(iconChevronCircleUp, faChevronCircleUp);
mapIcons.set(iconCreditCard, faCreditCard);
mapIcons.set(iconMoneySavings, faPiggyBank);
mapIcons.set(iconEye, faEye);
mapIcons.set(iconEyeSlash, faEyeSlash);
mapIcons.set(iconCircle, faCircle);
mapIcons.set(iconGift, faGift);
mapIcons.set(iconCoins, faCoins);
mapIcons.set(iconDonate, faDonate);
mapIcons.set(iconGamepad, faGamepad);
mapIcons.set(iconKissWinkHeart, faKissWinkHeart);

/**
 * Regular icons
 */
export const iconRegularChat = 101
export const iconRegularCreditCard = 102
export const iconRegularKeyboard = 103

mapIcons.set(iconRegularChat, Regular.faComment);
mapIcons.set(iconRegularCreditCard, Regular.faCreditCard);
mapIcons.set(iconRegularKeyboard, Regular.faKeyboard);

const getIconByKey = (key) => {
    return mapIcons.get(key)
};

const getMapIcons = () => {
    return [...mapIcons.values()];
}

export { getIconByKey, getMapIcons, };