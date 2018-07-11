import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import SocialMediaFeed from "./SocialMediaFeed.js";
import RewardsTab from './RewardsTab';
import { TabNavigator } from 'react-navigation'
import { Icon } from 'native-base'


class MainScreen extends Component {

    static navigationOptions = {
        title: "Visa Engage",
        headerRight: <Icon style={{ paddingRight: 10 }} name="ios-notifications" />
    }

    render() {
        return (
            <AppTabNavigator />
        );
    }
}
export default MainScreen;

const AppTabNavigator = TabNavigator({

    HomeTab: {
        screen: SocialMediaFeed
    },
    RewardsTab: {
        screen: RewardsTab
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



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});