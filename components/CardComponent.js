import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';


class CardComponent extends Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
          contentType: 'link',
          contentUrl: 'https://www.facebook.com/',
          contentDescription: 'Facebook sharing is easy!'
        };
    
        this.state = {shareLinkContent: shareLinkContent,};
      }
    
      shareLinkWithShareDialog() {
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
          function(canShow) {
            if (canShow) {
              return ShareDialog.show(tmp.state.shareLinkContent);
            }
          }
        ).then(
          function(result) {
            if (result.isCancelled) {
              alert('Share cancelled');
            } else {
              alert('Share success with postId: ' + result.postId);
            }
          },
          function(error) {
            alert('Share fail with error: ' + error);
          }
        );
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
                            <Icon type="FontAwesome" name="facebook-official" style={{ color: '#3B5998'}} onPress={this.shareLinkWithShareDialog.bind(this)}/>
                        </Button>
                        <Button transparent>
                            <Icon type="FontAwesome" name="instagram" style={{color: '#e4405f'}} />
                        </Button>
                        <Button transparent>
                            <Icon type="FontAwesome" name="pinterest" style={{ color: '#bd081c'}}/>
                        </Button>


                    </Left>
                </CardItem>
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