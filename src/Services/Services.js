import { React, Component } from "react";
import { Text, View } from "react-native";
import EventSource from 'react-native-event-source';
import AsyncStorage from "@react-native-community/async-storage";

let baseURL = `https://www.xhtmlreviews.com/api-player6/`;
// let baseURL = `https://apidemo.player6sports.com/`;   //prev used!Demo
// let baseURL = `https://apiqa.player6sports.com/`;
// let baseURL = `https://api.player6sports.com/`;   //production url



export class Services extends Component{


static myInstance = null;

static getInstance() {
    return new Services();
}

async baseURL() {
    return baseURL;
}



///////////////////////////***** Authentication API's *****///////////////////////

async Login(obj) {
    try {
        let response = await fetch(
            baseURL + (`login`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




async Signup(obj) {
    try {
        let response = await fetch(
            baseURL + (`signUp`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}





async VerifyOTP(obj) {
    try {
        let response = await fetch(
            baseURL + (`verifyOTP`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


/////////////////////////////////***** Regenerate Token *****///////////////////////////////////////////////////////////

async regenerateToken(userId, token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/getNewToken`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



/////////////////////////////////***** FCM Device Token *****///////////////////////////////////////////////////////////

async sendFcmToken(obj, userId, token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/updateDeviceToken`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


/////////////////////////////////***** Banners API's *****///////////////////////////////////////////////////////////


async getHomeBanners(userId, token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/appBanners`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



/////////////////////////////////***** Matches API's *****///////////////////////////////////////////////////////////


async getRunningMatches(userId, token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/onGoingMatches`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async getUpComingMatches(userId, token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/upComingMatches`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}






/////////////////////////////////***** Squad Checking API's *****///////////////////////////////////////////////////////////


async checkSquad(userId,matchId,token) {
    console.log(`1.0/auth/User/${userId}/match/${matchId}/Squads`)
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/match/${matchId}/Squads`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}





/////////////////////////////////***** Location Verification API's *****//////////////////////////////////////////////////////


async verifyLocation(userId,token, obj) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/findAllowedLocation`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                        body:  JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



/////////////////////////////////***** Previous Contests Verification API's *****//////////////////////////////////////////////////////


async previousContests(userId,matchId,token) {
    console.log(token)
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/match/${matchId}/contests`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log("Errrororororroorororro")
        console.error(error);
        return error;
    }
}





async getAllDownGrades(obj, userId, matchId, token ) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/match/${matchId}/getAllDownGradeContests`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                        body:  JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async updateDownGrades(obj, userId, matchId,contestId, token ) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/match/${matchId}/contest/${contestId}/downGrade`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                        body:  JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}






/////////////////////////////////***** Entry Fee API's *****//////////////////////////////////////////////////////


async getEntryFees(userId,token,contestId,matchType) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/contest/${contestId}/matchType/${matchType}`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async getAllContestPrices(userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/allContestPrices`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



////////////////////////// Finding An Opponent //////////////////////////////////////////////



findAnOpponent=async(obj, userId, matchId, contestId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/match/${matchId}/contest/${contestId}`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body: JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }









////////////////////////// Select Team After Oppnent is found //////////////////////////////////////////////


selectTeam=async(obj, userId, gameId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/team`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body: JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }










////////////////////////// My Games After Contest Is Selected //////////////////////////////////////////////



getMyGamesList=async(userId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/allRunningGames`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }



  selectedGameDetails=async(obj, userId, gameId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }





  ////////////////////////////////// Draft API's ////////////////////////////////////////////////

  getDraftPlayers=async(obj, userId, gameId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/allPlayers`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        console.log("Draft Page : ", `1.0/auth/User/${userId}/game/${gameId}/allPlayers`)
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }


  getPlayerStatistics = async(userId, matchId, playerId, token) =>{
    console.log("Stats Page : ", `1.0/auth/User/${userId}/match/${matchId}/player/${playerId}/stats`)
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/match/${matchId}/player/${playerId}/stats`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }



  pickDraftPlayers=async(obj, userId, gameId, playerId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/draftplayer/${playerId}`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }


  unPickDraftPlayers=async(obj, userId, gameId, playerId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/removeplayer/${playerId}`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }





savingTheBasicDraft=async(obj, userId, gameId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/updateDraftPlayers`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }


  getAlreadyDraftedPlayers=async(userId, userId2, gameId, token)=>{
    console.log("Stats Page : ", `1.0/auth/User/${userId}/game/${gameId}/draftplayers/${userId2}`)
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/draftplayers/${userId2}`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }






  saveDraft=async(obj, userId, gameId, token)=>{
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/saveDraftPlayers`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
  }

/////////////////////////////////*****  Player Selection API's After The Toss Declaration *****//////////////////////////////////////////////////////
async getPlayersData(userId,gameId,token,sysTime) {
    console.log((`1.0/auth/User/${userId}/game/${gameId}/Players11?utcCTime=${sysTime}`));
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/Players11?utcCTime=${sysTime}`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async saveFinalPlayers(obj,userId,gameId,token) {
    console.log((`1.0/auth/User/${userId}/game/${gameId}/finalPlayers`));
    console.log(token);
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/finalPlayers`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}










async finalSixPlayers(userId,gameId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/finalSixPlayers`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async selectCaptainAndVC(obj,userId,gameId,token) {
    // console.log((`1.0/auth/User/${userId}/game/${gameId}/selCaps`));
    // console.log(obj);
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/selCaps`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




/////////////////////////////////*****  Running Match API's *****//////////////////////////////////////////////////////




async runningMatchDetails(obj,userId,gameId,token) {
    console.log("Running match API URL--->", (`1.0/auth/User/${userId}/game/${gameId}/Scores`));
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/game/${gameId}/Scores`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                body : JSON.stringify(obj)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}





async runningMatchTeamWiseScores(userId,Matche,token) {
    console.log("TeamWiseScores match API URL--->", (`1.0/auth/User/${userId}/Matche/${Matche}/Scores`));
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/Matche/${Matche}/Scores`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




async historyData(userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/gamesHistory`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

/////////////////////////////////*****  Profile API's *****//////////////////////////////////////////////////////



async getProfileData(userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/profile`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




async updateProfile(formData,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/profile/update`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                        },
                body : formData
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async sendOTPToEmail(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/profile/sendEmailOtp`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async verifyEmailToMobile(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/profile/updateEmail`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}





async sendOTPToMobile(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/profile/sendMobileOtp`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




async verifyOTPToMobile(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/profile/updateMobile`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


/////////////////////////////////*****  KYC API's *****//////////////////////////////////////////////////////



async updateAdhar(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/KYC/sendAadhaarOtp`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async verifyAdhar(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/KYC/verifyAadhaarOtp`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async verifyPAN(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/KYC/verifyPan`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async verifyBank(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/KYC/bankAccount`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async getBankDetails(userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/KYC/bankAccount`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}





async updatePrimaryAccount(obj,bankId,userId,token) {
    console.log(`1.0/auth/User/${userId}/KYC/bankAccount/${bankId}`)
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/bankAccount/${bankId}`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}






async checkKYCStatus(userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/checkKYC`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


/////////////////////////////////*****  Payment API's & Wallet Section *****//////////////////////////////////////////////////////
async getPaymentObject(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/initiatePayment`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async getAllWalletTransactions(userId,token) {
    console.log(`1.0/auth/User/${userId}/WalletDetails`);
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/WalletDetails`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}





async getTransactionDetailsTDS(userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/getDetailsForTDS`),
            {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




async sendRequestForWithdrawal(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/Withdraw`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}







/////////////////////////////////*****  Info Section API's *****//////////////////////////////////////////////////////


async contactSupportTeam(obj,userId,token) {
    try {
        let response = await fetch(
            baseURL + (`1.0/auth/User/${userId}/Support`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                body : JSON.stringify(obj)
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}





    render() 
    
    {
return (
<View>
    <Text>Hello</Text>
</View>
)


    }
}

export default Services