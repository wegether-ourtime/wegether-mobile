import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import {colors, font, icons} from '../../common/assets/';
import fonts from '../../common/assets/fonts';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Touchable} from '../Button/Touchable';
import {useEventStore} from '../../stores/eventStore';

export const TimeInput: React.FC<any> = props => {
  const {disabled} = props;
  const form = useEventStore(state => state.form);
  const onPress = () => {
    SheetManager.show('TimeInputSheet');
  };

  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        style={styles.input}
        onPress={onPress}>
        {form?.startDate ? (
          <Text>
            {`${new Date(form?.startDate).toLocaleTimeString('th-TH', {
              hour: 'numeric',
              minute: 'numeric',
            })}`}
            {form?.endDate
              ? `${
                  ' - ' +
                  `${new Date(form?.endDate).toLocaleTimeString('th-TH', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}`
                }`
              : ''}
          </Text>
        ) : (
          <Text style={{color: colors.grayPlaceholder}}>Time</Text>
        )}
        {/* <Icon name="left" size={30} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

export const TimeSheet = (props: SheetProps) => {
  const form = useEventStore(state => state.form);
  const onPressSave = () => {
    SheetManager.hide('TimeInputSheet');
  };
  const onChange = (field: 'startDate' | 'endDate', value: any) => {
    const time = new Date(value);
    const datetime = new Date(form?.[field] ?? new Date());
    useEventStore.getState().setForm({
      ...form,
      [field]: new Date(
        new Date(datetime.setHours(time.getHours())).setMinutes(
          time.getMinutes(),
        ),
      ),
    });
  };

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(550),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Choose Time</Text>
        <View style={{margin: normalize(20)}}>
          <View>
            <Text>Start with</Text>
            <RNDateTimePicker
              mode="time"
              value={new Date(form?.startDate ?? new Date())}
              is24Hour={false}
              display="spinner"
              textColor={colors.primary}
              onChange={(event, value) => onChange('startDate', value)}
            />
          </View>
          <View>
            <Text>End with</Text>
            <RNDateTimePicker
              mode="time"
              value={new Date(form?.endDate ?? new Date())}
              is24Hour={false}
              display="spinner"
              textColor={colors.primary}
              onChange={(event, value) => onChange('endDate', value)}
              minimumDate={new Date(form?.startDate ?? new Date())}
            />
          </View>
          <Touchable
            label={'Save'}
            color={colors.primary}
            fontColor={colors.white}
            style={[styles.button]}
            onPress={onPressSave}></Touchable>
        </View>
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
    padding: normalize(10),
  },
  header: {
    fontFamily: font.medium,
    fontSize: normalize(20),
  },
});
