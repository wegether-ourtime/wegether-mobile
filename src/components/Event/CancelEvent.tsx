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
            Cancellation reason
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setReason('want to change activities')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'want to change activities'
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
              ...(reason == 'want to change activities'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            want to change activities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('busy with errands')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'busy with errands'
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
              ...(reason == 'busy with errands'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            busy with errands
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('Have friends doing activities')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'Have friends doing activities'
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
              ...(reason == 'Have friends doing activities'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            Have friends doing activities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('Do not want to join activity')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'Do not want to join activity'
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
              ...(reason == 'Do not want to join activity'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            Do not want to join activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReason('Other')}
          style={[
            styles.checkboxContainer,
            {
              ...(reason == 'Other' ? {backgroundColor: colors.primary} : {}),
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
              ...(reason == 'Other'
                ? {color: colors.white}
                : {color: colors.fontBlack}),
            }}>
            Other
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
