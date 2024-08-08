import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, DownGrade, InsufficientBalance} from '../../../assets';
import { secondary } from '../../../style';
import TermsAndCondition from '../policy/TermsAndCondition';


const TermsPopup = ({onClose}) => {
    
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
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default TermsPopup;
