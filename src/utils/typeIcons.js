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
} from '@fortawesome/free-solid-svg-icons';

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

const getIconByKey = (key) => {
    return mapIcons.get(key)
};

const getMapIcons = () => {
    return [...mapIcons.values()];
}

export { getIconByKey, getMapIcons, };