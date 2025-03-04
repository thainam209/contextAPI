import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

const Tab = createBottomTabNavigator();

const Box =({backgroundColor,text,color}) =>{
  return (
    <View style={[styles.box,{backgroundColor}]}>
      <Text style={[{color}]}>
        {text}
      </Text>
    </View>
  );
};

const SignIn_Screen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const { login } = useAuth();

  const handleLogin = (user,pass) => {
    if(user!='' && pass!=''){
      const userData = { username }; // Dữ liệu người dùng đăng nhập
      login(userData);
      navigation.navigate('Account');
    }
    else{
      Alert.alert("Nhập đầy đủ thông tin");
    }
  };

  return(
    <View style={styles.SignInContainer}>
      <Text style={styles.titleSignIn}>Sign In</Text>
      <View style={styles.inputSignIn}>
        <Text style={styles.titleInput}>Email ID</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder='Enter your email here!'></TextInput>
        <Text style={styles.titleInput}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setpassword} placeholder='Enter your password here!' secureTextEntry={true}></TextInput>
      </View>
      <Text style={{color:'#ffa500',fontWeight:600,fontSize:15,marginLeft:270}}>For got password</Text>
      <TouchableOpacity style={styles.btnSignIn} onPress={() => handleLogin(username,password)}>
        <Text style={{color:'white',fontSize:20,fontWeight:600,textAlign:'center',paddingTop:15}}>Sign In</Text>
      </TouchableOpacity>
      <Text style={{textAlign:'center',marginTop:20,fontWeight:600,fontSize:20}}>Or sign in with</Text>
      <View style={styles.btnContainer}>
        <Box backgroundColor='white' text="Google"></Box>
        <Box backgroundColor='#4a6ea8' text="Facebook" color="white"></Box>
      </View>
      <Text style={{textAlign:'center',fontWeight:600,marginTop:20,fontSize:18}}>Not yet a member? <Text style={{color:'#ffa500'}}>Sign In</Text></Text>
    </View>
  );
};

const Account_Screen = ({navigation}) => {
  const { user } = useAuth();

  const handleLogout = () => {
    navigation.navigate('SignIn_Screen');
  };

  return (
    <View style={styles.accountContainer}>
      <View style={styles.head}></View>
      <Text style={styles.useraccout}>{user.username}</Text>
      <Text style={{color:'#00bffe',fontWeight:600,fontSize:18,paddingTop:20,textAlign:'center'}}>Moblie devoloper</Text>
      <Text style={{textAlign:'center',paddingTop:20,fontSize:18,color:'gray'}}>I have above 5 year of experience in native.{'\n'}
              mobile apps development, now i am learning.{'\n'}
              React Native</Text>
      <View style={{paddingLeft:130,paddingTop:50}}>
        <TouchableOpacity style={{backgroundColor:'#fda600',width:160,height:50,borderRadius:8}} onPress={() => handleLogout()}>
          <Text style={{color:'white',textAlign:'center',paddingTop:15,fontSize:15,fontWeight:600}}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Explorer_Screen = () => {

  return (
    <View style={styles.ExContainer}>
      <Image 
        source={require('./assets/icon_bg_ex.png')}
        style={styles.imgex}
      />
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="SignIn_Screen"
            screenOptions={{
                tabBarStyle: {
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#fcfcfc',
                height: 70,
                shadowColor: '#7F5DF0',
                shadowOffset: {
                width: 0,
                height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
              name="Explorer"
              component={Explorer_Screen}
              options={{ 
                tabBarIcon: ({}) => (
                  <Image source={require('./assets/icon_explorer.png')} style={{ width: 50, height: 40,marginTop:3 }} />
              ),
              }}
            />
            <Tab.Screen 
                name="SignIn_Screen" 
                component={SignIn_Screen} 
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: () => null
                }}
            />
            <Tab.Screen
              name="Account"
              component={Account_Screen}
              options={{ 
                tabBarIcon: () => (
                  <Image source={require('./assets/icon_account.png')} style={{ width: 50, height: 40,marginTop:3 }} />
              ),
              }}
            />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  SignInContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  titleSignIn: {
    fontSize:30,
    fontWeight:600,
    marginTop:100,
    textAlign:'center'
  },
  inputSignIn: {
    marginLeft:40,
    marginTop:50
  },
  titleInput: {
    fontSize:20
  },
  input: {
    borderWidth:1,
    width:360,
    height:50,
    borderRadius:8,
    marginTop:20,
    borderColor:'gray',
    marginBottom:20,
    paddingLeft:15
  },
  btnSignIn: {
    backgroundColor:'#ffa500',
    height:60,
    width:360,
    borderRadius:8,
    marginTop:25,
    marginLeft:40
  },
  box: {
    width:180,
    height:80,
    backgroundColor:"white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius:8,
    marginTop:20
  },
  btnContainer: {
    flexDirection: 'row', // Sắp xếp theo hàng ngang
    justifyContent: 'space-around',
  },
  accountContainer: {
    flex: 1,
    position:'relative',
    backgroundColor: '#f2f2f2'
  },
  head: {
    backgroundColor:'#00bffe',
    width:'100%',
    height:200,
  },
  useraccout: {
    fontSize:50,
    color:'gray',
    textAlign:'center',
    paddingTop:100
  },
  ExContainer: {
    flex:1,
  },
  imgex: {
    width:426,
    height:600,
    marginTop:40
  }
});
