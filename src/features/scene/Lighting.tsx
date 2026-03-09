'use client'

export function Lighting() {
  return (
    <>
      {/* Ambient: 전체 기본 밝기 */}
      <ambientLight intensity={1.2} color="#ffffff" />

      {/* Main directional: 위에서 내려오는 주 조명 */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.4}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light: 반대쪽 보조 */}
      <directionalLight
        position={[-5, 6, -3]}
        intensity={0.6}
        color="#f0ebe3"
      />

      {/* Point light: 정면 보조광 */}
      <pointLight
        position={[0, 4, 6]}
        intensity={0.6}
        color="#ffffff"
        distance={20}
        decay={2}
      />
    </>
  )
}
