import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';


const WithProgress = (WrappedComponent) => {
    return (props) => {
      const [isLoading, setIsLoading] = useState(false);
      const [isOverlay, setIsOverlay] = useState(false);
  
      const showProgress = () => {
        setIsLoading(true);
      };
  
      const hideProgress = () => {
        setIsLoading(false);
      };
  
  
      return (
        <View style={styles.container}>
          <WrappedComponent
            {...props}
            showProgress={showProgress}
            hideProgress={hideProgress}
            overlayDailog={setIsOverlay}
          />
          <Modal isVisible={isLoading || isOverlay}>
            <View style={styles.modalContainer}>
              {isOverlay ? <>
                <Text style={{ color: "white", fontSize: 18 }}>You data and time not match with server</Text>
              </> : <ActivityIndicator size="large" color="#279bff" />}
  
            </View>
          </Modal>
        </View>
      );
    };
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default WithProgress