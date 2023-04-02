import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {colors, font} from '../../common/assets';
import {Touchable} from '../Button/Touchable';
import icons from '../../common/assets/icons';
import {useEventStore} from '../../stores/eventStore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const CancelEventSheet = (props: SheetProps) => {
  const [reason, setReason] = useState<string>('');
  const [eventId] = useState<string>(props?.payload?.eventId);
  const onPressSave = async () => {
    try {
      await useEventStore.getState().updateEvent(eventId, {
        eventId,
        status: 'CANCEL',
        cancelEventReason: reason,
      });
      await SheetManager.hide('CancelEventSheet');

      Toast.show({
        type: 'success',
        text1: 'Error',
        text2: `Success`,
      });
    } catch (e) {
      Toast.show({
        type: 'fail',
        text1: 'Error',
        text2: `Internal Server Error`,
      });
    }
  };

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(500),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontFamily: font.medium, fontSize: normalize(16)}}>
            สาเหตุที่ยกเลิก
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setReason('ต้องการเปลี่ยนกิจกรรม')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'ต้องการเปลี่ยนกิจกรรม'
                ? {backgroundColor: colors.primary}
                : {}),
            },
          ]}>
          {/* <Image
            source={icons.sport}
            style={{marginHorizontal: normalize(8)}}
          /> */}
          <Text
            style={{
              fontFamily: font.medium,
              marginHorizontal: normalize(8),
              ...(reason == 'ต้องการเปลี่ยนกิจกรรม'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            ต้องการเปลี่ยนกิจกรรม
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('ติดธุระด่วน')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'ติดธุระด่วน'
                ? {backgroundColor: colors.primary}
                : {}),
            },
          ]}>
          {/* <Image
            source={icons.sport}
            style={{marginHorizontal: normalize(8)}}
          /> */}
          <Text
            style={{
              fontFamily: font.medium,
              marginHorizontal: normalize(8),
              ...(reason == 'ติดธุระด่วน'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            ติดธุระด่วน
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('มีเพื่อนทำกิจกรรมแล้ว')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'มีเพื่อนทำกิจกรรมแล้ว'
                ? {backgroundColor: colors.primary}
                : {}),
            },
          ]}>
          {/* <Image
            source={icons.sport}
            style={{marginHorizontal: normalize(8)}}
          /> */}
          <Text
            style={{
              fontFamily: font.medium,
              marginHorizontal: normalize(8),
              ...(reason == 'มีเพื่อนทำกิจกรรมแล้ว'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            มีเพื่อนทำกิจกรรมแล้ว
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('ไม่อยากเข้าร่วมกิจกรรมนี้แล้ว')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'ไม่อยากเข้าร่วมกิจกรรมนี้แล้ว'
                ? {backgroundColor: colors.primary}
                : {}),
            },
          ]}>
          {/* <Image
            source={icons.sport}
            style={{marginHorizontal: normalize(8)}}
          /> */}
          <Text
            style={{
              fontFamily: font.medium,
              marginHorizontal: normalize(8),
              ...(reason == 'ไม่อยากเข้าร่วมกิจกรรมนี้แล้ว'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            ไม่อยากเข้าร่วมกิจกรรมนี้แล้ว
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('อื่นๆ')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'อื่นๆ' ? {backgroundColor: colors.primary} : {}),
            },
          ]}>
          {/* <Image
            source={icons.sport}
            style={{marginHorizontal: normalize(8)}}
          /> */}
          <Text
            style={{
              fontFamily: font.medium,
              marginHorizontal: normalize(8),
              ...(reason == 'อื่นๆ'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            อื่นๆ
          </Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
  },
  title: {
    marginHorizontal: normalize(16),
    marginVertical: normalize(4),
  },
  checkboxContainer: {
    height: normalize(50),
    marginVertical: normalize(10),
    margin: normalize(30),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
});
