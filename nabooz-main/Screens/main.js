import { StatusBar } from "expo-status-bar";
import React  from "react";
import {Text,View,Dimensions} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Latest from "./latest";
const {height,width}= Dimensions.get('window')
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="top" component={Main} />
      <Tab.Screen name="latest" component={Latest} />
    </Tab.Navigator>
  );

const Test = ()=>{
  console.log(route.params)
  return (
    <SafeAreaProvider>
    
     <View style={{backgroundColor:'black', width:width,height:height*.1,alignItems:'center',flexDirection:'row'}} >
      <Text style={{color:'white',marginTop:25,fontWeight:'bold',fontSize:15,marginLeft:25}}>Welcome, <Text style={{color:'red,',fontSize:16,fontWeight:'bold'}}>Arvind</Text></Text>
     </View>
     <View style={{backgroundColor:'red',height,width:width}}>
    <MyTabs/>
     </View>
     
     
     </SafeAreaProvider>
  )
}}

export default Test;