import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './page'

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    expect(screen.getByText('Neva-home')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Home />)
    expect(screen.getByText('eppo의 포트폴리오')).toBeInTheDocument()
  })
})
