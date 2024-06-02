import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text } from "react-native";

export const AddBtn = (props) => {
  const nav = useNavigation();

  return (
    <Pressable
      className="absolute -right-5 bottom-5 mr-8 h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-md hover:opacity-5"
      onPress={props?.onPress}
    >
      <Text className="font-bold text-white">Add</Text>
    </Pressable>
  );
};
