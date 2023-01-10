import './index.html';
import './index.scss';
import './modules/superwheel'
import { listGift, vipListGift } from './modules/wheelsInfo';
import { createLight, startGlow } from './modules/createLight';
import { createWheel } from './modules/dealWheel';
import { createCoins } from './modules/createCoins';
import { createHeader } from './modules/createHeader';
import { coreTemplate } from './modules/templates';
import { createStars } from './modules/createStars';
import './modules/wheel';

const start = () => {
    createHeader();
    createLight();
    createStars();
    startGlow();
    createWheel();
    createCoins();
};


start();




