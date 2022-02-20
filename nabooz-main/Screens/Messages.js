import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Platform,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { Avatar, ListItem, Icon, Input } from "react-native-elements";
import { db } from "../firebase";
import {
  MaterialCommunityIcons,
  AntDesign,
  SimpleLineIcons,
  Feather,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
const auth = getAuth();

const Hobbies = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

 useEffect(() => {
   const unsubscribe = db
     .collection("chats")
     .doc(auth.currentUser.displayName)
     .collection("messages")
     .orderBy("timestamp", "desc")
     .onSnapshot((snapshot) =>
       setMessages(snapshot.docs.map((doc) => doc.data()))
     );

   return unsubscribe;
 }, []);
 
const x = messages.reduce((accumulator, current) => {
  if (!accumulator.some((x) => x.from === current.from)) {
    accumulator.push(current);
  }
  return accumulator;
}, []);


 

//   const { finalArray, hobby, sender, senderPhoto, senderEmail } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
    });
  }, []);

  const enterChat = (
    chatName,
    url,
    sender,
    senderPhoto,
  ) => {


    navigation.navigate("Chat", {
      name: chatName,
      profilePicture: url,
      sender: sender,
      senderPhoto: senderPhoto,
    });
  };

  return (
    <View>
      <View>
        {x.map((data) => (
          <View>
            {/* <TouchableOpacity
                    onPress={() =>
                      enterChat(
                        data[1],
                        data[2],
                        sender,
                        senderPhoto,
                        data[5],
                        data[0],
                        data[4],
                        senderEmail
                      )
                    }
                  >
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
                          <Text style={{ color: "white" }}>{data?.[3]} km</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity> */}
            {data.from != auth.currentUser.displayName ? (
              <TouchableOpacity>
                <ListItem
                  key={data.from}
                  onPress={() =>
                      enterChat(
                        data.from,
                        data.photoURL,
                        auth.currentUser.displayName,
                        auth.currentUser.photoURL,
                      )
                  }
                  bottomDivider={true}
                >
                  <Avatar
                    rounded
                    source={{
                      uri:
                        data?.photoURL ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "700" }}>
                      {data.from}
                    </ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                      {data.message}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Hobbies;
