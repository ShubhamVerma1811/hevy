import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const MinimalCard = (props) => {
  const nav = useNavigation();
  return (
    <Pressable
      onPress={() =>
        nav.navigate("Add", {
          title: props?.workout?.title,
          workouts: props?.workout?.workouts,
        })
      }
    >
      <View className="my-1 rounded-md bg-gray-200 p-4">
        <View className="mb-3 flex flex-row items-center justify-between">
          <Text
            className=" text-xl"
            style={{
              fontFamily: "Karla-Bold",
            }}
          >
            {props?.workout?.title}
          </Text>
          <Text
            className=" text-xl"
            style={{
              fontFamily: "Karla-Bold",
            }}
          >
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <View className="">
            <Text
              className="pr-6 text-lg text-gray-600"
              style={{
                fontFamily: "Karla-Bold",
              }}
            >
              {props?.workout?.weight} KG
            </Text>
          </View>
          <View className="">
            <Text
              className="px-6 text-lg text-gray-600"
              style={{
                fontFamily: "Karla-Bold",
              }}
            >
              {props?.workout?.distance} KM
            </Text>
          </View>
          <View className="">
            <Text
              className="pr-6 text-lg text-gray-600"
              style={{
                fontFamily: "Karla-Bold",
              }}
            >
              {props?.workout?.calories} Kcal
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
