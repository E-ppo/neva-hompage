'use client'

export function Lighting() {
  return (
    <>
      {/* Ambient: 전체를 밝게 */}
      <ambientLight intensity={1.8} color="#ffffff" />

      {/* Main directional: 위에서 내려오는 밝은 조명 */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={2.0}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light: 반대쪽 보조 */}
      <directionalLight
        position={[-5, 6, -3]}
        intensity={1.0}
        color="#f0ebe3"
      />

      {/* Point light: 정면 보조광 */}
      <pointLight
        position={[0, 4, 6]}
        intensity={1.0}
        color="#ffffff"
        distance={20}
        decay={2}
      />
    </>
  )
}
