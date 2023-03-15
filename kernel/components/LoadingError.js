import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/base'

export default function LoadingError(props) {
    const { showAccept, text } = props
    return (
        <Overlay
            isVisible={showAccept}
            windowsBackgroundColor='rgb(0,0,0,0.5)'
            overlayBackgroundColor='transparent'
            overlayStyle={styles.overlay}
        >
            <View style={styles.container}>
                <Image 
                    style={styles.img}
                    source={require('../../assets/error.gif')}
                />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 160,
        width: 250,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#F71919',
        textTransform: 'uppercase',
        marginTop: 10,
        textAlign: 'center'
    },
    img:{
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
})