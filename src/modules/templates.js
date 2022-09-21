import { listGift } from './wheelsInfo';

export const giftModalBody = (gift) => `
    <div class="text">
        <div class="title">Вітаємо!</div>
        <div class="title">Ви виграли</div>
        <div class="gift">${gift?.giftName}</div>
        <div class="gift-description">${gift?.giftDescription}</div>
    </div>
    <button id="closeBtn" class="spinBtn continue"><span>ПРОДОВЖИТИ</span></button>
    <span class="coin coinModal one"></span>
    <span class="coin coinModal two"></span>
    <span class="coin coinModal three"></span>
`

export const infoModalBody = `
    <div class="info-wrapper">
        <div class="info-title">Правила та умови</div>
        <div class="wrapper-scroll">
            <div class="scroll">
                <div class="info-description">
                    Долерут - це гра в якій Ви гарантовано отримуєте свій подарунок. 
                    Просто тисніть “ОБЕРТАТИ”, та одразу отримуйте крутий бонус!<br/>
                    *У VIP Долекруті досупні призи та преміум бонуси.
                    <br/>
                    <br/>
                    Ви можете отримати:
                </div>
                <div class="gift-block">
                    ${listGift?.map(({giftName, giftDescription}) => `<div class="info-item">
                    <div class="info-gift-name">${giftName}</div>
                    <div class="info-description txt-left">${giftDescription}</div>
                    </div>`).join('')}
                    
                    <ul class="rules-list">
                        <li class="rules">Долекрут -це спеціальна гра для всіх зареєстрованих гравців грального клубу First</li>
                        <li class="rules">Всі подарунки які отримує  гравець після натискання кнопки обертати, випадають в довільному порядку й не залежать від його статусу чи інших умов.</li>
                        <li class="rules">Умови отримання спеціальної гри долекрут клієнтом клубу:</li>
                        <li class="rules">Внесений депозит від суми ххх грн</li>
                        <li class="rules">Один оберт нараховується автоматично один раз на добу о 00:00 за Київським часом.</li>
                        <li class="rules">За виконання спеціальних місій чи завдань</li>
                        <li class="rules">Як подарунок до дня народження, або за участь в інших спеціальних розіграшах чи акціях для клієтів клубу. </li>
                        <li class="rules">Оберт можна також придбати за кошти з реального балансу. його вартість складає ххх грн</li>
                        <li class="rules">Оберт долекрута може бути обміняний на коїни по курсу....</li>
                        <li class="rules">Правила та умови спеціальної гри долекрут можуть бути змінені адмінстрацією клубу у будь який час  на власний розсуд без попередження гравця заздалегідь</li>
                        <li class="rules">Граючи в спеціальну гру Долекрут ви погоджуєтесь з усіма правилами та умовами вказаними вище </li>
                    </ul>
                </div>
            </div>
        </div>
        <button id="closeBtn" class="spinBtn continue"><span>ПРОДОВЖИТИ</span></button>
    </div>
`;

export const coreTemplate = `<div class="container" id="wheel-core">
    <div class="modal">
      <div class="modal-wrapper"></div>
    </div>

    <div class="content">
      <div class="wheel">
        <div class="shape">
          <div class="roundLight"></div>
          <div class="dealWheel">
            <img src="https://imagizer.imageshack.com/img924/6314/DaUpXp.png" alt="">
          </div>
          <img class="ticker" src="https://imagizer.imageshack.com/img922/2104/DntVP6.png" alt="">
          <div class="center">
            <div class="circle"></div>
            <div class="circle2"></div>

            <svg>
              <filter id="wave">
                <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" seed="2">
                  <animate attributeName="baseFrequency" dur="30s" values="0.02;0.005;0.02" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="30" />
              </filter>
            </svg>
          </div>
        </div>
      </div>
        <div class="btnContainer">
          <button class="spinBtn"><span>ОБЕРТАТИ</span></button>
        </div>
    </div>
  </div>
`