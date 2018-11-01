import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  View
} from 'react-native'
import {
  FetchingState,
  PaginatedResponse,
  User
} from 'src/types'
import api from 'src/utils/apiConfig'
import { UserRow } from '../UserRow'
import styles from './styles'

export interface Props {
  itemsPerPage: number
  onPageChange: (page: number) => void
}

interface State {
  fetchingState: FetchingState,
  page: number,
  totalPages: number,
  users: User[]
}

export class UsersList extends PureComponent<Props, State> {
  state = {
    fetchingState: FetchingState.None,
    page: 1,
    totalPages: 1,
    users: []
  }

  componentDidMount = () => this.load()

  fetchData = async (fetchingState: FetchingState) => {
    const { itemsPerPage, onPageChange } = this.props
    const { page, users } = this.state
    const resetData =
      fetchingState === FetchingState.Loading ||
      fetchingState === FetchingState.Refreshing

    try {
      this.setState({ fetchingState })

      const { data } = await api.get<PaginatedResponse<User>>('/users', {
        params: {
          page: resetData ? 1 : page + 1,
          per_page: itemsPerPage
        }
      })

      this.setState({
        page: data.page,
        totalPages: data.total_pages,
        users: resetData ? data.data : [...users, ...data.data]
      }, this.handlePageChange)
    } catch (error) {
      Alert.alert('Error', error.message, [{ text: 'OK' }], { cancelable: true })
    } finally {
      this.setState({ fetchingState: FetchingState.None })
    }
  }

  handlePageChange = () => this.props.onPageChange(this.state.page)

  keyExtractor = (item: User) => item.id.toString()

  load = async () => {
    const { fetchingState, users } = this.state

    if (fetchingState !== FetchingState.None || users.length > 0) return

    await this.fetchData(FetchingState.Loading)
  }

  loadMore = async () => {
    const { fetchingState, page, totalPages, users } = this.state

    if (page >= totalPages || fetchingState !== FetchingState.None || users.length === 0) return

    await this.fetchData(FetchingState.LoadingMore)
  }

  refresh = async () => {
    const { fetchingState } = this.state

    if (fetchingState !== FetchingState.None) return

    await this.fetchData(FetchingState.Refreshing)
  }

  renderFooter = () => this.state.fetchingState === FetchingState.LoadingMore
    ? <ActivityIndicator style={{ paddingVertical: 16 }} />
    : <View style={{ height: 32 }} />

  renderItem = ({ item }: { item: User }) => <UserRow user={item} />

  render () {
    const { fetchingState, users } = this.state

    return (
      fetchingState === FetchingState.Loading
      ?
        <View style={styles.loadingContainer}>
          <ActivityIndicator/>
        </View>
      :
        <FlatList
          data={users}
          extraData={fetchingState}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
          onRefresh={this.refresh}
          refreshing={fetchingState === FetchingState.Refreshing}
          renderItem={this.renderItem}
        />
    )
  }
}
