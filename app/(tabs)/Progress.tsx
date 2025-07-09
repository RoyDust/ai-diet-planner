import DateSelection from "@/components/home/DateSelection";
import Colors from "@/shared/Colors";
import { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Profile = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mealPlanContainer}>
          <Text style={styles.title}>计划安排🎯</Text>
          <View style={styles.planContainer}>
            <DateSelection
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              days={4}
            />
          </View>
          {/* <View style={styles.planContainer}>
            <TodaysMealPlan />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 30,
    display: "flex",
    flexDirection: "column",
  },
  scrollView: {
    flex: 1,
  },
  mealPlanContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
    marginBottom: 20,
  },
  planContainer: {
    width: "100%", 
    display: "flex",
    flexDirection: "column",
  },
});

export default Profile;
