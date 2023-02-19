import {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
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

  return (
    <View style={styles.main}>
      <Image source={icons.search} />
      <TextInput
        style={styles.input}
        placeholder={'What are you interest in?'}
        editable={true}
        onChangeText={value => onChangeText('search', value)}></TextInput>
      <Image source={icons.filter} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    // padding: normalize(12),
    // margin: normalize(6),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: normalize(250),
    margin: normalize(15),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
});
