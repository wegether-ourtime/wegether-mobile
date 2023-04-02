import {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, font, icons} from '../../common/assets';
import {height, normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import CustomHeader from '../../components/Text/CustomHeader';
import {useEventStore} from '../../stores/eventStore';
import {useLocationStore} from '../../stores/locationStore';

const LocationScreen: React.FC<any> = ({navigation}) => {
  const locations = useLocationStore(state => state.locations);
  const criteria = useLocationStore(state => state.criteria);
  const form = useEventStore(state => state.form);
  const setCriteria = (criteria: any) =>
    useLocationStore.getState().setCriteria(criteria);

  const onChangeText = (field: string, value: string) =>
    setCriteria({...criteria, [field]: value});

  const onSearch = () => {
    useLocationStore.getState().getLocation(criteria);
  };

  const onSelect = async (location: any) => {
    const form = useEventStore.getState().form;
    await useEventStore.getState().setForm({...form, location});
    await navigation.goBack();
  };

  useEffect(() => {
    setCriteria({});
  }, []);

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title="Location"
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder={'Where are you going?'}
            editable={true}
            onChangeText={value => onChangeText('search', value)}></TextInput>
          <TouchableOpacity
            onPress={onSearch}
            style={{marginLeft: normalize(10)}}>
            <Image source={icons.search} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{margin: normalize(10)}}
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onSelect(item)}>
              <View style={styles.option}>
                <Text
                  style={{fontFamily: font.medium, fontSize: normalize(16)}}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: font.light,
                    fontSize: normalize(12),
                    marginTop: normalize(2),
                  }}>
                  {item.address}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default LocationScreen;

const styles = StyleSheet.create({
  main: {
    height: '100%',
  },
  input: {
    width: normalize(296),
    marginHorizontal: normalize(2),
    marginVertical: normalize(8),
    padding: normalize(16),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
  search: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    marginVertical: normalize(8),
    marginHorizontal: normalize(16),
  },
});
