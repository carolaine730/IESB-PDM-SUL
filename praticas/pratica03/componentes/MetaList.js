function MetaList (props){
return(
<ScrollView style={styles.metaContainer}>
        {metas.map((meta, index) => <Text key={index}
        style={styles.item}>{meta}</Text>)}
      </ScrollView>
);
};

export default MetaList;
const styles = StyleSheet.create({
item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'linghtblue'
  }

  })