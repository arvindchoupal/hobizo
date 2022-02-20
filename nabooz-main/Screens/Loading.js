import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { db } from "../firebase";
import Test from "./targetedhoby";
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider,} from "firebase/auth";


const auth = getAuth();

const Loading = ({ navigation }) => {

var users = []
  useEffect( async () => {
    await db.collection("users").onSnapshot((snapshot) =>{
      users = snapshot.docs.map((doc) => doc.data())

    checkIfLoggedIn();
    }
    );
  }, []);
  
    const checkIfLoggedIn = () => {
      auth.onAuthStateChanged((authUser) => {
        console.log("users", users);
        if (authUser) {
          let obj = users.find((o) => o.email === authUser.email);

          console.log('objo', obj);
          console.log(authUser)
      
            navigation.replace("top", {
              myname: authUser.displayName,
              myprofilePicture: authUser.photoURL,
              myemail: authUser.email,
              myhobbies: obj.hobbies,
              myreviews: obj.reviews,
              //   firstTime: obj.firstTime,
            });
            console.log("take to home page");
        //   }
        } else {
          navigation.replace("Login");
          console.log("take to login");
        }
      });
    };


  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
