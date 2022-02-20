import React,{useEffect, useState} from "react";
import {Text,View,TextInput,Button,Image,Dimensions,Alert, Pressable} from "react-native"
import womenmobile from "../images/womenmobile.png"
import AsyncStorage from "@react-native-async-storage/async-storage"
import images from '../images/images.jpg'
import boys from '../images/boys.jpg'
import { Ionicons } from "@expo/vector-icons";
const {height,width} = Dimensions.get('window')




const LoginProfile = ({navigation,route}) =>{
    const data = route.params
    const [boy,setboy] = useState(false)
    const [girl,setgirl] = useState(true)
    const [name,setname] = useState('')
    const [age,setage] = useState("")
    console.log(data.mobile)
  return(
      <View style={{height:height,width:width}}>
         <Text style={{marginTop:height*.2,width:width,textAlign:'center',fontSize:24,fontWeight:"bold"}}>
            Please Fill Your Profile Details In correct Way
         </Text>
         <View style={{flexDirection:'row',justifyContent:'center',marginTop:height*.06}}>
             <Pressable onPress={()=>{setgirl(!girl)
            setboy(!boy)
            }}>
             <View style={{ height:height*.2,width:width*.38,margin:5,elevation:2, shadowOffset:{height:3,width:2},alignItems:'center'}}>
            
                 <Text style={{textAlign:'center',fontWeight:'bold',marginTop:5,borderRadius:7}}>Girl
                 </Text>
                 <View style={{marginRight:2,alignItems:'center',justifyContent:'center'}}>
                 <Ionicons name={girl?"md-checkmark-circle-sharp":"ios-close-circle-sharp"} size={20} color={girl? 'green' : "red"} style={{marginRight:5}}/>
                 </View>
                 <View>
                 <Image source={images} style={{height:height*.15,width:width*.35}} />
                 </View>
             </View>
             </Pressable>
             <Pressable onPress={()=>{setboy(!boy)
             setgirl(!girl)
             }}>
             <View style={{height:height*.2,width:width*.38,margin:5,elevation:2, shadowOffset:{height:3,width:2},alignItems:'center'}}>
                 <Text style={{textAlign:'center',fontWeight:'bold', marginTop:5,}}>Boy</Text>
                 <Ionicons name={boy?"md-checkmark-circle-sharp":"ios-close-circle-sharp"} size={20} color={boy?'green':'red'} style={{marginRight:5}}/>
                
                 <Image source={boys} style={{height:height*.15,width:width*.35}} />
             </View>
             </Pressable>

         </View>

         <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:width*0.1,paddingTop:height*.06}}>
             <Text style={{fontWeight:'bold'}}>
                 Your Name
             </Text>

             <TextInput placeholder="Write Your Name" onChangeText={(text)=>{
                 setname(text)
             }} />
         </View>

         <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:width*0.1,paddingTop:height*.06}}>
             <Text style={{fontWeight:'bold'}}>
                 Your Age
             </Text>

             <TextInput placeholder="Write Your Age"  maxLength={2} keyboardType="number-pad" onChangeText={(text)=>{setage(text)}} />
         </View>
<View style={{alignItems:'center',marginTop:height*.1}}>
         <Pressable style={{backgroundColor:'blue',width:width*.6,height:height*.06,justifyContent:'center',alignItems:'center',borderRadius:8}}
           onPress={()=>{ if (name && age !== ""){navigation.navigate("hoby",{
               "mobile" : data.mobile,
               "name" : name ,
               "age": age ,
               "sex" : boy ? "boy" :"girl"
           })}
        else Alert.alert('Something Missing', "Please fill all data")
        
        } }
         ><Text style={{color:'white'}}>Next</Text></Pressable>
      </View>
      </View>
  )


}

export default LoginProfile