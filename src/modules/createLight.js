export function createLight () {
    const lightSetting = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

    const shape = document.querySelector('.roundLight');
    shape.innerHTML = lightSetting.map(() => `<span class="light"></span>`).join('');

    let light = document.querySelectorAll('span');

    for(let i=0; i <light.length; i++){
        light[i].style.transform = "rotate("+i*18+"deg)";

        setTimeout(() => {
            light[i].classList.add('active');
        }, i * 80);
    }
}

export const startGlow = (stop = false) => {
    let light = document.querySelectorAll('span');

    let timer = setTimeout(function glow() {
        if (light[0].classList.contains('active')) {
            light.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.remove('active');
                }, i * 80)
            })
        } else {
            light.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, i * 80)
            })
        }

        timer = setTimeout(glow, 1520)
    },0);
}