import {Linking, Platform} from 'react-native';
import {io} from 'socket.io-client';
import {BASE_URL} from '../../config';
// import {io} from 'socket.io-client';
// import {BASE_URL} from '../config/develop-config';
// import {callcenterNumber} from '../definitions/callCenterNumber';

export const numberWithCommas = (number: string, withOutToFix = false) => {
  let nub = parseFloat(number).toFixed(withOutToFix ? 0 : 2);
  return nub.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const decimalConvert = (string: string) =>
  String(parseFloat(string).toFixed(2));

export const socket = io(BASE_URL, {
  path: '/chat',
});
