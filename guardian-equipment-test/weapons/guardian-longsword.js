
import * as THREE from 'three';

export const weaponDefinition = {
  id: 'guardian-longsword-001',
  name: 'Guardian Longsword',
  category: 'longsword',
  cosmetic: true,
  rarity: 'common',
  statBonus: 0,

  dimensions: {
    bladeLength: 2.5,
    bladeWidth: 0.195,
    bladeThickness: 0.055,
    handleLength: 1.2,
    handleRadius: 0.065,
    crossguardWidth: 0.95,
    pommelRadius: 0.085
  },

  attachment: {
    bladeAngle: 28,
    gripOffset: [-0.26, 0.5, 0.27]
  }
};

const steel = new THREE.MeshStandardMaterial({
  color: 0xbecbd6,
  metalness: 0.85,
  roughness: 0.24,
  side: THREE.DoubleSide
});

const brightSteel = new THREE.MeshStandardMaterial({
  color: 0xe2eaf0,
  metalness: 0.88,
  roughness: 0.2
});

const darkSteel = new THREE.MeshStandardMaterial({
  color: 0x56636e,
  metalness: 0.75,
  roughness: 0.32
});

const leather = new THREE.MeshStandardMaterial({
  color: 0x4c3024,
  roughness: 0.88
});

const gold = new THREE.MeshStandardMaterial({
  color: 0xb99a59,
  metalness: 0.75,
  roughness: 0.3
});

function cylinder(top, bottom, height, material) {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(
      top, bottom, height, 16
    ),
    material
  );
}

function bladeGeometry(length, width, thickness) {
  const half = width / 2;
  const ridge = thickness / 2;

  const stations = [
    { y: 0, w: half },
    { y: length * 0.72, w: half * 0.72 },
    { y: length * 0.92, w: half * 0.38 },
    { y: length, w: 0 }
  ];

  const positions = [];
  const indices = [];

  for (const station of stations) {
    const { y, w } = station;

    positions.push(
      -w, y, 0,
      0, y, ridge,
      w, y, 0,
      0, y, -ridge
    );
  }

  for (let i = 0; i < stations.length - 1; i++) {
    const a = i * 4;
    const b = (i + 1) * 4;

    for (let j = 0; j < 4; j++) {
      const next = (j + 1) % 4;

      indices.push(a+j, a+next, b+j);
      indices.push(a+next, b+next, b+j);
    }
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      positions, 3
    )
  );

  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

export function createGuardianLongsword(dimensions = {}) {
  const d = {
    ...weaponDefinition.dimensions,
    ...dimensions
  };

  const root = new THREE.Group();
  root.name = weaponDefinition.id;
  root.userData.weaponId = weaponDefinition.id;

  // Main blade
  const blade = new THREE.Mesh(
    bladeGeometry(
      d.bladeLength,
      d.bladeWidth,
      d.bladeThickness
    ),
    steel
  );

  blade.name = 'Blade';
  root.add(blade);

  // Central fuller
  const fuller = new THREE.Mesh(
    new THREE.BoxGeometry(
      d.bladeWidth * 0.16,
      d.bladeLength * 0.48,
      d.bladeThickness * 0.15
    ),
    brightSteel
  );

  fuller.position.y = d.bladeLength * 0.27;
  fuller.position.z = d.bladeThickness * 0.51;
  fuller.name = 'Fuller';

  root.add(fuller);

  // Crossguard
  const guard = cylinder(
    0.035,
    0.035,
    d.crossguardWidth,
    darkSteel
  );

  guard.rotation.z = Math.PI / 2;
  guard.name = 'Crossguard';
  root.add(guard);

  for (const x of [
    -d.crossguardWidth / 2,
    d.crossguardWidth / 2
  ]) {
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.045, 12, 8
      ),
      gold
    );

    cap.position.x = x;
    root.add(cap);
  }

  // Handle
  const grip = cylinder(
    d.handleRadius,
    d.handleRadius,
    d.handleLength,
    leather
  );

  grip.position.y = -d.handleLength / 2;
  grip.name = 'Handle';

  root.add(grip);

  // Grip bands
  for (let i = 1; i <= 5; i++) {
    const band = cylinder(
      d.handleRadius + 0.003,
      d.handleRadius + 0.003,
      0.012,
      gold
    );

    band.position.y =
      -d.handleLength * i / 6;

    root.add(band);
  }

  // Pommel
  const pommel = new THREE.Mesh(
    new THREE.SphereGeometry(
      d.pommelRadius, 16, 12
    ),
    gold
  );

  pommel.position.y = -d.handleLength;
  pommel.name = 'Pommel';

  root.add(pommel);

  // Reusable grip attachment points
  const upperGrip = new THREE.Object3D();
  upperGrip.name = 'UpperGrip';
  upperGrip.position.y =
    -d.handleLength * 0.25;
  root.add(upperGrip);

  const lowerGrip = new THREE.Object3D();
  lowerGrip.name = 'LowerGrip';
  lowerGrip.position.y =
    -d.handleLength * 0.75;
  root.add(lowerGrip);

  // Reserved for future wardrobe functionality
  const sheathMount = new THREE.Object3D();
  sheathMount.name = 'SheathMount';
  root.add(sheathMount);

  return root;
      }
      
