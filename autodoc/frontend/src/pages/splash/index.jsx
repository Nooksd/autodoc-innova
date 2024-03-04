import { StyleSheet, Image, View} from 'react-native';

export function Splash() {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010336',
  },
  background: {
    width: "100%",
    height: "100%",
  }
});
