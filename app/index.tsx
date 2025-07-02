import { theme } from "@/theme";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  LayoutAnimation,
} 
from "react-native";
import { ShoppingList } from "@/components/ShoppingList";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "@/utils/storage";
import * as Haptics from "expo-haptics"

const StorageKey = "shopping-list"

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastCompletedTimestamp: number;
};

const initailList: ShoppingListItemType[] = [];

export default function HomeScreen() {
  const [itemList, setItemList] = useState<ShoppingListItemType[]>(initailList);
  const [value, setValue] = useState("");

  

  useEffect(()=>{
    const fetchInitial = async () =>{
      const data = await getFromStorage(StorageKey)
      if (data){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setItemList(data);
      }
    }
    fetchInitial();
  },[]);

  const handleSubmit = () => {
    if (value) {
      const newItemList = [
        {
          id: new Date().toISOString(),
          name: value,
          lastCompletedTimestamp: Date.now(),
        },
        ...itemList,
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setItemList(newItemList);
      saveToStorage(StorageKey,newItemList);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    const newItemList = itemList.filter((item) => item.id !== id);
    saveToStorage(StorageKey,newItemList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItemList(newItemList);
  };

  const handleToggleComplete = (id: string) => {
    const newItemList = itemList.map((item) => {
      if (item.id === id) {
        if (item.completedAtTimestamp){
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        else{
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return {
          ...item,
          lastCompletedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      }
      return item;
    });
    saveToStorage(StorageKey, newItemList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setItemList(newItemList);
  };

  return (
    <FlatList
      data={orderShoppingList(itemList)}
      renderItem={({ item }) => {
        return (
          <ShoppingList
            name={item.name}
            onDelete={() => handleDelete(item.id)}
            onToggleComplete={() => handleToggleComplete(item.id)}
            isCompleted={Boolean(item.completedAtTimestamp)}
          />
        );
      }}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.g: Tea"
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
    ></FlatList>
  );
}

function orderShoppingList(itemList: ShoppingListItemType[]) {
  return itemList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastCompletedTimestamp - item1.lastCompletedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    backgroundColor: theme.colorWhite,
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    fontSize: 18,
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
