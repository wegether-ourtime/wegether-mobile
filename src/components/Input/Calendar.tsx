import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {normalize} from '@rneui/themed';
import {MainButton} from '../Button/MainButton';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import fonts from '../../common/assets/fonts';
import {colors, font} from '../../common/assets';
import DateRangePicker from 'rn-select-date-range';
import moment from 'moment';
import {Touchable} from '../Button/Touchable';
import {useEventStore} from '../../stores/eventStore';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const CalendarInput: React.FC<any> = props => {
  const {disabled, style, onChange} = props;
  const form = useEventStore(state => state.form);
  const onPress = () => {
    SheetManager.show('CalendarInputSheet');
  };

  return (
    <View>
      <TouchableOpacity disabled={disabled} style={style} onPress={onPress}>
        {form?.startDate ? (
          <Text>
            {`${new Date(form?.startDate).toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })}`}
            {form?.endDate
              ? `${
                  ' - ' +
                  `${new Date(form?.endDate).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}`
                }`
              : ''}
          </Text>
        ) : (
          <Text style={{color: colors.grayPlaceholder}}>Date</Text>
        )}
        {/* <Icon name="left" size={30} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

export const CalendarSheet = (
  props: SheetProps<{startDate: Date; endDate: Date}>,
) => {
  const form = useEventStore(state => state.form);
  const onPressSave = () => {
    SheetManager.hide('CalendarInputSheet');
  };

  const onChange = async (firstDate: any, secondDate: any) => {
    await useEventStore.getState().setForm({
      ...form,
      startDate: new Date(new Date(firstDate).setHours(8)),
      endDate: new Date(new Date(secondDate).setHours(8)),
    });
  };

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(400),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.header}>Choose Date</Text>
        </View>
        <View style={{marginVertical: normalize(10)}}>
          <RNDateTimePicker
            mode="time"
            value={new Date()}
            is24Hour
            // onChange={value => {
            //   onChange(range.firstDate, range.secondDate);
            // }}
          />

          {/* <DateRangePicker
            onSelectDateRange={range => {
              onChange(range.firstDate, range.secondDate);
            }}
            blockSingleDateSelection={true}
            // responseFormat="YYYY-MM-DD"
            maxDate={moment().add(31, 'days')}
            minDate={moment(new Date()).add(1, 'days')}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
            clearBtnTitle={''}
            confirmBtnTitle={''}
          /> */}
          {/* <Touchable
            label={'Save'}
            color={colors.primary}
            fontColor={colors.white}
            style={[styles.button]}
            onPress={onPressSave}></Touchable> */}
        </View>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
  },
  header: {
    fontFamily: font.medium,
    fontSize: normalize(20),
  },
  title: {
    marginHorizontal: normalize(16),
    marginVertical: normalize(4),
  },
  // input: {
  //   height: normalize(50),
  //   marginVertical: normalize(10),
  //   margin: normalize(30),
  //   paddingLeft: normalize(15),
  //   borderColor: colors.disable,
  //   borderWidth: 0.5,
  //   borderRadius: normalize(8),
  //   justifyContent: 'center',
  // },
  selectedDateContainerStyle: {
    height: normalize(30),
    width: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: normalize(30),
    // color:'black'
  },
  selectedDateStyle: {
    color: 'white',
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
});
