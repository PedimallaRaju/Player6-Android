import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Close, EditProfiles, HIcons, HowToPlayMenu, Kyc, Logo, NextArrow, PowerOff, PrivacyPolicy, Refund, TermsCondition } from '../../../assets';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import UserStore from '../../stores/UserStore';
import Functions from '../Functions';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 





const CustomDrawer = () => {
  const navigation = useNavigation();

  

  const renderMenu = (menuIcon, menuName, navigateTo, isLogout = false) => {
    const moveToNext = () => {
      if (isLogout) {
        Functions.getInstance().fireAdjustEvent("jxnnvl");
        Functions.getInstance().fireFirebaseEvent("Logout");
        ReactMoE.logout();
        logout()
        return;
      }
      if (navigateTo) {
        if(navigateTo == "EditProfile"){ 
          Functions.getInstance().fireAdjustEvent("qb67bn");
          Functions.getInstance().fireFirebaseEvent("EditProfileSideMenu");
          let properties = new MoEProperties();
          properties.addAttribute("Edit Profile", true);
          ReactMoE.trackEvent("Menu", properties);
        }
        if(navigateTo == "Privacy"){ 
          let properties = new MoEProperties();
          properties.addAttribute("How To Play", true);
          ReactMoE.trackEvent("Menu", properties);
        }
        if(navigateTo == "TermsAndCondition"){ 
          let properties = new MoEProperties();
          properties.addAttribute("FAQs", true);
          ReactMoE.trackEvent("Menu", properties);
        }
        navigation.navigate(navigateTo)
      }
    }

    const logout = async () => {
      await AsyncStorage.clear();
      // const resetAction = CommonActions.reset({
      //   index: 0,
      //   routes: [{ name: 'Login' }],
      // });
      // navigation?.dispatch(resetAction);
      navigation.dispatch(DrawerActions.closeDrawer());
      navigation.navigate("Login")
    }

    return (
      <TouchableOpacity onPress={() => moveToNext()}>
        <View style={{ marginTop: 12, flexDirection: 'row' }}>
          <View style={{ backgroundColor: '#282828', borderRadius: 5, padding: 4 }}>
            <Image
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
              source={menuIcon}
            />
          </View>
          <Text style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Poppins-SemiBold', marginLeft: 5, alignSelf: 'center'
          }}>{menuName}</Text>
          <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
            <Image
              style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}
              source={NextArrow}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#383838',
      }}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Image
              style={{ width: 15, height: 15 }}
              source={Close}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }} >
          <View style={{ alignSelf: 'center' }} >
            <Image
              style={{ width: 60, height: 60, resizeMode: 'contain', }}
              source={Logo}
            />
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={HIcons}
            />
          </View>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#4d4d4d' }} />
        <View style={{ marginVertical: 20 }}>
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
          }}>
            Menu
          </Text>
          {renderMenu(EditProfiles, 'Edit Profile', 'EditProfile')}
          {/* {renderMenu(Kyc, 'KYC', 'KYC')} */}
          {/* {renderMenu(TermsCondition, 'Terms & Condition', 'TermsAndCondition')}
          {renderMenu(PrivacyPolicy, 'Privacy Policy', 'Privacy' )}
          {renderMenu(TermsCondition, 'Game Rules', 'GameRulesData')}
          {renderMenu(Refund, 'Refund Policy', 'RefundData')} */}
          {renderMenu(HowToPlayMenu, 'How To Play', 'Privacy')}
          {renderMenu(TermsCondition, 'FAQs', 'TermsAndCondition')}
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#4d4d4d' }} />
        <View style={{ marginVertical: 50 }}>
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
          }}>
            Other
          </Text>
          {renderMenu(PowerOff, 'Logout', null, true)}
        </View>
        <Text style={{
            color: '#fff',
            fontSize: 12,
            fontFamily: 'Poppins-SemiBold',
          }}>Version 1.0.4</Text>
      </View>
    </View>
  );
};
export default CustomDrawer;
