export function asRgbArray(color){
  if(color.indexOf('(') < 0){
    // #abc132
    return color.match(/[a-fA-F0-9]{2}/g).map(c => parseInt(c,16));
  } else {
    // rgb(254,0,30)
    return color.match(/\d+/g)
  }
}

export function getTextColor(color){
  let rgbArr = asRgbArray(color+'');
  let val = 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2];
  return (val > 255 / 2) ? '#000000': '#ffffff';
}

export const ColorSet = {
  'green': [
    '#006e54', '#00a381', '#38b48b', '#00a497', '#80aba9'
  ],
  'green-blue': [
    '#6c848d', '#53727d', '#5b7e91', '#426579',
    '#4c6473', '#455765', '#44617b',
  ],
  'light-1':[
    '#00a381', '#c1e4e9', '#38b48b',
    '#508da3', '#a5def1', '#e9e9eb',
  ],
  'set-1':[
    '#689D81', '#66987D', '#5C9677', '#B0E1C7', '#C5E1D2',
    '#607E8D', '#5E7A88', '#557586', '#AFCCDC', '#C2D3DC',
    '#A9C985', '#A4C283', '#9CBF76', '#D6EFBA', '#E0EFD1'
  ],
  'set-2':[
    '#FEC3AA','#FEDACA',
    '#FEDBAA','#FEE8CA',
    '#85B8CB','#9ABFDF','#B4CBDF','#a6c2ce',
    '#9BCFB8','#97E2C4','#B4E2CF',
  ],
  'set-chips':[
    '#FEDACA',
    '#FEE8CA',
    '#B4CBDF','#a6c2ce',
    '#9BCFB8','#B4E2CF',
    '#d9cfe7'
  ]
}
