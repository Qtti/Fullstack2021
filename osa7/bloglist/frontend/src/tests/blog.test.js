import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import Blog from '../components/blog'

const blogObject = {
    title: "Component testing is done with react-testing-library",
    author: "author",
    url: "www" ,
    likes: 5}

test('renders title', () => {
    
  const component = render(
    <Blog blog={blogObject} />
  )


  expect(component.container).toHaveTextContent(
    'author'
  )
})

test('renders url', () => {
    
    const component = render(
      <Blog blog={blogObject} />
    )
  
    expect(component.container).toHaveTextContent(
      'author'
    )
  })

  test('clicking the button calls event handler once', async () => {
  
    const mockHandler = jest.fn()
  
    const component = render(
        <Blog blog={blogObject} />
      )
  
    const button = component.getByText('View')
    fireEvent.click(button)

  
    expect(component.container).toHaveTextContent(
        '5'
      )

      expect(component.container).toHaveTextContent(
        'www'
      )
  })

