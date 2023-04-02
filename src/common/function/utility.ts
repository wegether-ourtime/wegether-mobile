import {Linking, Platform} from 'react-native';
import {io} from 'socket.io-client';
import {BASE_URL} from '../../config';
import {icons} from '../assets';
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
  path: '/chat-gateway',
});

export const allCategories = [
  {
    id: 'ae265f73-d52c-4bac-9924-6e54d5395b01',
    name: 'Movies & Cinema',
    icon: icons.movie,
  },
  {
    id: '91702911-0267-4d50-97a1-ad920b477f91',
    name: 'Sport',
    icon: icons.sport,
  },
  {
    id: '212e5213-5321-4e51-94cc-e420a9ef59f5',
    name: 'Party and Night Life',
    icon: icons.party,
  },
  {
    id: 'b9e932a9-d0fe-4b49-9de1-e34928bc57f2',
    name: 'Travel',
    icon: icons.travel,
  },
  {
    id: '17e3ea07-21be-4c31-a99f-a4f244d9a7ee',
    name: 'Take a photo',
    icon: icons.photo,
  },
  {
    id: 'b7af4749-90e4-4b75-b6f6-86f123d6d474',
    name: 'Health &Wellness',
    icon: icons.health,
  },
  {
    id: 'cd924f7a-4bf8-4248-abd8-27728272ee38',
    name: 'Culture',
    icon: icons.culture,
  },
  {
    id: '747f05c0-0d6d-4879-9fbd-9ebd9c8623b8',
    name: 'Food & Cooking',
    icon: icons.food,
  },
  {
    id: '5ba5d8ae-1e18-4abd-92b8-e705e8b8efbd',
    name: 'Education',
    icon: icons.education,
  },
  {
    id: 'cc0d5bd1-168a-400b-b3d9-3c976dd217c9',
    name: 'Gaming',
    icon: icons.gaming,
  },
  {
    id: '13bd27d4-2431-4c97-8d24-25ff301fd8c1',
    name: 'Language Exchange',
    icon: icons.language,
  },
  {
    id: 'da299bcf-1fae-485c-a1e8-2ad3a8373d07',
    name: 'Concert',
    icon: icons.concert,
  },
  {
    id: 'e9a1db74-5c35-4a8a-abfc-57dcbff06267',
    name: 'Shoping',
    icon: icons.shoping,
  },
  {
    id: '0a7dd857-7fbb-4bfb-8ff7-73bfdde3e883',
    name: 'Music',
    icon: icons.music,
  },
];
