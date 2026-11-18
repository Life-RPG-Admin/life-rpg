
import * as THREE from 'three';

// LIFE RPG — Build 3K.4F
// Guardian Heater Shield — Single Rear Handle
// Independent reusable equipment asset.

export const shieldDefinition = {
  id: 'guardian-shield-001',
  name: 'Guardian Heater Shield',
  version: '3K.4F',
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

export function createGuardianShield(
  dimensions = shieldDefinition.dimensions
) {
  const d = {
    ...shieldDefinition.dimensions,
    ...dimensions
  };

  const shield = new THREE.Group();
  shield.name = shieldDefinition.id;

  const faceMaterial = new THREE.MeshStandardMaterial({
    color: 0x263b57,
    metalness: 0.35,
    roughness: 0.55,
    side: THREE.DoubleSide
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xb99a59,
    metalness: 0.8,
    roughness: 0.28
  });

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0x737f8b,
    metalness: 0.85,
    roughness: 0.3
  });

  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x35251c,
    roughness: 0.85
  });

  const w = d.width / 2;
  const h = d.height / 2;

  // Original enlarged heater-shield silhouette.
  const outline = [
    [-w * 0.88, h * 0.92],
    [ w * 0.88, h * 0.92],
    [ w, h * 0.62],
    [ w * 0.90, h * 0.12],
    [ w * 0.65, -h * 0.48],
    [ 0, -h],
    [-w * 0.65, -h * 0.48],
    [-w * 0.90, h * 0.12],
    [-w, h * 0.62]
  ];

  const shape = new THREE.Shape();
  shape.moveTo(outline[0][0], outline[0][1]);

  for (let i = 1; i < outline.length; i++) {
    shape.lineTo(outline[i][0], outline[i][1]);
  }

  shape.closePath();

  // Main shield body.
  const bodyGeometry = new THREE.ExtrudeGeometry(
    shape,
    {
      depth: d.thickness,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 2,
      steps: 1
    }
  );

  const body = new THREE.Mesh(
    bodyGeometry,
    faceMaterial
  );

  body.name = 'Shield Body';
  body.position.z = -d.thickness / 2;
  shield.add(body);

  // Gold rim.
  const rimPoints = outline.map(
    p => new THREE.Vector3(
      p[0],
      p[1],
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
    rimMaterial
  );

  rim.name = 'Gold Shield Rim';
  shield.add(rim);

  // Front central boss.
  const boss = new THREE.Mesh(
    new THREE.SphereGeometry(
      d.bossRadius,
      24,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    ),
    steelMaterial
  );

  boss.name = 'Central Steel Boss';
  boss.position.z = d.thickness / 2 + 0.02;
  shield.add(boss);

  // SINGLE REAR HANDLE SYSTEM
  // No straps, padding or large mounting plate.

  const rearSurfaceZ = -d.thickness / 2 - 0.018;
  const handleZ = rearSurfaceZ - 0.19;
  const handleLength = d.height * 0.38;
  const handleRadius = 0.052;

  // Vertical leather-wrapped handle.
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(
      handleRadius,
      handleRadius,
      handleLength,
      16
    ),
    leatherMaterial
  );

  handle.name = 'Vertical Rear Hand Grip';
  handle.position.set(0, 0, handleZ);
  shield.add(handle);

  // Two solid mounting brackets.
  const bracketOffset = handleLength * 0.44;
  const bracketDepth = rearSurfaceZ - handleZ;

  for (const y of [
    -bracketOffset,
     bracketOffset
  ]) {
    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.115,
        0.105,
        Math.abs(bracketDepth) + 0.055
      ),
      steelMaterial
    );

    bracket.name = 'Handle Mounting Bracket';
    bracket.position.set(
      0,
      y,
      (rearSurfaceZ + handleZ) / 2
    );

    shield.add(bracket);

    // Visible rear mounting rivet.
    const rivet = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.045,
        12,
        10
      ),
      steelMaterial
    );

    rivet.name = 'Handle Bracket Rivet';
    rivet.position.set(
      0,
      y,
      rearSurfaceZ - 0.012
    );

    shield.add(rivet);
  }

  // Leather grip rings for visual texture.
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x4c3527,
    roughness: 0.9
  });

  for (let i = 0; i < 9; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(
        handleRadius + 0.003,
        0.006,
        6,
        16
      ),
      ringMaterial
    );

    ring.name = 'Leather Grip Wrap';
    ring.rotation.x = Math.PI / 2;

    ring.position.set(
      0,
      -handleLength * 0.34 +
      i * handleLength * 0.085,
      handleZ
    );

    shield.add(ring);
  }

  // Grip metadata for later attachment calibration.
  shield.userData = {
    weaponId: shieldDefinition.id,
    weaponType: 'shield',
    attachmentArm: 'left',
    gripType: 'single-vertical-handle',
    gripLocalPosition: [0, 0, handleZ],
    gripLocalAxis: [0, 1, 0],
    dimensions: { ...d }
  };

  return shield;
}
