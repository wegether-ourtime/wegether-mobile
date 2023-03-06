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
import {FileResource} from '../../common/enums/fileResource';
// import Tasklists from '../../components/TaskList/Tasklists';
// import {TaskDatasource} from '../../datasource/TaskDatasource';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Event} from '../../components/Event/Event';
import UserEvent from '../../models/UserEvent';
// import * as ImagePicker from 'react-native-image-picker';
// import {dataUpdateStatusEntity} from '../../entities/TaskScreenEntities';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useEventStore} from '../../stores/eventStore';

interface Prop {}

const SuggestionScreen: React.FC<Prop> = (props: Prop) => {
  const events = useEventStore(state => state.events);
  const loading = useEventStore(state => state.loading);
  const criteria = useEventStore(state => state.criteria);
  const getEvents = () => useEventStore.getState().getEvents(criteria);

  useFocusEffect(
    useCallback(() => {
      getEvents();
    }, []),
  );

  useEffect(() => {
    getEvents();
  }, []);

  // const [data, setData] = useState<any>([]);
  return (
    <>
      <View style={[{flex: 1, backgroundColor: colors.grayBg, padding: 8}]}>
        <FlatList
          keyExtractor={item => item.eventId}
          data={events}
          extraData={events}
          renderItem={({index, item}: any) => {
            const eventImg = item.files.find(
              (f: any) => f.resource === FileResource.EVENT,
            )?.path;
            const isHost = item.userEvents.find(async (ue: UserEvent) => {
              const userId = await AsyncStorage.getItem('userId');
              return ue.userId == userId;
            })?.isHost;

            return (
              <Event
                eventId={item.eventId}
                eventName={item.eventName}
                eventImage={item.eventImage}
                eventDetail={item.eventDetail}
                startDate={item.startDate}
                endDate={item.endDate}
                eventImg={eventImg}
                isHost={isHost}
                // location={item.location}
              ></Event>
            );
          }}
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
export default SuggestionScreen;
