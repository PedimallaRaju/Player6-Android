import { View, Text, BackHandler, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { AboutUs, FAQs, HowToPlay, InfoAboutUs, InfoCommunityProtocal, InfoContactUs, InfoGameRules, InfoLegalites, InfoPrivacyPolicy, InfoRefundPolicy, InfoResponsibleGaming, InfoTutorialVideo, Logo, NextArrow } from '../../../assets';
import { useFocusEffect } from '@react-navigation/native';
import Functions from '../Functions';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";   



const Instructions = ({navigation}) => {





  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('CricketLeague');
        return true;
      });

      return () => {
        backHandler.remove();
      };
    }, [])
  );






  return (
    <View style={{flex: 1,backgroundColor:'black'}}>
      <ScrollView>
        <TouchableOpacity onPress={()=>{
            let properties = new MoEProperties();
            properties.addAttribute("About Us", true);
            ReactMoE.trackEvent("Info", properties);
            navigation.navigate("InfoDetails",{Infotype: "AboutUs"});
            }}>
          <View  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:20, marginLeft : 20,marginRight:20}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View>
                <Image source={InfoAboutUs} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
              </View>
                <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>About Us</Text>
            </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{
            let properties = new MoEProperties();
            properties.addAttribute("Contact Us", true);
            ReactMoE.trackEvent("Info", properties);
            navigation.navigate("InfoDetails",{Infotype: "ContactUs"})
          }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={InfoContactUs} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                </View>
                    <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Contact Us</Text>
              </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
            </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={()=>{
            let properties = new MoEProperties();
            properties.addAttribute("How To Play", true);
            ReactMoE.trackEvent("Info", properties);
            navigation.navigate("InfoDetails",{Infotype: "HowtoPlay"})
          }}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
              <View>
                <Image source={HowToPlay} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
              </View>
                <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>How to Play</Text>
            </View>
            <View>
              <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
            </View>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{
            let properties = new MoEProperties();
            properties.addAttribute("Entry Fee", true);
            ReactMoE.trackEvent("Info", properties);
            navigation.navigate("InfoDetails",{Infotype: "EntryFee"})

            }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={InfoRefundPolicy} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                </View>
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Entry Fee</Text>
              </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
            </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{
            let properties = new MoEProperties();
            properties.addAttribute("Tutorial Videos", true);
            ReactMoE.trackEvent("Info", properties);
            navigation.navigate("InfoDetails",{Infotype: "TutorialVideos"})
          }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={InfoTutorialVideo} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                </View>
                    <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Tutorial Videos</Text>
              </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
            </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{
          let properties = new MoEProperties();
          properties.addAttribute("FAQs", true);
          ReactMoE.trackEvent("Info", properties);
          navigation.navigate("InfoDetails",{Infotype: "FAQs"})
          }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={FAQs} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                </View>
                
                  <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>FAQs</Text>
              </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
            </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={()=>{
                  Functions.getInstance().fireAdjustEvent("e9b9nr");
                  Functions.getInstance().fireFirebaseEvent("TermsAndConditions");
                  let properties = new MoEProperties();
                  properties.addAttribute("Terms and Conditions", true);
                  ReactMoE.trackEvent("Info", properties);
                  navigation.navigate("InfoDetails",{Infotype: "TermsandConditions"});
                  }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={AboutUs} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                </View>
                    <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Terms and Conditions</Text>
              </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
            </View>
        </TouchableOpacity>





        <TouchableOpacity onPress={()=>{
                Functions.getInstance().fireAdjustEvent("rpfgmf");
                Functions.getInstance().fireFirebaseEvent("PrivacyPolicy");
                let properties = new MoEProperties();
                properties.addAttribute("Privacy Policy", true);
                ReactMoE.trackEvent("Info", properties);
                navigation.navigate("InfoDetails",{Infotype: "PrivacyPolicy"});
                }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={InfoPrivacyPolicy} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                </View>
                    <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Privacy Policy</Text>
              </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
            </View>
        </TouchableOpacity>





        <TouchableOpacity onPress={()=>{
          let properties = new MoEProperties();
          properties.addAttribute("Community Protocols", true);
          ReactMoE.trackEvent("Info", properties);
          navigation.navigate("InfoDetails",{Infotype: "CommunityProtocols"})
          }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                  <Image source={InfoCommunityProtocal} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                </View>
                
                    <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Community Protocols</Text>
              </View>
              <View>
                <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
              </View>
            </View>
          </TouchableOpacity>





          <TouchableOpacity onPress={()=>{
            let properties = new MoEProperties();
            properties.addAttribute("Legalities", true);
            ReactMoE.trackEvent("Info", properties);
            navigation.navigate("InfoDetails",{Infotype: "Legalities"})
            }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View>
                      <Image source={InfoLegalites} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                    </View>
                    
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Legalities</Text>
                  </View>
                  <View>
                    <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
                  </View>
                </View>
            </TouchableOpacity>




            <TouchableOpacity onPress={()=>{
                  Functions.getInstance().fireAdjustEvent("1uavcj");
                  Functions.getInstance().fireFirebaseEvent("RefundPolicy");
                  let properties = new MoEProperties();
                  properties.addAttribute("Refund Policy", true);
                  ReactMoE.trackEvent("Info", properties);
                  navigation.navigate("InfoDetails",{Infotype: "RefundPolicy"});
                }}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <View>
                        <Image source={InfoRefundPolicy} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                      </View>
                          <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Refund Policy</Text>
                    </View>
                    <View>
                      <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
                    </View>
                  </View>
            </TouchableOpacity>







            <TouchableOpacity onPress={()=>{
                Functions.getInstance().fireAdjustEvent("durp75");
                Functions.getInstance().fireFirebaseEvent("GameRules");
                let properties = new MoEProperties();
                properties.addAttribute("Game Rules", true);
                ReactMoE.trackEvent("Info", properties);
                navigation.navigate("InfoDetails",{Infotype: "GameRules"});
                }}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <View>
                        <Image source={InfoGameRules} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                      </View>

                          <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Game Rules</Text>
                    </View>
                    <View>
                      <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
                    </View>
                  </View>
            </TouchableOpacity>

        



            <TouchableOpacity onPress={()=>{
              let properties = new MoEProperties();
              properties.addAttribute("Responsible", true);
              ReactMoE.trackEvent("Info", properties);
              navigation.navigate("InfoDetails",{Infotype: "Responsible"})
              }}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,paddingTop:10,marginLeft : 20,marginRight:20}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View>
                    <Image source={InfoResponsibleGaming} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
                  </View>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,paddingLeft:15}}>Responsible Gaming</Text>
                </View>
                <View>
                  <Image source={NextArrow} style={{ width: 10, height: 10, resizeMode: 'contain', alignContent: 'flex-start' }}/>
                </View>
              </View>
            </TouchableOpacity>





        










      </ScrollView>
    </View>
  )
}

export default Instructions