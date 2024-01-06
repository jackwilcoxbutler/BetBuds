const { violet, blackA, mauve, green } = require('@radix-ui/colors');


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'tiles' : "url('/radiant-gradient.svg')",
        'stairs' : "url('/cornered-stairs.svg')",
        'squares' : "url('/protruding-squares.svg')",
        'squares-2' : "url('/light-squares.svg')",
        'squares-3' : "url('/white-square.svg')",
        'min' : "url('/minimal.svg')",
        'min-blue' : "url('/minimal-blue.svg')"
      }
    },
    colors:{
      't-grey' : '#BFC0C0',
      't-light-blue' : '#4F5D75',
      't-dark-blue' : '#2D3142',
      't-white' : '#FFFFFF',
      't-orange' : '#EF8354',
      't-orange-200' : '#D5602E',
      ...mauve,
        ...violet,
        ...green,
        ...blackA,
    },
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      },
    },
    animation: {
      overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  plugins: [],
};
