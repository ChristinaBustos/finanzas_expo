import { StyleSheet } from 'react-native'
import React from 'react'
import {Overlay} from '@rneui/base'

export default function Modal() {
    const { show,setShow,children } = props
  return (
    <Overlay
        isVisible={show}
        windowBackgroundColor="rgba(0,0,0,0,5)"
        overlayBackgroundColor="tranparent"
        overlayStyle={styles.overlay}
        onBackdropPress={() => setShow(false)}
    
    />
   
  )
}

const styles = StyleSheet.create({
    overlay:{
        height:"auto",
        width:"90%",
        backgroundColor: "#FFF",
    }
})