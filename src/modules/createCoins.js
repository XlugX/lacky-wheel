import { animationSetting, styleSetting } from './utils';

export const createCoins = () => {
    const amountCoins = ['one', 'two', 'three', 'for', 'five', 'six', 'seven', 'eight'];
    const container = document.querySelector('.content');

    amountCoins.forEach((item, index) => {
        container.insertAdjacentHTML('beforeend', `<div class="coin-container ${item}"><span class="coin" style="transform: ${styleSetting[item]?.transform}; height: ${styleSetting[item]?.height}"></span></div>`)
    });

    const coins = container.querySelectorAll('.coin-container');


    coins.forEach(item => {
        const num = item?.classList[1];
        item.animate([
            {transform: `translateY(${animationSetting[num]?.start}) rotate3d(0, 0, 1, 3deg)`},
            {transform: `translateY(${animationSetting[num]?.finish}) rotate3d(0, 0, 1, 0deg)`}
        ], {
            duration: animationSetting[num]?.duration || 5000,
            direction: 'alternate',
            playState: 'running',
            iterations: Infinity
        })
    })
}