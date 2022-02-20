import React,{useEffect, useState} from "react";
import {Text,View,TextInput,Button,Image,Dimensions,Alert, Pressable} from "react-native"
import womenmobile from "../images/womenmobile.png"
import AsyncStorage from "@react-native-async-storage/async-storage"
import images from '../images/images.jpg'
import boys from '../images/boys.jpg'
import { Ionicons } from "@expo/vector-icons";
const {height,width} = Dimensions.get('window')







const Mobilelogin = ({navigation})=>{
    const [mobile,setmobile] = useState(null)
    const [mobiles,setmobiles] = useState(null)
    const [mobiletext,setmobiletext] = useState(null)
    const [empty,setempty] =useState("")
   
    const storemobile = async (value) =>{
        try{
            if(mobiletext!== null ){
            await AsyncStorage.setItem('mobile',value)
           navigation.navigate('loginprofile',{"mobile":value})
           
        }
            
            else {Alert.alert('Put You Mobile to login')}
        } catch (e){
            Alert.alert(e)
        }
    }

    const getmobile = async () =>{
        try{
           const value = await AsyncStorage.getItem('mobile')
           if(value !== null){
setmobile(value)
console.log('mobile uploaded')
           }
        } catch (e){
            Alert.alert(e)
        }
    }

    const removemobile = async () =>{
        try{
           const value = await AsyncStorage.removeItem('mobile')
           setmobile(null)

console.log('mobile removed')
         
        } catch (e){
            Alert.alert(e)
        }
    }

    useEffect(()=>{
        getmobile(),[empty]
    })


   
    return(



        <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
            { mobile ? navigation.navigate('home'):
            <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
            <Image source={womenmobile} style={{height:height*.3,width:width*.8,marginTop:height*.1}}/>
            <Text style={{fontSize:22,marginTop:10,color:'black',fontWeight:'bold'}}> Enter Your Phone Number </Text>
            <Text style={{color:'grey'}}>Welcome in Hobizo</Text>
            <View style={{backgroundColor:'grey',padding:2,marginTop:height*.02,borderRadius:5,width:width*.7,height:height*.065}} >
            <View style={{backgroundColor:'white',flex:1,borderRadius:5,flexDirection:'row',alignItems:'center'}} >
                <Text style={{color:'grey',fontSize:20,marginLeft:5}}>+91</Text>
        <TextInput placeholder='Put You Mobile Number' maxLength={10}  keyboardType= "number-pad" onChangeText={(text)=>{setmobiletext(text)}} style={{fontSize:18,marginLeft:10}} onSubmitEditing={()=>storemobile(mobiletext)}/>
 </View>
 </View>
       <Pressable style={{backgroundColor:'blue',borderRadius:5,height:height*0.06,margin:height*.08,justifyContent:'center',alignItems:'center',width:width*.6 }} onPress={()=>storemobile(mobiletext)} ><Text style={{color:'white',fontSize:17}}>Submit</Text></Pressable>
     <Text style={{marginTop:height*.07}}>
         --------or sign in using -------
         </Text>   
<View style={{justifyContent:'center',flexDirection:'row'}}>
         <Pressable onPress={()=>{Alert.alert("Hobizo",'Currently not supporting this feature')}} style={{flexDirection:'row',backgroundColor:'white',borderRadius:5,height:height*0.06,margin:5,justifyContent:'center',alignItems:'center',width:width*.4}} ><Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png'}} style={{height:height*.04,width:height*.04,marginRight:5}}/><Text style={{color:'grey',fontSize:15}}>Facebook</Text></Pressable>
         <Pressable onPress={()=>{Alert.alert("Hobizo",'Currently not supporting this feature')}} style={{flexDirection:'row', backgroundColor:'white',borderRadius:5,height:height*0.06,margin:5,justifyContent:'center',alignItems:'center',width:width*.4}} ><Image source={{uri:'https://w7.pngwing.com/pngs/543/934/png-transparent-google-app-logo-google-logo-g-suite-google-text-logo-circle.png'}} style={{height:height*.04,width:height*.04,marginRight:5}}/><Text style={{color:'grey',fontSize:15}}>Google</Text></Pressable>
        </View>
        </View>}
        
        </View>
    )
}

export default Mobilelogin