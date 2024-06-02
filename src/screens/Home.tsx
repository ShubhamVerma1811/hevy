import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { AddBtn } from "../components";
import { MinimalCard } from "../components/MinimalCard";
import { NewWorkoutForm } from "../components/NewWorkoutForm";

export const Home = (props) => {
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="shadow-md">
          <Text className="mb-3 text-lg" style={{ fontFamily: "Karla-Bold" }}>
            12th March 2024
          </Text>
          <MinimalCard
            workout={{
              title: "Legs",
              weight: 40,
              distance: 23,
              calories: 343,
            }}
          />
          <MinimalCard
            workout={{
              title: "Arms",
              weight: 40,
              distance: 23,
              calories: 343,
              workouts: [
                {
                  id: Math.floor(Date.now() * Math.random()),
                  title: "Flat bench",
                  time: Math.floor(Date.now() * Math.random()),
                },
              ],
            }}
          />
          <MinimalCard
            workout={{
              title: "Legs",
              weight: 40,
              distance: 23,
              calories: 343,
            }}
          />
        </View>
      </ScrollView>
      <AddBtn onPress={() => setShowWorkoutForm((p) => !p)} />
      {showWorkoutForm && (
        <View className="rounded-t-2xl bg-gray-200 p-4">
          <NewWorkoutForm
            onCancel={() => {
              setShowWorkoutForm((p) => !p);
            }}
          />
        </View>
      )}
    </View>
  );
};
