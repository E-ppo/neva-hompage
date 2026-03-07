import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary3D } from './ErrorBoundary3D'

vi.mock('framer-motion', () => ({
  motion: {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} />,
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
    div: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  },
}))

function ThrowingComponent(): never {
  throw new Error('3D crash')
}

function GoodComponent() {
  return <div data-testid="good">Working</div>
}

describe('ErrorBoundary3D', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary3D>
        <GoodComponent />
      </ErrorBoundary3D>,
    )
    expect(screen.getByTestId('good')).toBeInTheDocument()
  })

  it('renders FallbackScene when child throws', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary3D>
        <ThrowingComponent />
      </ErrorBoundary3D>,
    )

    expect(screen.getByText('eppo')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('renders custom fallback when provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary3D fallback={<div data-testid="custom-fallback">Custom</div>}>
        <ThrowingComponent />
      </ErrorBoundary3D>,
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
