
import * as THREE from 'three';

export const shieldDefinition = {
  id: 'guardian-shield-001',
  name: 'Guardian Heater Shield',
  version: '3K.4B',
  arm: 'left',

  dimensions: {
    height: 1.35,
    width: 0.95,
    thickness: 0.085,
    rimWidth: 0.055,
    bossRadius: 0.14
  },

  attachment: {
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  }
};

export function createGuardianShield(
  dimensions = shieldDefinition.dimensions
) {
  const d = { ...shieldDefinition.dimensions, ...dimensions };
  const shield = new THREE.Group();
  shield.name = shieldDefinition.id;

  const faceMaterial = new THREE.MeshStandardMaterial({
    color: 0x263b57,
    metalness: 0.45,
    roughness: 0.5,
    side: THREE.DoubleSide
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xb99a59,
    metalness: 0.8,
    roughness: 0.3
  });

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0x737f8b,
    metalness: 0.85,
    roughness: 0.3
  });

  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x35251c,
    roughness: 0.9
  });

  const w = d.width / 2;
  const h = d.height / 2;

  // Shield silhouette: broad shoulders, pointed bottom.
  const outline = [
    [-w * 0.90, h * 0.90],
    [ w * 0.90, h * 0.90],
    [ w, h * 0.55],
    [ w * 0.83, -h * 0.30],
    [ 0, -h],
    [-w * 0.83, -h * 0.30],
    [-w, h * 0.55]
  ];

  const shape = new THREE.Shape();
  shape.moveTo(outline[0][0], outline[0][1]);

  for (let i = 1; i < outline.length; i++) {
    shape.lineTo(outline[i][0], outline[i][1]);
  }

  shape.closePath();

  const bodyGeometry = new THREE.ExtrudeGeometry(shape, {
    depth: d.thickness,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2,
    steps: 1
  });

  const body = new THREE.Mesh(bodyGeometry, faceMaterial);
  body.name = 'Shield Body';
  body.position.z = -d.thickness / 2;
  shield.add(body);

  // Raised metal rim around the front edge.
  const rimPoints = outline.map(
    p => new THREE.Vector3(p[0], p[1], d.thickness / 2 + 0.02)
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
      64,
      d.rimWidth / 2,
      8,
      true
    ),
    rimMaterial
  );

  rim.name = 'Shield Rim';
  shield.add(rim);

  // Central shield boss.
  const boss = new THREE.Mesh(
    new THREE.SphereGeometry(
      d.bossRadius,
      20,
      12,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    ),
    steelMaterial
  );

  boss.name = 'Shield Boss';
  boss.position.z = d.thickness / 2 + 0.015;
  shield.add(boss);

  // Rear grip handle.
  const grip = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.035,
      0.035,
      d.width * 0.42,
      10
    ),
    leatherMaterial
  );

  grip.name = 'Rear Grip';
  grip.rotation.z = Math.PI / 2;
  grip.position.z = -d.thickness / 2 - 0.065;
  shield.add(grip);

  // Rear forearm straps.
  for (const y of [-0.20, 0.20]) {
    const strap = new THREE.Mesh(
      new THREE.BoxGeometry(
        d.width * 0.55,
        0.075,
        0.045
      ),
      leatherMaterial
    );

    strap.name = 'Forearm Strap';
    strap.position.set(
      0,
      y,
      -d.thickness / 2 - 0.045
    );

    shield.add(strap);
  }

  shield.userData = {
    weaponId: shieldDefinition.id,
    weaponType: 'shield',
    attachmentArm: 'left',
    dimensions: { ...d }
  };

  return shield;
}
