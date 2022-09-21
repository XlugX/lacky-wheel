import './index.html';
import './index.scss';
import { createLight, startGlow } from './modules/createLight';
import { createWheel } from './modules/dealWheel';
import { createCoins } from './modules/createCoins';
import { createHeader } from './modules/createHeader';
import { coreTemplate } from './modules/templates';
import { createStars } from './modules/createStars';

const start = () => {
    // const container = document.getElementById('wheel-block');
    // const openBtn = document.getElementById('open-wheel');
    // container.innerHTML = coreTemplate;
    //
    // openBtn.addEventListener('click', () => {
    //     const wrapper = document.getElementById('wheel-core');
    //     wrapper.style.display = 'flex'
    // });
    const test = 'work';

    createHeader();
    createLight();
    createStars();
    startGlow();
    createWheel();
    createCoins();
};


start();




