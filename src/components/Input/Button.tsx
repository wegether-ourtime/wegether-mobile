import {Button} from '@rneui/themed';
import {ViewStyle} from 'react-native';
import {colors, font} from '../../common/assets';
import {normalize} from '../../common/function/Normalize';
import {stylesApp} from '../../common/styles/AppStyle';

// interface MainButtonProps {
//   label: string;
//   color: string;
//   fontSize?: number;
//   fontWeight?: string;
//   fontColor?: string;
//   borderColor?: string;
//   disable?: boolean;
//   onPress?: () => void;
//   style?: ViewStyle;
// }

export const MainButton: React.FC<any> = props => {
  // return null;
  return (
    <Button
      disabled={props.disable}
      title={props.label}
      titleStyle={{
        color: props.fontColor ? props.fontColor : colors.white,
        fontSize: props.fontSize ?? normalize(18),
        fontFamily: font.medium,
      }}
      buttonStyle={[
        // stylesApp.mainButton,
        {
          backgroundColor: props.color,
          borderColor: props.borderColor ? props.borderColor : props.color,
          borderWidth: props.disable ? 0 : 0.5,
          borderRadius: normalize(8),
        },
        props.style,
      ]}
      onPress={props.onPress}
    />
  );
};
