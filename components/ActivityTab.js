import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Title,Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';


class ActivityTab extends Component {

    static navigationOptions = {
        title: "Activity History",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-heart" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
        super(props);
       this.state = {
           activity: [],
           username: props.screenProps
       }
      }
    componentDidMount(){
        const entry = this.state
        return fetch(`https://visa-engage.appspot.com/activity/history?userId=${this.state.username}`)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({activity: responseJson});
        })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        const activity = this.state.activity;
        if(activity.length>0){ 
        return (
           
            <Container style={styles.container}>
                <Content>
                    <List>
                    {this.state.activity.map((x) => (
                        <ListItem avatar>
                            <Left>
                            {x.socialMediaId==="f"?
                            <Icon type="FontAwesome" name="facebook-official" style={{ color: '#3B5998'}} />
                            :
                                <Icon type="MaterialCommunityIcons" name="pulse" style={{ color: "#85bb65" }} />
                    }
                            </Left>
                            <Body>
                                <Text note>You {x.action==="shares"?"shared":x.action==="likes"?"liked":x.action==="comments"?"commented":"aa"} on a post from {x.merchantId} on {x.socialMediaId==="f"?"Facebook":"null"}</Text>
                            </Body>
                        </ListItem>
                    ))}
                    </List>
                </Content>
            </Container>
        );
    } else {
         return null;
            }
        
    }
}
export default ActivityTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});