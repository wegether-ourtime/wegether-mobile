import {Button} from '@rneui/themed';
import {Text, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, font} from '../../common/assets';
import {normalize} from '../../common/function/Normalize';
import {stylesApp} from '../../common/styles/AppStyle';

export const Touchable: React.FC<any> = props => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: props.color,
          borderColor: props.borderColor ?? 0,
          borderWidth: props.disable ? 0 : 0.5,
          borderRadius: normalize(8),
          alignItems: 'center',
        },
        props.style,
      ]}
      disabled={props.disable}
      onPress={props.onPress}>
      <Text
        style={{
          color: props.fontColor ?? colors.primary,
          fontSize: props.fontSize ?? normalize(18),
          fontFamily: font.medium,
        }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};
