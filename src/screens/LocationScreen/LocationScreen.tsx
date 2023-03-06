import {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, FlatList} from 'react-native';
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

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title="Location"
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <View style={styles.search}>
          <TouchableOpacity
            onPress={onSearch}
            style={{marginLeft: normalize(10)}}>
            <Image source={icons.search} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={'Where are you going?'}
            editable={true}
            onChangeText={value => onChangeText('search', value)}></TextInput>
        </View>
        <FlatList
          style={{margin: normalize(10)}}
          data={locations}
          keyExtractor={item => item.name}
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
        {/* <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            paddingBottom: normalize(130),
          }}>
          <FlatList
            data={locations}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};
export default LocationScreen;

const styles = StyleSheet.create({
  main: {
    // flex: 0,
    // flexDirection: 'column',
    height: '100%',
  },
  //   button: {
  //     margin: normalize(20),
  //     marginBottom: normalize(0),
  //     padding: normalize(10),
  //   },
  input: {
    width: normalize(320),
    margin: normalize(10),
    padding: normalize(15),
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
