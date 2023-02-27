import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {colors, font} from '../../common/assets';
import {normalize} from '../../common/function/normalize';

interface Props extends TextInputProps {
  label?: string;
}
export default function TextInputArea({label, ...props}: Props) {
  return (
    <View
      style={{
        marginTop: 10,

        width: '100%',
        marginBottom: 8,
      }}>
      {label && (
        <Text
          style={{
            fontFamily: font.medium,
            fontSize: normalize(16),
            color: colors.fontBlack,
          }}>
          {label}
        </Text>
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        <TextInput
          multiline
          numberOfLines={4}
          blurOnSubmit
          style={[
            {
              minHeight: Platform.OS === 'ios' ? 4 * 20 : 4 * 20,

              width: '100%',
              padding: normalize(5),
              paddingTop: normalize(10),
              textAlignVertical: 'top',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.grayPlaceholder,
              marginVertical: normalize(10),
            },
            props.style,
          ]}
          {...props}
        />
      </ScrollView>
    </View>
  );
}
