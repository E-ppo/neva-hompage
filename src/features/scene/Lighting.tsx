'use client'

export function Lighting() {
  return (
    <>
      {/* Ambient: warm base light */}
      <ambientLight intensity={0.3} color="#f5c472" />

      {/* Main directional: golden hour sunlight through window */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        color="#e8933b"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light: softer warm fill from opposite side */}
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.4}
        color="#f0ebe3"
      />

      {/* Point light: desk lamp effect */}
      <pointLight
        position={[0, 3, 2]}
        intensity={0.6}
        color="#f5c472"
        distance={10}
        decay={2}
      />

      {/* Subtle rim light for depth */}
      <pointLight
        position={[0, 5, -5]}
        intensity={0.3}
        color="#e8933b"
        distance={15}
        decay={2}
      />
    </>
  )
}
