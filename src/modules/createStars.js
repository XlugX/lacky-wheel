let device = window.innerWidth > 769 ? 'desktop' : 'mobile';
window.addEventListener('resize', () => {
  device = window.innerWidth > 769 ? 'desktop' : 'mobile';
});

export const createStars = () => {
  const container = document.getElementById('wheel-core'),
      star = document.querySelector('.star'),
      stars =  device === 'desktop' ? 100 : 50,
      sparkle = 30;

  let size = 'small';
  const createStar = function() {
    const clone = star.cloneNode(true);

    clone.style.top = (Math.random() * 100) + '%'
    clone.style.left = (Math.random() * 100) + '%'
    clone.style.webkitAnimationDelay = (Math.random() * sparkle) + 's'
    clone.style.mozAnimationDelay= (Math.random() * sparkle) + 's'
    clone.classList.add(size);
    container.appendChild(clone);
  };

  for(let i = 0; i < stars; i++) {
    if(i % 2 === 0) {
      size = 'small';
    } else if(i % 3 === 0) {
      size = 'medium';
    } else {
      size = 'large';
    }

    createStar();
  }
}