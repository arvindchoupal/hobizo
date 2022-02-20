import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Platform, View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, Share, Linking, AppState, FlatList, Dimensions, } from "react-native";
import { Avatar, ListItem, Icon, Input, Button } from "react-native-elements";
import { db } from "../firebase";
import * as Location from "expo-location";
import Constants from "expo-constants";
import CustomListItem from "../Components/CustomListItem";
import { MaterialCommunityIcons, AntDesign, SimpleLineIcons, Feather, Ionicons, FontAwesome5, Entypo, MaterialIcons, } from "@expo/vector-icons";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import Latest from "./latest";
import { getAuth } from "firebase/auth";


const auth = getAuth();

const numColumns = 3;
const size = Dimensions.get("window").width / numColumns;



const Home = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState("krishna");
  const [errorMsg, setErrorMsg] = useState(null);
  const [recievedlocation, setrec] = useState(false);
  const [distance, setDistance] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [holblies, setHolblies] = useState([])


  const { name, profilePicture, email, hobbies, reviews } = route.params;
 

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };

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

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);
  useEffect(() => {
    db.collection("hobbies").onSnapshot((snapshot) => {
      setHolblies(snapshot.docs.map((doc) => doc.data()))
    }
    );
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Connect your hobby partners near you on - https://play.google.com/store/apps/details?id=com.rk.nabooz",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  latlitude
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Nabooz",
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
              name="share"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
              onPress={onShare}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo
              name="chat"
              size={24}
              color="white"
              style={{ marginLeft: 10, marginRight: 10 }}
              onPress={() => navigation.navigate("Messages")}
            />
          </TouchableOpacity>
        </View>
      ),
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
            <Avatar
              rounded
              source={{ uri: profilePicture }}
              onPress={navigateProfile}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const navigateProfile = () => {
    navigation.navigate("Profile", {
      name: name,
      profilePicture: profilePicture,
      email: email,
      reviews: reviews,
      hobbies: hobbies,
      holblies: holblies,
    });
  };


  const updateLocation = (lat, lon) => {
    db.collection("users").doc(auth.currentUser.email).update({
      latitude: lat,
      longitude: lon,
    });
  };

  // var latlitude = ''
  // var longlitude = ''
  const [latlitude, setLatlitude] = useState("");
  const [longlitude, setLonglitude] = useState("");
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
      // latlitude = locationn.coords.latitude;
      setLatlitude(locationn.coords.latitude);
      setLonglitude(locationn.coords.longitude);

      updateLocation(locationn.coords.latitude, locationn.coords.longitude);
      setLocation(locationn);
    })();
  }, [recievedlocation]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  var finalArray = [];

  for (var i = 0; i < users.length; i++) {
    if (users[i].name != name) {
      const value = getDistanceFromLatLonInKm(
        latlitude,
        longlitude,
        users[i].latitude,
        users[i].longitude
      );
     
      finalArray.push([
        users[i].email,
        users[i].name,
        users[i].profilePicture,
        value,
        users[i].hobbies,
        users[i].reviews,
       
      ]);
    }
  }

  console.log(finalArray);
  finalArray.sort(function (a, b) {
    // return a[3] > b[3] ? 1 : -1;
    return a[3] - b[3];
  });

  const datas = [
    { id: "a", value: "A" },
    // { id: "b", value: "B" },
    // { id: "c", value: "C" },
    // { id: "d", value: "D" },
    // { id: "e", value: "E" },
    // { id: "f", value: "F" },
  ];

  const takeToHobbies = (hobby) => {
    navigation.navigate("Hobbies", {
      finalArray: finalArray,
      hobby: hobby,
      sender: name,
      senderPhoto: profilePicture,
      senderEmail: email,
    });
  };

  //   var people = [];
  //   var hobbies = [""];
  //   db.collection("users").onSnapshot((snapshot) => {
  //     people = snapshot.docs.map((doc) => doc.data());
  //     hobbies = people[0].hobbies;
  //     console.log(hobbies);
  //   });

  // hobbies = people[0].hobbies

  //     if(obj.hobbies[0]===""){
  //         console.log("taking user to profile")
  //         navigation.replace("Profile", {
  //           name: name,
  //           profilePicture: profilePicture,
  //           email: email,
  //         });
  //     }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: "https://i.ibb.co/LRCvHJZ/Screenshot-from-2021-10-29-07-32-29.png",
          }}
          style={{
            width: 300,
            height: 100,
            marginBottom: 15,
            marginTop: 15,
            alignSelf: "center",
          }}
        // transition={true}
        />

        <Text style={styles.textWelcome}>
          Hey {auth.currentUser.displayName}! Welcome
        </Text>

       
        <Button title='test' onPress={() => navigation.navigate('test')} />
        {hobbies[0] != "" ? (
          hobbies.map((hobby) => (
            <View>
              <TouchableOpacity>
                <View></View>
                <ListItem
                  onPress={() => takeToHobbies(hobby)}
                  bottomDivider={true}
                >
                  {/* <Icon name="bicycle" type="font-awesome" /> */}
                  <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "700" }}>
                      Hobbies - {hobby}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {finalArray.slice(0, 4).map((data) => (
                  <View
                    style={{ display: "flex", flexDirection: "row" }}
                  // onPress={() => alert("krishna")}
                  >
                    {data[4].includes(hobby) ? (
                      <TouchableOpacity onPress={() => takeToHobbies(hobby)}>
                        <View>
                          <View style={{ position: "relative" }}>
                            <Image
                              source={{
                                uri: data[2],
                              }}
                              style={{ width: 130, height: 130 }}
                            />
                            <View
                              style={{
                                position: "absolute",
                                // backgroundColor: "black",
                                bottom: 0,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ color: "white" }}>{data[1]}</Text>
                              <Text style={{ color: "white" }}>
                                {data?.[3]} km
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ) :
                      null}
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 27,
                marginTop: 10,
              }}
            >
              New to Nabooz?
            </Text>
            <Text style={{ margin: 10, textAlign: "center" }}>
              Please go to your profile page and set it up first.
            </Text>
            <Button
              title="Go to Profile"
              onPress={navigateProfile}
              containerStyle={styles.button2}
            />
          </View>
        )}

        <TouchableOpacity>
          <Image
            source={{
              uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-fitness-gym-ad-instagram-post-design-template-a8cf4e55e6240c2a206fec26f6a9ddef_screen.jpg?ts=1561435040",
            }}
            style={{
              width: 300,
              height: 300,
              marginBottom: 20,
              marginTop: 20,
              alignSelf: "center",
            }}
          // transition={true}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
