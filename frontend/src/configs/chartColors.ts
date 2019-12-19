const selectMapColors = {
  hover: '#5f594f',
  select: {
    color: '#5f594f',
    borderColor: '#000000'
  }
};

const axisColorForMap = {
  minColor: '#a5a19b',
  midColor: '#7e7970',
  maxColor: '#5f594f'
};

const legendTextColorForPie = '#000000';

/**
 * these are the colors for the
 * arrows in the pie chart
 */
const LegendNavigationColors = {
  activeColor: '#3E576F',
  inactiveColor: '#CCCCCC',
  style: {
    color: '#333333'
  }
};

/**
 * these are the colors for the pie and wordcloud
 * charts, starts from the highest value
 */
const chartValuesColors: string[] = [
  '#5f594f',
  '#009673',
  '#0065bd',
  '#e1d219',
  '#762022',
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
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
  '#6666FF'
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
  legendTextColorForPie
};
