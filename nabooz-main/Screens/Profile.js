import React, { useState , useEffect, useLayoutEffect} from "react";
import { Image, } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Modal
} from "react-native";
import { CheckBox } from "react-native-elements";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { db } from "../firebase";
import { Avatar, ListItem, Icon, Input } from "react-native-elements";
import {Entypo} from "@expo/vector-icons";


  const Profile = ({ navigation, route }) => {
  const { name, profilePicture, email, hobbies, reviews }= route.params
  const [profile, setprofile] = useState();
  const [nameP, setNameP] = useState(name);
  const [mail, setMail] = useState(email)
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
  const [location, setLocation] = useState("krishna");
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // var holblies = [
  //   { name: "guitar", set: "setGuitar", fn: "Guitar" },
  //   { name: "cycling", set: "setCycling", fn: "Cycling" },
  //   { name: "yoga", set: "setYoga", fn: "Yoga" },
  //   { name: "singing", set: "setSinging", fn: "Singing" },
  //   { name: "gym", set: "setGym", fn: "Gym" },
  //   { name: "painting", set: "setPainting", fn: "Painting" },
  // ];


  const getprofile = () => {
    console.log('getting profile')
  fetch('https://8c38-2409-4064-248c-c948-6d56-cb35-cb30-26a7.ngrok.io/profile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      
  
    })
  }).then((response) => response.json()).then((data) => {
    
    console.log(data)
    setprofile(data)
   
  })
    .catch(err => console.error(err));
  }

  var holblies = hobbies

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: 80,
          }}
        >
          <TouchableOpacity>
            <Entypo
              name="chat"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("Messages")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);


  console.log(hobbies);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationn = await Location.getCurrentPositionAsync({});
    //   updateLocation(locationn.coords.latitude, locationn.coords.longitude);
      setLocation(locationn);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


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

  var hobblies = []

  if(guitar){
      hobblies.push("Guitar")
  }
  if (cycling) {
      hobblies.push("Cycling")
  }
  if (singing) {
      hobblies.push("Singing")
  }
  if (yoga) {
      hobblies.push("Yoga")
  }
  if (gym) {
      hobblies.push("Gym")
  }
  if (painting) {
      hobblies.push("Painting")
  }
  if (theater) {
      hobblies.push("Theater")
  }
  if (crafting) {
      hobblies.push("Crafting")
  }
  if (pottery) {
    hobblies.push("Pottery");
  }
  if (astrology) {
    hobblies.push("Astrology");
  }
  if (gardening) {
    hobblies.push("Gardening");
  }
  if (photography) {
    hobblies.push("Photography");
  }
  if (calligraphy) {
    hobblies.push("Calligraphy");
  }
  if (fashion) {
    hobblies.push("Fashion");
  }
  if (interiordesigning) {
    hobblies.push("Interior Designing");
  }
  if (makeup) {
    hobblies.push("Makeup");
  }
  if (carnatic) {
    hobblies.push("Carnatic");
  }
  if (playingInstrument) {
    hobblies.push("Playing an Instrument");
  }
  if (poetry) {
    hobblies.push("Poetry");
  }
  if (hindustaniClassical) {
    hobblies.push("Hindustani Classical");
  }
  if (opera) {
    hobblies.push("Opera");
  }
  if (jazz) {
    hobblies.push("Jazz");
  }

  var revliews = []

  if(reviews[0] != ""){
      revliews = reviews
  } else {
      revliews = []
  }


  const submit = () => {
      db.collection("users").doc(email).update({
        name: nameP,
        firstTime: false,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
        hobbies: hobblies
      });
      navigation.replace("Home", {
        name: nameP,
        profilePicture: profilePicture,
        email: email,
        hobbies: hobblies,
      });
  }

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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            <TextInput
              //   placeholder="Search here..."
              style={styles.input}
              //   onPress={() => alert("sample")}
              value={nameP}
              onChangeText={(text) => {
                setNameP(text);
              }}
            /> 
            <Icon name="edit" type="Material-Icons" />
          </View>
          {/* <Text style={{ fontSize: 15, marginBottom: 10, color: "gray" }}>
            Bio goes here
          </Text> */}
          <View style={styles.mail}>
            <Icon
              name="star"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Icon
              name="star"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Icon
              name="star"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Icon
              name="star"
              type="entypo"
              color="#FFCC70"
              style={{ marginRight: 5 }}
            />
            <Icon
              name="star"
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
        <Text style={{ fontSize: 15, marginBottom: 10 }}>
          Hobbies: {holblies.toString()}
        </Text>
        <Button
          title="select hobbies"
          onPress={() => setModalVisible(!modalVisible)}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView>
            <Text
              style={{
                fontSize: 30,
                marginBottom: 15,
                marginTop: 15,
                marginLeft: 10,
              }}
            >
              Hobbies
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 5,
                marginTop: 5,
                marginLeft: 10,
              }}
            >
              Art
            </Text>
            <CheckBox
              title="Painting"
              checked={painting}
              onPress={() => setPainting(!painting)}
            />
            <CheckBox
              title="Theater"
              checked={theater}
              onPress={() => setTheater(!theater)}
            />
            <CheckBox
              title="Crafting"
              checked={crafting}
              onPress={() => setCrafting(!crafting)}
            />
            <CheckBox
              title="Pottery"
              checked={pottery}
              onPress={() => setPottery(!pottery)}
            />
            <CheckBox
              title="Astrology"
              checked={astrology}
              onPress={() => setAstrology(!astrology)}
            />
            <CheckBox
              title="Gardening"
              checked={gardening}
              onPress={() => setGardening(!gardening)}
            />
            <CheckBox
              title="Photography"
              checked={photography}
              onPress={() => setPhotography(!photography)}
            />
            <CheckBox
              title="Calligraphy"
              checked={calligraphy}
              onPress={() => setCalligraphy(!calligraphy)}
            />
            <CheckBox
              title="Fashion"
              checked={fashion}
              onPress={() => setFashion(!fashion)}
            />
            <CheckBox
              title="Interior Designing"
              checked={interiordesigning}
              onPress={() => setInteriorDesigning(!interiordesigning)}
            />
            <CheckBox
              title="Makeup"
              checked={makeup}
              onPress={() => setMakeup(!makeup)}
            />
            <Text
              style={{
                fontSize: 15,
                marginBottom: 5,
                marginTop: 5,
                marginLeft: 10,
              }}
            >
              Music
            </Text>
            <CheckBox
              title="Carnatic"
              checked={carnatic}
              onPress={() => setCarnatic(!carnatic)}
            />
            <CheckBox
              title="Playing an Instrument"
              checked={playingInstrument}
              onPress={() => setPlayingInstrument(!playingInstrument)}
            />
            <CheckBox
              title="Poetry"
              checked={poetry}
              onPress={() => setPoetry(!poetry)}
            />
            <CheckBox
              title="Hindustani Classical"
              checked={hindustaniClassical}
              onPress={() => setHindustaniClassical(!hindustaniClassical)}
            />
            <CheckBox
              title="Opera"
              checked={opera}
              onPress={() => setOpera(!opera)}
            />
            <CheckBox
              title="Jazz"
              checked={jazz}
              onPress={() => setJazz(!jazz)}
            />
            <CheckBox
              title="Guitar"
              checked={guitar}
              onPress={() => setGuitar(!guitar)}
            />
            <CheckBox
              title="Cycling"
              checked={cycling}
              onPress={() => setCycling(!cycling)}
            />
            <CheckBox
              title="Yoga"
              checked={yoga}
              onPress={() => setYoga(!yoga)}
            />
            <CheckBox title="Gym" checked={gym} onPress={() => setGym(!gym)} />
            <CheckBox
              title="Singing"
              checked={singing}
              onPress={() => setSinging(!singing)}
            />
          </ScrollView>
          <Button
            title="Done"
            onPress={() => {
              setModalVisible(!modalVisible);
              holblies = hobblies;
            }}
          />
        </Modal>

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
        <Button title="update profile" onPress={submit} />
     
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
});
