import React,{useEffect, useState} from "react";
import {Text,View,TextInput,Button,Image,Dimensions,Alert, Pressable} from "react-native"
import womenmobile from "../images/womenmobile.png"
import AsyncStorage from "@react-native-async-storage/async-storage"
import images from '../images/images.jpg'
import boys from '../images/boys.jpg'
import { Ionicons } from "@expo/vector-icons";
import { getAdditionalUserInfo } from "firebase/auth";
const {height,width} = Dimensions.get('window')


const hobyScreen = ({navigation,route})=>{
    const data = route.params
    console.log(data)
    let count = 0
   
    const hobbies = []  
    console.log(hobbies)
       const [guitar, setGuitar] = useState(false);
       const [cycling, setCycling] = useState(false);
       const [yoga, setYoga] = useState(false);
       const [singing, setSinging] = useState(false);
       const [gym, setGym] = useState(false);
       const [theater, setTheater] = useState(false);
       const [crafting, setCrafting] = useState(false);
       const [painting, setPainting] = useState(false);
       const [pottery, setPottery] = useState(false);
       const [astrology, setAstrology] = useState(false);
       const [gardening, setGardening] = useState(false);
       const [photography, setPhotography] = useState(false);
       const [calligraphy, setCalligraphy] = useState(false);
       const [fashion, setFashion] = useState(false);
       const [interiordesigning , setInteriorDesigning ] = useState(false);
       const [makeup, setMakeup] = useState(false);
       const [carnatic, setCarnatic] = useState(false);
       const [playingInstrument, setPlayingInstrument] = useState(false);
       const [poetry, setPoetry] = useState(false);
       const [hindustaniClassical, setHindustaniClassical] = useState(false);
       const [opera, setOpera] = useState(false);
       const [jazz, setJazz] = useState(false);
     
       function submit (){
       

          const storeData = async (value) => {
            try {
              const jsonValue = JSON.stringify(value)
              await AsyncStorage.setItem('myprofiledata', jsonValue)
            } catch (e) {
              // saving error
            }
          }

          



         

           if (painting){
               count = count+1
            hobbies.push('Painting')}
   
         
   
           if (hindustaniClassical){ 
            count = count+1
            hobbies.push('HindustaniClassical')}
   
           if (crafting){ 
            count = count+1
            hobbies.push('Crafting')}
   
           if (gardening){
            count = count+1
            hobbies.push('Gardening') }
   
           if (guitar){
            count = count+1
            hobbies.push('Guitar')}
   
           if (cycling){
            count = count+1
            hobbies.push('Cycling')}
   
           if (yoga){
            count = count+1
            hobbies.push('Yoga')}
   
           if (gym){ 
               count = count+1
            hobbies.push('Gym')}
   
           if (theater){
                count = count+1
             hobbies.push('Theater')}
        
              
           
   
           if (poetry){ 
               
            count = count+1
            hobbies.push('Poetry') }
   
           if (astrology){ 
            count = count+1
            hobbies.push('Astrology')}
   
           if (photography){ 
            count = count+1
            hobbies.push('Photography')}
   
           if (calligraphy){
            count = count+1
            hobbies.push('Calligraphy')}
   
           if (fashion){
            count = count+1
            hobbies.push('Fashion')}
   
           if (interiordesigning){  
               count = count+1
            hobbies.push('Interiordesigning')}
   
           if (makeup){ 
            count = count+1
            hobbies.push('Makeup') }
     
       
   

          if(count !== 0){

            storeData({"myname": data.name,
            "myAge" :data.age,
            "myMobile":data.Mobile,
            "mysex":data.sex,
            "myhobbies":hobbies})
       
                
            navigation.navigate('home'
               
        
              );
             } else {Alert.alert("Error", "Please Select Atleast 3 Hobbies")}
           
       }
       
  
       const intersts = ["Painting","Cricket","Poetry","fashion","calligraphy","photography","gardening","astrology","pottery","painting","crafting","theater","gym","singing","yoga","cycling","makeup"]
       return (
     <View style={{flex:1,width:width,backgroundColor:'#fae7d4',paddingTop:24}}>
         <Ionicons name="arrow-back" size={15} color={'red'}/>
         <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:width*.4}}>
         <Ionicons name="arrow-back" size={15} color={'red'}/>
        <Text  style={{justifyContent:'center',marginTop:height*.12,alignItems:'center'
        ,width:width*.7,textAlign:'center',fontSize:18}}>
            Select Your hobies, its help us to show people like you.x
         </Text>
         </View>
   <View style={{paddingTop:height*.15,paddingHorizontal:width*.1,backgroundColor:'#fae7d4',flexWrap:'wrap',flexDirection:'row'}}>
   <Pressable onPress={()=>setPainting(!painting)}>
       <View style={{backgroundColor:painting ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Painting
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setCrafting(!crafting)}>
       <View style={{backgroundColor:crafting ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Crafting
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setGardening(!gardening)}>
       <View style={{backgroundColor:gardening ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
            Gardening
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setGuitar(!guitar)}>
       <View style={{backgroundColor:guitar?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Guitar
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setCycling(!cycling)}>
       <View style={{backgroundColor:cycling?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
             Cycling
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setYoga(!yoga)}>
       <View style={{backgroundColor:yoga ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
           Yoga
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setGym(!gym)}>
       <View style={{backgroundColor:gym ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
             Gym
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setTheater(!theater)}>
       <View style={{backgroundColor:theater ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Theater
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setPoetry(!poetry)}>
       <View style={{backgroundColor:poetry ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
           Poetry
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setAstrology(!astrology)}>
       <View style={{backgroundColor:astrology ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Astrology
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setPhotography(!photography)}>
       <View style={{backgroundColor:photography ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Photography
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setCalligraphy(!calligraphy)}>
       <View style={{backgroundColor:calligraphy ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Calligraphy
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setFashion(!fashion)}>
       <View style={{backgroundColor:fashion ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Fashion
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setInteriorDesigning(!interiordesigning)}>
       <View style={{backgroundColor:interiordesigning ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
             interiordesigning
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setMakeup(!makeup)}>
       <View style={{backgroundColor:makeup ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Makeup
              </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setHindustaniClassical(!hindustaniClassical)}>
       <View style={{backgroundColor:hindustaniClassical ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
            hindustaniClassical
           </Text>
       </View>
   </Pressable>
   
   
   </View>
         <View style={{paddingHorizontal:width*.2,paddingTop:height*.1}}>
   <Button title="Submit" onPress={()=>submit()}></Button>
   </View>
   
     </View>
   
   
   
       )
   }

   export default hobyScreen