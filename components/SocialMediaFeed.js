import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, CardItem, Container, Content, Thumbnail, Icon, Button} from 'native-base';
import { red, orange, blue, lightPurp, pink, white } from '../utils/colors';
import CardComponent from './CardComponent';

class SocialMediaFeed extends Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
       
      }

      componentDidMount(){
      }


    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <Container style={styles.container}>
                <View style={styles.item}>
                <View style={styles.thumbnail}>
                <Thumbnail source={{uri: uri}} />
                </View>
                    <Text style={styles.noDataText}>👋 Share your post on social media to earn cashback!</Text>                
                </View>
                <Content>
                    <CardComponent imageSource="1" likes="101" />
                    <CardComponent imageSource="2" likes="201" />
                    <CardComponent imageSource="3" likes="301" />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    thumbnail:{
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