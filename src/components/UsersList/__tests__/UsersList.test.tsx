/* tslint:disable */

import MockAdapter from 'axios-mock-adapter'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { UserRow } from 'src/components'
import { FetchingState } from 'src/types'
import api from 'src/utils/apiConfig'
import { setupJestShallow } from 'src/utils/testConfig'
import { Props, UsersList } from '../UsersList'

describe('UsersList', () => {
  const props: Props = {
    itemsPerPage: 5,
    onPageChange: jest.fn()
  }

  describe('Shapshots', () => {
    it('with default props', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    it('has componentDidMount defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(typeof wrapper.instance().componentDidMount).toBe('function')
      expect(wrapper.instance().componentDidMount()).resolves.toBe(undefined)
    })

    it('has fetchData defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      const paginatedResponse = { page: 1, total_pages: 3, data: [{ id: 1 }] }
      const mock = new MockAdapter(api)
      mock.onGet('/users').reply(200, paginatedResponse)

      expect(typeof wrapper.instance().fetchData).toBe('function')
      expect(wrapper.instance().fetchData(FetchingState.None)).resolves.toBe(undefined)
    })

    it('has fetchData defined for fetching state loading', async () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      const paginatedResponse = { page: 1, total_pages: 3, data: [{ id: 1 }] }
      const mock = new MockAdapter(api)
      mock.onGet('/users').reply(200, paginatedResponse)

      expect(typeof wrapper.instance().fetchData).toBe('function')
      expect(wrapper.instance().fetchData(FetchingState.Loading)).resolves.toBe(undefined)
    })

    it('has fetchData defined for unsuccessful response', async () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      const mock = new MockAdapter(api)
      mock.onGet('/users').reply(404)

      expect(typeof wrapper.instance().fetchData).toBe('function')

      try {
        await wrapper.instance().fetchData(FetchingState.None)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })

    it('has handlePageChange defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(typeof wrapper.instance().handlePageChange).toBe('function')
      expect(wrapper.instance().handlePageChange()).toBe(undefined)
    })

    it('has keyExtractor defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(typeof wrapper.instance().keyExtractor).toBe('function')
      expect(wrapper.instance().keyExtractor({ id: 1 })).toBe('1')
    })

    it('has load defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(typeof wrapper.instance().load).toBe('function')
      expect(wrapper.instance().load()).resolves.toBe(undefined)
    })

    it('has load defined for fetching state loading', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ fetchingState: FetchingState.Loading })
      expect(typeof wrapper.instance().load).toBe('function')
      expect(wrapper.instance().load()).resolves.toBe(undefined)
    })

    it('has load defined for non empty users', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ users: [{ id: 1 }] })
      expect(typeof wrapper.instance().load).toBe('function')
      expect(wrapper.instance().load()).resolves.toBe(undefined)
    })

    it('has loadMore defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ page: 1, totalPages: 2, fetchingState: FetchingState.None, users: [{ id: 1 }] })
      expect(typeof wrapper.instance().loadMore).toBe('function')
      expect(wrapper.instance().loadMore()).resolves.toBe(undefined)
    })

    it('has loadMore defined for last page', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ page: 2, totalPages: 2 })
      expect(typeof wrapper.instance().loadMore).toBe('function')
      expect(wrapper.instance().loadMore()).resolves.toBe(undefined)
    })

    it('has loadMore defined for fetching state loading more', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ fetchingState: FetchingState.LoadingMore })
      expect(typeof wrapper.instance().loadMore).toBe('function')
      expect(wrapper.instance().loadMore()).resolves.toBe(undefined)
    })

    it('has loadMore defined for empty users', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ users: [] })
      expect(typeof wrapper.instance().loadMore).toBe('function')
      expect(wrapper.instance().loadMore()).resolves.toBe(undefined)
    })

    it('has refresh defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(typeof wrapper.instance().refresh).toBe('function')
      expect(wrapper.instance().refresh()).resolves.toBe(undefined)
    })

    it('has refresh defined for fetching state refreshing', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ fetchingState: FetchingState.Refreshing })
      expect(typeof wrapper.instance().refresh).toBe('function')
      expect(wrapper.instance().refresh()).resolves.toBe(undefined)
    })

    it('has renderFooter defined', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(typeof wrapper.instance().renderFooter).toBe('function')
      expect(wrapper.instance().renderFooter()).toEqual(<View style={{ height: 32 }} />)
    })

    it('has renderFooter defined for loading more state', () => {
      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      wrapper.instance().setState({ fetchingState: FetchingState.LoadingMore })
      expect(typeof wrapper.instance().renderFooter).toBe('function')
      expect(wrapper.instance().renderFooter()).toEqual(<ActivityIndicator style={{ paddingVertical: 16 }} />)
    })

    it('has renderItem defined', () => {
      const user = {
        avatar: 'https://avatar.com/alex',
        first_name: 'Alex',
        id: 1,
        last_name: 'Demchenko'
      }

      const { wrapper } = setupJestShallow({
        Component: UsersList,
        props
      })

      expect(typeof wrapper.instance().renderItem).toBe('function')
      expect(wrapper.instance().renderItem({ item: user })).toEqual(<UserRow user={user} />)
    })
  })
})

/* tslint:enable */
