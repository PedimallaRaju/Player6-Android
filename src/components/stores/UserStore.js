import AsyncStorage from '@react-native-community/async-storage';
import {makeObservable, observable, action, toJS} from 'mobx'
import { create } from 'mobx-persist';
import { trackDerivedFunction } from 'mobx/dist/internal';





const hydrate = create({
    storage: AsyncStorage,
    jsonify: true, // If you store complex objects, set this to true
  });


class UserStore{
     mobileNumber = "";
     emailAddress = "";
     userData = {};
     userPF = "";
     selectedContest = {};
     selectedMatch = {};
     selectedMatchFee = {};
     opponentSocketData = {};
     selectedGameData = {};
     selectedTeamDetails = {};
     tossDeclared = {};
     adharNumber = "";
     adharClientId = "";
     kycError = "";
     kycSuccess = "";
     forcedTossWinner = "";
     lattitude = "";
     longitude = "";
     kycBtnTitle = "Okay";
     DraftButton = false; // New observable property for DraftButton
    constructor(){
        makeObservable(this,{
            DraftButton: observable,
            userData : observable,
            userPF : observable,
            mobileNumber : observable,
            emailAddress : observable,
            selectedContest : observable,
            selectedMatch : observable,
            selectedMatchFee : observable,
            opponentSocketData : observable,
            selectedGameData : observable,
            selectedTeamDetails : observable,
            adharNumber : observable,
            adharClientId : observable,
            tossDeclared : observable,
            kycError : observable,
            kycSuccess : observable,
            forcedTossWinner : observable,
            lattitude : observable,
            longitude : observable,
            kycBtnTitle : observable,

            setDraftButton:action,  ///newly added action whc chngs the state t/f for draft btn
            updateUserData : action,
            setMobileNumber : action, 
            setEmailAddress : action,
            setselectedContest : action,
            setselectedMatch : action,
            setselectedMatchFee : action,
            setopponentSocketData : action,
            setselectedGameData : action,
            setselectedTeamDetails : action,
            setAdharNumber : action,
            setAdharClientId : action,
            setTossDeclared : action,
            setuserPF : action,
            setKycError : action,
            setKycSuccess : action,
            setforcedTossWinner : action,
            setlattitude : action,
            setlongitude : action,
            setkycBtnTitle : action,
        })


      
          // Hydrate MobX store data from AsyncStorage
          hydrate('userStore', this)
            .then(() => console.log('UserStore has been hydrated'))
            .catch((error) => console.error('Error hydrating UserStore:', error));
        
    }

    updateElement(key, newValue) {
        this.selectedGameData[key] = newValue;
      }

    
    setMobileNumber = (number) => {
        this.mobileNumber = number;
    }

    setDraftButton(value) {
        this.DraftButton = value;
    }

    getMobileNumber(){
        return this.mobileNumber;
    }

    
    setEmailAddress = (address) => {
        this.emailAddress = address;
    }

    
    getEmailAddress(){
        return this.emailAddress;
    }

    
    updateUserData = (data) =>{
        // console.log(data)
        this.userData = toJS(data);
    }

    
    getUserData = () =>{
        return this.userData;
    }

    
    setselectedMatch = (match) => {
        console.log(match);
        this.selectedMatch = match;        
    }

    
    getselectedMatch(){
        return this.selectedMatch;
    }

    
    setselectedContest = (contest) => {
        this.selectedContest = contest;
    }

    
    getselectedContest(){
        return this.selectedContest;
    }

    
    setselectedMatchFee = (fee) => {
        this.selectedMatchFee = fee;
    }

    
    getsetselectedMatchFee(){
        return this.selectedMatchFee;
    }

    
    setopponentSocketData = (data) => {
        this.opponentSocketData = data;
    }

    
    getopponentSocketData(){
        return this.opponentSocketData;
    }

    
    setselectedGameData = (data) => {
        this.selectedGameData = data;
    }

    
    getselectedGameData(){
        return this.selectedGameData;
    }

    
    setselectedTeamDetails = (data) => {
        this.selectedTeamDetails = data;
    }

    
    getselectedTeamDetails(){
        return this.selectedTeamDetails;
    }

    
    setAdharNumber=(data)=>{
        this.adharNumber = data;
    }

    
    getAdharNumber=()=>{
        return this.adharNumber;
    }

    
    setAdharClientId=(data)=>{
        this.adharClientId = data;
    }

    
    getAdharClientId = () =>{
        return this.adharClientId;
    }

    
    setTossDeclared = (data) =>{
        this.tossDeclared = data;
    }

    
    getTossDeclared = () =>{
        return this.tossDeclared;
    }

    
    setuserPF = (data) =>{
        this.userPF = JSON.parse(JSON.stringify(data));
    }

    
    getuserPF = () =>{
        return this.userPF;
    }

    setKycError = (text) =>{
        this.kycError = text
    }

    getKycError = () =>{
        return this.kycError;
    }

    setKycSuccess = (text) =>{
        this.kycSuccess = text
    }

    getKycSuccess = () =>{
        return this.kycSuccess;
    }

    setforcedTossWinner = (text) =>{
        this.forcedTossWinner = text
    }

    setlattitude = (text) =>{
        this.lattitude = text
    }

    getlattitude = () =>{
        return this.lattitude;
    }

    setlongitude = (text) =>{
        this.longitude = text
    }

    getlongitude = () =>{
        return this.longitude;
    }

    setkycBtnTitle = (text) =>{
        this.kycBtnTitle = text
    }

    getkycBtnTitle= () =>{
        return this.kycBtnTitle;
    }

}

export default UserStore = new UserStore();