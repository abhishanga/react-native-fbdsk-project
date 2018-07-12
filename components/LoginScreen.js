import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Card, CardItem, Container, Header, Content, Input, Item, Form, Body, Footer, FooterTab, Button } from 'native-base';
import { red, orange, blue, lightPurp, pink, white } from '../utils/colors';

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.iosSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Login</Text>
        </TouchableOpacity>
    )
}

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    static navigationOptions = {
        title: 'Welcome',
    };

    submit = () => {

        const entry = this.state
        return fetch(`https://visa-engage.appspot.com/validateUser?userId=${this.state.username}&password=${this.state.password}`)
            .then((responseJson) => {
                if (responseJson.status === 200) {

                    this.props.navigation.navigate('Profile', { username: this.state.username })
                } else {
                    this.props.navigation.navigate('Profile', { username: this.state.username })
                }

            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                <View style={styles.formContainer}>
                    <Item regular>
                        <Input
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username}
                            placeholder="username or email"
                            autoCapitalize='none'
                        />
                    </Item>
                    <Item regular style={{ marginTop: 10 }}>
                        <Input
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry
                            placeholder="password"
                            autoCapitalize='none'
                        />
                    </Item>
                </View>
                <Footer style={{ backgroundColor: '#75787b' }}>
                    <FooterTab>
                        <Button full onPress={this.submit}>
                            <Text style={styles.submitBtnText}>Login</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 100
    },
    title: {
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    },
    iosSubmitBtn: {
        backgroundColor: blue,
        paddingVertical: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    formContainer: {
        height: 150,
        backgroundColor: 'white',
        marginTop: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    }
})
