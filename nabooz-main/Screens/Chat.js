import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar, Text, Icon, Input, Image } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { db, auth } from "../firebase";
// import * as firebase from "firebase";
import { serverTimestamp } from "@firebase/firestore";

const Chat = ({ navigation, route }) => {
  const scrollViewRef = useRef();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderMessages, setSenderMessages] = useState([]);
  const [messsages, setMesssages] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  let obj = users.find((o) => o.email === route.params.email);

  console.log("objo", obj);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -30,
          }}
          onPress={() => Alert("Krishna")}
        >
          <Avatar
            source={{
              uri:
                route.params.profilePicture ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
            rounded
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {route.params.name}
          </Text>
        </View>
      ),
      // headerRight: () => (
      //   <View style={{ flexDirection: "row", alignItems: "center" }}>
      //     <TouchableOpacity>
      //       <Feather
      //         name="video"
      //         size={24}
      //         color="#0b5139"
      //         style={{ marginRight: 20 }}
      //         onPress={() => alert("Feature coming soon")}
      //       />
      //     </TouchableOpacity>
      //     <TouchableOpacity>
      //       <Ionicons
      //         name="call-outline"
      //         size={24}
      //         color="#0b5139"
      //         style={{ marginRight: 20 }}
      //         onPress={() => alert("Feature coming soon")}
      //       />
      //     </TouchableOpacity>
      //   </View>
      // ),
    });
  }, [navigation, messages]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.name)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, [route]);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();
  // }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setImgUrl(result.uri);
  //     console.log(result.uri, "ok");
  //   }
  //   sendImage(result.uri);
  // };
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats")
      .doc(route.params.name)
      .collection("messages")
      .add({
        timestamp: serverTimestamp(),
        message: chatInput,
        // image: "",
        displayName: route.params.sender,
        photoURL: route.params.senderPhoto,
        to: route.params.name,
        from: route.params.sender,
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        }),
      });
    db.collection("chats")
      .doc(route.params.sender)
      .collection("messages")
      .add({
        timestamp: serverTimestamp(),
        message: chatInput,
        // image: "",
        displayName: route.params.sender,
        photoURL: route.params.senderPhoto,
        to: route.params.name,
        from: route.params.sender,
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        }),
      });
    setChatInput("");
    setImgUrl("");
  };
  const sendImage = (imgURLL) => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: chatInput,
      subtitle: "Image",
      image: imgURLL,
      displayName: route.params.sender,
      photoURL: route.params.senderPhoto,
    });
    setChatInput("");
    setImgUrl("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.os === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            {/* <ScrollView contentContainerStyle={{paddingTop: 15}}> */}
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
              contentContainerStyle={{ paddingTop: 15 }}
            >
              {messages.map(({ id, data }) =>
                // data.displayName == route.params.sender &&
                data.from == route.params.sender &&
                data.to == route.params.name ? (
                  <View key={id} style={styles.reciever}>
                    <Text style={styles.receiverText}>{data.message}</Text>
                    <Text style={styles.recieverName}>
                      {data.time} - {data.date}
                    </Text>
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: data.photoURL }}
                      rounded
                    />
                  </View>
                ) : data.from == route.params.name &&
                  data.to == route.params.sender ? (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      source={{ uri: data.photoURL }}
                      size={30}
                      rounded
                    />
                    <Text style={styles.senderText}>{data.message}</Text>

                    <Text style={styles.senderName}>
                      {data.time} - {data.date}
                    </Text>
                  </View>
                ) : null
              )}
            </ScrollView>

            <View style={styles.footer}>
              <Ionicons
                name="attach"
                size={24}
                color="#0b5139"
                // onPress={pickImage}
              />
              <TextInput
                placeholder="Type a message..."
                style={styles.input}
                onSubmitEditing={sendMessage}
                value={chatInput}
                onChangeText={(text) => {
                  setChatInput(text);
                }}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#38d49d" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#93d1fb",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    flexDirection: "row",
  },
  sender: {
    padding: 15,
    backgroundColor: "#bbe3ff",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 7,
    paddingRight: 10,
    fontSize: 10,
    bottom: -6,
  },
  recieverName: {
    right: 7,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 10,
    bottom: -6,
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

export default Chat;
