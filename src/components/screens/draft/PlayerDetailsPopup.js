import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CloseIcon, Player, TBC } from "../../../assets";
import Modal from "react-native-modal";
import { styles } from "./PlayerDetailsPopup.styles";


const MatchType = {
  "1": "ODI",
  "2": "T10 & T20",
  "3": "TEST",
  "4": "IPL",
};

// const MatchType = {
//   "1": "TEST",
//   "2": "ODI",
//   "3": "T10 & T20",
//   "4": "IPL",
// };



const PlayerDetailsPopup = ({ isVisible, data, data1, closeModal }) => {
  return (
    <View style={{ flex: 1}} >
      <Modal visible={isVisible} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
        >
          <View style={[styles.ppscs, styles.plypp]}>
            <TouchableOpacity
              onPress={closeModal}
              style={styles.maincls}
            >
              <Image source={CloseIcon} style={[styles.clsicon, styles.pcls]} />
            </TouchableOpacity>
            <View style={[styles.plyrprflinfo, styles.mplpp]}>
              <View style={[styles.plyrprfl, styles.pprfl]}>
              {(data.image == "") || (data.image == "https://cdn.sportmonks.com") ? 
                  <Image style={[styles.tmsdimg]} source={require('../../../assets/images/dummy.png')}/>
                :
                <Image style={styles.tmsdimg} source={{uri:`https://cdn.sportmonks.com/images/cricket/players/${data.image}`}} />
              }
              </View>
              <View>
                <Text
                  style={[
                    styles.teamnm,
                    styles.wnrtxt,
                    styles.tmname,
                    styles.plyrname,
                  ]}
                >
    {data.name}
                </Text>
                <Text style={[styles.ortxt, styles.plyrtm1]}>{data.country}</Text>
              </View>
            </View>
            <View style={styles.listhd}>
              <View style={[styles.scrhd]}>
                <Text style={[styles.ortxt, styles.orhd]}>Format</Text>
              </View>
              <View style={[styles.scrhd]}>
                <Text style={[styles.ortxt, styles.orhd]}>Mat</Text>
              </View>
              <View style={[styles.scrhd]}>
                <Text style={[styles.ortxt, styles.orhd]}>Inns</Text>
              </View>
              <View style={[styles.scrhd]}>
                <Text style={[styles.ortxt, styles.orhd]}>Runs</Text>
              </View>
              <View style={[styles.scrhd]}>
                <Text style={[styles.ortxt, styles.orhd]}>HS</Text>
              </View>
              <View style={[styles.scrhd]}>
                <Text style={[styles.ortxt, styles.orhd]}>Avg</Text>
              </View>
            </View>
            
            
    {data1.length>0 ? data1.map((value) => {
              return (
                <View style={styles.listhd}>
                  <View style={[styles.scrhd]}>
                    <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                      {MatchType[value.formatType]}
                    </Text>
                  </View>
                  <View style={[styles.scrhd]}>
                    <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                      {value.matches}
                    </Text>
                  </View>
                  <View style={[styles.scrhd]}>
                    <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                      {value.inns}
                    </Text>
                  </View>
                  <View style={[styles.scrhd]}>
                    <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                      {value.runs}
                    </Text>
                  </View>
                  <View style={[styles.scrhd]}>
                    <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                      {value.hs}
                    </Text>
                  </View>
                  <View style={[styles.scrhd]}>
                    <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                      {value.avg}
                    </Text>
                  </View>
                </View>
              );
    }) : 

        <View>
          <View style={styles.listhd}>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
              ODI
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
          </View>
          <View style={styles.listhd}>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
              T10 & T20
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
          </View>
          <View style={styles.listhd}>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
              TEST
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
          </View>
          <View style={styles.listhd}>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
              IPL
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
            <View style={[styles.scrhd]}>
              <Text style={[styles.ortxt, styles.orhd, styles.txtinfo]}>
                0
              </Text>
            </View>
          </View>
        </View>
        
        }



          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlayerDetailsPopup;
