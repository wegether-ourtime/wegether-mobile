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
// import * as ImagePicker from 'react-native-image-picker';
// import {dataUpdateStatusEntity} from '../../entities/TaskScreenEntities';
import * as RootNavigation from '../../navigations/RootNavigation';

interface Prop {}

const SuggestionScreen: React.FC<Prop> = (props: Prop) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      {data.length > 0 ? (
        <View style={[{flex: 1, backgroundColor: colors.grayBg, padding: 8}]}>
          <FlatList
            keyExtractor={element => element.item.taskNo}
            data={data}
            extraData={data}
            renderItem={
              ({item}: any) => null
              //   <Tasklists
              //     {...item.item}
              //     id={item.item.taskNo}
              //     status={item.item.status}
              //     title={item.item.farmerPlot.plantName}
              //     price={item.item.totalPrice}
              //     date={item.item.dateAppointment}
              //     address={item.item.farmerPlot.locationName}
              //     distance={item.item.distance}
              //     user={`${item.item.farmer.firstname} ${item.item.farmer.lastname}`}
              //     img={item.image_profile_url}
              //     preparation={item.item.comment}
              //     tel={item.item.farmer.telephoneNo}
              //     taskId={item.item.id}
              //     farmArea={item.item.farmAreaAmount}
              //     toggleModalStartTask={toggleModalStartTask}
              //     fetchTask={getData}
              //     setToggleModalStartTask={setToggleModalStartTask}
              //     setShowModalStartTask={() =>
              //       showModalStartTask(
              //         item.item.id,
              //         item.item.dronerId,
              //         item.item.taskNo,
              //         `${item.item.droner.firstname} ${item.item.droner.lastname}`,
              //       )
              //     }
              //     startTask={startTask}
              //     maxRatting={maxRatting}
              //     setDefaultRating={setDefaultRating}
              //     defaultRating={defaultRating}
              //     starImgFilled={starImgFilled}
              //     starImgCorner={starImgCorner}
              //     toggleModalUpload={toggleModalUpload}
              //     imgUploaded={imgUploaded}
              //     finishImg={finishImg}
              //     onAddImage={onAddImage}
              //     closeFinishModal={closeFinishModal}
              //     onChangImgFinish={onChangImgFinish}
              //     toggleModalReview={toggleModalReview}
              //     setComment={setComment}
              //     comment={comment}
              //     toggleModalSuccess={toggleModalSuccess}
              //     setToggleModalSuccess={setToggleModalSuccess}
              //     onFinishTask={onFinishTask}
              //     setToggleModalUpload={() =>
              //       openModalUpload(
              //         item.item.id,
              //         `${item.item.droner.firstname} ${item.item.droner.lastname}`,
              //       )
              //     }
              //     onCloseSuccessModal={onCloseSuccessModal}
              //   />
            }
          />
          <View />
        </View>
      ) : (
        <>
          <View
            style={[
              stylesCentral.center,
              {flex: 1, backgroundColor: colors.grayBg, padding: 8},
            ]}>
            <Image
              source={image.blankTask}
              style={{width: normalize(136), height: normalize(111)}}
            />
            <Text style={stylesCentral.blankFont}>ยังไม่มีงานที่ต้องทำ</Text>
          </View>
        </>
      )}
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </>
  );
};
export default SuggestionScreen;
