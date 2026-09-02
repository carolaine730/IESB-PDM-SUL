import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

function MetaList(props) {
  return (
    <ScrollView>
      {props.array.map((meta) => {
        return (
          <Pressable key={meta.id} onPress={() => props.onDeleteItem(meta.id)}>
            <Text style={styles.item}>{meta.texto}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export default MetaList;

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  },
});