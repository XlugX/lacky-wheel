import { animationSetting } from './utils';
import { giftModalBody, infoModalBody } from './templates';
const modal = document.querySelector('.modal');


export const openedModal = (gift = 'X2', mode) => {
    const content = modal.querySelector('.modal-wrapper');
    content.innerHTML = `<div class="modal-content">
        ${mode !== 'info' ? giftModalBody(gift) : infoModalBody}
    </div>`

    modal.style.zIndex = 5;
    modal.style.display = 'flex';

    if (mode !== 'info') {
        modal.classList.add('giftModal')
        const coinsModal = content.querySelectorAll('.coinModal')

        coinsModal.forEach(item => {
            const num = item?.classList[2];
            item.animate([
                {transform: `translateY(${animationSetting[num]?.start}) rotate3d(0, 0, 1, 3deg)`},
                {transform: `translateY(${animationSetting[num]?.finish}) rotate3d(0, 0, 1, 0deg)`}
            ], {
                duration: animationSetting[num]?.duration || 5000,
                direction: 'alternate',
                playState: 'running',
                iterations: Infinity
            })
        });
    }

    const closeBtn = document.getElementById('closeBtn')
    closeBtn?.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        modal.style.display = 'none';
        modal.style.zIndex = 0;
        if (modal.classList.contains('giftModal')) {
            modal.classList.remove('giftModal')
        }
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.style.zIndex = 0;
            if (modal.classList.contains('giftModal')) {
                modal.classList.remove('giftModal')
            }
        }

    });
};
window.addEventListener('DOMContentLoaded', () => {
    const infoBtn = document.querySelector('.info-icon');

    infoBtn?.addEventListener('click', () => {
        openedModal('', 'info');
    });
});
