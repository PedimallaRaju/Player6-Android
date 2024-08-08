package com.player6;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
//import com.google.android.gms.auth.api.phone.SmsRetriever;

public class SMSReceiver extends BroadcastReceiver {
    private ReactApplicationContext reactContext;

    public SMSReceiver(ReactContext reactContext) {
        this.reactContext = (ReactApplicationContext) reactContext;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
//        if (SmsRetriever.SMS_RETRIEVED_ACTION.equals(intent.getAction())) {
//            String message = (String) intent.getExtras().get(SmsRetriever.EXTRA_SMS_MESSAGE);
//            // Send the received SMS message to your JavaScript code
//            if (message != null) {
//                Log.d("SMSReceiver", "Received SMS: " + message);
//                reactContext
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit("onSMSReceived", message);
//            }
//        }
    }
}

