import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import DoubleClick from 'react-native-double-click';


export const DoubleClickLogo = props => {
    const {style} = props;

    return (
      <DoubleClick onClick={() => props.nagivateMe()}>
              <Image style={style} source={require('../../../assets/images/people.png')}/>
      </DoubleClick>
    );
};
