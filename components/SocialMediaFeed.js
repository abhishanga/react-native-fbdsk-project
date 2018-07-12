import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,ImageBackground } from 'react-native'
import { Card, CardItem, Container, Content, Thumbnail, Icon, Button } from 'native-base';
import { red, orange, blue, lightPurp, pink, white } from '../utils/colors';
import CardComponent from './CardComponent';
import {
    LoginButton, ShareDialog, GraphRequest, AccessToken,
    GraphRequestManager
} from 'react-native-fbsdk';

class SocialMediaFeed extends Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            socialmediafeed: [],
            accessToken: "",
            username: props.screenProps,
            feed: []
        }
    }

    componentDidMount() {
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                const a = data.accessToken.toString();
                this.setState({ accessToken: a }, this.getSocialMediaFeed);

            }
        )
    }

    getSocialMediaFeed() {
        const entry = this.state
        debugger;
        return fetch(`https://visa-engage.appspot.com/fetchFeeds?userId=${this.state.username}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ socialmediafeed: responseJson }, this.getInformation);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getInformation() {
        fetch(`https://graph.facebook.com/me/accounts?access_token=${this.state.accessToken}`)
            .then((response) => response.json())
            .then((responseJson) => {
                var page_access_token = responseJson.data[1].access_token;
                this.setState({
                    page_access_token: page_access_token
                })
            })
            .then(() => {
                var page_access_token = this.state.page_access_token;
                this.state.socialmediafeed.map((x) => {
                    fetch(`https://graph.facebook.com/${x.postId}?fields=message,full_picture,permalink_url&access_token=${page_access_token}`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (!responseJson.hasOwnProperty('error')) {
                                responseJson.merchantId = x.merchantId;
                                this.test(responseJson);

                            }
                        });
                });
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));

    }

    test(responseJson) {
        var joined = this.state.feed.concat(responseJson);
        this.setState({ feed: joined });
    }




    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        const feed = this.state.feed;

        if (feed.length > 0) {
            return (
                <Container style={styles.container}>
                <ImageBackground source={require('../assets/card-bg.png')} style={styles.imageContainer}>
                    <View style={styles.item}>
                        <View style={styles.thumbnail}>
                            <Thumbnail source={{ uri: uri }} />
                        </View>
                        <Text style={styles.noDataText}>👋 Share your post on social media to earn cashback!</Text>
                    </View>
                    </ImageBackground>
                    {this.state.accessToken.length===0?
                    <LoginButton
                        publishPermissions={["manage_pages", "publish_pages"]}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    alert("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    alert("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            const a = data.accessToken.toString();
                                            this.setState({ accessToken: a }, this.getSocialMediaFeed);

                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => alert("logout.")} />
                        :null}
                    <Content>
                        {this.state.feed.map((x) => (

                            <CardComponent imageSource="1" likes="101" merchantId={x.merchantId} message={x.message} id={x.id} picture={x.full_picture} link={x.permalink_url} username={this.state.username}/>

                        ))}
                    </Content>
                </Container>
            )
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    thumbnail: {
        alignItems: 'center'
    },
    item: {
        backgroundColor: white,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    }
});

export default SocialMediaFeed