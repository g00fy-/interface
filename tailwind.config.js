const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
// const plugin = require('tailwindcss/plugin')
// make some colored shadows cause gradients
let makeShadow = (name, rgb) => {
  let obj = {}

  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-sm"] = `0 1px 2px 0 rgba(${rgb}, 0.05)`;
  obj[name] = `0 1px 3px 0 rgba(${rgb}, 0.1), 0 1px 2px 0 rgba(${rgb}, 0.06)`;
  obj[name + "-md"] = `0 4px 6px -1px rgba(${rgb}, 0.1), 0 2px 4px -1px rgba(${rgb}, 0.06)`;
  obj[name + "-lg"] = `0 10px 15px -3px rgba(${rgb}, 0.1), 0 4px 6px -2px rgba(${rgb}, 0.05)`;
  obj[name + "-xl"] = `0 20px 25px -5px rgba(${rgb}, 0.1), 0 10px 10px -5px rgba(${rgb}, 0.04)`
  obj[name + "-2xl"] = `0 25px 50px -12px rgba(${rgb}, 0.25)`
  obj[name + "-inner"] = `inset 0 2px 4px 0 rgba(${rgb}, 0.06)`
  return obj
};


module.exports = {
  mode: 'jit',
  // darkMode: 'media',
  darkMode: 'class',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      minWidth: {
        '0':    '0',
        '1/5':  '20%',
        '1/4':  '25%',
        '1/3':  '33.33%',
        '2/5':  '40%',
        '1/2':  '50%',
        '3/5':  '60%',
        '2/3':  '66.66%',
        '3/4':  '75%',
        '4/5':  '80%',
        'full': '100%',
      },
      borderWidth:{
        '3': '3px',
      },
      backgroundColor: {
        lightish: {
          '0':   'rgba(255, 255, 255, 0)',
          '10':  'rgba(255, 255, 255, 0.1)',
          '20':  'rgba(255, 255, 255, 0.2)',
          '30':  'rgba(255, 255, 255, 0.3)',
          '40':  'rgba(255, 255, 255, 0.4)',
          '50':  'rgba(255, 255, 255, 0.5)',
          '60':  'rgba(255, 255, 255, 0.6)',
          '70':  'rgba(255, 255, 255, 0.7)',
          '80':  'rgba(255, 255, 255, 0.8)',
          '90':  'rgba(255, 255, 255, 0.9)',
          '100': 'rgba(255, 255, 255, 1.0)',
        },
        darkish: {
          '0':   'rgba(0, 0, 0, 0)',
          '10':  'rgba(0, 0, 0, 0.1)',
          '20':  'rgba(0, 0, 0, 0.2)',
          '30':  'rgba(0, 0, 0, 0.3)',
          '40':  'rgba(0, 0, 0, 0.4)',
          '50':  'rgba(0, 0, 0, 0.5)',
          '60':  'rgba(0, 0, 0, 0.6)',
          '70':  'rgba(0, 0, 0, 0.7)',
          '80':  'rgba(0, 0, 0, 0.8)',
          '90':  'rgba(0, 0, 0, 0.9)',
          '100': 'rgba(0, 0, 0, 1.0)',
        },
      },
      fontSize: {
        xxs: ['0.675rem', { lineHeight: '0.75rem' }],
      },
      colors: {
        background: '#f7faff',
        default:    '#0e103c',
        light:      '#c7d4ed',
        dark:       '#41526A',
        lightblue: {
          '50':  '#f0f9ff',
          '100': '#e0f2fe',
          '200': '#bae6fd',
          '300': '#7dd3fc',
          '400': '#38bdf8',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1',
          '800': '#075985',
          '900': '#0c4a6e',
        },
        lightish: {
          '0':   'rgba(255, 255, 255, 0)',
          '10':  'rgba(255, 255, 255, 0.1)',
          '20':  'rgba(255, 255, 255, 0.2)',
          '30':  'rgba(255, 255, 255, 0.3)',
          '40':  'rgba(255, 255, 255, 0.4)',
          '50':  'rgba(255, 255, 255, 0.5)',
          '60':  'rgba(255, 255, 255, 0.6)',
          '70':  'rgba(255, 255, 255, 0.7)',
          '80':  'rgba(255, 255, 255, 0.8)',
          '90':  'rgba(255, 255, 255, 0.9)',
          '100': 'rgba(255, 255, 255, 1.0)',
        },
        darkish: {
          '0':   'rgba(0, 0, 0, 0)',
          '10':  'rgba(0, 0, 0, 0.1)',
          '20':  'rgba(0, 0, 0, 0.2)',
          '30':  'rgba(0, 0, 0, 0.3)',
          '40':  'rgba(0, 0, 0, 0.4)',
          '50':  'rgba(0, 0, 0, 0.5)',
          '60':  'rgba(0, 0, 0, 0.6)',
          '70':  'rgba(0, 0, 0, 0.7)',
          '80':  'rgba(0, 0, 0, 0.8)',
          '90':  'rgba(0, 0, 0, 0.9)',
          '100': 'rgba(0, 0, 0, 1.0)',
        },
        ...colors,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Monospace', ...defaultTheme.fontFamily.mono],
        gotham: ['GothamPro'],
      },
      boxShadow: {
        ...makeShadow("cool-gray", "71, 85, 104"),
        ...makeShadow("gray", "75, 85, 98"),
        ...makeShadow("red", "223, 39, 44"),
        ...makeShadow("orange", "207, 57, 24"),
        ...makeShadow("yellow", "158, 88, 28"),
        ...makeShadow("green", "16, 122, 87"),
        ...makeShadow("teal", "13, 116, 128"),
        ...makeShadow("sky", "56, 189, 248"),
        ...makeShadow("blue", "29, 100, 236"),
        ...makeShadow("indigo", "87, 81, 230"),
        ...makeShadow("purple", "125, 59, 236"),
        ...makeShadow("pink", "213, 34, 105")
      },
      animation: {
        sheenit: 'sheen 0.42s forwards'
      },
      keyframes: {
        sheen: {
          "100%": {
            transform: "rotateZ(60deg) translate(1em, -30em)"
          }
        }
      }
    },
  },
  variants: {
    extend: {
      animation:          ['hover', 'focus'],
      backgroundClip:     ['hover', 'focus'],
      backgroundColor:    ['group-focus', 'active', 'disabled'],
      borderColor:        ['group-focus', 'disabled', 'active'],
      boxShadow:          ['group-focus'],
      opacity:            ['group-focus', 'disabled'],
      textColor:          ['group-focus', 'active', 'disabled'],
      textDecoration:     ['group-focus'],
      borderWidth:        ['first'],
      display:            ['group-focus', 'group-hover'],
      gradientColorStops: ['active', 'group-hover', 'disabled'],
      rotate:             ['active', 'focus', 'group-hover'],
      scale:              ['active', 'group-hover']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    // plugin(function ({ addVariant, e }) {
    //   addVariant('after', ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //       return `.${e(`after${separator}${className}`)}::after`
    //     })
    //   })
    // }),
  ],
}

// "
// content: '';
// position: absolute;
// top: -50 %;
// right: -50 %;
// bottom: -50 %;
// left: -130 %;
// background: linear - gradient(to bottom, rgba(229, 172, 142, 0), rgba(255, 255, 255, 0.5) 50 %, rgba(229, 172, 142, 0));
// transform: rotateZ(60deg) translate(-5em, 7.5em);
// "