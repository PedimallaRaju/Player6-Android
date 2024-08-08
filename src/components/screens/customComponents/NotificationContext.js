import React, { useContext } from 'react';
import Toast, { ToastShowParams } from 'react-native-toast-message';

const NotificationContext = React.createContext({
  open: (data) => {},
  close: () => {},
});

export const NotificationProvider = ({ children }) => {
  const contextValue = {
    open(data) {
      Toast.show({
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
        ...data,
      });
    },
    close() {
      Toast.hide();
    },
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
