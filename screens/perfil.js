import { StatusBar } from 'expo-status-bar';
import React, {useState,useContext, useEffect} from 'react';
import { StyleSheet, Button, View,ScrollView,SafeAreaView, Text} from 'react-native';
import UploadImage from '../components/uploadImage';
import GlobalContext from "../components/context"
import IdiomaPicker from "../components/idiomaPicker"
import * as Location from 'expo-location';


const Localizacion = () =>{
    const {AuthData,setAuthData} = useContext(GlobalContext)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
   
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
        setLocation(location);
      })();
    }, []);
  

    useEffect(() => {
      let valor = 'waiting...';
      let reporte = null;
  
      if (errorMsg) {
        valor = errorMsg;
      }
      else if (location) {
        valor = JSON.stringify(location);
        reporte = JSON.parse(valor);
        setAuthData({...AuthData,
            coordinates: {
                latitude: reporte.coords.latitude,
                longitude: reporte.coords.longitude
        }})
      }

    }, [location]);
}

export default function Perfil({navigation, route}) {

    const {AuthData,setAuthData} = useContext(GlobalContext)
    const {nombre, setNombre} = useState(AuthData.username)
    const[estaEnLaBase, setEstaEnLaBase] = useState(false)

    Localizacion()
/*     const post = () => {
        console.log("estaEnLaBase " + estaEnLaBase)
        if(!estaEnLaBase){
            const url = Constant.BASE_URL + "/users/"
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(AuthData), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(response => console.log('Success:', response));

        }
    } */

    //const {usuario} = route.params || {usuario: ''}
/*     useEffect(() => {
        const url = Constant.BASE_URL + "/users/" + AuthData.email
        fetch(url)
        .then(response => {
            console.log("Respooonsse " + response
             )
             return (response.json())
        }) 
        .then(data => 
            {                
                console.log("DAAAAATAAAA",data)
                setEstaEnLaBase(true)
             });
    return (
        post()
    ) 
            },[]) */
   
 
        
   
     
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <StatusBar style= {'auto'}/>
                
            <View style={styles.cont}><UploadImage /></View>
            <Text style= {styles.textTitulo}>
                Username: {AuthData.username}
            </Text>
        
             <Text style= {styles.text}>
                Idioma nativo: 
                </Text > 
                <IdiomaPicker esNativo={true}/>
           <Text style= {styles.text}>
                Idioma a aprender: 
                </Text> 
                <IdiomaPicker esNativo={false} />
                
                <View style={styles.cont}>
                    <Button 
                    title="Buscar personas"
                    
                    style= {styles.buttons}
                    onPress= {() => {
                
                        navigation.navigate("Mapa") 
                    }}/>
                </View>
                <View style={{marginVertical:20}}></View>
                <View style={styles.logout}>
                    <Button title="Logout"
                    onPress= {() => {
                        setAuthData({})
                    }}/>
                </View>
                <View style={{marginVertical:20}}></View>
        </ScrollView>
        </SafeAreaView>
        
    )}

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            paddingTop: StatusBar.currentHeight
            
        },
        textTitulo:{
            textAlign:'center',
            marginVertical:20,
            fontSize:18
        },
        cont:{
            marginVertical:20,
            alignContent: 'center',
            margin:100            
        },
        logout:{
            marginVertical:10,
            alignContent: 'center',
            margin:80            
        },
        text:{
            fontSize:16,
            textAlign:'center'
        },
        buttons:{
            margin:100,
            textAlign:'center'
        },
        scrollView: {
            
            backgroundColor: 'white'
        },
    })