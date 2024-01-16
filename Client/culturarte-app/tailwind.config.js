/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      'sans': ['Montserrat'],
      'montserrat': ['Montserrat'],
    },
    extend: {
      backgroundImage: {
        "login-bg": "url('/src/assets/login-bg.png')",
        "menuEmployee-bg": "url('/src/assets/menuEmployee.png')",
        "verification-bg": "url('/src/assets/verification-bg.png')",
        "bannerBuyTickets-bg": "url('/src/assets/bannerbuy.png')",
        "usermenu-bg": "url('/src/assets/usermenu.png')",
      },
      spacing: {
        '128': '28.8rem',
        '136': '36rem',
      },
      width:{
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '50%': '50%',
        '90%': '90%',
        '14vw':'14vw',
        
      },
      colors: {
        'billboard': "#3C6C8F",
        'grayborder': "#707070",
        'graylight':'#9D9D9D',
        'grayFilter':'#EFEFEF',
        'blue': "#0B6085",
        'orange': '#F4946D',
        'yellow':'#FFBF5E',
        'darkblue':'#020633',
      },
      rotate: {
        'archived': '40deg',
      }

    },
  },
  plugins: [],
};
