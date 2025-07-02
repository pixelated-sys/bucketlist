import { theme } from "@/theme";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingList({ name, isCompleted, onDelete, onToggleComplete }: Props) {
  const handleDelete = () => {
    if (!isCompleted) {
      Alert.alert(`Are you sure you wanna delete ${name}`, "Say Bye Bye!", [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress = {onToggleComplete}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
});
