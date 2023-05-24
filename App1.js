import React, { Component } from 'react'
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

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email:"baris.arslan@euromsg.com",
      keyid:"baris.arslan@euromsg.com",
      pushPermit:true,
    }
  }

  setUserProperty = (key,value) => {
    RelatedDigital.setUserProperty(key, value);
    console.log('User property set ',key,value);
  }

  removeUserProperty = (key) => {
    RelatedDigital.removeUserProperty(key);
    console.log('User property removed ',key);
  };


  setPushPermit = (value) => {
    console.log("PUSH PERMIT",value);
    this.setState({pushPermit:value});
    RelatedDigital.setIsPushNotificationEnabled(
      value,
      'yourAppAlias',
      'relateddigital-android-test',
      'relateddigital-android-huawei-test',
      true
    );
  };

  getToken = () => {
    RelatedDigital.getToken().then((token) => {
      console.log("NOTIFICATION TOKEN",token);
    });
  };


  askForPushNotificationPermission = () => {
    RelatedDigital.askForPushNotificationPermission();
  };

  setEmail = (email,permission) => {
    console.log("Email set:",email,", Permission:",permission);
    RelatedDigital.setEmail(email, permission);
  };

  currentState = () => {
    console.log("CURRENT STATE:",this.state)
  }


  // Components

  button = (title,action) => {
    return (
      <View style={styles.button}>
        <Button title={title} onPress={action} />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Notifications</Text>
        
        <View style={styles.switchRow}>
          <Text>Push Notification Enabled:</Text>
          <Switch
            value={this.state.pushPermit}
            onValueChange={(value)=>this.setPushPermit(value)}
          />
        </View>

        {this.button("GET TOKEN",this.getToken)}
        
        <Text style={styles.heading}>User Properties</Text>
        {this.button("Set Email",()=>this.setEmail(this.state.email,true))}
        {this.button("Remove User Property(email)",()=>this.removeUserProperty("email"))}

        {this.button("Set User Property(keyid)",()=>this.setUserProperty("keyid",this.state.keyid))}
        {this.button("Remove User Property(keyid)",()=>this.removeUserProperty("keyid"))}

        {/* {this.button("Set User Property(emailPermit)",()=>this.setUserProperty("emailPermit","Y"))}
        {this.button("Remove User Property(emailPermit)",()=>this.removeUserProperty("emailPermit"))} */}

        {/* {this.button("Set User Property(gsmPermit)",()=>this.setUserProperty("gsmPermit","Y"))}
        {this.button("Remove User Property(gsmPermit)",()=>this.removeUserProperty("gsmPermit"))} */}
        
        {/* {/* {this.button("Set User Property(pushPermit)",()=>this.setUserProperty("pushpermit","Y"))} */}
        {/* {this.button("Remove User Property(pushPermit)",()=>this.removeUserProperty("pushPermit"))} 
        {this.button("Remove User Property(pushPermit)",()=>this.removeUserProperty("pushpermit"))}  */}


        {/* 
        <View style={styles.button}>
          <Button
            title="Ask for Push Notification Permission"
            onPress={this.askForPushNotificationPermission}
          />
        </View> */}

        <Text style={styles.heading}>Others</Text>
        {this.button("Current State",this.currentState)}

      </ScrollView>
    </SafeAreaView>
    )
  }
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
