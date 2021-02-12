import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native'

class App extends Component {
  state = {
    count: 0,
    running: false,
    start: 0,
    time: 1
  }

  startTimer = () => {
    this.setState({ start: Date.now(), time: Date.now(), running: true });
    this.myInterval = setInterval(()=>{
      this.setState({ time: Date.now() });
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.myInterval);
    this.setState({start: 0, time: 1, running: false});
  }

  incrementCount = () => {
    if (!this.state.running){
      this.setState({
        count: this.state.count + 1,
      })
      this.startTimer()
    }else {
      this.setState({
        count: this.state.count + 1
      })
    }
  }

  resetCount = () => {
    this.setState({
      count: 0,
    })
    this.stopTimer();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.primaryText}>{this.state.count}</Text>
        <Text style={styles.secondaryText}>{(this.state.count / ((this.state.time - this.state.start)/1000) * 60 * 60).toFixed(1)}/Hr</Text>
        <TouchableOpacity style={styles.buttonPrimary} onPress={this.incrementCount}>
          <Text style={styles.secondaryText}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={this.resetCount}>
          <Text style={styles.secondaryText}>Reset</Text>
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
    backgroundColor: '#33ffdd',
    padding: 10,
    marginBottom: 10,
    width: '70%',
    height: 100
  },
  buttonSecondary: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    width: '40%',
    height: 50
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
    fontSize: 32,
  }
})

export default App;