// import AsyncStorage from '@react-native-community/async-storage';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const SocketContext = createContext();

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     checkSocket();
//   }, []);


//   const checkSocket = async () =>{
//     const userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
//     const newSocket = io(`https://www.xhtmlreviews.com/api-player6/1.0/auth/User/${userInfo.userId}/watchEvents`);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };




import React, { createContext, useContext } from 'react';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ socket, children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};