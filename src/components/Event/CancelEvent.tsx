import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {colors} from '../../common/assets';
import {Touchable} from '../Button/Touchable';

export const CancelEventSheet = (props: SheetProps<{}>) => {
  const onPressSave = () => {
    SheetManager.hide('CancelEventSheet');
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
          <Text>สาเหตุที่ยกเลิก</Text>
        </View>
        <TouchableOpacity style={styles.checkboxContainer}>
          <Text>ต้องการเปลี่ยนกิจกรรม</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer}>
          <Text>ติดธุระด่วน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer}>
          <Text>มีเพื่อนทำกิจกรรมแล้ว</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer}>
          <Text>ไม่อยากเข้าร่วมกิจกรรมนี้แล้ว</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer}>
          <Text>อื่นๆ</Text>
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
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
});
