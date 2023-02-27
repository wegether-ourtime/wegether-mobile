import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
// import DatePicker from 'react-native-modern-datepicker';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { normalize } from '../../common/function/normalize';
import { colors, icons} from '../../common/assets/';
import fonts from '../../common/assets/fonts';
import { SheetManager } from 'react-native-actions-sheet';
import { stylesApp } from '../../common/styles/AppStyle';
// import DatePicker from 'react-native-modern-datepicker';
// import Modal from 'react-native-modal/dist/modal';

interface Props {
  onChange?: (date: Date) => void;
  value?: Date;
  label?: string;
  placeholder?: string;
}

export const TimeInput: React.FC<any> = props => {
  const onPress = () => {
    SheetManager.show('TimerInputSheet');
  };

  return (
    <View style={stylesApp.main}>
      <TouchableOpacity style={styles.input} onPress={onPress}>
        <Text>Haha</Text>
        {/* <Icon name="left" size={30} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

const TimeSheet = ({
  onChange,
  value,
  label,
  placeholder = 'เลือกเวลา',
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          marginTop: 10,
          marginBottom: 8,
        }}>
        {label && (
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: normalize(16),
              color: colors.fontBlack,
            }}>
            {label}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          padding: normalize(5),
          paddingVertical: normalize(7),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.grayPlaceholder,
        }}
        onPress={() => setIsOpen(true)}>
        {!value ? (
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: normalize(16),
              color: colors.grayPlaceholder,
            }}>
            {placeholder}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: fonts.medium,

              fontSize: normalize(16),
              color: colors.inputText,
            }}>
            {value ? dayjs(value).format('HH:mm') : ''}
          </Text>
        )}
        {/* <Image
          source={icons.timeIcon}
          style={{
            width: normalize(25),
            height: normalize(25),
          }}
        /> */}
      </TouchableOpacity>
      {/* <DatePicker
        mode="time"
        options={{
          headerFont: font.medium,
        }}
      /> */}
      <DateTimePickerModal
        isVisible={isOpen}
        mode="time"
        cancelTextIOS="ยกเลิก"
        is24Hour
        // locale="th"
        confirmTextIOS="ตกลง"
        timePickerModeAndroid="spinner"
        onCancel={() => setIsOpen(false)}
        onConfirm={date => {
          onChange?.(date);
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default TimeInput;
