import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {normalize} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import {colors, image, icons} from '../../common/assets';
import fonts from '../../common/assets/fonts';
// import Tasklists from '../../components/TaskList/Tasklists';
// import {TaskDatasource} from '../../datasource/TaskDatasource';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Event} from '../../components/Event/Event';
// import * as ImagePicker from 'react-native-image-picker';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useEventStore} from '../../stores/eventStore';

interface Prop {}

const IncomingScreen: React.FC<Prop> = (props: Prop) => {
  const events = useEventStore(state => state.events);
  const loading = useEventStore(state => state.loading)
  const getEvents = () => useEventStore.getState().getEvents({});

  useFocusEffect(
    React.useCallback(() => {
      getEvents();
    }, []),
  );

  useEffect(() => {
    getEvents();
  }, [!events]);

  const [data, setData] = useState<any>([]);
  return (
    <>
      <View style={[{flex: 1, backgroundColor: colors.grayBg, padding: 8}]}>
        <FlatList
          keyExtractor={element => element.item.taskNo}
          data={data}
          extraData={data}
          renderItem={({item}: any) => <Event></Event>}
        />
        <View />
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </>
  );
};
export default IncomingScreen;
