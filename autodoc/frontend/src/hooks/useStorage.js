import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = async () => {
    const getItem = async (key) => {
        try {

        } catch(error) {
            console.log('Ocorreu um erro: ', error)
            return []
        }
    }
    const setItem = async (key, value) => {
        try {

        } catch(error) {
            console.log('Ocorreu um erro: ', error)
            return []
        }
    }
    const removeItem = async (key) => {
        try {

        } catch(error) {
            console.log('Ocorreu um erro: ', error)
            return []
        }
    }

    return {
        getItem,
        setItem,
        removeItem
    }
}