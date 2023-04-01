import {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {colors, font} from '../../common/assets';
import {normalize} from '../../common/function/normalize';

export const EventCodeSheet = (props: SheetProps) => {
  const [eventCode] = useState<string>(props?.payload?.eventCode);

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(160),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.inputConatiner}>
          <View style={styles.inputName}>
            <Text style={styles.inputText}>Event Code</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
            <TextInput
              value={eventCode}
              style={{
                height: normalize(48),
                width: normalize(280),
                padding: normalize(16),
                borderColor: colors.disable,
                borderWidth: 1.5,
                borderRadius: normalize(8),
                color: colors.fontBlack,
                backgroundColor: colors.white,
                fontSize: normalize(16),
              }}
              // editable={false}
              // textAlign='center'
              // placeholderTextColor={colors.disable}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  eventCodeButton: {
    height: normalize(40),
    marginVertical: normalize(16),
    marginHorizontal: normalize(80),
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventCodeText: {
    color: colors.primary,
    fontFamily: font.medium,
    fontSize: normalize(14),
    // backgroundColor: 'red'
  },
  eventCode: {
    position: 'absolute',
    top: normalize(316),
    left: normalize(3),
    width: '98%',
    padding: normalize(50),
    // marginHorizontal: normalize(8),
    paddingHorizontal: normalize(8),
    borderRadius: normalize(16),
    backgroundColor: colors.white,

    // Shadow only works on iOS.
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
  },
  input: {
    height: normalize(48),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
  inputConatiner: {
    marginVertical: normalize(4),
    marginHorizontal: normalize(24),
  },
  inputName: {
    flexDirection: 'row',
    marginVertical: normalize(12),
  },
  inputText: {
    paddingHorizontal: normalize(8),
    fontFamily: font.medium,
    fontSize: normalize(16),
  },
});
