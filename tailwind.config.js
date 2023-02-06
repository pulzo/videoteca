/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      black:{
        DEFAULT: '#000000'
      },
      white:{
        DEFAULT: '#FFFFFF'
      },
      dark:{
        dark: '#303030',
        dark5: '#C2C2C2',
        dark30: '#CBCBD4',
        DEFAULT: '#666666',
        light: '#888787'
      },
      light:{
        dark: '#E4E4E7',
        DEFAULT: '#F8F9FA',
        light: '#F2F2F5',
        light0: '#F8F8F8',
      },
      red: {
        10: '#FF5C5C1A',
        dark: '#E53535',
        DEFAULT: '#FF3B3B',
        light: '#FF5C5C',
        red4: '#FFE5E5',
      },
      orange:{
        10: '#E57A001A',
        DEFAULT: '#FF8800',
        dark: '#E57A00',
        light: '#FDAC42',
        orange0: '#E67A00',
        orange1: '#FFE5E5',
        orange4: '#FFF8E5'
      },
      green: {
        50: '#06C27010',
        dark20: '#05A66033',
        dark: '#05A660',
        DEFAULT: '#06C270',
        light: '#39D98A',
        Lighter: '#13B977',
        MainColor: '#038652',
        Darker: '#065C3A',
        green4: '#E3FFF1',
        green5: '#E0F1EB',
        primarySubtle: '#C9FFE9',


      },
      blue: {
        def10: '#00B7C41A',
        def20: '#00B7C433',
        lig10: '#00CFDE1A',
        tea10: '#A9EFF21A',
        tea210: '#73DFE71A',
        10: '#04A1AC1A',
        50: '#E5F0FF',
        30: '#00B7C44D',
        100: '#00B7C410',
        dark: '#04A1AC',
        DEFAULT: '#00B7C4',
        default: '#00B7C4',
        blue0: '#004FC4',
        light: '#00CFDE',
        teal: '#A9EFF2',
        teal2: '#73DFE7',
        teal4: '#E6FFFF'

      },
      admin: {
        dark: '#1B1B28',
        DEFAULT: '#2F3047',
        light: '#4F5070',
      },
      gray: {
        50: '#f9fafb',
        200: '#e5e7eb',
        medio: '#787486'
      },

      purple: {
        10: '#6600CC1A',
        pur010: '#4D00991A',
        pur210: '#AC5DD91A',
        pur310: '#DDA5E91A',
        DEFAULT: '#6600CC',
        purple0: '#4D0099',
        purple2: '#AC5DD9',
        purple3: '#DDA5E9',
        purple4: '#FFE5FF',
        purple5: '#6666FF',
        indigo: '#EDEDFC',
      }

    },
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'gray': '#f8f8f8',
     }),
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
}
