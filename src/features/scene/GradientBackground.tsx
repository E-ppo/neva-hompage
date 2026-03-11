'use client'

import { useEffect, useMemo } from 'react'
import { Color, ShaderMaterial, PlaneGeometry } from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(mix(uBottomColor, uTopColor, vUv.y), 1.0);
  }
`

export function GradientBackground({
  topColor = '#e8f0f8',
  bottomColor = '#e8ddd0',
}: {
  topColor?: string
  bottomColor?: string
}) {
  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTopColor: { value: new Color(topColor) },
        uBottomColor: { value: new Color(bottomColor) },
      },
      depthWrite: false,
      depthTest: false,
    })
  }, [topColor, bottomColor])

  const geometry = useMemo(() => new PlaneGeometry(2, 2), [])

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return (
    <mesh geometry={geometry} material={material} renderOrder={-1} frustumCulled={false} />
  )
}
