import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import {colors, icons} from '../../common/assets/';
import fonts from '../../common/assets/fonts';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';

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
          {startTime.toTimeString()}
          {endTime ? `${' - ' + endTime.toTimeString()}` : ''}
        </Text>
        {/* <Icon name="left" size={30} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

export const TimeSheet = (props: SheetProps<{tel: string}>) => {
  return (
    <ActionSheet
      containerStyle={{
        height: normalize(300),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <Text>Choose Time</Text>
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
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
  },
});
