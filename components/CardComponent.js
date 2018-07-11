import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableHighlight,
    Image
} from "react-native";

import { Card, CardItem, Content, Thumbnail, Body, Left, Right, Icon, Textarea, Form, Button } from 'native-base';
import {
    LoginButton, ShareDialog, GraphRequest, AccessToken,
    GraphRequestManager
} from 'react-native-fbsdk';


class CardComponent extends Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: props.link,
            contentDescription: 'Facebook sharing is easy!'
        };

        this.state = { shareLinkContent: shareLinkContent, modalVisible: false, textareaVisible: false, accessToken: '' ,text: '',message:props.message,link: props.link,id:props.id,picture:props.picture};
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setTextAreaVisible(visible) {
        this.setState({ textareaVisible: visible });
    }

    shareLinkWithShareDialog() {
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.state.shareLinkContent);
                }
            }
        ).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Share cancelled');
                } else {
                    alert('Share success with postId: ' + result.postId);
                }
            },
            function (error) {
                alert('Share fail with error: ' + error);
            }
        );
    }

    _responseInfoCallback(error, result) {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            alert('Success fetching data: ' + result.toString());
        }
    }

    addComments() {
        var a;
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                this.setState({ accessToken: data.accessToken.toString() }, this.fetchComments);
            }
        );
    }

    fetchComments() {
        return fetch(`https://graph.facebook.com/me/accounts?access_token=${this.state.accessToken}`)
        .then((response) => response.json())
            .then((responseJson) => {
                var page_access_token = responseJson.data[1].access_token;
                this.setState({
                    page_access_token: page_access_token
                }, () => {
                    fetch(`https://graph.facebook.com/${this.state.id}/comments?message=${this.state.text}&access_token=${this.state.page_access_token}`, {
                    method: 'POST'
                    }).then((response) => {
                        console.log(response);
                    });
                })
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    }

    handleLike(){
        return fetch(`https://graph.facebook.com/me/accounts?access_token=${this.state.accessToken}`)
        .then((response) => response.json())
            .then((responseJson) => {
                var page_access_token = responseJson.data[1].access_token;
                this.setState({
                    page_access_token: page_access_token
                }, () => {
                    fetch(`https://graph.facebook.com/${this.state.id}/likes?access_token=${this.state.page_access_token}`, {
                    method: 'POST'
                    }).then((response) => {
                        console.log(response);
                    });
                })
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    }

    render() {
        const uri = this.state.picture;
        return (
            <Card>
                <CardItem>
                    
                    <Left>
                    <Thumbnail source={{uri: uri}} />
                    </Left>
                    <Right>
                        <Text>
                            {this.state.message}
                        </Text>
                        </Right>
                    
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon type="FontAwesome" name="facebook-official" style={{ color: '#3B5998' }} onPress={this.shareLinkWithShareDialog.bind(this)} />
                        </Button>
                        <Button transparent>
                            <Icon type="FontAwesome" name="instagram" style={{ color: '#e4405f' }} onPress={() => {
                                this.setModalVisible(true);
                            }} />
                        </Button>
                        <Button transparent>
                            <Icon type="FontAwesome" name="pinterest" style={{ color: '#bd081c' }} />
                        </Button>


                    </Left>
                </CardItem>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                        <TouchableHighlight
                        onPress={this.handleLike.bind(this)}>
                        <Text>Likel</Text>
                    </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setTextAreaVisible(!this.state.textareaVisible);
                                }}>
                                <Text>Comment</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={this.shareLinkWithShareDialog.bind(this)}>
                                <Text>Share</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                            {this.state.textareaVisible ?
                                <View>

                                <Textarea rowSpan={5} bordered placeholder="Textarea" 
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}/>
                                    <TouchableHighlight
                                        onPress={this.addComments.bind(this)}>
                                        <Text>Comment</Text>
                                    </TouchableHighlight>
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
                                                        }
                                                    )
                                                }
                                            }
                                        }
                                        onLogoutFinished={() => alert("logout.")} />
                                </View>
                                :
                                null}
                        </View>
                    </View>
                </Modal>

            </Card>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});