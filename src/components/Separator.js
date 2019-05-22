/**
 * @flow
 */


import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {colors} from '../config'
import { screen, system } from '../utils'

type Props = {
  style?: any,
}

class Separator extends PureComponent<Props> {
  render() {
    return (
      <View style={[styles.line, this.props.style]} />
    )
  }
}


const styles = StyleSheet.create({
  line: {
    width: screen.width,
    height: screen.onePixel,
    backgroundColor: colors.border,
  },
});


export default Separator
