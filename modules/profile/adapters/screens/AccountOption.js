import { View, Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import {ListItem,Icon} from '@rneui/base'
import {map} from 'lodash'
import Modal from '../../../../kernel/components/Modal'
import ChangeDisplayName from './components/ChangeDisplayName'
import ChangePassword from './components/ChangePassword'
import ChangeAddres from './components/ChangeAddress'

export default function AccountOption(props) {
    const {user} = props;
    const [showModal, setshowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const selectComponent = (key) =>{
        switch(key){
            case 'displayName': 
                setRenderComponent(<ChangeDisplayName/>)
            break;
            case 'password':
                setRenderComponent(<ChangePassword/>)
            break;
            case 'address':
                setRenderComponent(<ChangeAddres/>)
            break;
            default:
                setRenderComponent(null)
                setshowModal(false)
                break
        }
    }
    
    const menuOption = generateOptions(selectComponent)

  return (
    <View>
      {map(menuOption, (option,index) => (
        <ListItem containerStyle={styles.menuOption} key={index} onPress={option.onPress} >
        <Icon 
            name={option.iconLeft}
            type={option.iconType}
            color={option.ColorLeft}
        />
        <ListItem.Content>
            <ListItem.title>{option.title}</ListItem.title>
        </ListItem.Content>
        <ListItem.Chevron/>
    </ListItem>
      ))}
      {renderComponent && (
        <Modal show={showModal} setShow={setShowModal} >
            {renderComponent}
        </Modal> 
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    menuOption:{
        borderBottomWidth:1,
        borderBottomColor: "#E3E3E3"
    }
})

const generateOptions = (selectComponent) => {
    return[
        {
            title:'Actualizar nombre Completo',
            iconType:'material-community',
            iconLeft:'account-circle',
            iconNameRight:'chevron-right',
            ColorLeft:'tomato',
            iconColorRight:'#CCC',
            onPress: ()=> selectComponent("displayname")
        },
        {
            title:'Actualizar contraseña',
            iconType:'material-community',
            iconLeft:'lock-reset',
            iconNameRight:'chevron-right',
            ColorLeft:'tomato',
            iconColorRight:'#CCC',
            onPress: ()=> selectComponent("password")
        },
        {
            title:'Actualizar ubicación',
            iconType:'material-community',
            iconLeft:'map-marker',
            iconNameRight:'chevron-right',
            ColorLeft:'tomato',
            iconColorRight:'#CCC',
            onPress: ()=> selectComponent("address")
        }
    ]
}