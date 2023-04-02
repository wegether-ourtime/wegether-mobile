import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import {colors, font, icons} from '../../common/assets/';
import fonts from '../../common/assets/fonts';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {Category} from '../Category/Category';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useEventStore} from '../../stores/eventStore';
import {Touchable} from '../Button/Touchable';
import * as RootNavigation from '../../navigations/RootNavigation';
import {CalendarInput} from '../Input/Calendar';
import TimeInput from '../Input/Time';
import {allCategories} from '../../common/function/utility';
import {FilterCalendarInput} from './FilterCalendar';
import FilterTimeInput from './FilterTime';
import FastImage from 'react-native-fast-image';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const FilterEventSheet = (props: SheetProps) => {
  const [categories] = useState<any>(allCategories);
  const criteria = useEventStore(state => state.criteria);
  const setCriteria = (criteria: any) =>
    useEventStore.getState().setCriteria(criteria);

  const onSelect = (categoryId: string) => {
    if (!criteria?.categoriesId) {
      useEventStore.getState().setCriteria({
        ...criteria,
        categoriesId: [categoryId],
      });
    } else if (
      !criteria.categoriesId.find((cId: string) => cId == categoryId)
    ) {
      useEventStore.getState().setCriteria({
        ...criteria,
        categoriesId: [...criteria.categoriesId, categoryId],
      });
    } else {
      useEventStore.getState().setCriteria({
        ...criteria,
        categoriesId: criteria.categoriesId.filter(
          (cId: string) => cId != categoryId,
        ),
      });
    }
  };

  const onChangeDate = (type: 'startDate' | 'endDate', date: Date) =>
    useEventStore.getState().setCriteria({
      ...criteria,
      ...(type == 'startDate' ? {startDate: date} : {endDate: date}),
    });

  const onSubmit = async () => {
    try {
      useEventStore.getState().getEvents(criteria);
      SheetManager.hide('FilterEventSheet');
    } catch (e) {
      console.log(e);
    }
  };

  const onClear = async () => {
    try {
      const c = criteria
      delete c['categoriesId']
      delete c['startDate']
      delete c['endDate']
      useEventStore.getState().setCriteria({...c});
      await useEventStore.getState().getEvents({...c});
      SheetManager.hide('FilterEventSheet');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(700),
      }}
      // snapPoints={[50]}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.header}>Filters</Text>
        </View>
        <View style={styles.categories}>
          {categories.map((item: any) => {
            return (
              <Category
                key={item.id}
                categoryId={item.id}
                name={item.name}
                icon={item.icon}
                selected={
                  criteria?.categoriesId?.find((sc: string) => sc === item.id)
                    ? true
                    : false
                }
                // disabled={
                //   criteria?.categoriesId.length === 3 &&
                //   !criteria?.categoriesId.find((sc: string) => sc === item.id)
                // }
                onSelect={(categoryId: string) =>
                  onSelect(categoryId)
                }></Category>
            );
          })}
        </View>
        <View style={styles.inputConatiner}>
          <View style={styles.inputName}>
            <Text style={styles.inputText}>Start</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNDateTimePicker
              style={{
                marginHorizontal: normalize(2),
              }}
              mode="date"
              value={criteria?.startDate ?? new Date()}
              minimumDate={new Date()}
              is24Hour
              locale="en-US"
              dateFormat="day month year"
              onChange={async (event, date) => {
                onChangeDate('startDate', date ?? new Date());
              }}
            />
            <RNDateTimePicker
              style={{
                marginHorizontal: normalize(2),
              }}
              mode="time"
              value={criteria?.startDate ?? new Date()}
              is24Hour
              locale="en-US"
              onChange={async (event, date) =>
                onChangeDate(
                  'startDate',
                  new Date(
                    new Date(criteria?.startDate).setTime(date?.getTime() ?? 0),
                  ),
                )
              }
            />
          </View>
        </View>
        <View style={styles.inputConatiner}>
          <View style={styles.inputName}>
            <Text style={styles.inputText}>End</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNDateTimePicker
              style={{
                marginHorizontal: normalize(2),
              }}
              mode="date"
              value={criteria?.endDate ?? new Date()}
              is24Hour
              locale="en-US"
              dateFormat="day month year"
              onChange={(event, date) =>
                onChangeDate('endDate', date ?? new Date())
              }
            />
            <RNDateTimePicker
              style={{
                marginHorizontal: normalize(2),
              }}
              mode="time"
              value={criteria?.endDate ?? new Date()}
              // minimumDate={form?.startDate ?? new Date()}
              is24Hour
              locale="en-US"
              onChange={(event, date) => {
                // console.log(
                //   new Date(
                //     new Date(criteria?.endDate).setTime(date?.getTime() ?? 0),
                //   ),
                // );
                onChangeDate(
                  'endDate',
                  new Date(
                    new Date(criteria?.endDate).setTime(date?.getTime() ?? 0),
                  ),
                );
              }}
            />
          </View>
        </View>
        {/* <View style={styles.inputConatiner}>
          <View style={styles.inputName}>
            <Image
              source={icons.location}
              style={{marginHorizontal: normalize(4)}}
            />
            <Text style={{marginHorizontal: normalize(4)}}>Location</Text>
          </View>
          <TouchableOpacity
            style={styles.input}
            // disabled={view}
            onPress={() => {
              RootNavigation.navigate('Main', {
                screen: 'LocationScreen',
              });
            }}>
            {criteria?.location ? (
              <Text style={{color: colors.fontBlack}}>
                {criteria.location.name}
              </Text>
            ) : (
              <Text style={{color: colors.grayPlaceholder}}>Location</Text>
            )}
          </TouchableOpacity>
        </View> */}
        <Touchable
          label={'Clear'}
          // disable={validateField}
          // color={!validateField ? colors.disable : colors.primary}
          color={colors.white}
          fontColor={colors.primary}
          borderColor={colors.primary}
          style={[styles.button]}
          onPress={() => onClear()}></Touchable>
        <Touchable
          label={'Save'}
          // disable={validateField}
          // color={!validateField ? colors.disable : colors.primary}
          color={colors.primary}
          fontColor={colors.white}
          style={[styles.button]}
          onPress={() => onSubmit()}></Touchable>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(8),
  },
  title: {
    marginHorizontal: normalize(16),
    marginVertical: normalize(4),
  },
  header: {
    fontFamily: font.medium,
    fontSize: normalize(20),
  },
  categories: {
    margin: normalize(8),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
  input: {
    height: normalize(48),
    // marginVertical: normalize(10),
    // margin: normalize(30),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
  inputConatiner: {
    // height: normalize(50),
    marginVertical: normalize(0),
    marginHorizontal: normalize(24),
    // padding: normalize(15),
  },
  inputName: {
    flexDirection: 'row',
    marginVertical: normalize(12),
  },
  inputText: {
    paddingHorizontal: normalize(4),
    fontFamily: font.medium,
    fontSize: normalize(14),
  },
});
