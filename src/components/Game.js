import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text,Button, StyleSheet} from 'react-native';
import RandomNumbers from './RandomNumbers';
import { shuffle } from "lodash";

class Game extends Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    }
  state =  {
        selectedNumbers: [],
        remainingSeconds: this.props.initialSeconds,
              }
  randomNumbers = Array.from({ length: this.props.randomNumberCount})
                        .map(() => 1 + Math.floor(10 * Math.random()));

  gameStatus = 'PLAYING';
  target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2)
                             .reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumbers);

  componentDidMount(){
    this.intervalId = setInterval(() => {
        this.setState((prevState) => {
            return {remainingSeconds: prevState.remainingSeconds - 1};
        }, () => {
            if(this.state.remainingSeconds === 0){
                clearInterval(this.intervalId);
            }
        });
    }, 1000)
  }

  //Reset


  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) => {
       return this.state.selectedNumbers.indexOf(numberIndex) >= 0
      }
 selectNumber = (numberIndex) => {
      this.setState((prevState) => ({
          selectedNumbers: [...prevState.selectedNumbers, numberIndex]
 }));
    };
    UNSAFE_componentWillUpdate(nextProps, nextState){
        if(nextState.selectedNumbers !== this.state.selectedNumbers || nextState.remainingSeconds === 0){
            this.gameStatus = this.calcGameStatus(nextState);
            if(this.gameStatus !== 'PLAYING'){
                clearInterval(this.intervalId);
            }
        }
    }
    //game status: Playing, won lost
    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedNumbers.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if(nextState.remainingSeconds === 0){
            return 'LOST'
        }
        if(sumSelected < this.target){
            return 'PLAYING';
        }
        if(sumSelected === this.target){
            return 'WON';
        }
        if(sumSelected > this.target){
            return 'LOST';
        }
    }
    render() {
    const gameStatus =  this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
        {this.shuffledRandomNumbers.map((rn, index) => 
            <RandomNumbers 
            style={styles.random} 
            key={index} 
            id={index}
            number={rn} 
            isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
            onPress={this.selectNumber}
            />
        )}
        </View>
        {this.gameStatus !== 'PLAYING' && <Button title='Play Again' onPress={this.props.onPlayAgain}/>}
        <Text style={{fontSize: 60,}}>{this.state.remainingSeconds}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,       
    },
    target: {
        fontSize: 50,
        margin: 60,
        textAlign: 'center',
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb',
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    },
})

export default Game;