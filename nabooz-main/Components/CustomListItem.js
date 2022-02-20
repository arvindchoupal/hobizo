import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Input, Text, ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({
  name,
  url,
  data,
  sender,
  senderPhoto,
}) => {
  const enterChat = (chatName, url, sender, senderPhoto) => {
    navigation.navigate("Chat", {
      name: chatName,
      profilePicture: url,
      sender: sender,
      senderPhoto: senderPhoto,
    });
  };

  return (
    <ListItem
      key={data[0]}
      onPress={() => enterChat(name, url, sender, senderPhoto)}
      bottomDivider={true}
    >
      <Avatar
        rounded
        source={{
          uri:
            data?.[2] ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "700" }}>{data[1]}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {data?.[3]} km away
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({});

export default CustomListItem;
