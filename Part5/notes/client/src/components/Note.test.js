import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'component testing is done',
    important: true
  }

  const component = render (
    <Note note={note} />
  )
  const li = component.container.querySelector('li')

  component.debug()
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent('component testing is done')
})

test('clicking button calls event handler', () => {
  const note = {
    content: 'component testing',
    important: true
  }

  const mockHandler = jest.fn()
  const component = render (
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})