import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Pressable, Text, View } from 'react-native';
import { History, Info, Logo, TeamsFile, Wallet } from '../../../assets';
import { CommonHeader } from './AppHeader';
import { styles } from './Route.styles';
import CricketLeague from '../cricketLeague/CricketLeague';
import { MyTeamSelectionRoutes } from '../../../routes/MyTeamRoute';
import { WalletRoutes } from '../../../routes/WalletRoutes';
import Instructions from '../info/Instructions';
import { HistoryRoutes } from '../../../routes/HistoryRoutes';
import ChooseContest from '../cricketLeague/ChooseContest';
import { HomeStackStack } from '../../../routes/HomeStackRoutes';
import { useEffect, useState } from 'react';
import Functions from '../Functions';
import { InfoRoutes } from '../../../routes/InfoRoutes';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 


const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: 'green',
        tabBarActiveTintColor: 'red',
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomContainer,
      }}>
      <Tab.Screen
        name="MyGames"
        component={MyTeamSelectionRoutes}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            Functions.getInstance().fireAdjustEvent("78py9d");
            Functions.getInstance().fireFirebaseEvent("MyGames");
            let properties = new MoEProperties();
            properties.addAttribute("My Games", true);
            ReactMoE.trackEvent("My Games", properties);
            navigation.reset({index:0,routes:[{name:'CricketLeague'}]})
            navigation.reset({index:0,routes:[{name:'Wallet'}]})
            navigation.navigate('BettingAddMoney')
        },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.screenViewContainer,
                { backgroundColor: focused ? '#434343' : '#383838' },
              ]}>
              <Image
                style={[
                  styles.myGamesIcon,
                  {
                    tintColor: focused ? '#279bff' : '#fff',
                  },
                ]}
                source={TeamsFile}
              />
              <Text style={styles.bottomNavText}>My Games</Text>
              <View
                style={[
                  styles.bottomViewBottom,
                  { backgroundColor: focused ? '#279bff' : '#383838' },
                ]}></View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletRoutes}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            Functions.getInstance().fireAdjustEvent("2buqen");
            Functions.getInstance().fireFirebaseEvent("Wallet");
            let properties = new MoEProperties();
            properties.addAttribute("Wallet", true);
            ReactMoE.trackEvent("Wallet", properties);
            navigation.reset({index:0,routes:[{name:'Wallet'}]})
            navigation.navigate('Wallet')
        },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.screenViewContainer,
                { backgroundColor: focused ? '#434343' : '#383838' },
              ]}>
              <Image
                style={[
                  styles.walletImage,
                  {
                    tintColor: focused ? '#279bff' : '#fff',
                  },
                ]}
                source={Wallet}
              />
              <Text style={styles.bottomNavText}>Wallet</Text>
              <View
                style={[
                  styles.bottomViewBottom,
                  { backgroundColor: focused ? '#279bff' : '#383838' },
                ]}></View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MainHome"
        component={HomeStackStack}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            Functions.getInstance().fireAdjustEvent("7ujj31");
            Functions.getInstance().fireFirebaseEvent("HomeLogo");
            let properties = new MoEProperties();
            properties.addAttribute("Home Page P6 ICON", true);
            ReactMoE.trackEvent("Home Page P6 Icon", properties);
            navigation.reset({index:0,routes:[{name:'CricketLeague'}]})
            navigation.reset({index:0,routes:[{name:'Wallet'}]})
            navigation.navigate('CricketLeague')
        },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
                <View style={[styles.iconView]}>
                  <Image 
                    style={styles.iconImageStyle} 
                    source={Logo} 
                    />
                </View>
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoRoutes}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            Functions.getInstance().fireAdjustEvent("1dintg");
            Functions.getInstance().fireFirebaseEvent("Info");
            let properties = new MoEProperties();
            properties.addAttribute("Info", true);
            ReactMoE.trackEvent("Info", properties);
            navigation.reset({index:0,routes:[{name:'CricketLeague'}]})
            navigation.reset({index:0,routes:[{name:'Wallet'}]})
            navigation.navigate('Instructions')
        },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.screenViewContainer,
                { backgroundColor: focused ? '#434343' : '#383838' },
              ]}>
              <Image
                style={[
                  styles.draftImage,
                  {
                    tintColor: focused ? '#279bff' : '#fff',
                  },
                ]}
                source={Info}
              />
              <Text style={styles.bottomNavText}>Info</Text>
              <View
                style={[
                  styles.bottomViewBottom,
                  { backgroundColor: focused ? '#279bff' : '#383838' },
                ]}></View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryRoutes}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            Functions.getInstance().fireAdjustEvent("4bcdup");
            Functions.getInstance().fireFirebaseEvent("History");
            let properties = new MoEProperties();
            properties.addAttribute("History", true);
            ReactMoE.trackEvent("History", properties);
            navigation.reset({index:0,routes:[{name:'CricketLeague'}]})
            navigation.reset({index:0,routes:[{name:'Wallet'}]})
            navigation.navigate('TotalResult')
        },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.screenViewContainer,
                { backgroundColor: focused ? '#434343' : '#383838' },
              ]}>
              <Image
                style={[
                  styles.historyImage,
                  {
                    tintColor: focused ? '#279bff' : '#fff',
                  },
                ]}
                source={History}
              />
              <Text style={styles.bottomNavText}>History</Text>
              <View
                style={[
                  styles.bottomViewBottom,
                  { backgroundColor: focused ? '#279bff' : '#383838' },
                ]}></View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    
  );
};



export default BottomNavigation;
