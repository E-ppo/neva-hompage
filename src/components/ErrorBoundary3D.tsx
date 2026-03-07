'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { FallbackScene } from './FallbackScene'

interface ErrorBoundary3DProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundary3DState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary3D extends Component<ErrorBoundary3DProps, ErrorBoundary3DState> {
  constructor(props: ErrorBoundary3DProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundary3DState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary3D] 3D scene crashed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <FallbackScene />
    }
    return this.props.children
  }
}
