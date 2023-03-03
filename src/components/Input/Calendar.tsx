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
import { Touchable } from '../Button/Touchable';

export const CalendarInput: React.FC<any> = props => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();

  const onPress = () => {
    SheetManager.show('CalendarInputSheet');
  };

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={onPress}>
        <Text style={{color: colors.grayPlaceholder}}>
          {startDate.toDateString()}
          {endDate ? `${' - ' + endDate.toDateString()}` : ''}
        </Text>
        {/* <Icon name="left" size={30} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

export const CalendarSheet = (
  props: SheetProps<{startDate: Date; endDate: Date}>,
) => {
  // const startDate = props.payload?.startDate;
  // const endDate = props.payload?.endDate;
  const [selectedRange, setRange] = useState({});

  const onPressSave = () => {
    
  }

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
        <View style={{ marginVertical: normalize(10)}}>
          <DateRangePicker
            onSelectDateRange={range => {
              setRange(range);
            }}
            blockSingleDateSelection={true}
            // responseFormat="YYYY-MM-DD"
            maxDate={moment().add(31, 'days')}
            minDate={moment()}
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

        {/* <View style={{alignItems: 'center'}}>
          <Text style={styles.h1}>โทรศัพท์หา</Text>
        </View> */}
        {/* <MainButton
          label={'เกษตรกร'}
          color={colors.orange}
          // onPress={() => dialCall(props.payload?.tel)}
        />
        <MainButton
          label={'ติดต่อเจ้าหน้าที่'}
          color={colors.white}
          fontColor={'red'}
          borderColor={colors.disable}
          // onPress={() => dialCall()}
        /> */}
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
