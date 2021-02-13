import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert
} from 'react-native'

class App extends Component {
  state = {
    count: 0,
    running: false,
    start: 0,
    time: 1, 
    last: 'None'
  }

  startTimer = () => {
    this.setState({ start: Date.now(), time: Date.now(), running: true });
    this.myInterval = setInterval(()=>{
      this.setState({ time: Date.now() });
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.myInterval);
    this.setState({start: 0, time: 1, running: false, last: 'None'});
  }

  incrementCount = () => {
    if (!this.state.running){
      this.startTimer();
    }
    this.setState({
      count: this.state.count + 1,
      last: '+'
    })
  }

  decrementCount = () => {
    if (!this.state.running){
      this.startTimer();
    }
    this.setState({
      count: this.state.count - 1,
      last: '-'
    })
  }

  resetCount = () => {
    this.setState({
      count: 0,
    })
    this.stopTimer();
  }

  resetAlert = () => {
    Alert.alert('Confirm Reset', 'Please confirm that you want to reset.', [
      {
        text: 'Cancel',
        onPress: () => {}
      }, {
        text: 'Reset',
        onPress: this.resetCount
      }
    ]);
  }

  componentWillUnmount() {
    this.resetCount();
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.primaryText}>{this.state.count}</Text>
        <Text style={styles.secondaryText}>{(this.state.count / ((this.state.time - this.state.start)/1000) * 60 * 60).toFixed(1)}/Hr</Text>
        <Text style={styles.tertiaryText}>Last: {this.state.last}</Text>
        <TouchableOpacity style={styles.buttonPrimary} onPress={this.incrementCount}>
          <Text style={styles.secondaryText}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={this.decrementCount}>
          <Text style={styles.secondaryText}>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonTertiary} onPress={this.resetAlert}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#69d2ff',
    padding: 10,
    marginBottom: 10,
    width: '70%',
    height: 75,
    maxWidth: 350
  },
  buttonSecondary: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff675c',
    padding: 10,
    marginBottom: 10,
    width: '70%',
    height: 75,
    maxWidth: 350
  },
  buttonTertiary: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    width: '35%',
    height: 25,
    maxWidth: 100
  },
  primaryText: {
    padding: 10,
    marginBottom: 10,
    fontSize: 64,
    fontWeight: "bold"
  },
  secondaryText: {
    padding: 10,
    marginBottom: 10,
    fontSize: 28,
  },
  tertiaryText: {
    padding: 10,
    marginBottom: 10,
    fontSize: 14
  }
})

export default App;