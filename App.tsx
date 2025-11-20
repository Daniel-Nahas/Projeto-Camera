import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

const [status, setStatus] = useState<string>('');
const [imageUri, setImageUri] = useState<string | null> (null);

async function abrirCamera() {
  try{
    setStatus("Pedindo permissão...");

    const{status} = await ImagePicker.requestCameraPermissionsAsync();

    if(status !== 'granted'){
      setStatus("Permissão negada! assim não pode usar a câmera!");
      return;
    }

    setStatus("Abrindo a câmera...");

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality:1
    })

    if(result.canceled){
      setStatus("Câmera cancelada!");
    } else{
      const foto = result.assets[0];
      setImageUri(foto.uri);
      setStatus("Imagem capturada");
    }

  }catch(error){
    setStatus("Erro ao abrir");
  }
  
}


  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Câmera</Text>
      
      <TouchableOpacity style={styles.btn}>
        <Text  style={styles.txtBtn}>Abrir câmera</Text>  
      </TouchableOpacity>

      <Text>{status}</Text>

      {
        imageUri ?(
          <Image source={{uri:imageUri}} resizeMode='cover' style={styles.imagem}/>
        ):(
            <Text>Nenhuma foto capturada</Text>
        )

      }

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
  titulo:{},
  btn:{},
  txtBtn:{},
  imagem:{},
});
