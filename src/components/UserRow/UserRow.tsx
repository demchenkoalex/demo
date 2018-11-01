import React from 'react'
import { Image, ImageStyle, Text, View } from 'react-native'
import { User } from 'src/types'
import styles from './styles'

export interface Props {
  user: User
}

export const UserRow = ({ user }: Props) => (
  <View style={styles.container}>
    <Image style={styles.image as ImageStyle} source={{ uri: user.avatar }} />
    <View style={styles.textContainer}>
      <Text style={styles.firstNameText} numberOfLines={1}>{user.first_name}</Text>
      <Text style={styles.lastNameText} numberOfLines={1}>{user.last_name}</Text>
    </View>
  </View>
)
