import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';

export const CancelEventSheet = (props: SheetProps<{}>) => {
  return (
    <ActionSheet
      containerStyle={{
        height: normalize(600),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <Text>สาเหตุที่ยกเลิก</Text>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
  },
});
