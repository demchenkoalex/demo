import { setupJestShallow } from 'src/utils/testConfig'
import { App } from '../App'

describe('App', () => {
  const props = {}

  describe('Shapshots', () => {
    it('with default props', () => {
      const { wrapper } = setupJestShallow({
        Component: App,
        props
      })

      expect(wrapper).toMatchSnapshot()
    })

    it('with default props and page in state', () => {
      const { wrapper } = setupJestShallow({
        Component: App,
        props
      })

      wrapper.instance().setState({ page: 1 })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    it('has handlePageChange defined', () => {
      const { wrapper } = setupJestShallow({
        Component: App,
        props
      })

      expect(typeof wrapper.instance().handlePageChange).toBe('function')
      const page = 1
      expect(wrapper.instance().state.page).toBe(undefined)
      expect(wrapper.instance().handlePageChange(1)).toBe(undefined)
      expect(wrapper.instance().state.page).toBe(1)
    })
  })
})
