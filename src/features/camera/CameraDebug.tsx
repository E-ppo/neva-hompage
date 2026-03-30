'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export function CameraDebug() {
  const { camera, invalidate, gl } = useThree()
  const controlsRef = useRef<any>(null)
  const [pos, setPos] = useState({ x: 0, y: 0, z: 0 })
  const [lookAt, setLookAt] = useState({ x: 0, y: 0, z: 0 })
  const keysPressed = useRef<Set<string>>(new Set())

  // WASD 키보드 이동
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => keysPressed.current.add(e.key.toLowerCase())
    const onKeyUp = (e: KeyboardEvent) => keysPressed.current.delete(e.key.toLowerCase())
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame(() => {
    const speed = 0.15
    const keys = keysPressed.current
    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize()

    let moved = false
    if (keys.has('w')) { camera.position.addScaledVector(dir, speed); moved = true }
    if (keys.has('s')) { camera.position.addScaledVector(dir, -speed); moved = true }
    if (keys.has('a')) { camera.position.addScaledVector(right, -speed); moved = true }
    if (keys.has('d')) { camera.position.addScaledVector(right, speed); moved = true }
    if (keys.has('q')) { camera.position.y += speed; moved = true }
    if (keys.has('e')) { camera.position.y -= speed; moved = true }

    if (moved && controlsRef.current) {
      controlsRef.current.target.addScaledVector(dir, keys.has('w') ? speed : keys.has('s') ? -speed : 0)
      invalidate()
    }

    setPos({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
    if (controlsRef.current) {
      const t = controlsRef.current.target
      setLookAt({ x: t.x, y: t.y, z: t.z })
    }

    if (moved) {
      console.log(`pos: [${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)}] | lookAt: [${controlsRef.current?.target.x.toFixed(1)}, ${controlsRef.current?.target.y.toFixed(1)}, ${controlsRef.current?.target.z.toFixed(1)}]`)
    }
  })

  const fmt = (v: number) => v.toFixed(1)

  const copyToClipboard = () => {
    const text = `{
  position: [${fmt(pos.x)}, ${fmt(pos.y)}, ${fmt(pos.z)}],
  lookAt: [${fmt(lookAt.x)}, ${fmt(lookAt.y)}, ${fmt(lookAt.z)}],
}`
    console.log(text)
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan
        enableZoom
        enableRotate
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        onChange={() => {
          invalidate()
          console.log(`pos: [${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)}] | lookAt: [${controlsRef.current?.target.x.toFixed(1)}, ${controlsRef.current?.target.y.toFixed(1)}, ${controlsRef.current?.target.z.toFixed(1)}]`)
        }}
        domElement={gl.domElement}
      />
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div
          style={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: 8,
            fontFamily: 'monospace',
            fontSize: 13,
            lineHeight: 1.6,
            pointerEvents: 'auto',
            cursor: 'pointer',
            zIndex: 9999,
          }}
          onClick={copyToClipboard}
          title="클릭하면 클립보드에 복사"
        >
          <div style={{ color: '#e8933b', marginBottom: 4, fontWeight: 'bold' }}>
            📷 Camera Debug (클릭 → 복사)
          </div>
          <div>pos: [{fmt(pos.x)}, {fmt(pos.y)}, {fmt(pos.z)}]</div>
          <div>lookAt: [{fmt(lookAt.x)}, {fmt(lookAt.y)}, {fmt(lookAt.z)}]</div>
          <div style={{ color: '#888', fontSize: 11, marginTop: 6 }}>
            WASD: 이동 | Q/E: 상하 | 좌클릭: 회전 | 우클릭: 팬 | 스크롤: 줌
          </div>
        </div>
      </Html>
    </>
  )
}
