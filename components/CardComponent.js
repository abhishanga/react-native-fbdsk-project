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

import { Card, CardItem, Content, Thumbnail,Body, Left, Right, Icon, Textarea, Form, Button } from 'native-base';
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

        this.state = { shareLinkContent: shareLinkContent, modalVisible: false, textareaVisible: false, accessToken: '', text: '', message: props.message, link: props.link, id: props.id, picture: props.picture,showLike:false,username:props.username,merchantId:props.merchantId,actionMessage: ''};
    }

    componentDidMount() {
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                const a = data.accessToken.toString();
                this.setState({ accessToken: a });

            }
        )
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible,actionMessage:false,textareaVisible:false });
    }

    setTextAreaVisible(visible) {
        this.setState({ textareaVisible: visible });
    }

    shareLinkWithShareDialog() {
        var tmp = this;
        //this.setState({actionMessage: ''});
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.state.shareLinkContent);
                }
            }
        ).then(
            function (result) {
                if (result.isCancelled) {
                    // alert('Share cancelled');
                } else {
                    this.updateDB("shares");
                    this.setState({showLike:true, actionMessage: 'Your action was successful !!'});
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

    updateDB(action){
        fetch(`https://visa-engage.appspot.com/f/${action}?postId=${this.state.id}&userId=${this.state.username}&merchantId=${this.state.merchantId}`, {
            method: 'POST'
        }).then((response) => {
            console.log("success");
        });
    }
    fetchComments() {
        //this.setState({actionMessage: ''});
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
                        // alert('You have commented on this post on Facebook');
                        this.updateDB("comments");
                        this.setState({showLike:true, actionMessage: 'Your action was successful !!'});
                    });
                })
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    }

    handleLike() {
        //this.setState({actionMessage: ''});
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
                        // alert('You have liked this post on Facebook');
                        this.updateDB("likes");
                        this.setState({showLike:true, actionMessage: 'Your action was successful !!'});
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
                        <Thumbnail source={{ uri: uri }} />

                        <Body>
                            <Text>
                                {this.state.message}
                            </Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon type="FontAwesome" name="facebook-official" style={{ color: '#3B5998' }} onPress={() => {
                                this.setModalVisible(true);
                            }} />
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
                    <View style={styles.modalContainer}>
                        <View>
                            <TouchableHighlight
                                onPress={this.handleLike.bind(this)}>
                                <Text>Like</Text>
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
                            {this.state.actionMessage ?
                            <Text>{this.state.actionMessage}</Text>
                            :null}
                            {this.state.textareaVisible ?
                                <View style={{width: 200}}>

                                    <Textarea rowSpan={5} bordered placeholder="Textarea"
                                        onChangeText={(text) => this.setState({ text })}
                                        value={this.state.text} />
                                    <Button info
                                        onPress={this.addComments.bind(this)}>
                                        <Text>Comment</Text>
                                    </Button>
                                </View>
                                :
                                null}
                            {this.state.accessToken.length === 0 ?
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
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});