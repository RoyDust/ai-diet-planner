import { UserContext } from "@/context/UserContext";
import { auth } from "@/services/firebase";
import Colors from "@/shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          {user.picture ? (
            <Image
              source={{
                uri: user.picture,
              }}
              style={styles.avatarImage}
              contentFit="cover"
            />
          ) : (
            <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
          )}
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <InfoRow icon="person-outline" label="性别" value={user.gender} />
        <InfoRow icon="body-outline" label="目标" value={user.goal} />
        <InfoRow
          icon="barbell-outline"
          label="体重"
          value={`${user.weight} kg`}
        />
        <InfoRow
          icon="resize-outline"
          label="身高"
          value={`${user.height} cm`}
          hideBorder
        />
      </View>

      <View style={styles.infoSection}>
        <InfoRow
          icon="flame-outline"
          label="卡路里"
          value={`${user.calories} kcal`}
        />
        <InfoRow
          icon="nutrition-outline"
          label="蛋白质"
          value={`${user.proteins} g`}
          hideBorder
        />
      </View>

      <View style={styles.infoSection}>
        <InfoRow
          icon="cash-outline"
          label="积分"
          value={user.credits}
          hideBorder
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={Colors.WHITE} />
        <Text style={styles.logoutButtonText}>退出登录</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  hideBorder,
}: {
  icon: any;
  label: string;
  value: string | number;
  hideBorder?: boolean;
}) => (
  <View style={[styles.infoRow, hideBorder && { borderBottomWidth: 0 }]}>
    <Ionicons name={icon} size={24} color={Colors.GRAY} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: Colors.PRIMARY,
    paddingTop: Platform.OS === "ios" ? 80 : 70,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 3,
    borderColor: Colors.WHITE,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.WHITE,
  },
  email: {
    fontSize: 16,
    color: Colors.WHITE,
    opacity: 0.8,
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  infoLabel: {
    fontSize: 16,
    marginLeft: 15,
    color: Colors.DARK_GRAY,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "auto",
    color: Colors.PRIMARY,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: Colors.RED,
    padding: 15,
    borderRadius: 15,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Profile;
