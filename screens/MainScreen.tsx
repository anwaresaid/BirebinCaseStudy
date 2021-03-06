import React, {useMemo, useState} from 'react';
import {SafeAreaView, ScrollView,Button,StyleSheet,View} from 'react-native';


import {Match} from '../components/Match';
import GestureRecognizer from 'react-native-swipe-gestures';
import {deviceWidth, normalize} from '../Plugins/Device';
import {MockData} from '../Utils/MockData';


const MainScreen: React.FunctionComponent = (): JSX.Element => {
  const [pageNumber, setPageNumber] = useState(1);
  const [D, SetD] = useState(0);
  const [pageNumbersc,setPageNumbersc] = useState(1);
  const [temp1,setMockdata] = useState(MockData.slice(0,10));
  let modData = MockData.length%10;
  let lenghtdata =MockData.length- modData
  var finalPage= lenghtdata/10;

  const inputRefs = useMemo(
    () =>
      Array(temp1.length)
        .fill(0)
        .map(() => React.createRef()),
    [],
  );
  


  const _onclickNext =() =>{
    if (pageNumbersc <finalPage) {
      setPageNumbersc(pageNumbersc + 1);
      setMockdata( MockData.slice(pageNumbersc*10, (pageNumbersc*10)+10));
   }
    if(pageNumbersc==finalPage&&modData!=0){
      setMockdata(MockData.slice(pageNumbersc*10, (pageNumbersc*10)+modData));
  }}
  const _onsclicPrevious = () =>{
    if ( pageNumbersc>1) {
      if(pageNumbersc==finalPage){
        setPageNumbersc(pageNumbersc - 1);
        setMockdata(MockData.slice((pageNumbersc*10)-10, (pageNumbersc*10)));
        

      }
      else{
        setPageNumbersc(pageNumbersc - 1);
        setMockdata( MockData.slice((pageNumbersc*10)-10, pageNumbersc*10));
   
      }
   }
   if(pageNumbersc==1){
      setMockdata( MockData.slice((pageNumbersc*10)-10, pageNumbersc*10));
   }
   
  }
  const _onSwipeLeft = () => {
    if (pageNumber < MockData[0].rates.length / 4) {
      setPageNumber((prevState) => prevState + 1);
    }
    setTimeout(() => {
      inputRefs.forEach((value) => {
        value.current.scrollToOffset({
          offset: pageNumber * (deviceWidth() - normalize(60)),
          animated: true,
        });
      });
    }, 0);
  };

  const _onSwipeRight = () => {
    if (pageNumber > 0) {
      setPageNumber((prevState) => prevState - 2);
    }
    setTimeout(() => {
      inputRefs.forEach((value) => {
        value.current.scrollToOffset({
          offset: -pageNumber * (deviceWidth() + normalize(60)),
          animated: true,
        });
      });
    }, 0);
  };

  return (
    
      <ScrollView>
        <SafeAreaView>
          {temp1.map((value, index) => {
            return (
            
              <GestureRecognizer
                key={index}
                style={{flex: 1}}
                onSwipeLeft={_onSwipeLeft}
                onSwipeRight={_onSwipeRight}
                config={{
                  velocityThreshold: 0,
                  directionalOffsetThreshold: 1000,
                }}
                >
              <Match

                ref={inputRefs[index]}
                league={value.league}
                date={value.date}
                team1={value.team1}
                team2={value.team2}
                rates={value.rates}
              
              />
             </GestureRecognizer>
              
            );
          })}
         
          <View style={styles.row}>
            <View style={styles.btn}>
              <Button title="Previous" color="gray" onPress={_onsclicPrevious}/>
            </View>
            <View style={styles.btn}>
              <Button title="Next" color="gray" onPress={_onclickNext}/>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    
  );

 
};

const styles = StyleSheet.create({
  btn:{
      
      width:200,
  },

  row:{
    alignItems:'stretch',
    flexDirection:'row',
  },
})


export default MainScreen;
