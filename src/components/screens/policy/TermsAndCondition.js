import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { secondary } from '../../../style'

const TermsAndCondition = () => {
  return (
    <View style={{flex: 1,backgroundColor:'black'}}>
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
    </View>
  )
}

export default TermsAndCondition