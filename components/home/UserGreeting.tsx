import Colors from "@/shared/Colors";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface UserGreetingProps {
  userName?: string;
}

const UserGreeting: React.FC<UserGreetingProps> = memo(
  ({ userName = "Tubeguruji" }) => {
    return (
      <View
        style={styles.container}
        accessible={true}
        accessibilityLabel={`你好, ${userName}`}
        accessibilityRole="text"
      >
        <View style={styles.avatarContainer}>
          <View
            style={styles.avatar}
            accessible={true}
            accessibilityLabel={`${userName}的头像`}
            accessibilityRole="image"
          >
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>你好,👋</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
      </View>
    );
  }
);

UserGreeting.displayName = "UserGreeting";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 24,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "600",
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    fontWeight: "400",
  },
  nameText: {
    fontSize: 24,
    color: Colors.TEXT_PRIMARY,
    fontWeight: "700",
    marginTop: 2,
  },
});

export default UserGreeting;
