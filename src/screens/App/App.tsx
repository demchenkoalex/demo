import React, { PureComponent } from 'react'
import { SafeAreaView, Text, TextStyle } from 'react-native'
import { UsersList } from 'src/components'
import styles from './styles'

export interface State {
  page?: number
}

export class App extends PureComponent<{}, State> {
  state = {
    page: undefined
  }

  handlePageChange = (page: number) => this.setState({ page })

  render () {
    const { page } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <UsersList
          itemsPerPage={5}
          onPageChange={this.handlePageChange}
        />
        {page && <Text style={styles.text as TextStyle}>{`You are on a page ${page}`}</Text>}
      </SafeAreaView>
    )
  }
}
