import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Header,
  Image,
} from 'react-native';

import AppHeader from '../components/AppHeader';
import db from '../config';

export default class HomeScreen extends Component {
  constructor(){
    super();
    this.state = {
      teamA: 0,
      teamB: 0
    }
  }
  updateValue = (value, teamName) => {
    console.log(value, 'val')
    console.log(teamName, 'name2')
    if(teamName === "teamA"){
      db.ref('/').update({
        teamA: value + 1
      })
      this.setState({teamA: value+1})
    }
    else{
      db.ref('/').update({
        teamB: value + 1
      })
      this.setState({teamB: value+1})
    }
  }
  readValue = (teamName) => {
    console.log(teamName, 'name')
    db.ref(`/${teamName}`)
    .once('value')
    .then(snapshot => {
      console.log(snapshot.val(), 'value')
      this.updateValue(snapshot.val(), teamName)
    });
  }
  render() {
    const dbRef = db.ref('/')
    return (
      <View>
        <AppHeader />
        <View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <Image
                style={{ width: 300, height: 220, marginLeft: 5 }}
                source={require('../assets/TeamImage.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={{ textAlign: 'center',fontSize:25 }}>Vote Here</Text>
            <TouchableOpacity
              style={styles.buttons}
              onPress ={() => {
                console.log("a")
                this.readValue("teamA")
              }}>
              <Text style={{ fontSize:20}}>Team A : {this.state.teamA}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress ={()=>{
                console.log("b")
                this.readValue("teamB")
              }}>
              <Text style={{ fontSize:20}}>Team B : {this.state.teamB}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
  componentDidMount(){
    db.ref(`/teamA`)
    .once('value')
    .then(snapshot => {
      console.log(snapshot.val(), 'value')
      var value = snapshot.val()
      this.setState({teamA: value})

    });
    db.ref(`/teamB`)
    .once('value')
    .then(snapshot => {
      console.log(snapshot.val(), 'value')
      var value = snapshot.val()
      this.setState({teamB: value})
    });
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  buttons: {
    backgroundColor:"coral",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    margin:10,
    width: 150,
    height: 50,
  },
  ratingContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
});
