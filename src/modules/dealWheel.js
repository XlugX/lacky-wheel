import { listGift, vipListGift } from './wheelsInfo';
import { openedModal } from './modal';

let currentRotate = 0;

export const createWheel = () => {
    const $ = document.querySelector.bind(document);
    const wheel = $('.dealWheel');
    const shape = $('.shape');
    const container = $('.container');
    const startBtn = $('.spinBtn');
    const control = $('.ticker');
    let selected = '';
    const audio = new Audio('https://dl.sndup.net/v6cs/tick.mp3');
    const random = Math.random();
    const size = listGift.length;
    let rotate = 360 / size;
    const skewY = 90 - rotate;
    let giftsList;
    const checkbox = document.querySelector('.wheel-checkbox');

    // на сколько секторов нарезаем круг
    const prizeSlice = 360 / listGift.length;
    const spinClass = "is-spinning";
    const selectedClass = "selected";
// получаем все значения параметров стилей у секторов
    const spinnerStyles = window.getComputedStyle(wheel);

// переменная для анимации
    let tickerAnim;
// угол вращения
    let rotation = 0;
// текущий сектор
    let currentSlice = 0;
// переменная для текстовых подписей
    let prizeNodes;


    const renderItem = (data) => {
        prizeNodes?.forEach(item => item.remove())
        giftsList = data;
        data.forEach((item, i) => {
            wheel.insertAdjacentHTML('beforeend', `
                <li style="transform: rotate(${rotate * i}deg) skewY(-${skewY}deg); --background: ${item.color}" class="prize">
                <div></div>
                    <p class="item" style='transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);'>
                        <span class="name" style="font-size: ${item.fontSetting.size}; white-space: ${item.textSetting}; margin-top: ${item.margin}">${item.giftName}</span>
                    </p>
                </li>
            `)
        });
        prizeNodes = wheel.querySelectorAll(".prize");
    };

    // функция запуска вращения с плавной остановкой
    const runTickerAnimation = () => {

        // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
        const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
        const a = values[0];
        const b = values[1];
        let rad = Math.atan2(b, a);
        if (rad < 0) rad += (2 * Math.PI);


        const angle = Math.round(rad * (180 / Math.PI));
        const slice = Math.floor(angle / prizeSlice);

        if (currentSlice !== slice) {
            control.style.transform = 'rotate(-73deg)'

            setTimeout(() => {
                audio.play()
                control.style.transform = 'rotate(-43deg)';
            }, 1)
            currentSlice = slice;
        } else {
        }



        tickerAnim = requestAnimationFrame(runTickerAnimation);
    };

    const getGift = (randomNumber, setClass = false) => {
        let currentPercent = 0;
        let list = [];


        giftsList.forEach((item, index) => {
            currentPercent += item.percent;

            randomNumber < currentPercent && list.push({ ...item, index})
        });

        if (setClass) {
            selected = prizeNodes[list[0].index];

            selected.classList.add(selectedClass)

            if (!!selected) {
                prizeNodes.forEach(item => {
                    if (!item.classList.contains('selected')) {
                        const blur = item.querySelector('div')
                        blur.classList.add('blur')
                        openedModal(list[0], 'gift');
                    }
                })
            }
        };

        return list[0];
    };

    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        currentRotate += 360 * 10;
        rotation = currentRotate - getGift(random).index * rotate - rotate / 2;
        prizeNodes.forEach((prize) => {
            const blur = prize.querySelector('div')
            if (blur.classList.contains('blur')) {
                blur.classList.remove('blur')
            }
        });
        wheel.classList.add(spinClass);
        shape.classList.add('pulse-shape');
        // audio.src = 'https://zvukipro.com/uploads/files/2020-08/1596600420_wheel_of_fortune_style_wheel_spin_001_13209.mp3'; // Указываем путь к звуку "клика"
        // audio.autoplay = true; // Автоматически запускаем

        // control.classList.add('spinning')
        wheel.style.setProperty("--rotate", rotation);
        runTickerAnimation();
    });

    // отслеживаем, когда закончилась анимация вращения колеса
    wheel.addEventListener("transitionend", () => {
        cancelAnimationFrame(tickerAnim);
        rotation %= 360;
        audio.pause()
        getGift(random, true);
        wheel.classList.remove(spinClass);
        shape.classList.remove('pulse-shape');
        wheel.style.setProperty("--rotate", rotation);
        startBtn.disabled = false;
    });

    checkbox.addEventListener('click', (e) => {
        const modal = document.querySelector('.modal-wrapper');
        if(checkbox.checked) {
            container.classList.add('vip-container')
            modal.classList.add('vip-modal')
            renderItem(vipListGift)
        } else {
            container.classList.remove('vip-container')
            modal.classList.remove('vip-modal')
            renderItem(listGift)
        }
    })

    renderItem(listGift);
}