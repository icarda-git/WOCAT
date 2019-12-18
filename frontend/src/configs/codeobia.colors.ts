const selectMapColors = {
  hover: '#5dbcd2',
  select: {
    color: '#005353',
    borderColor: '#000000',
  },
};

const axisColorForMap = {
  minColor: '#5dbcd2',
  midColor: '#199696',
  maxColor: '#005353',
};

const legendTextColorForPie = '#000000';

/**
 * these are the colors for the
 * arrows in the pie chart
 */
const LegendNavigationColors = {
  activeColor: '#006f6f',
  inactiveColor: '#CCCCCC',
  style: {
    color: '#005353',
  },
};

/**
 * these are the colors for the pie and wordcloud
 * charts, starts from the highest value
 */
const chartValuesColors: string[] = [
  '#5dbcd2',
  '#b44938',
  '#fdfd23',
  '#ffa803',
  '#813338',
  '#20abab',
  '#260f10',
  '#66b9b9',
  '#FFC6A8',
  '#FF8984',
  '#B7D7D8',
  '#571845',
  '#900C3E',
  '#C70039',
  '#FF5733',
  '#FFC300',
  '#1A2530',
  '#2C3E50',
  '#FF283F',
  '#A8806D',
  '#F0AC94',
  '#FF2857',
  '#E825B0',
  '#9D25E8',
  '#7228FF',
  '#E51CFF',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];

// const chartThemeName:
//   | 'avocado'
//   | 'dark-blue'
//   | 'dark-green'
//   | 'dark-unica'
//   | 'gray'
//   | 'grid-light'
//   | 'sand-signika'
//   | 'skies'
//   | 'sunset' = 'sunset';

export {
  chartValuesColors,
  LegendNavigationColors,
  axisColorForMap,
  selectMapColors,
  legendTextColorForPie,
};
