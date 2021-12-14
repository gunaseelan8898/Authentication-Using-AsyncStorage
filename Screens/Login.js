import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View ,StatusBar, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = props => {

    const[name,setName] = useState('')
    const[age,setAge] = useState('')

    useEffect(() => {
        getData()
    },[])

   const getData = async() => {
       try {
           await AsyncStorage.getItem('UserData')
           .then( value => {
               if(value != null){
               props.navigation.navigate('home')
           }})
       } catch (error) {
           console.log(error)
       }
   }

    const setData = async() =>{
        if(name.length === 0 || age.length === 0){
            Alert.alert('Warning','Enter a Valid name')
        }else{
            try {
                var User = {
                    Name:name,
                    Age:age
                }
                AsyncStorage.setItem('UserData',JSON.stringify(User))
                props.navigation.navigate('home')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor='transparent' translucent={true} />
            <Text style={styles.label}>E-Mail</Text>
            <TextInput style={styles.input} onChangeText={setName} />
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} onChangeText={setAge} />
            <TouchableOpacity style={styles.button} onPress={setData}>
                <Text style={styles.buttonLabel}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    label:{
        fontSize:20,
        fontWeight:'bold',
        marginRight:210,
        marginVertical:10
    },
    input:{
        width:'80%',
        height:50,
        backgroundColor:'grey',
        borderRadius:15,
        fontSize:18,
        paddingLeft:15
    },
    button:{
        height:40,
        width:100,
        backgroundColor:'#3399ff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:20
    },
    buttonLabel:{
        fontSize:17,
        fontWeight:'bold',
    }
})
