import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login() {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('light');
  const [userToken, setUserToken] = useState('');

  

  const getData = async () => {
    const values = await AsyncStorage.multiGet(['@userToken', '@theme'])

    values.forEach((value) => {
      if (value[0] === '@userToken') {
        setUserToken(value[1])
        alert(value[1])
      }else if (value[0] === '@theme' && value[1] != ''){
        setTheme(value[1])
      }
    })
  }

  const saveUserToken = (userToken) => {
    AsyncStorage.setItem('@userToken', userToken)
   .then(() => {
    navigation.navigate('main-tabs')
    alert(userToken)
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <Text>LOGINPAGE DO APP</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => saveUserToken('token 5')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#1e1e1e1e',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
