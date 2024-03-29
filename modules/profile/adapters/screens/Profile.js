import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../../../../kernel/components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { useNavigation } from '@react-navigation/native'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Profile() {
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (credential => {
            setUser(credential)
            console.log('User', user);
            !credential ? setSession(false) : setSession(true)
        }))
    }, [])
    if (session == null) return <Loading show={true} text='Cargando'/>
    return session ? <UserLogged user={user}/> : <UserGuest navigation={navigation} />
}

const styles = StyleSheet.create({})