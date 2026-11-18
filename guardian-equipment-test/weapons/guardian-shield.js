
import * as THREE from 'three';

// LIFE RPG — Build 3K.4G
// Guardian Heater Shield
// Simple rear handle — no straps or cosmetics.

export const shieldDefinition = {
  id: 'guardian-shield-001',
  name: 'Guardian Heater Shield',
  version: '3K.4G',
  arm: 'left',

  dimensions: {
    height: 1.755,
    width: 1.235,
    thickness: 0.11,
    rimWidth: 0.065,
    bossRadius: 0.16
  },

  attachment: {
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  }
};

// Export name must match the Guardian HTML import.
export function createGuardianShield(
  dimensions = shieldDefinition.dimensions
) {
  const d = {
    ...shieldDefinition.dimensions,
    ...dimensions
  };

  const shield = new THREE.Group();
  shield.name = shieldDefinition.id;

  // Materials
  const blue = new THREE.MeshStandardMaterial({
    color: 0x263b57,
    metalness: 0.25,
    roughness: 0.6
  });

  const gold = new THREE.MeshStandardMaterial({
    color: 0xb99a59,
    metalness: 0.75,
    roughness: 0.3
  });

  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.3,
    roughness: 0.65
  });

  const w = d.width / 2;
  const h = d.height / 2;

  // Heater shield outline
  const outline = [
    [-w * 0.88, h * 0.92],
    [ w * 0.88, h * 0.92],
    [ w, h * 0.62],
    [ w * 0.90, h * 0.12],
    [ w * 0.65, -h * 0.48],
    [0, -h],
    [-w * 0.65, -h * 0.48],
    [-w * 0.90, h * 0.12],
    [-w, h * 0.62]
  ];

  const shape = new THREE.Shape();
  shape.moveTo(
    outline[0][0],
    outline[0][1]
  );

  for (let i = 1; i < outline.length; i++) {
    shape.lineTo(
      outline[i][0],
      outline[i][1]
    );
  }

  shape.closePath();

  // Main shield body
  const body = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, {
      depth: d.thickness,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 2,
      steps: 1
    }),
    blue
  );

  body.name = 'Shield Body';
  body.position.z = -d.thickness / 2;
  shield.add(body);

  // Gold border
  const rimPoints = outline.map(
    ([x, y]) => new THREE.Vector3(
      x,
      y,
      d.thickness / 2 + 0.025
    )
  );

  rimPoints.push(rimPoints[0].clone());

  const rimCurve = new THREE.CatmullRomCurve3(
    rimPoints,
    true,
    'centripetal'
  );

  const rim = new THREE.Mesh(
    new THREE.TubeGeometry(
      rimCurve,
      72,
      d.rimWidth / 2,
      8,
      true
    ),
    gold
  );

  rim.name = 'Gold Shield Border';
  shield.add(rim);

  // Simple rear handle
  // The shield's front faces local +Z.
  // The handle is behind it on local -Z.

  const rearSurfaceZ =
    -d.thickness / 2 - 0.018;

  const handleZ = rearSurfaceZ - 0.19;
  const handleLength = d.height * 0.38;
  const handleRadius = 0.055;

  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(
      handleRadius,
      handleRadius,
      handleLength,
      16
    ),
    handleMaterial
  );

  handle.name = 'Basic Vertical Handle';
  handle.position.set(
    0,
    0,
    handleZ
  );

  shield.add(handle);

  // Attachment metadata
  shield.userData = {
    weaponId: shieldDefinition.id,
    weaponType: 'shield',
    attachmentArm: 'left',
    gripType: 'single-vertical-handle',

    gripLocalPosition: [
      0,
      0,
      handleZ
    ],

    gripLocalAxis: [0, 1, 0],
    dimensions: { ...d }
  };

  return shield;
     }
    
