import React, { useState, useEffect, useLayoutEffect } from "react";
import { Image } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  BackHandler,
  Modal,
} from "react-native";
import { CheckBox } from "react-native-elements";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { db } from "../firebase";
import { Avatar, ListItem, Icon, Input } from "react-native-elements";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

const Profile = ({ navigation, route }) => {
  const {
    name,
    profilePicture,
    email,
    reviews,
    hobbies,
    sender,
    senderPhoto,
    senderEmail,
    showReviewInput,
    raters,
    ratings 
  } = route.params;
  const [nameP, setNameP] = useState(name);
  const [mail, setMail] = useState(email);
  const [guitar, setGuitar] = useState(false);
  const [cycling, setCycling] = useState(false);
  const [location, setLocation] = useState("krishna");
  const [errorMsg, setErrorMsg] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rate,setrate] = useState(0)

  const enterChat = () => {
    navigation.navigate("Chat", {
      name: name,
      profilePicture: profilePicture,
      sender: sender,
      senderPhoto: senderPhoto,
      reviews: reviews,
      email: email,
      hobbies: hobbies,
      senderEmail: senderEmail,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "User Profile",
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: 80,
          }}
        >
          <TouchableOpacity>
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
              onPress={goBack}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: 80,
          }}
        >
          <TouchableOpacity>
            
              <Ionicons
                name="chatbox"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
                onPress={enterChat}
              />
            {/* <MaterialIcons name="contact-support" size={24} color="white" /> */}
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", goBack);
    };
  }, []);

  ///change by arvind 

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS === "android" && !Constants.isDevice) {
  //       setErrorMsg(
  //         "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
  //       );
  //       return;
  //     }
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let locationn = await Location.getCurrentPositionAsync({});
  //       updateLocation(locationn.coords.latitude, locationn.coords.longitude);
  //     setLocation(locationn);
  //   })();
  // }, []);
  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  // const updateLocation = (lat, lon) => {
  //   db.collection("users").doc(senderEmail).update({
  //     latitude: lat,
  //     longitude: lon,
  //   });
  // };

//hide by arvind

  const signiout = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        navigation.replace("Login");
        console.log("Sign-out successful");
        setTimeout(() => {
          alert("You've been successfully signed out.");
        }, 650);
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  var hobblies = [];

  if (guitar) {
    hobblies.push("Guitar");
  }

  if (cycling) {
    hobblies.push("Cycling");
  }

  var revliews = [];

  if (reviews[0] != "") {
    console.log(reviews)
    revliews = reviews;
  } else {
    console.log('no')
    revliews = [];
  }

//   var showRevliewInput = showReviewInput
  const [showRevliewInput, setShowRevliewInput] = useState(showReviewInput);
  let myReview = reviews.filter((item) =>item.from.includes(sender))
  let empty = []
 
//   let obj = users.find((o) => o.email === email);

// //   var showInput = null;
// //   if()
 
  const addReview = () => {
    
   
    revliews.push({
      from: sender,
      review: chatInput,
      profilePicture: senderPhoto,
    });
    setShowRevliewInput(false)
    setUsers([]);
    setChatInput("");

    db.collection("users").doc(email).update({
    
   raters: parseInt(raters)+1,
   ratings:parseInt(ratings) +rate 
   });
    
  };

  const goBack = () => {
    db.collection("users").doc(email).update({
      reviews: revliews,
      showReviewInput:  true
    });
    navigation.goBack()
  };

  // const submit = () => {
  //   db.collection("users").doc(email).update({
  //     name: nameP,
  //     firstTime: false,
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     timestamp: location.timestamp,
  //     hobbies: hobblies,
  //   });
  //   navigation.replace("Home", {
  //     name: nameP,
  //     profilePicture: profilePicture,
  //     email: email,
  //     hobbies: hobblies,
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <TouchableOpacity>
            <Image
              source={{ uri: profilePicture }}
              style={{
                width: 150,
                height: 150,
                marginBottom: 20,
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 99,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>{name}</Text>
          {/* <Text style={{ fontSize: 15, marginBottom: 10, color: "gray" }}> */}
            {/* bio goes here */}
          {/* </Text> */}
          <View style={styles.mail}>
            <Ionicons
              name="star-outline"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Ionicons
              name="star-outline"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Ionicons
              name="star-outline"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Ionicons
              name="star-outline"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Ionicons
              name="star-outline"
              type="entypo"
              color="#FFCC70"
              // style={{ marginRight: 5 }}
            />
          </View>
        </View>
        <View style={styles.mail}>
          <Icon
            name="mail"
            type="entypo"
            color="black"
            style={{ marginRight: 15 }}
          />
          <Text style={{ fontSize: 15 }}>{email}</Text>
          {/* <TextInput
            //   placeholder="Search here..."
            style={styles.inputMail}
            //   onPress={() => alert("sample")}
            value={mail}
            onChangeText={(text) => {
              setMail(text);
            }}
          />
          <Icon name="edit" type="Material-Icons" /> */}
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", textAlign: "center" }}>
          Hobbies: {hobbies.join(", ")}
        </Text>
        {/* <CheckBox
          title="Guitar"
          checked={guitar}
          onPress={() => setGuitar(!guitar)}
        />
        <CheckBox
          title="Cycling"
          checked={cycling}
          onPress={() => setCycling(!cycling)}
        /> */}
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 17,
            marginTop: 20,
          }}
        >
          Reviews
        </Text>
        {revliews[0] != undefined ? (
          revliews.map((revliew) => (
            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity>
                <View></View>
                <ListItem
                  key={revliew.from}
                  //   onPress={() => takeToHobbies(hobby)}
                  bottomDivider={true}
                >
                  <Avatar
                    rounded
                    source={{
                      uri:
                        revliew?.profilePicture ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "600" }}>
                      {revliew.from}
                    </ListItem.Title>
                    <ListItem.Subtitle ellipsizeMode="tail">
                      {revliew.review}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            <Text style={{ margin: 10, textAlign: "center" }}>
              No reviews yet...
            </Text>
          </View>
        )}
        {/* <Button title="update profile" onPress={submit} /> */}
        {console.log(rate)}
        { myReview.length === 0 ? (
          <View>
            <View style={{alignItems:'center'}}>
            <Text>
              
            <Ionicons
              name={rate >= 4 ? "star" : "star-outline"}
              type="entypo"
              color= "#FFCC70"
              size={25}
              onPress={()=> {setrate(1)}}
              // style={{ marginRight: 5 }}
            /> 
           <Ionicons
              name={rate >= 2? "star" : "star-outline"}
              type="entypo"
              color= "#FFCC70"
              size={25}
              onPress={()=> {setrate(2)}}
              // style={{ marginRight: 5 }}
            /> 
            <Ionicons
              name={rate >= 3 ? "star" : "star-outline"}
              type="entypo"
              color= "#FFCC70"
              size={25}
              onPress={()=> {setrate(3)}}
              // style={{ marginRight: 5 }}
            /> 
            <Ionicons
              name={rate >= 4 ? "star" : "star-outline"}
              type="entypo"
              color= "#FFCC70"
              size={25}
              onPress={()=> {setrate(4)}}
              // style={{ marginRight: 5 }}
            /> 
            <Ionicons
              name={rate >= 5 ? "star" : "star-outline"}
              type="entypo"
              color= "#FFCC70"
              size={25}
              onPress={()=> {setrate(5)}}
              // style={{ marginRight: 5 }}
            /> 
          </Text> 
    
          <View style={styles.footer}>
           
            <TextInput
              placeholder="Type a review..."
              style={styles.input}
              onSubmitEditing={addReview}
              value={chatInput}
              onChangeText={(text) => {
                setChatInput(text);
              }}
            />

            <TouchableOpacity onPress={addReview} activeOpacity={0.5}>
            
              <Ionicons name="send" size={24} color="purple" />
            </TouchableOpacity>
            </View>
          </View>
          </View>
        ): null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    // marginLeft: "auto",
    // marginRight: "auto",
    paddingLeft: 75,
    paddingRight: 65,
  },
  mail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    alignItems: "center",
  },
  input: {
    // height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    // backgroundColor: "#dbdbdb",
    borderWidth: 1,
    padding: 10,
    // paddingLeft: 15,
    paddingBottom: 12,
    color: "black",
    borderRadius: 30,
    fontSize: 20,
  },
  inputMail: {
    // width: 40,
    flex: 1,
    marginRight: 5,
    borderColor: "transparent",
    // backgroundColor: "#dbdbdb",
    borderWidth: 1,
    padding: 10,
    // paddingLeft: 15,
    paddingBottom: 12,
    color: "black",
    borderRadius: 30,
    fontSize: 15,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    flexDirection: "row",
  },
  input: {
    bottom: 0,
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
});
