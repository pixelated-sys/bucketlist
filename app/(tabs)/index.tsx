import { theme } from "@/theme";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

export default function HomeScreen() {
  const handleDelete = () => {
    Alert.alert(
      "Say good bye to your friend. You are striking him off",
      "Bye Bye!",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Deleting...");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDelete}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  itemContainer: {
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  button: {
    backgroundColor: theme.colorBlack,
    borderRadius: 6,
    padding: 8,
  },
  buttonText: {
    color: theme.colorWhite,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
