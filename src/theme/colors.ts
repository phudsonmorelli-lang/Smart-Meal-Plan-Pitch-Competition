import { Platform } from 'react-native';

export const colors = {
  // Shared forest palette (using student's slightly lighter forest variants)
  forestDark: '#143C34',
  forest: '#1D5247',
  forestLight: '#3D6F62',

  // Neutrals
  cream: '#F6F2EB',
  paper: '#FFFCF7',
  border: '#E8E0D5',
  card: '#FFFFFF',
  text: '#18231E',
  textSoft: '#55625A',

  // Chips & accents
  chip: '#EEF2E7',
  chipText: '#28463B',
  softGreen: '#DEE8D7',
  softGreenText: '#365C4B',
  softOrange: '#E7802B',
  softOrangeDark: '#B85A11',

  // Extras from cafe palette
  limeCard: '#7EB84F',
  goldCard: '#F0B23A',
  blueCard: '#EDF3F8',
  lavenderCard: '#EFE7F4',
  heroLeaf: 'rgba(211, 233, 198, 0.6)',

  // Status
  danger: '#D56E63',
  gold: '#E4BF64',
  shadow: 'rgba(17, 26, 22, 0.08)',
  mutedLine: '#D7D0C6'
};

export const displayFont = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia'
}) as string;
