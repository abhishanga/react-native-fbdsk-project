import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ImageBackground
} from "react-native";

import SocialMediaFeed from "./SocialMediaFeed.js";
import RewardsTab from './RewardsTab';
import MerchantEnrollment from "./MerchantEnrollment";
import ActivityTab from './ActivityTab';
import { TabNavigator } from 'react-navigation'
import { Icon } from 'native-base'


class MainScreen extends Component {

    static navigationOptions = {
        title: "Visa Engage",
        headerRight: <Icon style={{ paddingRight: 10 }} name="ios-notifications" />
    }
    constructor(props) {
        super(props);
       this.state = {
        username: props.navigation.state.params ? props.navigation.state.params.username: ''
       }
      }


    render() {
        const AppTabNavigator = TabNavigator({

            HomeTab: {
                screen: SocialMediaFeed
            },
            ActivityTab: {
                screen: ActivityTab
            },
            MerchantEnrollment: {
                screen: MerchantEnrollment
            }
        }, {
                animationEnabled: true,
                swipeEnabled: true,
                tabBarPosition: "bottom",
                tabBarOptions: {
                    style: {
                        ...Platform.select({
                            android: {
                                backgroundColor: 'white'
                            }
                        })
                    },
                    activeTintColor: '#000',
                    inactiveTintColor: '#d1cece',
                    showLabel: false,
                    showIcon: true
                }
            })
        
        return (
            <AppTabNavigator screenProps={this.state.username}/>
        );
    }
}
export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});