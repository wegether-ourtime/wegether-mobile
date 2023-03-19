import {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, font} from '../../common/assets';
import icons from '../../common/assets/icons';
import {normalize} from '../../common/function/normalize';
import {useEventStore} from '../../stores/eventStore';

export const Filter: React.FC<any> = props => {
  const criteria = useEventStore(state => state.criteria);
  const setCriteria = (criteria: any) =>
    useEventStore.getState().setCriteria(criteria);

  const onChangeText = (field: string, value: string) =>
    setCriteria({...criteria, [field]: value});

  const onSearch = () => {
    useEventStore.getState().getEvents(criteria);
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        placeholder={'What are you interest in?'}
        editable={true}
        onChangeText={value => onChangeText('search', value)}></TextInput>
      <TouchableOpacity
        onPress={onSearch}
        containerStyle={{
          marginHorizontal: normalize(8),
        }}>
        <Image source={icons.search} />
      </TouchableOpacity>
      <TouchableOpacity
        containerStyle={{marginHorizontal: normalize(8)}}
        onPress={() => {
          SheetManager.show('FilterEventSheet');
        }}>
        <Image source={icons.filter} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginVertical: normalize(8),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  headerSafeArea: {
    backgroundColor: colors.background,
  },
  headerWraper: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: normalize(75),
  },
  input: {
    width: normalize(272),
    height: normalize(40),
    marginLeft: normalize(16),
    marginRight: normalize(8),
    paddingHorizontal: normalize(16),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
});
