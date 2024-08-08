import { View, Text, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from './CustomOtpInput.styles';

const CustomOtpInput = ({onInputChange, otpValues, verifyType}) => {
    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null);
    const fourthInputRef = useRef(null);

    const fifthInputRef = useRef(null);
    const sixthInputRef = useRef(null);
  
    const [inputValues, setInputValues] = useState(['', '', '', '','','']);
  
    const handleInputChange = (index, value) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);
  
      // Send the input values to the parent component using the prop
      onInputChange(newInputValues);
      if(verifyType == "Adhar" && index === 5){
        sixthInputRef.current?.blur();
      }
      else if (verifyType == "Adhar" && index === 3) {
        fifthInputRef.current?.focus();
      }
      else if(index === 3){
        fourthInputRef.current?.blur();
      }
    }

  
    return (
      <View style={styles.otpinput}>
        <TextInput
          ref={firstInputRef}
          style={styles.inputnum}
          maxLength={1}
          importantForAutofill='no'
          autoComplete="off"
          keyboardType="numeric"
          value={otpValues[0]}
          onChangeText={text => {
            handleInputChange(0, text);
            if (text.length === 1) {
              secondInputRef.current?.focus();
            }
          }}
          onFocus={() => {
            firstInputRef.current?.clear();
          }}
        />



        <TextInput
          ref={secondInputRef}
          style={styles.inputnum}
          maxLength={1}
          value={otpValues[1]}
          keyboardType="numeric"
          importantForAutofill='no'
          autoComplete="off"
          onChangeText={text => {
            handleInputChange(1, text);
            if (text.length === 1) {
              thirdInputRef.current?.focus();
            }
          }}
          onFocus={() => {
            secondInputRef.current?.clear();
          }}
        />
        <TextInput
          ref={thirdInputRef}
          style={styles.inputnum}
          maxLength={1}
          value={otpValues[2]}
          keyboardType="numeric"
          importantForAutofill='no'
          autoComplete="off"
          onChangeText={text => {
            handleInputChange(2, text);
            if (text.length === 1) {
              fourthInputRef.current?.focus();
            }
          }}
          onFocus={() => {
            thirdInputRef.current?.clear();
          }}
        />
        <TextInput
          ref={fourthInputRef}
          style={styles.inputnum}
          maxLength={1}
          value={otpValues[3]}
          keyboardType="numeric"
          importantForAutofill='no'
          autoComplete="off"
          onChangeText={text => {
            handleInputChange(3, text);
          }}
          onFocus={() => {
            fourthInputRef.current?.clear();
          }}
        />


        {verifyType == "Adhar" ? 
                <TextInput
                  ref={fifthInputRef}
                  style={styles.inputnum}
                  maxLength={1}
                  value={otpValues[4]}
                  keyboardType="numeric"
                  importantForAutofill='no'
                  autoComplete="off"
                  onChangeText={text => {
                    handleInputChange(4, text);
                    if (text.length === 1) {
                      sixthInputRef.current?.focus();
                    }
                  }}
                  onFocus={() => {
                    fifthInputRef.current?.clear();
                  }}
                />
                
        : ""}

        {verifyType == "Adhar" ?  
              <TextInput
                ref={sixthInputRef}
                style={styles.inputnum}
                maxLength={1}
                value={otpValues[5]}
                keyboardType="numeric"
                importantForAutofill='no'
                autoComplete="off"
                onChangeText={text => {
                  handleInputChange(5, text);
                }}
                onFocus={() => {
                  sixthInputRef.current?.clear();
                }}
             />
        : ""}
        


      </View>
    );
  };

export default CustomOtpInput