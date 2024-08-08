import { View, Text, BackHandler, ScrollView, KeyboardAvoidingView, ImageBackground, Image, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { secondary } from '../../../style';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CustomTextInput from '../customComponents/CustomTextInput';
import CustomButton from '../customComponents/CustomButton';
import WithProgress from '../LoadingOverlay/WithProgress';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Services from '../../../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import Functions from '../Functions';
import { DataTable } from 'react-native-paper'; 
import { TableBG, TableFee, TableRect } from '../../../assets';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Icon} from 'react-native-elements';



let userInfo;
const InfoDetails = ({navigation,route,showProgress,hideProgress}) => {
    const [show, setShow] = useState(route.params.Infotype);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const [playing, setPlaying] = useState(false);
    const [isMute, setMute] = useState(false);
    const controlRef = useRef();




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        getData();
    })
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    })
    return ()=>{
      unsubscribe();
      backHandler.remove();
    };
  }, [show]);




  const getData = async() =>{
    showProgress();
    userInfo = JSON.parse(await AsyncStorage.getItem("player6-userdata"));
    hideProgress();
  }




  const contactSupportTeam = () =>{
    if(message == ""){
        setErrorMessage("Please Enter Message");
    }
    else{
        setErrorMessage("");
        showProgress();
        const obj = {
            message : message
        }
        Services.getInstance().contactSupportTeam(obj, userInfo.userId, userInfo.accesToken).then((result)=>{
            if(result.status == 200){
                setMessage("");
               Functions.getInstance().Toast("success", "Thank you for your feedback. Our support team will be reaching out to you soon.");
            }
            else{
                Functions.getInstance().Toast("error", "Unable to submit the feedback now, Please try again later");
            }
            hideProgress();
        })
    }

  }


  const onStateChange = (state) => {
        if (state === 'ended') {
          setPlaying(false);
          Alert.alert('video has finished playing!');
        }
        if (state !== 'playing') {
          setPlaying(false);
        }
      };
      const togglePlaying = () => {
        setPlaying((prev) => !prev);
      };
      const seekBackAndForth = (control) => {
        console.log('currentTime');
        controlRef.current?.getCurrentTime().then((currentTime) => {
          control === 'forward'
            ? controlRef.current?.seekTo(currentTime + 15, true)
            : controlRef.current?.seekTo(currentTime - 15, true);
        });
      };
      const muteVideo = () => setMute(!isMute);
      const ControlIcon = ({name, onPress}) => (
        <Icon onPress={onPress} name={name} size={40} color="#fff" />
      );


  return !route ? null :  (
    <View style={{flex: 1,backgroundColor:'black'}}>
        {
            show == "AboutUs" ?
            <ScrollView>
                <View style={{marginRight:10,marginLeft:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                        <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 20}}>About Us</Text>
                        <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : 'italic'}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Who are we?</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Player6 is more than a fantasy cricket platform it's a passionate community connecting global cricket enthusiasts. Our mission is to deliver an immersive gaming adventure, blending the thrill of cricket with strategic fantasy gameplay.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>What drives us?</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Founded by ardent cricket aficionados, Player6 aims to share the love for the game globally, transcending geographical confines and creating a profound shared experience.</Text>
                    </View>
            
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Why Player6?</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Beyond fantasy cricket, Player6 stands as a unique community with a deep reverence for the sport, offering an engaging platform that authentically captures the spirit of cricket.</Text>
                    </View>
            
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>What sets us apart?</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Player6 takes pride in innovation, ensuring real-time engagement, emphasising skill and strategy, and upholding fairness and transparency.</Text>
                    </View>
            
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Real-Time Engagement:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Actively participate in live cricket action, making real-time decisions for an engaging experience.</Text>
                    </View>
            
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Skill and Strategy: </Text>
                        <Text style={{color:'grey', fontSize : 12}}>Recognizing and rewarding cricketing expertise, making it more than just a game of chance.</Text>
                    </View>
            
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Fair and Transparent:</Text>
                        <Text style={{color:'grey', fontSize :12}}>Financial framework upholds fairness with an 8% deduction from winnings, ensuring equity in every game.</Text>
                    </View>
            
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Who is Player6 for?</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Catering to all cricket enthusiasts, from casual admirers to dedicated aficionados, Player6 provides a platform for friendly rivalries and connections.</Text>
                    </View>
            
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Our Vision:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>To establish Player6 as the ultimate global destination for cricket enthusiasts, redefining how people engage with the sport through skill, strategy, and collective passion.</Text>
                    </View>
            
                    <View style={{marginTop:10, marginBottom : 100}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Join us today:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Register now to experience cricket in a novel way. Player6 – Where Cricket Comes to Life!</Text>
                    </View>
               </View>
            </ScrollView>
            :
            ""
        }

        {
            show == "HowtoPlay" ?         
            <ScrollView>
                <View style={{marginRight:10,marginLeft:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                        <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 20}}>How to Play</Text>
                        <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : 'italic'}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Sign up & Verify:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Sign up on our platform and verify your address using Aadhar.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Choose a Fixture:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Explore upcoming cricket matches and select the one that excites you.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Select Contest Tier:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Choose your engagement level for the match: 1, 5, 10, or 20 rupees contests.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Waiting Room:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Join a room where you'll be matched with a random user for the chosen contest.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Game Room:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Move into the "Game Room" after finding an opponent. Initiate the toss prediction for kickstarting the challenge. If your toss prediction is correct you will get the first pick in live player selection</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Draft Selection: </Text>
                        <Text style={{color:'grey', fontSize : 12}}>Before live player selection, make your draft by choosing 12 players from both teams' squads. After selecting the draft, you need to arrange the players in sequence before saving. If you are unavailable during live player selection, your Player6 team will be auto picked from your draft</Text>
                    </View>
                    {/* <View style={{marginLeft : 10,marginRight : 10,marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Fair and Transparent:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginBottom : 10}}> Financial framework upholds fairness with an 8% deduction from
                        winnings, ensuring equity in every game.
                        </Text>
                    </View> */}
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Live Player Selection:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Live player selections happen only between the toss and the match start after the playing 11s are out. Here you have to select 6 players alternatively with your opponent and the same player cannot be selected. If you cannot pick a player before the timer runs out then the player will be auto assigned from your draft.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Captain & Vice-Captain:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Strategically pick a captain (2x runs) and vice-captain (1.5x runs) before the timer runs out to optimize your chances of victory.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Point System:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Only runs made by the selected players will be counted. No points are given for catches or wickets hence it is advised to pick only batters in your team.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Scorecard:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Track how your players are performing in the live match here. You can access it from My Games section</Text>
                    </View>
                    <View style={{marginTop:10, marginBottom : 100}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Winner Declaration:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Whichever team scores more runs at the end of the match wins. The winning amount is calculated by multiplying the contest with the run difference between both teams. But your Winnings or Loss cannot exceed the entry fees.Winnings/Loss = (Contest)*(Run difference)</Text>
                    </View>
                </View>
            </ScrollView>
            :
            ""
        }

        {
            show == "FAQs" ? 
            <ScrollView>
                <View style={{marginLeft:10,marginRight:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                        <Text style={{color:secondary,fontWeight:'bold',fontSize : 20}}>FAQs</Text>
                        <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : 'italic'}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>1. How does Player6 ensure a fair gaming experience?</Text>
                      <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text>Player6 combines fantasy cricket and gaming, striking a balance between skilland chance. While luck can play a role, the game predominantly relies on skillful player selection, real-time decision-making, and strategic thinking.</Text>
                    </View>
                    <View style={{marginTop:7}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>2. Can you explain the calculation of the margin of victory?</Text>
                      <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text>The margin of victory in Player6 is determined by the run difference between the two Player6 squads in a live match. This difference is then multiplied by the contest selected.Margin of victory = Run difference x Contest (Up to the entry fees)</Text>
                    </View>
                    <View style={{marginTop:7}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>3. What happens if I miss live player selection?</Text>
                      <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text>If a participant misses live player selection, the draft system acts as as backup allowing the team-building process to continue seamlessly as per schedule.This ensures that every player, regardless of their opponents circumstances, will experience smooth participation in the dynamic Player6 gaming experience.</Text>
                    </View>
                   <View style={{marginTop:7}}>
                     <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>4. What is the significance of the draft selection process in Player6?</Text>
                     <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text>Draft selection is a crucial step where you build your backup team by choosing players from both teams' squads.  It serves as a primer for making strategic decisions based on historical player performances,  helping you make calculated choices for the match's live player selection.  After selecting your draft you need to sequence your selected 12 players and your players will be auto assigned in the same order if you are not available for live player selection.</Text>
                   </View>
                   <View style={{marginTop:7}}>
                     <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>5. Why is modifying the draft necessary in Player6?</Text>
                     <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text>Draft modification refines your ability to predict correct selections during live player selection. You need to update your draft since 12 players will be auto assigned to you as soon as you join a game room</Text>
                   </View>
                   <View style={{marginTop:7}}>
                     <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>6. How does Player6 help in making informed draft selections?</Text>
                     <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text> Player6 aids in making informed draft selections by providing High Score (HS) and Average (Avg) next to player names. This allows you to sort players in ascending or descending order based on their recent performances in the respective format, facilitating a more calculated decision-making process during the draft.</Text>
                   </View>
                   <View style={{marginTop:7}}>
                     <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>7. What happens if a participant doesn't show up for live player selection?</Text>
                     <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text>If a player doesn't show up for live player selection, the draft team comes into play as insurance. This system ensures that the team-building process can continue even if one participant is unavailable during the Live player selection window.</Text>
                   </View>
                    <View style={{marginTop:7}}>
                     <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>8. How is the financial model structured on Player6?</Text>
                     <Text style={{color:'grey', fontSize : 12}}><Text style={{fontWeight:'bold'}}>Answer:</Text>Player6's financial model prioritizes fairness and transparency. In each game room, an 8% cut from the winnings is deducted, transferring it from the losing side to the winning side. This approach maintains equity, ensuring both squad building and player stats contribute to determining winners and losers</Text>
                    </View>
                    <View style={{marginTop:7}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>9. Is there a limit to the number of contests I can enter simultaneously for a fixture?</Text>
                      <Text style={{color:'grey', fontSize : 11}}><Text style={{fontWeight:'bold'}}>Answer:</Text>Yes, each player can enter a maximum of four contests for a fixture. The contests are available at different entry fee levels, providing players with a range of options to match their preferences and budget.</Text>
                    </View>
                    <View style={{marginTop:7}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>10. What payment methods are accepted for contest entry fees?</Text>
                      <Text style={{color:'grey', fontSize : 11}}><Text style={{fontWeight:'bold'}}>Answer:</Text>Player6 accepts payments through multiple channels, including credit/debit cards, net banking, and digital wallets, providing convenient options for users to participate in contests.</Text>
                    </View>
                    <View style={{marginTop:7}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>11. Can I change my fantasy team after live player selection?</Text>
                      <Text style={{color:'grey', fontSize : 11}}><Text style={{fontWeight:'bold'}}>Answer:</Text>Once live player selection is completed, changes to your fantasy team are not allowed. This policy ensures fairness and maintains the integrity of the gaming experiencefor all participants.</Text>
                    </View>
                    <View style={{marginTop:7}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>12. How is the matchmaking done in the Waiting Room?</Text>
                      <Text style={{color:'grey', fontSize : 11}}><Text style={{fontWeight:'bold'}}>Answer:</Text>The Waiting Room uses a matchmaking algorithm to pair players looking for the same contest tier and fixture.</Text>
                    </View>
                    <View style={{marginTop:7}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>13. Who gets to call the toss?</Text>
                     <Text style={{color:'grey', fontSize : 11}}><Text style={{fontWeight:'bold'}}>Answer:</Text>The Player who initiated gameroom creation always teceives the provision to call the toss after an oppenent has been matched and a game room has been made.</Text>
                   </View>
                   <View style={{marginTop:7}}>
                     <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>14. What happens if I dont select the toss?</Text>
                     <Text style={{color:'grey', fontSize : 11}}><Text style={{fontWeight:'bold'}}>Answer:</Text>If you fail to select then your opponent automatically wins the toss and will get first pick in live player selection.</Text>
                   </View>
                    <View style={{marginBottom:100,marginTop:7}}>
                     <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>15. What information is required for the KYC process after registration?</Text>
                     <Text style={{color:'grey', fontSize : 11}}><Text style={{fontWeight:'bold'}}>Answer:</Text>After registration, we verify your address using the Aadhar. This step is crucial for security purposes since different states have different rules regarding fantasy gaming in India. You need to verify your PAN and bank details before you make a withdrawal.</Text>
                   </View>
                </View>
            </ScrollView>
            :
            ""
        }


        {
            show == "Responsible" ?         
            <ScrollView>
                <View style={{marginRight:10,marginLeft:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                        <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Responsible Gaming</Text>
                        <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>Welcome to Player6, where we value your gaming experience and promote responsible play. As part of our commitment to responsible gaming, we encourage users to follow guidelines outlined in the Player6 Responsible Gaming guide.</Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>At Player6, we ensure your gaming journey is fun, entertaining, safe, secure, and responsible. Our Responsible Gaming Policy is designed to provide you with guidelines for a positive gaming experience.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Responsible Gaming Policy For Fantasy</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>Our fantasy gaming services are skill-based activities and not a steady source of revenue.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>1. Keep track of time and money spent; if it impacts you personally or financially, consider quitting.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2. Play with a cheerful attitude and avoid chasing losses.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>3. Refrain from asking for money to play.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>4. Consult with family and friends before engaging.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>5. Users must be 18 years or older to participate.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>6. Proactive monitoring and outreach for vulnerable users.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>7. Set restrictions on gaming time and use only affordable amounts.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>8. Practise careful bank management.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Responsible Play Guide</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>1. Play Fantasy responsibly at your own risk.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2. Consider moderation; refrain from chasing losses.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>3. Plan your entertainment budget.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>4. Track time spent playing and balance with daily commitments.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>5. Avoid playing under the influence or heightened emotional stress.</Text>
                        <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>6. Do not be coerced by others to spend more than you can afford.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'grey', fontSize : 12}}>Cooperation between users and Player6 for responsible gaming. Contact Support For further assistance or inquiries,</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontSize : 12}}>Email us at support@player6.com</Text>
                    </View>
                    <View style={{marginTop:10, marginBottom : 100}}>
                        <Text style={{color:'grey', fontSize : 12}}>Remember, gaming should be enjoyable, and we encourage you to play responsibly</Text>
                    </View>
                </View>
            </ScrollView>
            :
            ""
        }



        {
            show == "TutorialVideos" ?         
            <ScrollView>
                <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                    <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Tutorial Videos</Text>
                    <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                </View>
                <View style={{marginTop:20}}>
                    {/* <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>KYC verification subsection</Text> */}
                    {/* <TouchableOpacity onPress={()=>Linking.openURL('https://youtu.be/5g2IhINjmPg?si=5VBymHS6qthQKPJy')}>
                    <Text style={{color:secondary,fontStyle:'italic',fontSize : 12}}>
                        https://youtu.be/5g2IhINjmPg?si=5VBymHS6qthQKPJy
                    </Text>
                    </TouchableOpacity> */}
                        <YoutubePlayer
                            height={300}
                            ref={controlRef}
                            play={playing}
                            mute={isMute}
                            videoId={'KdexDsb2F-w'}
                            onChangeState={onStateChange}
                        />
                </View>

                <View style={{marginTop:20}}>
                    {/* <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Play Now subsection</Text> */}
                        <YoutubePlayer
                            height={300}
                            ref={controlRef}
                            play={playing}
                            mute={isMute}
                            videoId={'Y-dd8O3DSzw'}
                            onChangeState={onStateChange}
                        />
                </View>
                <View style={{marginTop:20}}>
                    {/* <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Draft subsection</Text> */}
                        <YoutubePlayer
                            height={300}
                            ref={controlRef}
                            play={playing}
                            mute={isMute}
                            videoId={'5g2IhINjmPg'}
                            onChangeState={onStateChange}
                        />
                </View>

                <View style={{marginTop:20}}>
                    {/* <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}> LIVE player selection subsection</Text> */}
                        <YoutubePlayer
                            height={300}
                            ref={controlRef}
                            play={playing}
                            mute={isMute}
                            videoId={'Qlw34rMEpo8'}
                            onChangeState={onStateChange}
                        />
                </View>
                <View style={{marginTop:20, marginBottom : 60}}>
                    {/* <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}> How to play</Text> */}
                        <YoutubePlayer
                            height={300}
                            ref={controlRef}
                            play={playing}
                            mute={isMute}
                            videoId={'fFoePl4K2A4'}
                            onChangeState={onStateChange}
                        />
                </View>


            </ScrollView>
            :
            ""
        }




        {
            show == "CommunityProtocols" ?         
            <ScrollView>
                <View style={{marginLeft:10,marginRight:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                        <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Community Protocols</Text>
                        <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontSize : 11}}>Welcome to the Player6 community! Our mission is to provide a platform where users can connect, share, and learn together. To maintain a respectful and enjoyable environment for all, we&#39;ve established these community guidelines and protocols.</Text>
                    </View>
                    <View>
                        <Text style={{color:'white', fontSize : 11,marginTop : 4}}>You accept these rules, as well as our Terms of Use and Privacy Policy, by using Player6. These Community Guidelines are important to us, and we expect you to share that commitment. If these Community Protocols are breached, content may be removed, accounts may be deactivated/terminated in accordance with our Terms of Use and Privacy Policy, or there may be additional limitations in place, such as a total ban from the Player 6 Platform.</Text>
                    </View>
                    <View>
                        <Text style={{color:'white', fontSize : 11,marginTop : 4}}>Player6 reserves the right to take any action or make any decision in response to a breach of these Community Protocols in its sole discretion.</Text>
                        <View style={{marginTop:10,}}>
                            <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>1. RESPECT FELLOW GAMERS</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>1. Treat all players with respect while playing the Game.</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2. Avoid harassment, hate speech, discrimination, or any form of disrespectful behaviour.</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>2. INFORMATION</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>1. You must deliver accurate and current account-related information to us.</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2. You must not pose as someone else using their identity with the express intent of misleading others or the Platform;</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>3. You must not establish accounts with the intent to defy our Terms of Use or Privacy Policy or mislead others.</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>4. You must not misrepresent another person or organisation by using their name or contact information in the information provided to the Platform;</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>5. You must not to upload pictures, videos, clips, gifs, or other types of content that may lead people to believe they didn&#39;t come up with them if (i) the entity or a designated representative objects to it, (ii) it poses a danger of harming the public;</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2.6. You must neither maintain nor attempt to maintain multiple accounts active and if the same is found it shall be terminated or deactivated in accordance with the Terms of Use;</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>3. SPAM </Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>1. You shall not create accounts, groups, pages, and activities at extremely high frequency;</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2. You shall not post, share, or engage with content unless otherwise provided by the Platform;</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>3. You shall not force Users of the Platform to leave the Platform for another website directly or indirectly by providing deceptive information, sending visitors to broken pop-up websites, or imitating well-known companies</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>4. You shall not provide the Platform’s link to malicious third-party material, including malicious software, phishing websites, false pop-up ads, etc.</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>5. You shall not encourage users to engage in any financial activity with the goal of obtaining an unfair or unjustified benefit on the Platform;</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>6. You shall not programme bots that are harmful to the Platform, such as those that are used to advertise businesses, goods, or content;</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>7. You shall not repeatedly contact people without their permission for business interests;</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>4. RESPONSIBLE GAMING</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>1. A fantasy sports game depends on the Player's prior knowledge, judgement and assessment of the Game which will reflect in your action while playing any fantasy sports game.</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2. You must understand that the performance of the Players in the Game is an effective depiction of the Players based on real life circumstances and skill.</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>3. You are required to stay informed about the potential risks associated with excessive gaming, such as addiction or isolation. Please educate yourself about responsible gaming practices and resources available for support.</Text>
                            <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>4. You are to note that since the game includes in-game purchases you are required to exercise caution and moderation. You may also avoid impulsive spending and ensure that any purchases are within your budget.</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>5. HATE</Text>
                            <Text style={{color:'grey', fontSize : 12}}>The Communication with the Platform or its associates may not contain “hate speech,” whether directed at an individual or a group, based on membership within certain categories. These categories include, but are not limited to, race, sex, creed, national origin, religious affiliation, marital status, sexual orientation, gender identity, or language.</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>6. COPYRIGHT</Text>
                            <Text style={{color:'grey', fontSize : 12}}>The Users are expected to share original content and avoid posting material that infringes upon the intellectual property rights of others in accordance with the Terms of Use or the Privacy Policy. Copying content from other users&#39; profiles or elements of their profiles is not allowed and shall be in strict adherence of the Terms of Use and Privacy Policy.</Text>
                        </View>
                        <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>7. TERMINATION/DEACTIVATION OF ACCOUNT</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Please note that if our Community Protocols are violated your account maybe deleted in accordance with the Terms of Use and the same is irreversible. Once deleted, your Account cannot be retrieved even if you want to come back onto the Platform or have deleted the Account by accident, including if your Account has been hacked / you have lost control of your Account.</Text>
                        </View>
                        <View style={{marginTop:10}}>
                          <Text style={{color:'grey', fontSize : 12}}><Text style={{color:'#fff',fontFamily : 'Poppins-SemiBold'}}>8.</Text> We reserve the right, at any time, to add to, change, update, or modify these Community Protocols so please review it frequently. If We do, then We will post these changes on this page. In all cases, the usage of the Platform is subject to the Community Protocols in effect at the time in which the Platform is being used.</Text>
                        </View>
                        <View style={{marginTop:10}}>
                          <Text style={{color:'grey', fontSize : 12}}><Text style={{color:'#fff',fontFamily : 'Poppins-SemiBold'}}>9.</Text> We are all vital members of the Player 6 community. Please assist us by reporting to us at support@player6sports.com if you observe something that you believe could be against our Terms of Use or Privacy Policy. Our team evaluates these reports and works rapidly to delete information that doesn&#39;t adhere to our standards. You are requested to try to provide as much information as you can while completing the report, such as URLs, usernames, and descriptions of the Player, to make it easier for us to locate and examine it.</Text>
                        </View>
                        <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>10. CONTACT US</Text>
                        <Text style={{color:'grey', fontSize : 12}}>If You have questions or concerns, feel free to email Us or to correspond at  support@player6sports.com and We will attempt to address Your concerns.</Text>
                        </View>
                    </View> 
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontSize : 11}}>By adhering to these community protocols, you contribute to a healthier and more enjoyable gaming environment for yourself and your fellow players. We value your commitment to responsible gaming within our community.</Text>
                    </View>
                    <View style={{marginTop:7,marginBottom:80}}>
                        <Text style={{color:'white', fontSize : 11}}>Thank you for being a responsible member of our gaming community!
                        </Text>
                    </View>
                </View>
            </ScrollView>
            :
            ""
        }



        {
            show == "Legalities" ?   
            <ScrollView>
                <View style={{marginRight:10,marginLeft:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                        <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>LEGALITIES</Text>
                        <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'grey', fontSize : 11}}>Player6 is a fantasy sports game which depends on the player’s prior knowledge, judgement and assessment of the Game which will reflect in your action while playing any fantasy sports game. In view of the same, it is also necessary to establish that your performance in the Game is an effective depiction of the players based on real life circumstances and skill.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'grey', fontSize : 11,marginRight:5}}>Please refer to our Sports Guide   
                                <TouchableOpacity
                                    style={{position:'relative',top:2,left:8}} 
                                    onPress={()=>{
                                        setShow("GameRules");
                                    }}>
                                    <Text style={{color:'white', fontSize : 11,textDecorationLine : 'underline',fontStyle : 'italic',marginRight:8}}>Click Here</Text>
                                </TouchableOpacity>  for additional information on responsible gaming practices. In accordance with the same, it is significant to note that Player 6 is not a mere game of luck and is a game of skill. Your actions will have an impact on the outcome of the result of the Game so you required to play in accordance with our Community Protocols.
                            <TouchableOpacity
                                    style={{marginLeft : 5,position:'relative',top:2}} 
                                    onPress={()=>{
                                        setShow("PrivacyPolicy");
                                    }}>
                                    <Text style={{color:'white', fontSize : 11,textDecorationLine : 'underline',fontStyle : 'italic'}}>Click Here</Text>
                                </TouchableOpacity>
                        </Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'grey', fontSize : 11}}>The Supreme Court also ruled the same in the case of R.M.D. Chamarbaugwalla v. Union of India (AIR 1957 SC 628) that games with a preponderance of skill are included in the definition of &quot;mere skills&quot; and that competitions with a high degree of skill involved do not fall under the definition of &quot;gambling&quot; even if there is a component of chance.</Text>
                    </View>
                    <View style={{marginTop:4}}>
                        <Text style={{color:'grey', fontSize : 11}}>The Public Gaming Act, 1867 (Hereinafter referred to as ‘PGA) categorizes &quot;public gambling&quot; and the operation of a shared gaming establishment as illegal activities, subject to punishment. However, online fantasy sports gaming is viewed as an exemption within the PGA. This exception means that the regulations and penalties outlined in the PGA do not apply to games in which users primarily rely on their skills and knowledge to participate.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'grey', fontSize : 11,marginBottom : 70}}>It is pertinent to note that any person trying to access the Application/Platform within the territory of Sikkim, Odisha, Telangana, Assam, Nagaland, and Andhra Pradesh will not be permitted to participate in the contests organized by Player6 considering that several Indian states have ambiguous laws concerning skill-based games.</Text>
                    </View>
                </View>
            </ScrollView> 
            :
            ""
        }


        {
            show == "RefundPolicy" ?   
            <ScrollView>
                <View style={{marginRight : 10,marginLeft:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                        <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Refund Policy</Text>
                        <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>Refund Policy for Player6:-</Text>
                        <Text style={{color:'grey', fontSize : 12}}>At Player6, we value the trust and satisfaction of our users. Please familiarize yourself with our comprehensive refund policy, tailored to ensure a fair and transparent gaming experience:</Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>1. Finality of Transactions:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>All deposits, purchases, and fees made on Player6sports.com for Fantasy Cricket games are considered final. We prioritize customer satisfaction and will review transactions only in cases of documented errors.
                        </Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>2. Error Resolution:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>If you encounter any discrepancies in your deposit, purchase, or fee payment, kindly notify Player6 within 3 days of the transaction date. Our team will conduct a thorough review and, if necessary, determine a resolution at our discretion.</Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>3. Cancellation of Matches:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Player6 reserves the right to cancel any matches, providing transparency whether or not the reason is disclosed. In such instances, all fees paid for the affected matches will be promptly refunded to the users.</Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>4. User Conduct:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Users are explicitly prohibited from joining any game room after the commencement of a cricket match in the online Fantasy Cricket game room (identified by the Series). This rule ensures a fair and level playing field for all participants.</Text>
                    </View>
                    <View style={{marginTop : 10}}>
                        <Text style={{color:'white', fontSize : 11}}>5. Commitment to Fairness:</Text>
                        <Text style={{color:'grey', fontSize : 12}}>Player6's refund policy is crafted with the utmost commitment to fairness and transparency. We strive to maintain the integrity of our platform and uphold the trust our users place in us.</Text>
                    </View>
                    <View style={{marginBottom:80}}>
                        <Text style={{color:'grey', fontSize : 12}}>By participating in Player6 Fantasy Cricket, users agree to abide by these terms and conditions, contributing to a positive and enjoyable gaming environment for everyone.</Text>
                    </View>
                </View>
            </ScrollView> 
            :
            ""
        }


        {
            show == "TermsandConditions" ?
            <ScrollView>
                <View style={{marginLeft:10,marginRight:10}}>
                    <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                       <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Terms & Conditions</Text>
                       <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                    </View>
                    <View style={{textAlign:'justify',marginTop:10}}>
                      <Text style={{color:'white', fontSize : 11}}>Welcome to the Player6 community! Player6 is a crown jewel of Spegetti Sports Private Limited bearing CIN: U62099MH2023PTC410133 established as a fantasy Sports Application based on cricket and shall be referred to as ‘Platform’ or ‘Application’ hereinafter in the Terms of Use.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>Terms of Use</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. These Terms and Conditions, as well as all other rules, regulations, and terms of use referred to herein or provided by the Platform in relation to any Player6 Services, shall apply to any person (“User”) accessing Player6 or the Application (the “Player6 Platform”) for the purpose of participating in any of the numerous contests and games (including fantasy games), available on the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Access and Use of the Player6 Application is conditioned on acceptance of and compliance with terms and conditions and provided herein.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. Player6 reserves the right, at our sole discretion, to modify or replace these terms at any time. All efforts would be made to provide sufficient notice with respect to the changes being made. By continuing to access and use the Player6 Application, you would agree to be bound by the revised terms in the future.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. All Users of the Platform are hereby notified that the Terms of Use, Privacy Policy, Community Protocols and the Legalities shall be modified, altered in accordance with legal circumstances in India and that the Users will be bound by the same as and when the Terms of Use are updated.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. If a participant indicates residency in Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, or Telangana during the address entry, they will not be allowed to proceed with signing up for any matches in the paid version of the Game, as explained below.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. Upon entering a Game, the User/Player consents to be bound by these Terms of Use and the Community Protocols of Player6, subject to the Terms of use set forth below.</Text>
                   </View>
                   <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>REGISTRATION</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>To join the Platform, the Players must accurately provide the following details:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. Full Name</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Email Address</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. Age (Must be of 18+ Years)</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. State of Residence</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. Gender</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. Date of Birth</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7. Bank Details</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>Participants must also confirm that they have read and will adhere to these Terms and Conditions.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>RIGHTS/OBLIGATIONS OF USERS/PLAYERS</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>The Players/Users shall not:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. Participate in any lewd, offensive, inappropriate, racial, divisive, anti-national, objectionable, damaging, or aggressive conduct or communication.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Harass, pursue, intimidate, or otherwise infringe upon the legal rights of others.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. Transmit any inappropriate, profane, damaging, defamatory, infringing, lewd, or illegal content through publishing, posting, uploading, emailing, distributing, or disseminating.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. Transmit files containing viruses, corrupted data, or similar software that may harm or negatively impact another individual’s computer, software, hardware, or telecommunications equipment.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. Advertise, offer, or sell any goods or services for commercial purposes on the Platform without the explicit written consent of the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. Download any file, decompile, or disassemble our products in a manner that you know or reasonably should know is not legally permissible.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7. Falsify or delete any author attributions, legal notices, proprietary designations, or source labels of software or other material.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>8. Restrain or hinder another user from using and enjoying any public area within our sites.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>9. Collect or store personal information about other users.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10. Interfere with or disrupt the Platform its servers, or networks.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>11. Impersonate any person or entity, including the Company’s representative, or misrepresent your affiliation with a person or entity.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>12. Forge headers or manipulate identifiers to disguise the origin of content transmitted through Platform or manipulate your presence on the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>13. Undertake any action that excessively burdens or disproportionately stresses our infrastructure.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>14. Engage in any illegal activities.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>RIGHTS OF PLAYER6</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. The Platform shall restrict, suspend, or terminate any User’s access to the whole Platform or any of the Platform Services.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. The Platform shall alter, pause, or stop the Platform Services entirely or in part.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. The Platform shall reject, relocate, or take away any content that a User may submit.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. That the Platform has right to over any content that is available on the Platform may be moved or removed.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. That any User will be obligated to follow the Community Protocol, Privacy Policy and they shall be bound by the Legalities.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. That in case there is a revision to the roster of players participating in the relevant Sports Event may necessitate adding or removing players from the roster of players eligible for selection during a game.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7. That the Platform will be obligated to send a notification of the assignment to all Users at their registered e-Mail addresses when it has been done.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>ACCOUNT CREATION</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. When you create an account on the Platform, the User/Player must provide information that is accurate, complete, and current at all times. Failure to do so may result in termination of your account on the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. The User/Player must not use a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization or a name that is otherwise offensive.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. Registration & KYC: Register on our online gaming platform, undergo the KYC (Know Your Customer) process for security purposes, and prepare yourself for the thrilling gameplay ahead. You can use your Aadhaar and PAN for KYC verification.</Text>                   
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>GUIDE TO GAME</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>The Player shall follow the following steps to achieve their fantasy cricket journey:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. Registration & KYC: Register on our online gaming platform, undergo the KYC (Know Your Customer) process for security purposes, and prepare yourself for the thrilling gameplay ahead. You can use either your Aadhar or PAN for KYC verification.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Choose a Fixture: Explore the forthcoming cricket matches and choose the one that sparks the most excitement for you within the realm of online sports leagues.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. Select Contest Tier: Select your preferred engagement level for the chosen cricket match from the available tiers of 1, 5, 10, or 20 rupees. Make your choice and prepare to commence your gaming experience.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. Waiting Room: Join a “Waiting Room” where you’ll be matched with another player who is also looking for the same contest tier and fixture, leading to the creation of virtual lineups.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. Game Room: Upon finding a match, move into the “Game Room.” The participant who arrives first will have the opportunity to initiate the toss and make a prediction about which team will win it, injecting an exciting element of live gaming into the experience.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. Draft Selection: A random draft will be auto selected for each player upon the creation of the game room. One can make multiple modifications (necessary to save) to the draft as many times up until declaration of TOSS.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7. Player Selection: Before the live player selection commences, construct your fantasy team by taking turns selecting players from the starting lineups of both teams in the cricket match you’ve chosen. Assemble your ideal lineup!</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>8. Captain & Vice-Captain: Use strategic thinking to pick your team’s captain, who will earn you double points, and your vice-captain, who will earn you 1.5 times the points, in order to optimize your chances of accumulating points and securing victory in the game.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>9. Point System: Every run scored by the batsmen you’ve chosen for your team will contribute 1 point to your total score, emphasizing the significance of player statistics. It is essential to closely monitor their performance throughout the live match to enhance your overall score.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10. Winner Declaration: The player with the highest accumulated points among the two Player6 squads in the game room will be announced as the victor, securing both cash winnings and the privilege of boasting about their victory.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>11. Margin of Victory: The margin of victory is calculated by multiplying the run difference between the two sets of Player6 squads by the contest tier. Margin of victory = Run difference x Contest tier multiplier (Up to the entry fees)</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4, marginRight : 5}}>You shall also refer to our Sports Guide that is available at 
                                <TouchableOpacity
                                    style={{marginLeft : 5,position:'relative',top:2}} 
                                    onPress={()=>{
                                        setShow("GameRules");
                                    }}>
                                    <Text style={{color:'white', fontSize : 11,fontStyle : 'italic', textAlign:'justify',textDecorationLine : 'underline'}}>Click Here</Text>
                                </TouchableOpacity>
                        </Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>PAYMENT TERMS</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>By using the Platform/Application, the Player grants the Platform permission to designate a third party to handle their money in the following manner. The Players agree to be bound by the following payment conditions with regard to any transactions made on the Platform:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. The Player that uses the Platform’s services shall hold their account in the form of a ‘In Play Amount’ and a ‘Withdrawal Amount’ under the ‘Main Balance’. It is pertinent to note that neither the Platform nor the Player will have the facility to transfer any of the Player’s funds from one account to another and it shall solely be under ‘Total Balance’.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Any amount deposited by the Player in the Total Balance shall be subject to ‘location verification’ in accordance Terms stipulated under the Privacy Policy.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. The Player can enter a contest only using the funds available in the Withdrawable amount in the Total balance.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. The amount won by the Player at the end of the Game shall be credited to the Player’s ‘Withdrawable Amount’. The amount reflected in the ‘Withdrawable amount can be withdrawn by the user after verifying their PAN and their bank account details.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. If the Player has any outstanding payments related to their involvement in any match or contest, they will be redirected to the appropriate payment gateway to complete the payment. The Player acknowledges and accepts that Platform will deduct all relevant government taxes i.e., GST @ 28% from the amount deposited in their Total Balance before entering any contest. The Platform will appropriately reflect this to the user at the time of payment.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. The amount credited in the Total Balance will reflect in the Player’s Main Balance after deduction of 28% towards GST. The Player shall be at liberty to withdraw the amount in ‘Withdrawable Amount’ if he/she does not wish to participate in any match.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7. If the amount contributed by the Player using such a payment channel surpasses the remaining amount in the Total balance, excluding any relevant government taxes (such as GST @ 28%), the extra amount shall be in the ‘Withdrawable amount’ itself and the Player can use this amount for participation in any of the matchs.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>8. The Platform shall deduct 30% from the Player at the time of Withdrawal from the Total Balance towards Tax Deducted at Source (hereinafter referred to as ‘TDS’). It is pertinent to note that the TDS will be deducted from the Player only at the time of Withdrawing the amount in the shown under ‘Withdrawal Amount’ and not at the time when the amount is credited to the ‘Withdrawal Amount’ in the Total Balance.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>9. The Platform shall deduct 8% of the funds won by the Player in each game towards appropriate service handling charges and platform facilitation fees in order to provide a value added experience to all Players.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10. The Player can withdraw the funds available in the ‘Withdrawal Amount’ subsequent to ‘location verification’ in accordance with the Privacy Policy.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white',fontFamily : 'Poppins-SemiBold',fontSize : 12}}>INTELLECTUAL PROPERTY RIGHTS</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. The Platform shall retain all rights, title and interest in relation to the Application, including all modifications, enhancement, modifications, fixes and upgrades there to and derivative works there-from, and shall jointly apply for and register all applicable trademarks, trade names, service-marks and related logos with respect to the Platform. The User shall seek permission of the Company if any of its content are being used by addressing an e-Mail tosupport@player6sports.com.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. It is hereby stated the names, logos, marks, labels, trademarks, copyrights, or other intellectual property rights on the Platform belonging to any individual (including User), entity, or third party are acknowledged as the property of the respective owners, and any disputes or claims relating to such names, logos, marks, labels, trademarks, copyrights, or intellectual property rights must be addressed to the respective parties in writing and given notice to the Platform at the respective address provided hereinbelow.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. The Users hereby grant the Platform and its affiliates or agents a non-exclusive and royalty-free licence to use, reproduce, modify, publicly perform, publicly display, transfer, transmit, and/or publish User's Content for any of the content provided at their own discretion.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>PRIVACY POLICY</Text>
                        <Text style={{color:'grey', fontSize : 11}}>The Platform’s Privacy Policy, which is available at Privacy Policy,   
                                <TouchableOpacity
                                    style={{position:'relative',top:2,marginRight:8}} 
                                    onPress={()=>{
                                        setShow("PrivacyPolicy");
                                    }}>
                                    <Text style={{color:'white', fontSize : 11,fontStyle : 'italic', textAlign:'justify',textDecorationLine : 'underline'}}>Click Here</Text>   
                                </TouchableOpacity>governs all data gathered from Users.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>COMMUNITY PROTOCOLS</Text>
                        <Text style={{color:'grey', fontSize : 11}}>The Platform’s Community Protocols, which is available at Community Protocols, governs all data that is required to be adhered to use the fantasy sports Application.
                                <TouchableOpacity
                                    style={{marginLeft : 5,position:'relative',top:2,marginRight:5}} 
                                    onPress={()=>{
                                        setShow("CommunityProtocols");
                                    }}>
                                    <Text style={{color:'white', fontSize : 11,fontStyle : 'italic', textAlign:'justify',textDecorationLine : 'underline'}}>Click Here</Text>
                                </TouchableOpacity>
                        </Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>APPLICABLE LAW AND JURISDICTION</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>This Agreement is governed by and shall be construed in accordance with the laws of India. Any dispute arising out of or in connection with this Agreement shall be governed by the provisions and principles of the Arbitration and Conciliation Act, 1996. The parties irrevocably submit to the exclusive jurisdiction of the courts situated at Mumbai, Maharashtra, India for the determination of disputes arising under this contract. It is also agreed that the courts are Mumbai, Maharashtra, India shall stand to be the exclusive seat and venue for such arbitrable disputes that may arise between the parties to this Agreement.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>LIABILITY</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. The Platform is not in control what the Players and others do or say and the Platform is not responsible for any Player’s actions or conduct (whether online or offline) if it is consonance with the Platform. We have simultaneously undertaken all necessary measures and precautions to avoid any unwarranted conduct/behaviour.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. The Player/User hereby agrees that the Platform shall not be responsible for any lost profits, revenues, information or data or consequential, special, indirect, exemplary, punitive or incidental damages arising out of these Terms. This includes when Player6 terminates the User’s account, information or content in case of breach of the Terms of Use.</Text>
                    </View>           
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>SEVERABILITY</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>ACCOUNT DELETION/TERMINATION</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. The Player can delete their Account at any time by accessing the “Delete Account” option. </Text>    
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Once the Player/User opts for Account Deletion on the Platform, we will process this request as per the timeline communicated to you at the time of submission of the Account Deletion request. In all cases, we will confirm our acceptance of the Account Deletion request within 72 hours of making the request, and Your Account will be deleted within 7 days of acceptance.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. Please note that Account Deletion is irreversible. Once deleted, the Player’s account cannot be retrieved even if the Player wants to come back onto the Platform or have deleted the Account by accident, including if the Player’s account has been hacked / have lost control of their Account. </Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. Please note that any winnings that are not withdrawn from the Player’s Account will lapse after the Player’s Account Deletion – please ensure that any amounts in the Player’s Account balance are withdrawn from the Player’s Account prior to opting for Account Deletion. </Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. Details of transactions carried out in your Account, including KYC verification details and withdrawal beneficiary details, may be retained under Applicable Laws, including for the purposes listed in the section on ‘Notices’, and working with law enforcement agencies in relation to ‘Community Protocols’; and Your gameplay history may be retained as per Applicable Law, including for the purposes listed in ‘Community Protocols’ and ‘Legalities’.[Note: Please ensure that there is a link to the app’s Community Protocols and Legalities as per the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021] 
                                <TouchableOpacity
                                    style={{marginLeft : 5,position:'relative',top:2}} 
                                    onPress={()=>{
                                        setShow("Legalities");
                                    }}>
                                    <Text style={{color:'white', fontSize : 11,fontStyle : 'italic', textAlign:'justify',textDecorationLine : 'underline'}}>Click Here</Text>
                                </TouchableOpacity>
                        </Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>GRIEVANCE REDRESSAL FORUM</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>If you have any concerns or issues regarding any User Content that you think violates these Terms of Use and is violating your access to the Platform, or any User Content that appears to be, on the surface, of a nature that is obscene or defamatory towards the individual filing the complaint or any person represented by the complaint, or that involves electronic impersonation, such as digitally altered images of such individuals, kindly communicate your concerns to us via e-Mail at support@player6sports.com.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>The name and title of the Grievance Redressal Officer is as follows : Name: Sudeepth Kanumuri, e-Mail ID: support@player6sports.com</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>The Grievance Officer/Platform shall be bound by the laws stipulated under the Consumer Protection Act 2019.</Text>
                    </View>
                    <View style={{marginBottom:100,marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>CONTACT US</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>If You have questions or concerns, feel free to email Us or to correspond at support@player6sports.com and we will attempt to address Your concerns.</Text>
                    </View>
                </View>
            </ScrollView>
           
            :
            ""   
        }

        {
            show == "PrivacyPolicy" ?
            <ScrollView>
                <View style={{marginLeft:10,marginRight:10}}>
                   <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                     <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Privacy Policy</Text>
                     <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                   </View>
                    <View>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>1. GENERAL</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.1. Player6 (“We/Us/Application/Platform”) is committed to the protection of personal information provided by the users (“You”, “Your”, “User”) to us. You agree that Your use of our mobile application operating under the name and style Player6. (“App”/“Platform”) implies Your consent to the collection, retention and use of Your personal information in accordance with the terms of this Privacy Policy (“Privacy Policy”).</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.2. This Privacy Policy is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000 and the rules made thereunder and the amended provisions pertaining to electronic documents / records in various statutes as amended by the Information Technology Act, 2000. This Privacy Policy does not require any physical, electronic or digital signature and is a legally binding document between You and the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.3. We take the privacy of our Users seriously. We are committed to safeguarding the privacy of our Users while providing a personalized and valuable service.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.4. No User information is rented or sold to any third party. When You use the App, the App may collect Your device number and other personal information. A high standard of security is maintained by Us for our Users. However, the transmission of information via the internet or telephone networks is not completely secure. While We do our best to protect Your information, particularly with respect to protection of Your personal data, we cannot ensure the security of Your data transmitted via the internet, telephone or any other networks.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.5. By visiting the Platform and creating an account on the Platform, You grant us and our entities your irrevocable and informed consent to use your registered mobile number, profile name, profile picture, and winnings in a contest and/or winnings in total on the Platform (“Your Profile Information“) for promotions, offers, and any other sponsored content that the Platform and its group companies may display on the Platform or any other marketing channels, including its digital channels, television, print and publication, without requiring any further consent from You and without being required to pay any compensation to You.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.6. You further grant to us an exclusive, transferable, sub-licensable, royalty-free and worldwide licence to host, use, distribute, modify, run, copy, publicly perform or display, translate and create derivative works from Your Profile Information.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.7. You understand, represent and accept that Your Profile Information or any related materials will not violate the rights of any third-party rights or give rise to any claim that another party’s rights have been or will be violated because of our use or publication of Your Profile Information. You understand and agree that You will be liable to the Platform for any damage or cost (including reasonable attorney fees) it may suffer arising out of its use of Your Profile Information. You also understand that you will not be entitled to receive any royalties for the use of your Profile Information by or through the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.8. You understand and grant to the Platform, its subsidiaries, affiliates, successors and those acting with its authority, with respect to Your Profile Information all copyrights and derivative rights in Your Profile Information and a non-exclusive, perpetual right to use, publish, re-publish or reproduce Your Profile Information by any means the Platform sees fit for the purposes stated above.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.9. By using the Platform, you irrevocably waive any claim against the Platform relating to the use of Your Profile Information and promise not to bring any such claim or action in the future. You also waive any right to inspect, modify, approve or disapprove the content, layout, representation, presentation or other aspect of Your Profile Information as recorded by the Platform during your use of the Platform</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.10. Access to the contents available through the App is conditional upon Your approval of this Privacy Policy which should be read together with the Terms of Use (“Terms”), Community Protocols (“Protocols”). You acknowledge that this Privacy Policy, together with our Terms of Use and Community Protocols, forms Our agreement with You in relation to Your use of the App (“Agreement”).</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>2. APIs Utilization and Compliance</Text>
                        <View>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1. Player6 utilizes multiple APIs to enhance its core functionality and provide a seamless user experience. The following APIs are integrated into our platform:</Text>
                            <View style={{marginLeft:12}}>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1.1 <Text style={{color:'white'}}> IDcentral:</Text>  It is used for user identity verification purposes which include Aadhar, PAN, and bank account verification. This API ensures the accuracy and security of user-provided information. Player6 verifies the address of a user from their Aadhar and restricts the user from joining a game room if the user is a resident of any of the six restricted states where fantasy sports is banned. The PAN and Bank Account verification is required before the user requests a withdrawal from the platform. The IDcentral API facilitates swift and accurate validation of user information, ensuring compliance with the latest fantasy sports regulations. </Text>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1.2 <Text style={{color:'white'}}> Sportmonks:</Text>  Utilized for accessing live cricket data, including match scores, player statistics, and team information. This API enriches the user experience by providing real-time updates and insights into ongoing matches. The integration of Sportmonks API underscores our commitment to delivering a dynamic and immersive fantasy sports experience. By relying on Sportmonks for accurate real-time data, Player6 ensures that users have access to the latest cricket insights, empowering them to enjoy a seamless and engaging gameplay experience.</Text>  
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1.3 <Text style={{color:'white'}}> PhonePe/RazorpayX:</Text>  Integrated to facilitate instant settlements and payouts. These API enable secure transactions and ensure timely disbursement of prizes and rewards to our users. Player6 uses a mechanism where we don't store sensitive information such as bank account number and IFSC code and this information when procured from the user is only used to approve and process the transactions.</Text>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1.3.1. <Text style={{color:'white'}}>Secure Transactions:</Text>  The robust security features of PhonePe/RazorpayX API safeguard financial transactions, protecting users' sensitive information from unauthorized access or breaches. </Text>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1.3.2. <Text style={{color:'white'}}>User Convenience:</Text>  With seamless payment integration, users can easily deposit funds and withdraw winnings with just a few clicks, enhancing overall convenience and user experience.</Text>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1.3.3. <Text style={{color:'white'}}>Scalability:</Text>   The scalability of PhonePe/RazorpayX API allows Player6 to accommodate a growing user base and handle increasing transaction volumes efficiently, without compromising on performance or reliability.</Text>
                            </View>
                        </View>
                        <View>
                          <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.2. <Text style={{color:'white'}}>Compliance Measures:</Text></Text>
                          <View style={{marginLeft:12}}>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.2.1. <Text style={{color:'white'}}> Limited User Data Collection: </Text>   Player6 collects only the necessary user data required to provide its services effectively. This includes contact data (such as email addresses and phone numbers), demographic data (such as time zone and location details). We strictly adhere to data minimization principles, ensuring that only essential information is collected from users. Player6 shall not misuse or share the collected user data with anyone for other purposes.</Text>  
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.2.2. <Text style={{color:'white'}}> Rationale Behind API Integration: </Text>   Each API integrated into Player6 serves a specific purpose related to our core functionality. IDcentral is utilized to verify user identities and prevent fraudulent registrations. Sportmonks enhances the user experience by providing live cricket updates, while PhonePe/RazorpayX facilitates seamless transactions and payouts. These integrations are essential for delivering the intended features and services of ur app.</Text>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.2.3. <Text style={{color:'white'}}>  User Data Protection: </Text>   : Player6 prioritizes the protection of user data and privacy. We have implemented robust security measures to safeguard sensitive information from unauthorized access, including encryption protocols, access controls, and regular security audits. Our platform complies with industry best practices and regulatory requirements to ensure the confidentiality and integrity of user data.</Text>
                          </View>
                        </View>
                        <View>
                           <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.3.   By incorporating these APIs and implementing stringent compliance measures, Player6 aims to provide a secure and reliable platform for fantasy cricket enthusiasts while maintaining transparency and accountability in data handling practices. We are committed to upholding the highest standards of privacy and security to earn and maintain the trust of our users. </Text>
                        </View>


                 
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>3. INFORMATION COLLECTED</Text>
                        <View>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3.1. <Text style={{color:'white'}}>Traffic Data Collected</Text></Text>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>In order to provide the App, We automatically track and collect the following categories of information when You use the App: </Text>
                            <View>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(i) IP addresses;</Text>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(ii) Domain servers; and</Text>
                                <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(iii) Other information with respect to Your device location, interaction of Your device with the App and applications (collectively “Traffic Data”). </Text>
                            </View>
                        </View>
                        <View>
                          <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3.2. <Text style={{color:'white'}}>Personal Information Collected</Text></Text>
                          <View>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3.2.1. In order to provide the App, We may require You to provide Us with certain information that personally identifies You (“Personal Information“). Personal Information includes the following categories of information:</Text>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(i) Contact data (such as Your email address, phone number and any details of Your contacts); and</Text>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(ii) Demographic data (such as Your time zone, Your postal address and location details); and</Text>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(iii) Financial data (such as Your account details, e-wallet details, credit or debit card details etc. that You have provided Us for disbursement of prizes and coupons).</Text>
                          </View>
                          <View>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3.2.2. If You communicate with Us by, for example, e-mail or letter, any information provided in such communication may be collected by the Platfor</Text>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3.2.3. Our App may transmit Your Personal Information to Our internal servers. We have implemented commercially reasonable physical, managerial, operational and technical security measures to protect the loss, misuse and alteration and to preserve the security of the Personally Information in Our care. Finally, this information is used in accordance with applicable law for our business purposes and to provide You with useful features.</Text>
                            <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3.2.4. Our App may contain links to third party websites or applications. You agree and understand that privacy policies of these websites are not under Our control. You understand that once You leave Our servers, use of any information You provide shall be governed by the privacy policy of the operator of the site used by You. </Text>
                          </View>

                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>4. DISCLOSURE OF PERSONAL INFORMATION</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.1. We do not disclose Your Personal Information to any third parties other than to the Platform’s affiliates or other trusted business or persons, based on strict adherence and in compliance with Our Privacy Policy and any other appropriate confidentiality and security measures.</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.2. We use Our best efforts to use information in aggregate form (so that no individual User is identified) for the following purposes.</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.3. To build up marketing profiles and issue communications over digital channels</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.4. To aid strategic development, data collection and business analytics;</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.5. To provide seamless and swift delivery of prizes and coupons to You;</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.6. To audit usage of the App; and</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.7. To enhance User experience in relation to the App (“collectively, “Permitted Use”).</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4.8. We reserve the right to disclose Personal Information if required to do so by law or if We believe that it is necessary to do so to protect and defend the rights, property or personal safety of the Platform, the App, or Our User.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>5. CONFIDENTIALITY</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5.1. Except as otherwise provided in this Privacy Policy, We will keep Your Personal Information private and will not share it with third parties, unless We believe in good faith that disclosure of Your Personal Information or any other information We collect about You is necessary for Permitted Use or to: </Text>
                      <View>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5.1.1. Comply with a court order or other legal process;</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5.1.2. Protect the rights, property or safety of the Platform or another party; </Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5.1.3. Enforce the Agreement, including Terms of Use, Community Protocols and Legalities; or</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5.1.4. Respond to claims that any posting or other content violates the rights of third-parties.</Text>
                      </View>
                    </View>
                    <View style={{marginTop:10}}>
                       <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>6. SECURITY</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6.1. The security of Your Personal Information is important to Us. We follow generally accepted industry standards to protect the Personal Information submitted to Us, both during transmission and once We receive it. All information gathered on Our Website is securely stored within Our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited.</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6.2. Although We make best possible efforts to store Personal Information in a secure operating environment that is not open to the public, You should understand that there is no such thing as complete security, and We do not guarantee that there will be no unintended disclosures of Your Personal Information. If We become aware that Your Personal Information has been disclosed in a manner not in accordance with this Privacy Policy, We will use reasonable efforts to notify You of the nature and extent of such disclosure (to the extent We know that information) as soon as reasonably possible and as permitted by law</Text>

                    </View>
                    <View style={{marginTop:10}}>
                       <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>7. COOKIES</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7.1. To improve the responsiveness of the sites for Our Users, We may use “cookies”, or similar electronic tools to collect information to assign each visitor a unique, random number as a User Identification (User ID) to understand the User’s individual interests using the Identified Computer. Unless You voluntarily identify yourself (through registration, for example), We will have no way of knowing who You are, even if We assign a cookie to Your computer. The only personal information a cookie can contain is information You supply. A cookie cannot read data off Your hard drive.</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7.2. Our web servers automatically collect limited information about Your computer’s connection to the Internet, including Your IP address, when You visit Our site. (Your IP address is a number that lets computers attached to the Internet know where to send You data — such as the web pages You view.) Your IP address does not identify You personally. We use this information to deliver Our web pages to You upon request, to tailor Our site to the interests of Our Users, to measure traffic within Our site know the geographic locations from where Our visitors come. </Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>8. UPDATES AND CHANGES TO PRIVACY POLICY</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>8.1. We reserve the right, at any time, to add to, change, update, or modify this Privacy Policy so please review it frequently. If We do, then We will post these changes on this page. In all cases, use of information We collect is subject to the Privacy Policy in effect at the time such information is collected.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                       <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>9. YOUR RIGHTS</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>9.1. You have a right to correct any errors in Your Personal Information available with the Platform. You may request the Platform in writing that We cease to use Your Personal Information.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                       <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>10. RESTRICTION OF LIABILITY</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10.1. The Platform hereby make no claims, promises or guarantees about the accuracy, completeness, or adequacy of the contents available through the App and expressly disclaims liability for errors and omissions in the contents available through the App.</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10.2. If You communicate with Us by, for example, e-mail or letter, any information provided in such communication may be collected by the Platform.</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10.3. No warranty of any kind, implied, expressed or statutory, including but not limited to the warranties of non-infringement of third party rights, title, merchantability for a particular purpose and freedom from computer virus, is given with respect to the contents available through the App or its links to other internet resources as may be available to Your through the App.</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10.4. Reference in the App to any specific commercial products, processes, or services, or the use of any trade, firm or corporation name is for the information and convenience of the public, and does not constitute endorsement, recommendation, or favouring by the Platform. </Text>
                    </View>
                    <View style={{marginTop:10}}>
                       <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>11. APPLICABLE LAW AND JURISDICTION</Text>
                       <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>11.1.This Agreement is governed by and shall be construed in accordance with the laws of the India. Any dispute arising out of or in connection with this Agreement shall be governed by the provisions and principles of the Arbitration and Conciliation Act, 1996. The parties irrevocably submit to the exclusive jurisdiction of the courts situated at Mumbai, Maharashtra, India for the determination of disputes arising under this contract. It is also agreed that the courts are Mumbai, Maharashtra, India shall stand to be the exclusive seat and venue for such arbitrable disputes that may arise between the parties to this Agreement.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>12. ACCOUNT DELETION</Text> 
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>12.1. You can delete your Account at any time by accessing the “Delete Account” option.</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>12.2.Once you opt for Account Deletion on the Platform, we will process this request as per the timeline communicated to you at the time of submission of the Account Deletion request. In all cases , we will confirm our acceptance of the Account Deletion request within 72 hours of making the request, and Your Account will be deleted immediately after acceptance of the same by the Platform.</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>12.3. Please note that Account Deletion is irreversible. Once deleted, your Account cannot be retrieved even if you want to come back onto the Platform or have deleted the Account by accident, including if your Account has been hacked / you have lost control of your Account. </Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>12.4. Please note that any winnings that are not withdrawn from your Account will lapse after your Account Deletion – please ensure that any amounts in your Account balance are withdrawn from your Account prior to opting for Account Deletion.</Text>
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>12.5. Here is what happens to Your Content once your Account is deleted:</Text>
                      <View>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>12.5.1. Details of transactions carried out in your Account, including KYC verification details and withdrawal beneficiary details, may be retained under Applicable Laws, including for the purposes listed in the section on ‘Notices’, and working with law enforcement agencies in relation to ‘Community Protocols’; and Your gameplay history may be retained as per Applicable Law, including for the purposes listed in ‘Community Protocols’ and ‘Legalities’.[Note: Please ensure that there is a link to the app’s Community Protocols and Legalities as per the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021]</Text>
                      </View>
                    </View>
                    <View style={{marginTop:10,marginBottom:100}}>
                      <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>13. CONTACT US</Text> 
                      <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>If You have questions or concerns, feel free to email Us or to correspond at 
                      support@player6sports.com and We will attempt to address Your concerns.</Text>
                    </View>
                 
                </View>

            </ScrollView>

            :
            ""   
        }


        {
            show == "GameRules" ?   
            <ScrollView>
            <View style={{marginLeft:10,marginRight:10}}>
                <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                    <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Game Rules</Text>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>1. GENERAL</Text>
                    <Text style={{color:'grey', fontSize : 12}}>1. You can join a game room only until half an hour before the match start</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>2. You can join a maximum of four game rooms and not more than one game room per contest per match</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>3. If we cant find you an opponent by the match toss then the waiting room will be removed from My Games</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>4. The first user to join the game room gets to choose the toss</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>5. If you dont select the toss before it is announced then you will automatically lose the toss</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>6. A random draft will be assigned to you as soon as you join a game room. You need to update your draft to select your desired players and then arrange in sequence</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>7. You cannot make changes to your draft after the match toss is announced</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>8. Live player selection happens only between the match toss and match start after the playing 12s are out. Here your final 6 players will be selected.</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>9. If the playing 11s are announced only 4 minutes or less before the match start then live player selection will not occur and your final 6 players will be auto assigned from your draft</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>10. If the playing 11s are not announced even 2 minutes before the match start then all game rooms in the match will be cancelled</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>11. If you are not available during live player selection then your final 6 players will be autopicked from your draft</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>12. If you dont select a player before the timer runs out in live player selection then a player will be auto picked from your draft</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>13. The auto picks will always be assigned in order from your draft hence it is important to arrange your draft in sequence</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>14. Only runs made by your selected players will be counted</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>15. 8% of winnings from each game room goes to Player6</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>16. If the match is abandoned or has no result then the game room will be void</Text>
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4}}>17. If the match is tied or goes to a super over the game will be counted and the runs made by the players in super over also will be counted</Text>                                       
                    <Text style={{color:'grey', fontSize : 12,marginTop : 4,marginBottom : 70}}>18. If the match has a result and is decided by DLS or any other method, the game will still be counted</Text>
                </View>
               </View>
           </ScrollView>
            :
            ""
        }



        {
            show == "ContactUs" ?         
            <ScrollView keyboardShouldPersistTaps = 'always'>
                <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                    <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Contact Us</Text>
                    <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                </View>
                <View style={{marginLeft : 10,marginRight:10,marginTop:10}}>
                    <KeyboardAvoidingView>
                        <TextInput
                            style={{
                                width: '100%',
                                maxHeight: responsiveHeight(19),
                                height : responsiveHeight(19),
                                borderColor: '#fff',
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderRadius: responsiveHeight(1),
                                paddingHorizontal: responsiveHeight(2),
                                color: '#fff',
                                fontSize: responsiveFontSize(1.5),
                                fontFamily: 'Poppins-Regular',
                                textAlign : 'left',
                                textAlignVertical : 'top'
                            }}
                            placeholder="Enter Message"
                            keyboardType="text"
                            onChangeText={text => setMessage(text)}
                            value={message}
                            error={errorMessage}
                            editable
                            multiline
                            />
                    </KeyboardAvoidingView>

                    <View>
                        <Text style={{color: 'red', fontSize:responsiveFontSize(1.8),padding : 10}}>{errorMessage}</Text>
                    </View>

                     <View style={{marginBottom : 100}}>
                        <CustomButton btnLabel="Submit" onPress={() => contactSupportTeam()} />
                    </View>

                </View>
            </ScrollView>
            :
            ""
        }




        {
            show == "EntryFee" ?         
            <ScrollView keyboardShouldPersistTaps = 'always'>
                <View style={{position:'relative'}}>
                    <View>
                        <View style={{}}>
                          <ImageBackground source={TableRect}  style={{width : '100%', height : 190,resizeMode : "cover",borderRadius:40}}></ImageBackground>
                        </View>
                        <View style={{flex:1,alignItems: 'center',position:'absolute',justifyContent:'center',alignSelf:'center'}}>
                          <Text style={{color:secondary,fontWeight:'bold', marginBottom: 6,fontSize : 20,paddingTop:20}}>Entry Fee</Text>
                          <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                        </View>
                        <View>
                            <Image source={TableFee} style={{resizeMode:"contain",width:'100%',height:200,position:'relative',top:'-50%'}}/>
                        </View>
                        <View style={{height:280}}>
                            <Image source={TableBG} style={{width : '100%',resizeMode:"contain",height:'100%',position:'absolute',top:"-38%"}}/>
                        </View>
                    </View>
                </View>
               
            </ScrollView>
            :
            ""
        }



    </View>
  )
}

export default WithProgress(InfoDetails)
