import $ from 'jquery';
import { listGift, vipListGift } from './wheelsInfo';
import TickSound from '../assets/tick.mp3'
import TickSound1 from '../assets/tick1.mp3'
import { openedModal } from './modal';


export const wheelRender = (listProp) => {
    const getGift = (setClass = false) => {
        let randomNumber = Math.random();
        let currentPercent = 0;
        let list = [];

        listProp.forEach((item, index) => {
            currentPercent += item.percent;

            randomNumber < currentPercent && list.push({...item, index});
        });

        // if (setClass) {
        //     selected = prizeNodes[list[0].index];
        //
        //     selected.classList.add(selectedClass)
        //
        //     if (!!selected) {
        //         prizeNodes.forEach(item => {
        //             if (!item.classList.contains('selected')) {
        //                 const blur = item.querySelector('div')
        //                 blur.classList.add('blur')
        //                 // openedModal(list[0], 'gift');
        //             }
        //         })
        //     }
        // };

        return list[0];
    };


        $('.wheel').superWheel({
            slices: listProp,


            //======================================
            //======================================
            //=======    Wheel Parameters    =======
            //======================================
            //======================================
            text: {
                color: 'radial-gradient(142.64% 100.86% at -0.85% 100.74%, #FD0D3E 0%, #FB115D 24%, #F7178B 62%, #F6199D 82%, #D60EAF 89%, #B904C0 96%, #AE00C6 100%)',
                offset: 8,
                size: 35,
                letterSpacing: 0,
                orientation: 'v',
                arc: true
            },

            slice: {
                background: '#333',
            },

            line: {
                width: 2,
                color: '#fefefe',
            },

            outer: {
                width: 5,
            },

            inner: {
                width: 1,
                color: '#fefefe',
            },

            width: 581,
            duration: 8000,

        });

        var tick = new Audio(TickSound1);
    let playing = false;


        $(document).on('click', '.spin', function (e) {
            const gift = getGift();
            e.preventDefault();
            tick.play()
            // $('.wheel').superWheel('start', 'value', Math.floor(Math.random() * 2));
            $('.wheel').superWheel('start', 'winIn', gift.winIn);
            $(this).prop('disabled', true);
        });

        $('.wheel').superWheel('onStart', function (results) {
            $('.spin-text').text('ЗАЧЕКАЙ...');
        });


        $('.wheel').superWheel('onStep', function (results) {
               // if (typeof tick.currentTime !== 'undefined') {
               //     tick.currentTime = 0;
               // }
           // tick.play();
        });

        $('.wheel').superWheel('onComplete', function (results) {
            tick.pause()
            openedModal(results, 'gift');
            $('.shape').removeClass('pulse-shape');
            $('.spin-to-win:disabled').prop('disabled', false);
            $('.spin-text').text('ОБЕРТАТИ');
        });
};

wheelRender(listGift)