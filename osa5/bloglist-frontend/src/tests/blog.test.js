import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/blog'

test('renders content', () => {
    const blogObject = {
        title: "Component testing is done with react-testing-library",
        author: "author",
        url: "www" }

  const component = render(
    <Blog blog={blogObject} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})