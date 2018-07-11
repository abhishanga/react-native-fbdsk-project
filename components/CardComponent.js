import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableHighlight,
    Image
} from "react-native";

import { Card, CardItem, Content,Thumbnail, Body, Left, Right, Icon,Textarea,Form,Button } from 'native-base';
import { LoginButton, ShareDialog,GraphRequest,AccessToken,
    GraphRequestManager } from 'react-native-fbsdk';


class CardComponent extends Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://bit.ly/2KKoa1C',
            contentDescription: 'Facebook sharing is easy!'
        };

        this.state = { shareLinkContent: shareLinkContent, modalVisible: false,textareaVisible:false,accessToken:'' };
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

    addComments(){
        var a;
        AccessToken.getCurrentAccessToken().then(
            (data) => {
              this.setState({ accessToken: data.accessToken.toString()},this.fetchComments);
            }
          );
          
          // Create a graph request asking for user information with a callback to handle the response.
        //   const infoRequest = new GraphRequest(
        //     "/184571459071393_197049441156928/comments?message=Abhi",
        //     "post",
        //     this._responseInfoCallback,
        //   );
        //   // Start the graph request.
        //   new GraphRequestManager().addRequest(infoRequest).start();
    }

    fetchComments(){
        debugger;
        return fetch(`https://graph.facebook.com/me?access_token=${this.state.accessToken}`)
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error => 
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
    }

    render() {

        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>Tyler
                            </Text>
                            Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur. Commodo veniam dolore cupidatat nulla consectetur do nostrud ea cupidatat ullamco labore. Consequat ullamco nulla ullamco minim.
                        </Text>
                    </Body>
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
                            <Text>Like</Text>
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
                            {this.state.textareaVisible?
                            <View>
                            <Textarea rowSpan={5} bordered placeholder="Textarea" />
                            <TouchableHighlight
                            onPress={this.addComments.bind(this)}>
                            <Text>Comment</Text>
                        </TouchableHighlight>
                        <LoginButton
          publishPermissions={["manage_pages","publish_pages"]}
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
          onLogoutFinished={() => alert("logout.")}/>
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