import React, { useState, useEffect ,useRef} from "react";
import { Alert, FlatList,BackHandler, Text,TouchableOpacity, Image,Button,View,Dimensions,AppState,StyleSheet,SafeAreaView, ImageBackground, Pressable } from "react-native";
import * as Location from "expo-location";
import Home from "./oldhome";
import { BackgroundImage } from "react-native-elements/dist/config";
import welcome from '../images/welcome.jpg'
const {height,width} = Dimensions.get('window')
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants";
const auth = getAuth();




const Top = ({route,navigation}) => {
 const path = route.path
  console.log("start")
  
 const [screen,setscreen] = useState("home")
  const [errorMsg, setErrorMsg] = useState(null);
  const [recievedlocation, setrec] = useState(false);
  const [distance, setDistance] = useState(null);
  const [mydata,setmydata] = useState(null)
  const [data, setdata] = useState([])
  const [hobies, sethobies] = useState([])
  const [profilesbyhobies, setprofilesbyhobies] = useState([])
  const[empty,setempty] = useState()
  const [users,setusers] =useState([])
  const [latlitude, setLatlitude] = useState();
  const [longlitude, setLonglitude] = useState();
  const [location, setLocation] = useState("krishna");
  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);
 
  // const navigateProfile = () => {
  //   navigation.navigate("Newprofile", {
  //     name: myname,
  //     profilePicture: myprofilePicture,
  //     email: myemail,
  //     reviews: myreviews,
  //     hobbies: myhobbies,
  //     holblies: []
  //   });
  // };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }
   else{
     console.log('go in background or inactive10')}

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
      updateStatus()
    });

    return () => {
      subscription.remove();
    };
  }, []);
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
 
    var R = 6371; // radius of earth
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    //   setDistance(d.toFixed(1));
    return d.toFixed(1);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
 
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myprofiledata')
     const mypdata = JSON.parse(jsonValue)
    console.log("mydata recived:")
    console.log(mypdata)
    setmydata(mypdata)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value

      console.log(e)
    }
  }





  useEffect(() => {
    (async () => {
      console.log('location checkr')
      if (Platform.OS === "android" && !Constants.isDevice) {
        console.log('not in expo location wok')
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      } Constants
      console.log('location checkr01')
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log('location checkr2')
        setErrorMsg("Permission to access location was denied");
        return;
      }
      console.log('location checkr3')
      let locationn = await Location.getCurrentPositionAsync({});
      console.log(locationn.coords.latitude)
      // latlitude = locationn.coords.latitude;
      setLatlitude(locationn.coords.latitude);
      setLonglitude(locationn.coords.longitude);
      
      updateLocation(locationn.coords.latitude, locationn.coords.longitude);
      setLocation(locationn);
      console.log('location recieved')
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  var finalArray = [];

  for (var i = 0; i < users.length; i++) {

    if(mydata){if (users[i].name != mydata.myname) {
       console.log('myname checking')
      const value = getDistanceFromLatLonInKm(
        latlitude,
        longlitude,
        users[i].latitude,
        users[i].longitude
      );
     
      finalArray.push({
       "email": users[i].email,
        "name":users[i].name,
       "profilePicture": users[i].profilePicture,
        "distance":value,
        "hobbies":users[i].hobbies,
       "reviews": users[i].reviews,
       "status":users[i].status
      });
    }}
    
  }


  finalArray.sort(function (a, b) {
    // return a[3] > b[3] ? 1 : -1;
 

  
    return a.distance - b.distance;
  });
  
 


  const hobieslist = (email) => {
     
    fetch('http://56f7-2409-4064-2c13-1c09-e561-da74-b646-c552.ngrok.io/hobies', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "getemail": email
      
      })
    }).then((response) => response.json()).then((data) => {
      sethobies(data)
     
     
    })
      .catch(err => console.error(err));
}

const updateStatus = () => {
 
fetch('http://56f7-2409-4064-2c13-1c09-e561-da74-b646-c552.ngrok.io/status', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": myemail,
    "status": appState.current

  })
}).then((response) => response.json()).then((data) => {
  

 
})
  .catch(err => console.error(err));
}





// const profilesbyhoby = (hoby) => {
//   let  count = 1
//   console.log( count+1)
//   fetch('https://f442-2409-4064-248c-c948-145-996a-e965-8e5b.ngrok.io/profilesByHobies', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "hoby":hoby

//     })
//   }).then((response) => response.json()).then((data) => {
//    const profiles = data
//    setprofilesbyhobies(profiles)
  

    
//   })
//     .catch(err => console.error(err));
// }





 
  
  const getusers2 = () => {

  fetch('http://56f7-2409-4064-2c13-1c09-e561-da74-b646-c552.ngrok.io/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "user": "send users"

    })
  }).then((response) => response.json()).then((data) => {
    setusers(data)
  
  
   
  })
    .catch(err => console.error(err));
}

 


  useEffect(() => {
    console.log('use effect')
      getusers2();
    hobieslist("arvindchoupal1999@gmail.com")
    getData()
  }, [empty]);


  return (
<SafeAreaView style={styles.container}>
  {console.log('render')}
  

    
   { mydata ? <View>

      
    <View style={{backgroundColor:'black', width:width,height:height*.1,alignItems:'center',flexDirection:'row'}} >
    <Text style={{color:'white',marginTop:25,fontWeight:'bold',fontSize:15,marginLeft:25}}>Hobbizo</Text>
   </View>
   <View style={{height,width:width}}>
      
      <FlatList
        data={mydata.myhobbies}
        renderItem={({ item, index }) => {
         
         let thobby = item
          return <View >

            <View style={{width:width,flexDirection:'row',backgroundColor:'white',height:height*.05,alignItems:'center',padding:5}}>
            <Text> Hobies - 
              {item}</Text>

            </View>
            <View style={{width:width,alignItems:'flex-start'}}>

           

            <FlatList
            horizontal
            data={ finalArray.filter((ite) => {
              
             return  ite.hobbies.includes(item)
            })}
           
            contentContainerStyle={{flexGrow:1, justifyContent: "flex-start"}}
            renderItem={({item,inde})=>{
              let status = item.status
              
              
                           
              return(
            

                <View style={{flexDirection:'column',flexWrap:'wrap-reverse'}}>
                  <View style={{flexDirection:'row',backgroundColor:'grey'}}>
                  
                  <View style={{backgroundColor:'red',height:width*.32,width:width*.32,margin:2}}>
                 <Pressable onPress={()=>{navigation.navigate('targetedhoby',{"selectedhobby":thobby,"users":finalArray}
                  

                )}} >
                    <BackgroundImage source={{uri:item.profilePicture}} style={{height:width*.32,justifyContent:"flex-end",width:width*.32,padding:5}}> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <View style={{flexDirection:'row',alignItems:"center"}}>
                      <View style={{height:height*.01,width:height*.01,backgroundColor: status === "active"? "green":"red",borderRadius:5,margin:5}} />
                      <Text style={{color:'white'}}>{item.name}</Text>
                      </View>
                      <Text style={{color:'white', fontSize:10}}>{item.distance}Km</Text></View>
                    </BackgroundImage>
                    </Pressable>
                    </View>
                  </View> 
                  </View>


              )}}
              keyExtractor={inde=>inde}
             
              
              />
              </View>


          </View> 
            } }
       keyExtractor={index=>index}

      />


    </View>
  

     
</View>:null}
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  textWelcome: {
    fontSize: 18,
    backgroundColor: "#095b93",
    padding: 10,
    color: "white",
  },
  grid: {
    //   display: 'grid',
    //   gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
  },
  input: {
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#dbdbdb",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 12,
    color: "#546c64",
    borderRadius: 30,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  itemContainer: {
    // width: size,
    // height: size,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  button2: {
    marginTop: 15,
    marginBottom: 10,
    width: 150,
    borderRadius: 999,
    marginLeft: "auto",
    marginRight: "auto",
  },
});


export default Top