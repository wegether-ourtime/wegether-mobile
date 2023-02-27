import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {normalize} from '@rneui/themed';
import {MainButton} from '../Button/MainButton';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import fonts from '../../common/assets/fonts';
import {colors} from '../../common/assets';

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

export const CalendarSheet = (props: SheetProps<{tel: string}>) => {
  return (
    <ActionSheet
      containerStyle={{
        height: normalize(300),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <Text>Choose Date</Text>
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
  input: {
    height: normalize(50),
    marginVertical: normalize(10),
    margin: normalize(30),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
  },
});
