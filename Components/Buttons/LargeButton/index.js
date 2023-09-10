import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Colors from '../../../assets/colors/colors'
import { useFonts } from "expo-font";



export const LargeButton = ({title}) => {
      const [fontsLoaded] = useFonts({
    "Raleway-SemiBold": require("../../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.customButton}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        marginBottom:20,
        backgroundColor: Colors.Blue,
        borderRadius:5
      },
      customButton: {
        textAlign:'center',
        fontSize: 18,
        color: Colors.Black,
        padding: 10,
        width:150,
        height:40,
        fontFamily: 'Raleway-SemiBold',
      },
})
