import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 32
  },
  firstNameText: {
    fontSize: 16,
    fontWeight: '600'
  },
  image: {
    borderRadius: 20,
    height: 40,
    width: 40
  },
  lastNameText: {
    fontSize: 14
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16
  }
})
