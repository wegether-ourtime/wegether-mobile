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

export const CalendarInput: React.FC<any> = props => {
  const {disabled, style} = props;
  const form = useEventStore(state => state.form);
  const onPress = () => {
    SheetManager.show('CalendarInputSheet');
  };

  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        style={style}
        onPress={onPress}>
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
  const [selectedRange, setRange] = useState({});

  const onPressSave = () => {
    SheetManager.hide('CalendarInputSheet');
  };

  const onChange = (field: 'startDate' | 'endDate', value: any) => {
    const date = new Date(value);
    const datetime = new Date(form?.[field] ?? new Date());
    useEventStore.getState().setForm({
      ...form,
      ['startDate']: new Date(
        new Date(
          new Date(datetime.setDate(date.getDate())).setMonth(date.getMonth()),
        ).setFullYear(date.getFullYear()),
      ),
    });
  };

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(450),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Choose Date</Text>
        <View style={{marginVertical: normalize(10)}}>
          <DateRangePicker
            onSelectDateRange={range => {
              onChange('startDate', range.firstDate);
              onChange('endDate', range.secondDate);
            }}
            blockSingleDateSelection={true}
            // responseFormat="YYYY-MM-DD"
            maxDate={moment().add(31, 'days')}
            minDate={moment(new Date()).add(1, 'days')}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
            clearBtnTitle={''}
            confirmBtnTitle={''}
          />
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
  },
  header: {
    fontFamily: font.medium,
    fontSize: normalize(20),
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
