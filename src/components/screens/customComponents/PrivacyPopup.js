import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, DownGrade, InsufficientBalance} from '../../../assets';
import { secondary } from '../../../style';


const PrivacyPopup = ({onClose}) => {
    
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
                     <Text style={{color:secondary,fontWeight:'bold', marginBottom: 10,fontSize : 18}}>Privacy Policy</Text>
                     <Text style={{color:'grey', fontFamily : 'Poppins-SemiBold',fontSize : 12,fontStyle : "italic"}}>Player6: Play on the front foot</Text>
                   </View>
                    <View>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>1. GENERAL</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. Player6 (“We/Us/Application/Platform”) is committed to the protection of personal information provided by the users (“You”, “Your”, “User”) to us. You agree that Your use of our mobile application operating under the name and style Player6 (“App”/“Platform”) implies Your consent to the collection, retention and use of Your personal information in accordance with the terms of this Privacy Policy (“Privacy Policy”).</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. This Privacy Policy is an electronic record in the form of an electronic contract formed under the information Technology Act, 2000 and the rules made thereunder and the amended provisions pertaining to electronic documents / records in various statutes as amended by the information Technology Act, 2000. This Privacy Policy does not require any physical, electronic or digital signature and is a legally binding document between You and the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. We take the privacy of our Users seriously. We are committed to safeguarding the privacy of our Users while providing a personalized and valuable service.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. No User information is rented or sold to any third party. When You use the App, the App may collect Your device number and other personal information. A high standard of security is maintained by Us for our Users. However, the transmission of information via the internet or telephone networks is not completely secure. While We do our best to protect Your information, particularly with respect to protection of Your personal data, we cannot ensure the security of Your data transmitted via the internet, telephone or any other networks.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. By visiting the Platform and creating an account on the Platform, You grant us and our entities your irrevocable and informed consent to use your registered mobile number, profile name, profile picture, and winnings in a contest and/or winnings in total on the Platform (“Your Profile Information“) for promotions, offers, and any other sponsored content that the Platform and its group companies may display on the Platform or any other marketing channels, including its digital channels, television, print and publication, without requiring any further consent from You and without being required to pay any compensation to You.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. You further grant to us an exclusive, transferable, sub-licensable, royalty-free and worldwide licence to host, use, distribute, modify, run, copy, publicly perform or display, translate and create derivative works from Your Profile Information.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7. You understand, represent and accept that Your Profile Information or any related materials will not violate the rights of any third-party rights or give rise to any claim that another party’s rights have been or will be violated because of our use or publication of Your Profile Information. You understand and agree that You will be liable to the Platform for any damage or cost (including reasonable attorney fees) it may suffer arising out of its use of Your Profile Information. You also understand that you will not be entitled to receive any royalties for the use of your Profile Information by or through the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>8. You understand and grant to the Platform, its subsidiaries, affiliates, successors and those acting with its authority, with respect to Your Profile Information all copyrights and derivative rights in Your Profile Information and a non-exclusive, perpetual right to use, publish, re-publish or reproduce Your Profile Information by any means the Platform sees fit for the purposes stated above.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>9. By using the Platform, you irrevocably waive any claim against the Platform relating to the use of Your Profile Information and promise not to bring any such claim or action in the future. You also waive any right to inspect, modify, approve or disapprove the content, layout, representation, presentation or other aspect of Your Profile Information as recorded by the Platform during your use of the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>10. Access to the contents available through the App is conditional upon Your approval of this Privacy Policy which should be read together with the Terms of Use (“Terms”), Community Protocols (“Protocols”). You acknowledge that this Privacy Policy, together with our Terms of Use and Community Protocols, forms Our agreement with You in relation to Your use of the App (“Agreement”).</Text>
                    </View>
                   <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>INFORMATION COLLECTED</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. Traffic Data Collected</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>In order to provide the App, We automatically track and collect the following categories of information when You use the App:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(i) IP addresses;</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(ii) Domain servers; and</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(iii) Other information with respect to Your device location, interaction of Your device with the App and applications (collectively “Traffic Data”).</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Personal Information Collected</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.1. In order to provide the App, We may require You to provide Us with certain information that personally identifies You (“Personal Information“).</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(i) Contact data (such as Your email address, phone number and any details of Your contacts); and</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(ii) Demographic data (such as Your time zone, Your postal address and location details); and</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>(iii) Financial data (such as Your account details, e-wallet details, credit or debit card details etc. that You have provided Us for disbursement of prizes and coupons).</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.2. If You communicate with Us by, for example, e-mail or letter, any information provided in such communication may be collected by the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.3. Our App may transmit Your Personal Information to Our internal servers. We have implemented commercially reasonable physical, managerial, operational and technical security measures to protect the loss, misuse and alteration and to preserve the security of the Personally Information in Our care. Finally, this information is used in accordance with applicable law for our business purposes and to provide You with useful features.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2.4. Our App may contain links to third party websites or applications. You agree and understand that privacy policies of these websites are not under Our control. You understand that once You leave Our servers, use of any information You provide shall be governed by the privacy policy of the operator of the site used by You.</Text>    
                   </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>DISCLOSURE OF PERSONAL INFORMATION</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. We do not disclose Your Personal Information to any third parties other than to the Platform’s affiliates or other trusted business or persons, based on strict adherence and in compliance with Our Privacy Policy and any other appropriate confidentiality and security measures.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. We use Our best efforts to use information in aggregate form (so that no individual User is identified) for the following purposes.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. To build up marketing profiles and issue communications over digital channels.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. To aid strategic development, data collection and business analytics;</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5. To provide seamless and swift delivery of prizes and coupons to You;</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>6. To audit usage of the App; and</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>7. To enhance User experience in relation to the App (“collectively, “Permitted Use”).</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>8. We reserve the right to disclose Personal Information if required to do so by law or if We believe that it is necessary to do so to protect and defend the rights, property or personal safety of the Platform, the App, or Our User.</Text>                    
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>CONFIDENTIALITY</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. Except as otherwise provided in this Privacy Policy, We will keep Your Personal Information private and will not share it with third parties, unless We believe in good faith that disclosure of Your Personal Information or any other information We collect about You is necessary for Permitted Use or to:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.1. Comply with a court order or other legal process;</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.2. Protect the rights, property or safety of the Platform or another party;</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.3. Enforce the Agreement, including Terms of Use, Community Protocols and Legalities; or</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1.4. Respond to claims that any posting or other content violates the rights of third-parties.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>SECURITY</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. The security of Your Personal Information is important to Us. We follow generally accepted industry standards to protect the Personal Information submitted to Us, both during transmission and once We receive it. All information gathered on Our Website is securely stored within Our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Although We make best possible efforts to store Personal Information in a secure operating environment that is not open to the public, You should understand that there is no such thing as complete security, and We do not guarantee that there will be no unintended disclosures of Your Personal Information. If We become aware that Your Personal Information has been disclosed in a manner not in accordance with this Privacy Policy, We will use reasonable efforts to notify You of the nature and extent of such disclosure (to the extent We know that information) as soon as reasonably possible and as permitted by law.</Text>                    
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>COOKIES</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. To improve the responsiveness of the sites for Our Users, We may use “cookies”, or similar electronic tools to collect information to assign each visitor a unique, random number as a User Identification (User ID) to understand the User’s individual interests using the Identified Computer. Unless You voluntarily identify yourself (through registration, for example), We will have no way of knowing who You are, even if We assign a cookie to Your computer. The only personal information a cookie can contain is information You supply. A cookie cannot read data off Your hard drive.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop:4}}>2. Our web servers automatically collect limited information about Your computer’s connection to the Internet, including Your IP address, when You visit Our site. (Your IP address is a number that lets computers attached to the Internet know where to send You data — such as the web pages You view.) Your IP address does not identify You personally. We use this information to deliver Our web pages to You upon request, to tailor Our site to the interests of Our Users, to measure traffic within Our site know the geographic locations from where Our visitors come.</Text>                    
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>UPDATES AND CHANGES TO PRIVACY POLICY</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>We reserve the right, at any time, to add to, change, update, or modify this Privacy Policy so please review it frequently. If We do, then We will post these changes on this page. In all cases, use of information We collect is subject to the Privacy Policy in effect at the time such information is collected.</Text>                   
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>YOUR RIGHTS</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>You have a right to correct any errors in Your Personal Information available with the Platform. You may request the Platform in writing that We cease to use Your Personal Information.</Text>                   
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>RESTRICTION OF LIABILITY</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. The Platform hereby make no claims, promises or guarantees about the accuracy, completeness, or adequacy of the contents available through the App and expressly disclaims liability for errors and omissions in the contents available through the App.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. If You communicate with Us by, for example, e-mail or letter, any information provided in such communication may be collected by the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. No warranty of any kind, implied, expressed or statutory, including but not limited to the warranties of non-infringement of third party rights, title, merchantability for a particular purpose and freedom from computer virus, is given with respect to the contents available through the App or its links to other internet resources as may be available to Your through the App.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. Reference in the App to any specific commercial products, processes, or services, or the use of any trade, firm or corporation name is for the information and convenience of the public, and does not constitute endorsement, recommendation, or favouring by the Platform.</Text>                  
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>APPLICABLE LAW AND JURISDICTION</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>This Agreement is governed by and shall be construed in accordance with the laws of the India. Any dispute arising out of or in connection with this Agreement shall be governed by the provisions and principles of the Arbitration and Conciliation Act, 1996. The parties irrevocably submit to the exclusive jurisdiction of the courts situated at Mumbai, Maharashtra, India for the determination of disputes arising under this contract. It is also agreed that the courts are Mumbai, Maharashtra, India shall stand to be the exclusive seat and venue for such arbitrable disputes that may arise between the parties to this Agreement.</Text>                   
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>ACCOUNT DELETION</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>1. You can delete your Account at any time by accessing the “Delete Account” option.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>2. Once you opt for Account Deletion on the Platform, we will process this request as per the timeline communicated to you at the time of submission of the Account Deletion request. In all cases , we will confirm our acceptance of the Account Deletion request within 72 hours of making the request, and Your Account will be deleted immediately after acceptance of the same by the Platform.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>3. Please note that Account Deletion is irreversible. Once deleted, your Account cannot be retrieved even if you want to come back onto the Platform or have deleted the Account by accident, including if your Account has been hacked / you have lost control of your Account.</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>4. Please note that any winnings that are not withdrawn from your Account will lapse after your Account Deletion – please ensure that any amounts in your Account balance are withdrawn from your Account prior to opting for Account Deletion.</Text>
                        <Text style={{color:'white',fontSize : 11,marginTop : 4}}>Here is what happens to Your Content once your Account is deleted:</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>5.Details of transactions carried out in your Account, including KYC verification details and withdrawal beneficiary details, may be retained under Applicable Laws, including for the purposes listed in the section on ‘Notices’, and working with law enforcement agencies in relation to ‘Community Protocols’; and Your gameplay history may be retained as per Applicable Law, including for the purposes listed in ‘Community Protocols’ and ‘Legalities’.[Note: Please ensure that there is a link to the app’s Community Protocols and Legalities as per the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021]</Text>
                    </View>
                    <View style={{marginBottom:100,marginTop:10}}>
                        <Text style={{color:'white', fontFamily : 'Poppins-SemiBold',fontSize : 12}}>CONTACT US</Text>
                        <Text style={{color:'grey', fontSize : 11,marginTop : 4}}>If You have questions or concerns, feel free to email Us or to correspond at support@player6sports.com and We will attempt to address Your concerns.</Text>
                    </View>
                </View>
              </ScrollView>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default PrivacyPopup;
