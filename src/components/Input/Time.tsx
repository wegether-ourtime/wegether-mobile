import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import {colors, icons} from '../../common/assets/';
import fonts from '../../common/assets/fonts';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Touchable} from '../Button/Touchable';

export const TimeInput: React.FC<any> = props => {
  const [startTime, setStartDate] = useState<Date>(new Date());
  const [endTime, setEndDate] = useState<Date>();

  const onPress = () => {
    SheetManager.show('TimeInputSheet');
  };

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={onPress}>
        <Text style={{color: colors.grayPlaceholder}}>
          {`${new Date(startTime).toLocaleTimeString('th-TH', {
            hour: 'numeric',
            minute: 'numeric',
          })}`}
          {endTime
            ? `${
                ' - ' +
                `${new Date(endTime).toLocaleTimeString('th-TH', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}`
              }`
            : ''}
        </Text>
        {/* <Icon name="left" size={30} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

export const TimeSheet = (props: SheetProps<{tel: string}>) => {
  const onPressSave = () => {};

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(550),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <Text>Choose Time</Text>
        <View>
          <Text>Start with</Text>
          <RNDateTimePicker
            mode="time"
            value={new Date()}
            is24Hour={false}
            display="spinner"
          />
        </View>
        <View>
          <Text>End with</Text>
          <RNDateTimePicker
            mode="time"
            value={new Date()}
            is24Hour={false}
            display="spinner"
          />
        </View>
        <Touchable
          label={'Save'}
          color={colors.primary}
          fontColor={colors.white}
          style={[styles.button]}
          onPress={onPressSave}></Touchable>
      </View>
    </ActionSheet>
  );
};

export default TimeInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
  },
  input: {
    height: normalize(50),
    marginVertical: normalize(10),
    margin: normalize(30),
    paddingLeft: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    justifyContent: 'center',
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
});
