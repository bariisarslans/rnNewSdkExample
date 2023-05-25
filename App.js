import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import {RelatedDigital, RelatedDigitalPushNotificationEmitter, onNotificationRegistered, onNotificationReceived, onNotificationOpened} from 'react-native-related-digital';

function App() {
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(false);
  const [propertyKey, setPropertyKey] = useState('');
  const [propertyValue, setPropertyValue] = useState('');

  useEffect(() => {
    RelatedDigital.registerNotificationListeners();
    RelatedDigital.setIsInAppNotificationEnabled(true)
    setListeners();

    return () => removeListeners()
  }, [])

  const setListeners = () => {
    RelatedDigitalPushNotificationEmitter.addListener(onNotificationRegistered,(token)=>{
      console.log("onNotificationRegistered Token",token);
    })

    RelatedDigitalPushNotificationEmitter.addListener(onNotificationReceived,(payload)=>{
      console.log("onNotificationReceived Payload",payload);
    })

    RelatedDigitalPushNotificationEmitter.addListener(onNotificationOpened,(payload)=>{
      console.log("onNotificationOpened Payload",payload);
    })
  }

  const removeListeners = () => {
    // removeEventListener('onNotificationRegistered')
    // removeEventListener('onNotificationReceived')
    // removeEventListener('onNotificationOpened')
  }

  const handleIsPushNotificationEnabled = (value: boolean) => {
    setIsPushNotificationEnabled(value);
    RelatedDigital.setIsPushNotificationEnabled(
      value,
      'RnNewPushSdk',
      'RnNewPushSdk',
      'RnNewPushSdk',
      true
    );
  };



  const handleSetUserProperty = () => {
    RelatedDigital.setUserProperty(propertyKey, propertyValue);
    console.log('User property set.');
  };

  const handleRemoveUserProperty = () => {
    RelatedDigital.removeUserProperty(propertyKey);
    console.log('User property removed.');
  };

  const handleGetToken = () => {
    RelatedDigital.getToken().then((token) => {
      console.log(token);
    });
  };

  const handleAskForPushNotificationPermission = () => {
    RelatedDigital.askForPushNotificationPermission();
  };

  const handleSetEmail = () => {
    RelatedDigital.setEmail('baris.arslan@euromsg.com', true);
  };

  const handleGetPushMessages = () => {
    RelatedDigital.getPushMessages().then((pushMessages) => {
      console.log(pushMessages);
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Notifications</Text>
        
        <View style={styles.switchRow}>
          <Text>Push Notification Enabled:</Text>
          <Switch
            value={isPushNotificationEnabled}
            onValueChange={handleIsPushNotificationEnabled}
          />
        </View>
        <Text style={styles.heading}>User Properties</Text>
        <Text>Property Key:</Text>
        <TextInput
          style={styles.input}
          value={propertyKey}
          onChangeText={setPropertyKey}
          placeholder="Enter property key"
        />
        <Text>Property Value:</Text>
        <TextInput
          style={styles.input}
          value={propertyValue}
          onChangeText={setPropertyValue}
          placeholder="Enter property value"
        />
        <View style={styles.button}>
          <Button title="Set User Property" onPress={handleSetUserProperty} />
        </View>
        <View style={styles.button}>
          <Button
            title="Remove User Property"
            onPress={handleRemoveUserProperty}
          />
        </View>
        <View style={styles.button}>
          <Button title="Get Token" onPress={handleGetToken} />
        </View>
        <View style={styles.button}>
          <Button
            title="Ask for Push Notification Permission"
            onPress={handleAskForPushNotificationPermission}
          />
        </View>
        <View style={styles.button}>
          <Button title="Set Email" onPress={handleSetEmail} />
        </View>
        <View style={styles.button}>
          <Button title="Get Push Messages" onPress={handleGetPushMessages} />
        </View>
        <View style={styles.button}>
          <Button title="Custom Event" onPress={()=>RelatedDigital.customEvent("Home", {"OM.inapptype":"nps_with_numbers"})} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
});

export default App;