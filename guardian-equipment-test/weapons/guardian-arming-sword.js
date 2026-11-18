
import * as THREE from 'three';

export const armingSwordDefinition = {
  id: 'guardian-arming-sword-001',
  name: 'Guardian Arming Sword',
  version: '3K.4A',
  hand: 'right',

  dimensions: {
    bladeLength: 2.65,
    bladeWidth: 0.19,
    bladeThickness: 0.065,
    handleLength: 0.65,
    handleRadius: 0.055,
    crossguardWidth: 0.72,
    pommelRadius: 0.085
  },

  attachment: {
    bladeAngle: 0,
    gripOffset: [0, 0, 0]
  }
};

export function createGuardianArmingSword(
  dimensions = armingSwordDefinition.dimensions
) {
  const d = { ...armingSwordDefinition.dimensions, ...dimensions };
  const sword = new THREE.Group();
  sword.name = armingSwordDefinition.id;

  const steel = new THREE.MeshStandardMaterial({
    color: 0xc4ccd4,
    metalness: 0.85,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const darkSteel = new THREE.MeshStandardMaterial({
    color: 0x707985,
    metalness: 0.8,
    roughness: 0.3
  });

  const leather = new THREE.MeshStandardMaterial({
    color: 0x35251c,
    roughness: 0.9
  });

  const gold = new THREE.MeshStandardMaterial({
    color: 0xb59a61,
    metalness: 0.75,
    roughness: 0.3
  });

  function addMesh(geometry, material, name) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    sword.add(mesh);
    return mesh;
  }

  // Grip is centred at the asset origin.
  const grip = addMesh(
    new THREE.CylinderGeometry(
      d.handleRadius,
      d.handleRadius,
      d.handleLength,
      12
    ),
    leather,
    'Leather Grip'
  );

  grip.position.y = 0;

  // Guard sits above the grip.
  const guardY = d.handleLength / 2 + 0.045;

  const guard = addMesh(
    new THREE.BoxGeometry(
      d.crossguardWidth,
      0.09,
      0.13
    ),
    darkSteel,
    'Crossguard'
  );

  guard.position.y = guardY;

  // Decorative guard centre.
  const guardCentre = addMesh(
    new THREE.SphereGeometry(0.105, 12, 8),
    gold,
    'Guard Centre'
  );

  guardCentre.position.y = guardY;

  // Blade runs upwards from the guard.
  const bladeBaseY = guardY + 0.055;
  const bladeTipY = bladeBaseY + d.bladeLength;

  const w = d.bladeWidth / 2;
  const t = d.bladeThickness / 2;
  const shoulderY = bladeBaseY + d.bladeLength * 0.83;

  // Diamond cross-section, tapering to a point.
  const vertices = new Float32Array([
    -w, bladeBaseY, 0,
     0, bladeBaseY, t,
     w, bladeBaseY, 0,
     0, bladeBaseY, -t,

    -w * 0.75, shoulderY, 0,
     0, shoulderY, t * 0.65,
     w * 0.75, shoulderY, 0,
     0, shoulderY, -t * 0.65,

     0, bladeTipY, 0
  ]);

  const indices = [];

  for (let i = 0; i < 4; i++) {
    const next = (i + 1) % 4;

    indices.push(i, next, next + 4);
    indices.push(i, next + 4, i + 4);
    indices.push(i + 4, next + 4, 8);
  }

  indices.push(0, 2, 1);
  indices.push(0, 3, 2);

  const bladeGeometry = new THREE.BufferGeometry();
  bladeGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(vertices, 3)
  );
  bladeGeometry.setIndex(indices);
  bladeGeometry.computeVertexNormals();

  addMesh(bladeGeometry, steel, 'Steel Blade');

  // Pommel at the bottom of the handle.
  const pommel = addMesh(
    new THREE.SphereGeometry(
      d.pommelRadius,
      16,
      12
    ),
    gold,
    'Pommel'
  );

  pommel.position.y =
    -d.handleLength / 2 - d.pommelRadius * 0.45;

  sword.userData = {
    weaponId: armingSwordDefinition.id,
    weaponType: 'one-handed-sword',
    gripHand: 'right',
    gripLocalPosition: [0, 0, 0],
    dimensions: { ...d }
  };

  return sword;
}
  
