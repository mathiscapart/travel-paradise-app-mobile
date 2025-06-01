import {Image} from "expo-image"
import {StyleSheet} from "react-native";

function Logo(){
    const styles = StyleSheet.create({
        logo:{
            height: 50,
            width: "40%",
            resizeMode: 'contain'
        }
    })
    return(
        <Image
            style={styles.logo}
            onError={() => console.log('Image failed to load')}
            source={require('@/assets/images/logo-travel.png')}
        />
    )
}

export default Logo;
