/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {colors} from '../config'


class SpacingView extends PureComponent<{}> {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 14,
    backgroundColor: colors.paper,
  },
})


export default SpacingView
