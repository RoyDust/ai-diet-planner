import Colors from "@/shared/Colors";
import {
  AnalyticsUpIcon,
  Home03Icon,
  SpoonAndForkIcon,
  UserSquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={Home03Icon}
              color={color}
              strokeWidth={1.5}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Meals"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={SpoonAndForkIcon}
              color={color}
              strokeWidth={1.5}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={AnalyticsUpIcon}
              color={color}
              strokeWidth={1.5}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={UserSquareIcon}
              color={color}
              strokeWidth={1.5}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
