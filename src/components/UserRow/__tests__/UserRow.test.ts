import { setupJestShallow } from 'src/utils/testConfig'
import { Props, UserRow } from '../UserRow'

describe('UserRow', () => {
  const props: Props = {
    user: {
      avatar: 'https://avatar.com/alex',
      first_name: 'Alex',
      id: 1,
      last_name: 'Demchenko'
    }
  }

  describe('Shapshots', () => {
    it('with default props', () => {
      const { wrapper } = setupJestShallow({
        Component: UserRow,
        props
      })

      expect(wrapper).toMatchSnapshot()
    })
  })
})
