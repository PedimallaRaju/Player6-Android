import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { styles } from './CustomTextInput.styles';

const CustomTextInput = ({ placeholder, keyboardType, onChangeText, value, error, onBlur }) => {
    const handleBlur = () => {
      if (onBlur) {
        onBlur();
      }
    };
  
    return (
      <>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={styles.inputs}
        placeholderTextColor="#fff"
        onChangeText={onChangeText}
        value={value}
        onBlur={handleBlur}
        autoComplete='off'
        autoCapitalize='none'
      />
      {error ? <Text style={styles.errorInputs}>{error}</Text> : null}
      </>
    );
  };
  export default CustomTextInput;