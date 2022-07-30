import React, { useState, useEffect } from 'react';
import { Text, DateBox, View, StyleSheet, SafeAreaView, TextInput, FlatList, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { dummyData, FONTS, SIZES, COLORS, icons, images} from '../constants';

import events from '../constants/events.json'
import { McText, McIcon, McAvatar} from '../components'
import Fuse from 'fuse.js'

 //datas = events
 const Mine = ({ navigation, route }) => {
   return (
     <SafeAreaView style={styles.container}>
      <SectionSearch>
          <TextInput
            placeholder='Username'
            placeholderTextColor={COLORS.gray1}
            //onChange={handleOnSearch}
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              marginLeft: 12
            }}
          ></TextInput>
      </SectionSearch>
      <SectionButton>
      <TouchableWithoutFeedback onPress={()=>{
        console.log("Chirag's an idiot")
        navigation.navigate('Featured')
      }}>
        <McText h4> Log In</McText>
      </TouchableWithoutFeedback>
      </SectionButton>
     </SafeAreaView>
   );
 };
 const SectionHeader = styled.View`
 flex-direction: row;
 justify-content: flex-start;
 margin-top: ${Platform.OS === 'ios'?'40px':'20px'};
 width: 100%
`;
const SectionSearch = styled.View`
  margin: 8px;
  height: 50px;
  width: 65%;
  background-color: ${COLORS.input};
  border-radius: 15px;
  justify-content: center;
`;

const SectionButton = styled.View`
  margin-bottom: 80px;
  height: 50px;
  width: 65%;
  background-color: ${COLORS.input};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const SearchView = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
margin-left: 9px;
margin-right: 9px;
`;

const SrchRes = styled.View`
flex-direction: row;
align-items: center;
height: 40px;
`

const TxtBox = styled.View`

`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 
 export default Mine;
 