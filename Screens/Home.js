import React,{useState,useEffect} from 'react'
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = props => {
     const [name,setName] = useState('')
     const[age,setAge] = useState('')

     useEffect(() => {
         getData()
     },[])

    const getData = async() => {
        try {
            await AsyncStorage.getItem('UserData')
            .then( value => {
                if(value != null){
                    let user = JSON.parse(value)
                setName(user.Name)
                setAge(user.Age)
            }})
        } catch (error) {
            console.log(error)
        }
    }

    const updateData = async() =>{
        if(name.length === 0){
            Alert.alert('Warning','Enter a Valid name')
        }else{
            try {
              await AsyncStorage.setItem('UserName',name)
                Alert.alert('Success','Name Updated')
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    const removeData = async() =>{
        if(name.length === 0){
            Alert.alert('Warning','Enter a Valid name')
        }else{
            try {
              await AsyncStorage.clear()
                props.navigation.navigate('login')
            } catch (error) {
                console.log(error)
            }
        }
    }

    

    return (
        <View style={styles.screen}>
            <Text style={styles.label}>Welcome here ! ...{name}</Text>
            <Text style={styles.label}>Your age is ! ...{age}</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <TouchableOpacity style={styles.button} onPress={updateData}>
                <Text style={styles.buttonLabel}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={removeData}>
                <Text style={styles.buttonLabel}>Remove</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    label:{
        fontSize:30,
        fontWeight:'bold'
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
        backgroundColor:'#ff6633',
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
