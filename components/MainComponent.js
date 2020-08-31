import React, {Component} from 'react';
import { Image, StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';


import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'

const MenuIcon = (props) => {
    return(
        <Icon 
            name='menu' 
            size={24}
            color='white'
            onPress={() =>
                props.navigation.toggleDrawer()}
        />
    );
}

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#0e3013"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={
                    ({navigation}) => ({
                        headerLeft: () => <MenuIcon navigation={navigation}/>
                    })
                 }
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#0e3013"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={
                    ({navigation}) => ({
                        headerLeft: () => <MenuIcon navigation={navigation}/>
                    })
                }
            />         
        </HomeNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({ navigation }) {
    return(
        <ContactNavigator.Navigator
            initialRouteName='Contact'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#0e3013"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contact"
                component={Contact}
                options={({navigation}) => ({
                    headerLeft: () => <MenuIcon navigation={navigation}/>,
                    headerTitle: "Contact Us"
                })}

            />         
        </ContactNavigator.Navigator>
    );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({ navigation }) {
    return(
        <AboutNavigator.Navigator
            initialRouteName='About'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#0e3013"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <AboutNavigator.Screen
                name="About"
                component={About}
                options={
                    ({navigation}) => ({
                        headerLeft: () => <MenuIcon navigation={navigation}/>,
                        headerTitle: "About Us"
                    })
                }
            />         
        </AboutNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
);

const Drawer = createDrawerNavigator();

function MainNavigator({ navigation }) {
    return(

        <Drawer.Navigator initialRouteName="Home" drawerStyle ={{backgroundColor: '#e8e8e9'}} drawerContent = {(props) => <CustomDrawerContentComponent {...props} />}>
          <Drawer.Screen name="Home" component={HomeNavigatorScreen} options={{drawerIcon: ({ tintColor, focused }) => (<Icon name='home' type='font-awesome' size={24} color={tintColor}/>)}}/>
          <Drawer.Screen name="About" component={AboutNavigatorScreen} options={{drawerIcon: ({ tintColor, focused}) => (<Icon name='info-circle' type='font-awesome' size={24} color={tintColor}/>), drawerLabel: 'About Us'}}/>
          <Drawer.Screen name="Menu" component={MenuNavigatorScreen} options={{drawerIcon: ({ tintColor, focused }) => (<Icon name='list' type='font-awesome' size={24} color={tintColor}/>)}}/>
          <Drawer.Screen name="Contact" component={ContactNavigatorScreen} options={{drawerIcon: ({ tintColor, focused }) => (<Icon name='address-card' type='font-awesome' size={22} color={tintColor}/>), drawerLabel: 'Contact Us'}}/>
        </Drawer.Navigator>

    );
}
  

class Main extends Component {

    render() {
   
      return (
          <NavigationContainer>
              <MainNavigator/>           
          </NavigationContainer>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#0e3013',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});
    
  export default Main;