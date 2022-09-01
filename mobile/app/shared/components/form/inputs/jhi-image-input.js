import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
/* eslint-disable react-native/no-inline-styles */

export default React.forwardRef((props, ref) => {
  const { label, labelStyle, error, onChange, inputType, contentType, value, testID, ...otherProps } = props;

  const [photo, setPhoto] = React.useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          // eslint-disable-next-line no-alert
          alert('Sorry, Camera roll permissions are required to make this work!');
        }
      }
    })();
  }, []);

  const choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      const newValue = result.uri.substring(result.uri.indexOf('base64,') + 7);
      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      {/* if there's a label, render it */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Button title="Choose Photo" onPress={choosePhoto} />
      {/* render the base64 image or plain image input */}
      {value ? (
        <Image
          ref={ref}
          style={[styles.imageSize, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]}
          source={{ uri: inputType === 'image-base64' ? `data:${contentType};base64,${value}` : value }}
        />
      ) : (
        <></>
      )}
      {/* if there's an error, render it */}
      {!!error && !!error.message && <Text style={styles.textError}>{error && error.message}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  imageSize: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  container: {
    marginVertical: 8,
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});
