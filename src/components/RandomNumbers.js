import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet , Text, TouchableOpacity } from 'react-native'

// Touchable Opacity
// Touchable Highlight

class RandomNumbers extends Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
    }
    
  handlePress = () => {
    if(this.props.isDisabled) {return;}
    this.props.onPress(this.props.id);
  };
  
  render() {
    return (
        <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>{this.props.number} </Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 25,
        marginVertical: 25,
        fontSize: 35,
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.36,
    }
});


export default RandomNumbers