import { pink } from '@material-ui/core/colors';

const theme = pink['A700'];
const themeS = 'blue';
const white = '#fff';
const lightDark = true;

const darkTheme = {
  white,
  bg: '#f5f5f5',
  theme,
  themeS,
  primary: theme,
  appBar: 'rgba(0,0,0,.5)',
};

const lightTheme = {
  theme: theme,
};

let colors = lightDark ? darkTheme : lightTheme;

export default colors;
