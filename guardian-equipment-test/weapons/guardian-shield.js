
import * as THREE from 'three';

// LIFE RPG — Build 3K.4E
// Guardian Heater Shield
// Original enlarged shield with rear straps.

export const shieldDefinition = {
  id: 'guardian-shield-001',
  name: 'Guardian Heater Shield',
  version: '3K.4E',
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
    roughness: 0.9
  });

  const darkLeather = new THREE.MeshStandardMaterial({
    color: 0x211711,
    roughness: 0.95
  });

  const w = d.width / 2;
  const h = d.height / 2;

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
  shape.moveTo(outline[0][0], outline[0][1]);

  for (let i = 1; i < outline.length; i++) {
    shape.lineTo(outline[i][0], outline[i][1]);
  }

  shape.closePath();

  // Main shield body
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

  // Gold outer rim
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

  // Central steel boss
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

  // Rear mounting plate
  const backZ = -d.thickness / 2 - 0.035;

  const mountingPlate = new THREE.Mesh(
    new THREE.BoxGeometry(
      d.width * 0.48,
      d.height * 0.38,
      0.035
    ),
    darkLeather
  );

  mountingPlate.name = 'Rear Mounting Plate';
  mountingPlate.position.z = backZ;
  shield.add(mountingPlate);

  // Original horizontal rear grip
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.045,
      0.045,
      d.width * 0.42,
      12
    ),
    leatherMaterial
  );

  handle.name = 'Rear Hand Grip';
  handle.rotation.z = Math.PI / 2;
  handle.position.set(
    0,
    -d.height * 0.08,
    backZ - 0.095
  );

  shield.add(handle);

  // Metal grip brackets
  for (const x of [
    -d.width * 0.20,
     d.width * 0.20
  ]) {
    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.055,
        0.12,
        0.13
      ),
      steelMaterial
    );

    bracket.name = 'Grip Mounting Bracket';
    bracket.position.set(
      x,
      -d.height * 0.08,
      backZ - 0.045
    );

    shield.add(bracket);
  }

  // Original curved forearm straps
  for (const y of [
    d.height * 0.13,
    d.height * 0.32
  ]) {
    const strapCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(
        -d.width * 0.27,
        y,
        backZ
      ),
      new THREE.Vector3(
        -d.width * 0.17,
        y,
        backZ - 0.15
      ),
      new THREE.Vector3(
        0,
        y,
        backZ - 0.21
      ),
      new THREE.Vector3(
        d.width * 0.17,
        y,
        backZ - 0.15
      ),
      new THREE.Vector3(
        d.width * 0.27,
        y,
        backZ
      )
    ]);

    const strap = new THREE.Mesh(
      new THREE.TubeGeometry(
        strapCurve,
        24,
        0.035,
        8,
        false
      ),
      leatherMaterial
    );

    strap.name = 'Rear Forearm Strap';
    shield.add(strap);

    for (const x of [
      -d.width * 0.27,
       d.width * 0.27
    ]) {
      const rivet = new THREE.Mesh(
        new THREE.SphereGeometry(
          0.035,
          10,
          8
        ),
        steelMaterial
      );

      rivet.name = 'Strap Rivet';
      rivet.position.set(x, y, backZ);
      shield.add(rivet);
    }
  }

  // Rear forearm padding
  const padding = new THREE.Mesh(
    new THREE.BoxGeometry(
      d.width * 0.34,
      d.height * 0.45,
      0.055
    ),
    leatherMaterial
  );

  padding.name = 'Forearm Padding';
  padding.position.set(
    0,
    d.height * 0.10,
    backZ - 0.035
  );

  shield.add(padding);

  shield.userData = {
    weaponId: shieldDefinition.id,
    weaponType: 'shield',
    attachmentArm: 'left',
    gripType: 'rear-handgrip-and-forearm-straps',
    gripLocalPosition: [
      0,
      -d.height * 0.08,
      backZ - 0.095
    ],
    dimensions: { ...d }
  };

  return shield;
    }
        
