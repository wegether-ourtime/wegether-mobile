import {Picker} from '@react-native-picker/picker';
import {fonts} from '@rneui/themed/dist/config';
import {StyleSheet, View, Text} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, font} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {Touchable} from '../Button/Touchable';

export const PickerInput: React.FC<any> = props => {
  const {items, value, disabled} = props;

  const onPress = () => {
    SheetManager.show('PickerSheet', {
      payload: {
        items,
        value,
      },
    });
  };

  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        style={styles.input}
        onPress={onPress}>
        <Text>Picker</Text>
      </TouchableOpacity>
    </View>
  );
};

export const PickerSheet = (props: SheetProps<{items: any; value: any}>) => {
  const onPressSave = () => {
    SheetManager.hide('PickerSheet');
  };

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(200),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={false}>
      <View style={styles.container}>
        <Picker
          selectedValue={'Female'}
          mode={'dialog'}
          enabled={true}
          itemStyle={{height: '80%',     backgroundColor: 'yellow',}}
          //   style={}
          // onValueChange={(itemValue, itemIndex) =>
          //   setSelectedValue(itemValue)
          // }
        >
          {props?.payload?.items?.map((item: any) => {
            return <Picker.Item label={item.label} value={item.value} />;
          })}
        </Picker>
          {/* <TouchableOpacity>
            <Text>haha</Text>
          </TouchableOpacity> */}
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
    height: '100%',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
    justifyContent: 'center',
    // flexDirection: 'row',
    // alignSelf: 'flex-end'
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
  button: {
    padding: normalize(10),
  },
  header: {
    fontFamily: font.medium,
    fontSize: normalize(20),
  },
});
