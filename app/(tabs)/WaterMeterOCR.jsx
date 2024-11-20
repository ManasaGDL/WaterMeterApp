// import React, { useState, useEffect } from 'react';
// import { View, Button, Image, Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

// const WaterMeterOCR = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [ocrResult, setOcrResult] = useState('');

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera permissions to make this work!');
//       }
//     })();
//   }, []);

//   const selectImage = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.uri);
//       performOCR(result.uri);
//     }
//   };

//   const performOCR = async (imagePath) => {
//     try {
//       if (TesseractOcr) {
//         const result = await TesseractOcr.recognize(imagePath, LANG_ENGLISH, {
//           whitelist: '0123456789',
//         });
//         setOcrResult(result);
//       } else {
//         console.error('TesseractOcr is not initialized');
//       }
//     } catch (error) {
//       console.error('Error performing OCR:', error);
//     }
//   };

//   return (
//     <View>
//       <Button title="Scan Image" onPress={selectImage} />
//       {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
//       <Text>OCR Result: {ocrResult}</Text>
//     </View>
//   );
// };

// export default WaterMeterOCR;

import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Tesseract from 'tesseract.js';

const WaterMeterOCR = () => {
  const [imageUri, setImageUri] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      performOCR(result.uri);
    }
  };

  const performOCR = async (imagePath) => {
    try {
      const result = await Tesseract.recognize(
        imagePath,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      );
      setOcrResult(result.data.text);
    } catch (error) {
      console.error('Error performing OCR:', error);
    }
  };

  return (
    <View>
      <Button title="Scan Image" onPress={selectImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Text>OCR Result: {ocrResult}</Text>
    </View>
  );
};

export default WaterMeterOCR;