let device = window.innerWidth > 769 ? 'desktop' : 'mobile';
window.addEventListener('resize', () => {
    device = window.innerWidth > 769 ? 'desktop' : 'mobile';
})

export const listGift = [
    {
        giftName: 'X2',
        giftDescription: 'Додатковий оберт колеса',
        percent: 92 / 100,
        color: 'radial-gradient(142.64% 100.86% at -0.85% 100.74%, #FD0D3E 0%, #FB115D 24%, #F7178B 62%, #F6199D 82%, #D60EAF 89%, #B904C0 96%, #AE00C6 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '71px' : '32px',
            height: '98px'
        }
    },
    {
        giftName: 'BONUS',
        giftDescription: 'Бонусна гра у провайдера',
        percent: 2 / 100,
        color: 'linear-gradient(0deg, #000000, #000000), radial-gradient(142.7% 100.91% at 100.33% 100.74%, #FD9A0D 0%, #FA8A13 35%, #F67819 82%, #ED6310 87%, #E04604 95%, #DB3B00 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        }
    },
    {
        giftName: `CASH <br/> BACK`,
        giftDescription: 'Додатковий кешбек до кінця тижня',
        percent: 1 / 100,
        color: 'radial-gradient(100.91% 142.7% at -1.19% -0.98%, #7B0DFD 0%, #6219F9 44%, #5021F6 82%, #2811E8 89%, #0B05DF 96%, #0001DB 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        },
        margin: device === 'mobile' ? '15px' : '40px',
        textSetting: 'break-spaces'
    },
    {
        giftName: 'XX FS',
        giftDescription: 'Безкоштовні оберти',
        percent: 1 / 100,
        color: 'linear-gradient(0deg, #000000, #000000), radial-gradient(142.7% 100.91% at -0.85% -1.29%, #59CBFD 0%, #46A0F8 54%, #3E8EF6 82%, #2A87ED 87%, #0D7CE0 95%, #0278DB 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        }
    },
    {
        giftName: 'XX BC',
        giftDescription: 'Гроші на бонусний рахунок',
        percent: 1 / 100,
        color: 'radial-gradient(142.7% 100.91% at 100.33% -1.29%, #0DFD13 0%, #20FB14 17%, #4EF718 60%, #60F619 82%, #63DD0F 88%, #67C004 95%, #68B500 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        }
    },
    {
        giftName: '+50%',
        giftDescription: 'До 50% бонус до депозиту',
        percent: 1 / 100,
        color: 'linear-gradient(0deg, #000000, #000000), radial-gradient(100.91% 142.7% at 100.83% -0.98%, #FDEF2C 0%, #FAE530 27%, #F6D337 82%, #F1CA32 85%, #E1AD21 94%, #DBA21B 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '59px' : '32px',
            height: '74px'
        }
    },
    {
        giftName: 'XXX BC',
        giftDescription: 'Гроші на бонусний рахунок',
        percent: 1 / 100,
        color: 'radial-gradient(100.91% 142.7% at 100.83% 100.2%, #FD1300 0%, #F80624 50%, #F60036 82%, #E5003B 86%, #C80042 95%, #BD0045 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        }
    },
    {
        giftName: 'XXX FS',
        giftDescription: 'Безкоштовні оберти',
        percent: 1 / 100,
        color: 'linear-gradient(0deg, #000000, #000000), radial-gradient(142.7% 100.91% at 100.33% 100.74%, #FD9A0D 0%, #FA8A13 35%, #F67819 82%, #ED6310 87%, #E04604 95%, #DB3B00 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        }
    },
];

export const vipListGift = [
    {
        giftName: 'CASH BACK',
        giftDescription: 'Додатковий оберт колеса',
        percent: 92 / 100,
        color: 'radial-gradient(142.7% 100.91% at 100.33% 100.74%, #FD9A0D 0%, #FA8A13 35%, #F67819 82%, #ED6310 87%, #E04604 95%, #DB3B00 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '27px',
            height: '55px'
        },
        margin: device === 'mobile' && '6px',
        textSetting: 'break-spaces'
    },
    {
        giftName: 'X2',
        giftDescription: 'Бонусна гра у провайдера',
        percent: 2 / 100,
        color: 'radial-gradient(142.64% 100.86% at -0.85% 100.74%, #FD0D3E 0%, #FB115D 24%, #F7178B 62%, #F6199D 82%, #D60EAF 89%, #B904C0 96%, #AE00C6 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '71px' : '24px',
            height: '98px'
        }
    },
    {
        giftName: 'SMART PHONE',
        giftDescription: 'Додатковий кешбек до кінця тижня',
        percent: 1 / 100,
        color: 'radial-gradient(100.91% 142.7% at -1.19% 100.2%, #FD55B8 0%, #F84BE1 53%, #F646F3 82%, #C942E6 90%, #AC3FDE 96%, #A13EDB 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '20px',
            height: '55px'
        },
        margin: device === 'mobile' ? '24px' : '45px',
        textSetting: 'break-spaces'
    },
    {
        giftName: 'First Coin',
        giftDescription: 'Безкоштовні оберти',
        percent: 1 / 100,
        color: 'radial-gradient(100.91% 142.7% at -1.19% -0.98%, #7B0DFD 0%, #6219F9 44%, #5021F6 82%, #2811E8 89%, #0B05DF 96%, #0001DB 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '20px',
            height: '55px'
        },
        margin: '39px',
        textSetting: 'break-spaces'
    },
    {
        giftName: 'XXX BC',
        giftDescription: 'Гроші на бонусний рахунок',
        percent: 1 / 100,
        color: 'radial-gradient(142.7% 100.91% at -0.85% -1.29%, #59CBFD 0%, #46A0F8 54%, #3E8EF6 82%, #2A87ED 87%, #0D7CE0 95%, #0278DB 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        }
    },
    {
        giftName: '+50%',
        giftDescription: 'До 50% бонус до депозиту',
        percent: 1 / 100,
        color: 'radial-gradient(142.7% 100.91% at 100.33% -1.29%, #0DFD13 0%, #20FB14 17%, #4EF718 60%, #60F619 82%, #63DD0F 88%, #67C004 95%, #68B500 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '59px' : '24px',
            height: '74px'
        }
    },
    {
        giftName: 'SMART WATCH',
        giftDescription: 'Гроші на бонусний рахунок',
        percent: 1 / 100,
        color: 'radial-gradient(100.91% 142.7% at 100.83% -0.98%, #FDEF2C 0%, #FAE530 27%, #F6D337 82%, #F1CA32 85%, #E1AD21 94%, #DBA21B 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        },
        margin: device === 'mobile' ? '17px' : '38px',
        textSetting: 'break-spaces'
    },
    {
        giftName: 'XX FS',
        giftDescription: 'Безкоштовні оберти',
        percent: 1 / 100,
        color: 'radial-gradient(100.91% 142.7% at 100.83% 100.2%, #FD1300 0%, #F80624 50%, #F60036 82%, #E5003B 86%, #C80042 95%, #BD0045 100%)',
        fontSetting: {
            weight: 400,
            size: device === 'desktop' ? '38px' : '24px',
            height: '55px'
        }
    },
];