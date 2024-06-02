import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const templates = [
  {
    id: Math.floor(Date.now() * Math.random()),
    title: "Empty",
    desc: "Empty template",
    workouts: [],
  },
  {
    id: Math.floor(Date.now() * Math.random()),
    title: "Chest & Back",
    desc: "Template of Chest & Back workouts",
    workouts: [
      {
        id: Math.floor(Date.now() * Math.random()),
        title: "Flat bench",
        time: Date.now(),
      },
      {
        id: Math.floor(Date.now() * Math.random()),
        title: "Incline Dumbell press",
        time: Date.now(),
      },
    ],
  },
  {
    id: Math.floor(Date.now() * Math.random()),
    title: "Arms",
    desc: "Biceps, Triceps and Forearms workouts",
    workouts: [
      {
        id: Math.floor(Date.now() * Math.random()),
        title: "Bicep curl",
        time: Date.now(),
      },
    ],
  },
  {
    id: Math.floor(Date.now() * Math.random()),
    title: "Legs & Shoulder",
    desc: "Template of Legs & Shoulder workouts",
  },
];

export const NewWorkoutForm = (props) => {
  const nav = useNavigation();

  const [title, setTitle] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <View>
      <Text className="mb-2 text-xl" style={{ fontFamily: "Karla-ExtraBold" }}>
        Create new Workout
      </Text>
      <TextInput
        className="rounded-t-md bg-gray-300 p-3 text-lg"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter the workout title"
        style={{ fontFamily: "Karla-SemiBold" }}
      />

      <ScrollView
        horizontal
        className="my-2 flex flex-row"
        showsHorizontalScrollIndicator={false}
      >
        {templates?.map((template, idx) => {
          return (
            <Pressable
              key={template.id + idx}
              className={`mr-2 rounded-md border-2 bg-gray-400 p-3 ${selectedIdx !== idx && "border-transparent"}`}
              onPress={() => {
                setSelectedIdx(idx);
                setTitle(template?.title);
              }}
            >
              <View style={{ maxWidth: 250 }}>
                <Text className="text-lg " style={{ fontFamily: "Karla-Bold" }}>
                  {template.title}
                </Text>
                <Text
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Karla-Medium" }}
                >
                  {template.desc}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="mt-2 flex flex-row items-center justify-between gap-2">
        <Pressable
          className="flex-1 rounded-md bg-white p-3"
          onPress={() => {
            setTitle(null);
            props?.onCancel();
          }}
        >
          <Text
            className="text-center text-lg"
            style={{ fontFamily: "Karla-SemiBold" }}
          >
            Cancel
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 rounded-md bg-gray-500 p-3"
          onPress={() => {
            nav.navigate("Add", {
              title,
              workouts: templates?.[selectedIdx]?.workouts,
            });
          }}
        >
          <Text
            className="text-center text-lg text-white"
            style={{ fontFamily: "Karla-SemiBold" }}
          >
            Start new workout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
