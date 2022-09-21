import { coreTemplate } from './templates';

export const createCore = () => {
    const container = document.getElementById('wheel-block');
    const openBtn = document.getElementById('open-wheel');

    openBtn.addEventListener('click', () => {
        container.innerHTML = coreTemplate;
    })
}