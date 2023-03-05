import {BaseToast, ErrorToast, ToastProps} from 'react-native-toast-message';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {TabActions} from '@react-navigation/native';
import {normalize} from '../common/function/normalize';
import {colors, font, icons} from '../common/assets';
import {responsiveHeigth, responsiveWidth} from '../common/function/responsive';
import fonts from '../common/assets/fonts';

const toastStyle = {
  backgroundColor: '#3EBD93',
  borderRadius: 16,
  width: '90%',
  height: normalize(90),
};

const text1Style = {
  color: '#FFFFFF',
  fontFamily: font.bold,
  fontSize: normalize(16),
  paddignLeft: 10,
};

const text2Style = {
  color: '#FFFFFF',
  fontFamily: font.light,
  fontSize: normalize(16),
  paddignLeft: 10,
};

export const toastConfig = {
  receiveTaskSuccess: ({onPress, text1, text2, props}: any) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.modalBgSuccess}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {/* <Image
            source={icons.closecircle}
            style={{
              width: normalize(30),
              height: normalize(30),
            }}
          /> */}
          <View
            style={{
              paddingLeft: normalize(12),
            }}>
            <Text style={styles.info}>{text1}</Text>
            <Text style={styles.info}>{text2}</Text>
            <Text style={styles.info}>ถูกรับแล้ว</Text>
            <Text style={styles.infolight}>
              อย่าลืมติดต่อหาเกษตรกรก่อนเริ่มงาน
            </Text>
          </View>
        </View>
        <View style={styles.closePosition}>
          <TouchableOpacity
            onPress={() => {
              Toast.hide();
            }}>
            {/* <Image
              source={icons.closewhite}
              style={{
                width: normalize(12),
                height: normalize(12),
              }}
            /> */}
          </TouchableOpacity>
          <View />
        </View>
      </View>
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({
  modalBgSuccess: {
    width: responsiveWidth(345),
    borderRadius: responsiveWidth(16),
    backgroundColor: '#3EBD93',
    paddingVertical: responsiveHeigth(15),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  modalBgWarning: {
    width: responsiveWidth(345),
    borderRadius: responsiveWidth(16),
    backgroundColor: '#FF981E',
    paddingVertical: responsiveHeigth(15),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  modalBgFailed: {
    width: responsiveWidth(345),
    borderRadius: responsiveWidth(16),
    backgroundColor: '#EB5757',
    paddingVertical: responsiveHeigth(15),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  modalBgdroneFailed: {
    width: responsiveWidth(345),
    borderRadius: responsiveWidth(16),
    backgroundColor: '#EB5757',
    paddingVertical: responsiveHeigth(15),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  closePosition: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  info: {
    fontSize: normalize(16),
    fontFamily: fonts.medium,
    color: colors.white,
  },
  infolight: {
    fontSize: normalize(14),
    fontFamily: fonts.medium,
    color: colors.white,
  },
});
