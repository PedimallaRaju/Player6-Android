import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { secondary } from '../../../style'

const Refund = () => {
  return (
    <View style={{flex: 1,backgroundColor:'black'}}>      
        <ScrollView>
            <View style={{flex: 1, alignItems: 'center',marginTop : 30}}>
                <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 20}}>Refund Policy</Text>
            </View>
            <View style={{marginLeft : 20,marginTop:10,marginBottom : 10,textAlign:'justify'}}>
                <Text style={{color:'white',fontSize : 12}}>At Player6, we value the trust and satisfaction of our users. Please familiarize yourself with our comprehensive refund policy, tailored to ensure a fair and transparent gaming experience:</Text>
            </View>
            <View style={{marginLeft : 20,marginTop:10,marginBottom : 10}}>
                <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12,textAlign:'justify'}}>1. Finality of Transactions:</Text>
                <Text style={{color:'grey', fontSize : 11}}>Player6 is more than a fantasy cricket platform; it's a passionate community connecting
                    global cricket enthusiasts. Our mission is to deliver an immersive gaming adventure,
                    blending the thrill of cricket with strategic fantasy gameplay.
                </Text>
            </View>


            <View style={{marginLeft : 20,marginTop:10,marginBottom : 10}}>
                <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}> Error Resolution:</Text>
                <Text style={{color:'grey', fontSize : 11,textAlign:'justify'}}>If you encounter any discrepancies in your deposit, purchase, or fee payment, kindly notify Player6 within 3 days of the transaction date. Our team will conduct a thorough review and, if necessary, determine a resolution at our discretion.
                </Text>
            </View>


            <View style={{marginLeft : 20,marginTop:10,marginBottom : 10}}>
                <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}> Cancellation of Matches: </Text>
                <Text style={{color:'grey', fontSize : 11,textAlign:'justify'}}>Player6 reserves the right to cancel any matches, providing transparency whether or not the reason is disclosed. In such instances, all fees paid for the affected matches will be promptly refunded to the users.
                </Text>
            </View>


            <View style={{marginLeft : 20,marginTop:10,marginBottom : 10}}>
                <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}> User Conduct:</Text>
                <Text style={{color:'grey', fontSize : 11,textAlign:'justify'}}>Users are explicitly prohibited from joining any game room after the commencement of a cricket match in the online Fantasy Cricket game room (identified by the Series). This rule ensures a fair and level playing field for all participants.
                </Text>
            </View>


            <View style={{marginLeft : 20,marginTop:10,marginBottom : 50}}>
                <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}> Commitment to Fairness:</Text>
                <Text style={{color:'grey', fontSize : 11,textAlign:'justify'}}>Player6’s refund policy is crafted with the utmost commitment to fairness and transparency. We strive to maintain the integrity of our platform and uphold the trust our users place in us. By participating in Player6 Fantasy Cricket, users agree to abide by these terms and conditions, contributing to a positive and enjoyable gaming environment for everyone.
                </Text>
            </View>






        </ScrollView>
    </View>

  )
}

export default Refund