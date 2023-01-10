import { wheelRender } from './wheel';
import { listGift, vipListGift } from './wheelsInfo';

export const createHeader = () => {
    let COUNTER = 0;
    const container = document.querySelector('.container');
    let checkbox;
    const startBtn = document.querySelector('.spinBtn');

    startBtn.addEventListener('click', () => {
        const count = document.querySelector('.count-value');
        COUNTER = COUNTER - 1;
        count.innerText = COUNTER;
        checkDisabled();
    });

    container.insertAdjacentHTML('afterbegin', `
        <div class="wheel-header">
      <div class="switch-block">
        <div class="vip">VIP</div>
        <label class="switch">
          <input class="wheel-checkbox" type="checkbox">
          <span class="slider"></span>
        </label>
      </div>
      <div class="wheel-header-title-wrapper">
        <div class="wheel-header-title">Долекрут</div>
        <div class="box">
          <div class="counter">До VIP рівня лишилось</div> <div class="count"><div class="count-value">${COUNTER}</div></div> <div class="counter">спінів</div>
        </div>
      </div>
      <div class="info-icon"></div>
    </div>
    `);

    checkbox = document.querySelector('.wheel-checkbox');
    checkbox.addEventListener('click', (e) => {
        const modal = document.querySelector('.modal-wrapper');
        if(checkbox.checked) {
            container.classList.add('vip-container')
            modal.classList.add('vip-modal')
            wheelRender(vipListGift)
        } else {
            container.classList.remove('vip-container')
            modal.classList.remove('vip-modal')
            wheelRender(listGift)
        }
    });



    function checkDisabled() {
        if (COUNTER !== 0) {
            checkbox.disabled = true;
        } else {
            checkbox.disabled = false;
        };
    };


    checkDisabled();
};