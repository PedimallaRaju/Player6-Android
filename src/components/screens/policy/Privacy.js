import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { secondary } from '../../../style'

const Privacy = () => {
  return (
    <View style={{flex: 1,backgroundColor:'black'}}>
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
    </View>
  )
}

export default Privacy