import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, DownGrade, InsufficientBalance} from '../../../assets';
import { secondary } from '../../../style';


const GameRulesPopup = ({onClose}) => {
    
  return (
    
    <View style={{flex: 1}}>
      <Modal isVisible={true}>
        
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.ppscs,{width : '100%'}]}>
              <TouchableOpacity onPress={onClose}>
                <View style={styles.crossimg}>
                  <Image style={styles.tmscrsimg} source={CloseIcon} />
                </View>
              </TouchableOpacity>
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
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default GameRulesPopup;
