import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity, Dimensions, Animated} from 'react-native';
import {SwipeListView} from 'react-native-swipelistview'
import { ListItem, Icon} from 'react-native-elements'

import firebase from 'firebase';

export default class SwipeableFlatlist extends Component{

    constructor(props){
        super(props);
        this.state = {
            all_notifications : this.props.all_notifications,
        }
    }

    updateMarkAsRead = (notification) => {
        db.collection("all_notifications").doc(notification.doc_id).update({"notificationStatus" : "read"})
    }
    renderItem = (data) => {
        <ListItem
            leftElement = {
            <Icon 
                name = "book"
                type = "font-awesome"
                color = '#696969'
            />
            }
            title = {
                data.item.book_name
            }
            titleStyle = {
                {
                    color : "black",
                    fontWeight : "bold"
                }   
            }
            subtitle =  {
                data.item.message
            }
            bottomDivider
        />
    }

    renderHiddenItem = () => {
        <View style = {styles.rowBack}>
            <View style = {[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style = {styles.backTextWhite}>
                    
                </Text>
            </View>
        </View>
    }

    onSwipeValueChange = (swipeData) => {
        var all_notifications = this.state.all_notifications
        const{key, value} = swipeData
        if (value < -Dimensions.get('window').width){
            const newData = [...all_notifications]
            const previousIndex = all_notifications.findIndex(item => item.key === key)
            this.updateMarkAsRead(all_notifications[previousIndex])
            newData.splice(previousIndex,1)
            this.setState({all_notifications : newData})
        }
    }

    render(){
        return(
            <View>
                <Text>
                    Swipeable flat list
                </Text>
            </View>
        )
    }
}