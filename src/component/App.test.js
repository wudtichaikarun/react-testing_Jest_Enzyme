import React from 'react'
import App from './App'

// setup
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// test
import { shallow } from 'enzyme'

describe('App', () => {
  const app = shallow(<App />)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  it('initializes the `state` with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([])
  })

  describe('when clicking the `add-gift` button', () => {
    const id = 1;

    beforeEach(()=> {
      app.find('.btn-add').simulate('click')
    })

    afterEach(() => {
      app.setState({ gifts: []})
    })

    it('adds a new gift to `state`', () => {
      expect(app.state().gifts).toEqual([{ id }])
    })
  
    it('adds a new gift to the rendered', () => {
      expect(app.find('.gift-list').children().length).toEqual(1)
    })

    it('creates a Gift component', () => {
      expect(app.find('Gift').exists()).toBe(true)
    })

    describe('add the user wants to remove the added gift', () => {
      beforeEach(() => {
        app.instance().removeGift(id)
      })

      it('remove the gift from `state`', () => {
        expect(app.state().gifts).toEqual([])
      })
    })
  
  })
  
})

