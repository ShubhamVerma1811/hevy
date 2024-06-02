import { useNavigation } from "@react-navigation/native";
import { useReducer, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export const Add = (props) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedDate = formatter.format(new Date());

  const [title, setTitle] = useState<string>(props?.route?.params?.title);
  const [workouts, setWorkouts] = useState(props?.route?.params?.workouts);
  const [activeWorkout, setActiveWorkout] = useState(false);
  const nav = useNavigation();

  return (
    <View className="relative flex-1 p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="mb-4">
            <TextInput
              className="mb-1 text-2xl"
              style={{ fontFamily: "Karla-ExtraBold" }}
              value={title}
              autoFocus={!title}
              placeholder="Workout title"
              onChangeText={setTitle}
            />

            <Text
              className="text-gray-500"
              style={{
                fontFamily: "Karla-Regular",
              }}
            >
              {formattedDate}
            </Text>
          </View>

          {workouts?.length ? (
            workouts?.map((wo) => {
              return <ExerciseCard wo={wo} />;
            })
          ) : (
            <Text
              className="items-center self-center text-xl"
              style={{ fontFamily: "Karla-SemiBold" }}
            >
              No Workouts
            </Text>
          )}
        </View>
      </ScrollView>
      {activeWorkout ? (
        <Pressable
          className="absolute -right-5 bottom-0 mr-8 h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-md hover:opacity-5"
          onLongPress={() => {
            setActiveWorkout(false);
            nav.navigate("Home");
          }}
        >
          <Text className="font-bold text-white">Stop session</Text>
        </Pressable>
      ) : (
        <Pressable
          className="absolute -right-5 bottom-0 mr-8 h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-md hover:opacity-5"
          onPress={() => {
            if (!activeWorkout) {
              setActiveWorkout(true);
            }
            setWorkouts((prev) => [
              ...prev,
              {
                id: Math.floor(Date.now() * Math.random()),
                name: "Flat bench",
                time: Math.floor(Date.now() * Math.random()),
              },
            ]);
          }}
        >
          <Text className="font-bold text-white">Add Exercise</Text>
        </Pressable>
      )}
    </View>
  );
};

function workoutReducer(state, action) {
  switch (action.type) {
    case "ADD_SET": {
      return state.concat([
        {
          lbs: "",
          reps: "0",
          id: Math.floor(Math.floor(Date.now() * Math.random())),
        },
      ]);
    }

    case "INC_REP": {
      const set = state.find((s) => s.id === action.payload.id);
      if (!set) return state;

      set.reps = String(parseInt(set.reps) + 1);
      return [...state];
    }

    case "DEC_REP": {
      const set = state.find((s) => s.id === action.payload.id);
      if (!set) return state;

      set.reps = set.reps <= 0 ? "0" : String(parseInt(set.reps) - 1);
      return [...state];
    }

    case "CHANGE_WEIGHT": {
      const set = state.find((s) => s.id === action.payload.id);
      if (!set) return state;

      set.lbs = action?.payload?.val;
      return [...state];
    }

    case "CHANGE_REP": {
      const set = state.find((s) => s.id === action.payload.id);
      if (!set) return state;

      set.reps = action?.payload?.val;
      return [...state];
    }

    case "DEL_SET":
      return state.filter((s) => s.id !== action.payload.id);

    default:
      return state;
  }
}

function ExerciseCard({ wo }) {
  const [sets, dispatch] = useReducer(workoutReducer, [
    {
      lbs: "",
      reps: "0",
      id: Math.floor(Math.floor(Date.now() * Math.random())),
    },
  ]);

  function addSet() {
    dispatch({ type: "ADD_SET" });
  }

  function incrementRep(id) {
    dispatch({ type: "INC_REP", payload: { id } });
  }

  function decrementRep(id) {
    dispatch({ type: "DEC_REP", payload: { id } });
  }

  function changeWeight(id, val) {
    dispatch({ type: "CHANGE_WEIGHT", payload: { id, val } });
  }

  function changeRep(id, val) {
    dispatch({ type: "CHANGE_REP", payload: { id, val } });
  }

  function deleteSet(id) {
    dispatch({ type: "DEL_SET", payload: { id } });
  }

  return (
    <View>
      <TextInput
        className="mb-1 text-2xl"
        style={{ fontFamily: "Karla-ExtraBold" }}
        autoFocus={!wo.title}
      >
        {wo.title}
      </TextInput>

      <View className="rounded-md bg-gray-200 p-5">
        {sets?.map((set, idx) => {
          return (
            <View
              key={set.id + idx}
              className="flex flex-row items-center gap-3"
            >
              <View className="flex flex-col items-center">
                <Text
                  className=" text-lg"
                  style={{
                    fontFamily: "Karla-Bold",
                  }}
                >
                  Set
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    fontFamily: "Karla-Bold",
                  }}
                  className="rounded-md border-2 border-gray-400 bg-gray-400 px-3 text-center text-white"
                  defaultValue={idx === 0 ? "WU" : idx.toString()}
                />
              </View>

              <View className="flex flex-1 flex-col items-center">
                <Text
                  className=" text-lg"
                  style={{
                    fontFamily: "Karla-Bold",
                  }}
                >
                  Weight
                </Text>
                <TextInput
                  className="w-full rounded-md border-2 border-gray-400 px-3 text-center"
                  style={{
                    fontFamily: "Karla-Regular",
                  }}
                  keyboardType="numeric"
                  defaultValue={set.lbs}
                  onChangeText={(e) => {
                    changeWeight(set.id, e);
                  }}
                />
              </View>

              <View className="flex flex-1 flex-col items-center">
                <Text
                  className=" text-lg"
                  style={{
                    fontFamily: "Karla-Bold",
                  }}
                >
                  Reps
                </Text>
                <View
                  className="flex flex-row items-center rounded-md border-2 border-gray-400"
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    className="h-7 w-7 bg-gray-400 p-1 "
                    onPress={() => decrementRep(set.id)}
                  >
                    <Text className="text-center text-lg leading-5 text-white">
                      -
                    </Text>
                  </Pressable>
                  <TextInput
                    className="flex-1 rounded-md px-3 text-center"
                    style={{
                      fontFamily: "Karla-Regular",
                    }}
                    keyboardType="numeric"
                    defaultValue={set.reps}
                    onChangeText={(e) => {
                      changeRep(set.id, e);
                    }}
                  />
                  <Pressable
                    className="h-7 w-7  bg-gray-400 p-1 "
                    onPress={() => incrementRep(set.id)}
                  >
                    <Text className="text-center text-lg leading-5 text-white">
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="flex flex-col items-center">
                <Pressable onPress={() => deleteSet(set.id)}>
                  <Text
                    className=" text-lg"
                    style={{
                      fontFamily: "Karla-Bold",
                    }}
                  >
                    Delete
                  </Text>
                  <TextInput
                    editable={false}
                    style={{
                      fontFamily: "Karla-Bold",
                    }}
                    className="rounded-md border-2 border-red-400 bg-red-400 px-3 text-center text-white"
                    defaultValue={"Del"}
                  />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      <Pressable
        className="my-4 rounded-2xl border-2 border-gray-500 py-3"
        onPress={addSet}
      >
        <Text
          className="text-md text-center focus-within:bg-green-500 hover:bg-pink-900 focus:bg-green-400"
          style={{
            fontFamily: "Karla-ExtraBold",
          }}
        >
          Add Set
        </Text>
      </Pressable>
    </View>
  );
}
