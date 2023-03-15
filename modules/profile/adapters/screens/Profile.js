import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../../../../kernel/components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { useNavigation } from '@react-navigation/native'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export default function Profile() {
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth,(credencial)=>{
            setUser(credencial)
            !credencial ? setSession(false) : setSession(true)
        })
        // (async () => {
        //     try {
        //         const value = await AsyncStorage.getItem('@session')
        //         setSession(JSON.parse(value))
        //         // console.log("Session", value);
        //         if (value !== null) {
        //             setUser(true)
        //         } else {
        //             setUser(false)
        //         }
        //     } catch (e) {
        //         console.error("Error -> Profile", e)
        //     }
        // })()
    }, [])
    if (session == null) return <Loading show={true} text='Cargando' />
    return session ? (<UserLogged user={user}/>) : (<UserGuest navigation={navigation}/>)
}

const styles = StyleSheet.create({})