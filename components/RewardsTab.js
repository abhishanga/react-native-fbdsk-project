import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Title,Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';

class RewardsTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon type="FontAwesome" name="trophy" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Icon type="MaterialCommunityIcons" name="square-inc-cash" style={{ color: "#85bb65" }} />
                            </Left>
                            <Body>
                                <Text>Starbucks</Text>
                                <Text note>You earned 5$ cashback</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon type="MaterialCommunityIcons" name="square-inc-cash" style={{ color: "#85bb65" }} />
                            </Left>
                            <Body>
                                <Text>Nike</Text>
                                <Text note>You earned 10$ cashback</Text>
                            </Body>
                            <Right>
                                <Text note>5:00 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}
export default RewardsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
