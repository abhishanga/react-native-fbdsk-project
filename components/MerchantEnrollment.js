import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Card, CardItem, Container, Title, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Icon, Button } from 'native-base';

class MerchantEnrollment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrolledMerchants: [],
            unenrolledMerchants: [],
            balance: 'NA',
            cardNumber: 'NA'
        };
    }

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-add-circle" style={{ color: tintColor }} />
        )
    }

    onPress = (username, merchantId, flag) => {
        const path = flag ? 'subscribeFeeds' : 'unsubscribeFeeds';
        const url = `https://visa-engage.appspot.com/${path}?userId=${username}&merchantId=${merchantId}`
        fetch(url, {
            method: 'POST'
        }).
            then((response) => {
                if (response.status === 200) {
                    this.fetchMerchantList();
                    console.log("Response:", response);
                }
                else {
                    console.log("There was an error posting");

                }
            }).catch((error) => {
                Alert.alert('problem while adding data');
            })
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (payload) => {
            this.fetchMerchantList();
            this.fetchBalance();
        })
    }

    fetchMerchantList() {
        const username = 'suraj_test';//this.props.navigation.state.params.username;
        return fetch(`https://visa-engage.appspot.com/${username}`)
            .then((response) => response.json())
            .then((merchantList) => {
                const enrolledMerchants = merchantList.filter(val => val.enrolled);
                const unenrolledMerchants = merchantList.filter(val => !val.enrolled);
                this.setState({
                    enrolledMerchants,
                    unenrolledMerchants
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchBalance() {
        const username = 'suraj_test';//this.props.navigation.state.params.username;
        return fetch(`https://visa-engage.appspot.com/balance/${username}`)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((responseJson) => {
                        this.setState({
                            balance: responseJson.balance,
                            cardNumber: responseJson.maskedCardNumber
                        });
                    })
                        .catch((error) => {
                            console.error(error);
                            this.setState({
                                balance: 'NA',
                                cardNumber: 'NA'
                            });
                        });
                }
            })
    }

    render() {
        const { enrolledMerchants, unenrolledMerchants, balance, cardNumber } = this.state;
        return (
            <Container>
                <Content>
                    <Text>Card Number: {cardNumber}</Text>
                    <Text>Card Balance: {"$" + balance}</Text>
                    <List>
                        <Header>
                            <Title>Enrolled Merchants</Title>
                        </Header>
                        {enrolledMerchants.map((field, idx) => {
                            return (
                                <ListItem key={"enrolled" + idx} avatar>
                                    <Left>
                                        <Button bordered disabled={field.redeemAmount < 1} onPress={() => this.onPress('suraj_test', field.merchantId, false)}>
                                            <Icon type="MaterialCommunityIcons" name="square-inc-cash" style={{ color: "#85bb65" }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>{field.merchantName}</Text>
                                        <Text note>Reward Amount: ${field.redeemAmount}</Text>
                                    </Body>
                                    <Right>
                                        <Icon type="MaterialCommunityIcons" name="minus-box"
                                            style={{ color: "#85bb65" }}
                                            onPress={() => this.onPress('suraj_test', field.merchantId, false)} />
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </List>
                    <List>
                        <Header>
                            <Title>Merchants Recommendations</Title>
                        </Header>
                        {unenrolledMerchants.map((field, idx) => {
                            return (
                                <ListItem key={"unenrolled" + idx} avatar>
                                    <Left>
                                        <Button bordered disabled transparent onPress={() => this.onPress('suraj_test', field.merchantId, false)}>
                                            <Icon type="MaterialCommunityIcons" name="square-inc-cash" style={{ color: "#85bb65" }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>{field.merchantName}</Text>
                                        <Text note>Reward Amount: ${field.redeemAmount}</Text>
                                    </Body>
                                    <Right>
                                        <Icon type="MaterialCommunityIcons" name="plus-box" style={{ color: "#85bb65" }} onPress={() => this.onPress('suraj_test', field.merchantId, true)} />
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </List>
                </Content>
            </Container>
        )
    }

}
export default MerchantEnrollment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});