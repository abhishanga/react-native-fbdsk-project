import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Card, CardItem,Container, Header, Content, Input, Item, Footer, FooterTab, Button } from 'native-base';
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
                debugger;
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
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/Engage.png')}
                    />
                    <Text style={styles.title}>An app that helps your earn cashback</Text>
                </View>
                <Container style={styles.formContainer}>
                    <Content>
                        <Item regular>
                            <Input
                                onChangeText={(username) => this.setState({ username })}
                                value={this.state.username}
                                placeholder="username or email"
                                autoCapitalize='none'
                            />
                        </Item>
                        <Item regular style={{marginTop:10}}>
                            <Input
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry
                                placeholder="password"
                                autoCapitalize='none'
                            />
                        </Item>
                    </Content>
                </Container>
                <Footer style={{backgroundColor: '#75787b'}}>
                    <FooterTab>
                        <Button full onPress={this.submit}>
                            <Text style={styles.submitBtnText}>Login</Text>
                        </Button>
                    </FooterTab>
                </Footer>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        top: 20,
        flexDirection: 'column',
        backgroundColor: white
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
        padding: 10
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        marginLeft:10,
        justifyContent: 'center'
    }
})
