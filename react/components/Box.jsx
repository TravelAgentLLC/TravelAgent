import React from 'react';

export default function Box() {
  return (
    <mesh rotation={[80, 0, 25]}>
      <boxGeometry attach='geometry' args={[3, 3, 3]} />
      <meshLambertMaterial attach='material' color='blue' />
    </mesh>
  );
}
