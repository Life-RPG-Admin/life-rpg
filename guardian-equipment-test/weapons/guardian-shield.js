
import * as THREE from 'three';

// LIFE RPG — Build 3K.4K
// Independent Guardian Heater Shield
// Vertical rear handle prototype.

export const shieldDefinition = {
  id: 'guardian-shield-001',
  name: 'Guardian Heater Shield',
  version: '3K.4K',
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
    metalness: 0.24,
    roughness: 0.66
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xb99a59,
    metalness: 0.72,
    roughness: 0.3
  });

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0x737f8b,
    metalness: 0.8,
    roughness: 0.27
  });

  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x35251c,
    roughness: 0.92
  });

  const w = d.width / 2;
  const h = d.height / 2;

  // Approved heater shield silhouette.
  const outline = [
    [-w * 0.88, h * 0.92],
    [ w * 0.88, h * 0.92],
    [ w, h * 0.62],
    [ w * 0.9, h * 0.12],
    [ w * 0.65, -h * 0.48],
    [0, -h],
    [-w * 0.65, -h * 0.48],
    [-w * 0.9, h * 0.12],
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

  body.position.z = -d.thickness / 2;
  shield.add(body);

  // Gold rim on the shield's front.
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
      96,
      d.rimWidth / 2,
      8,
      true
    ),
    rimMaterial
  );

  shield.add(rim);

  // Existing central steel boss.
  const boss = new THREE.Mesh(
    new THREE.SphereGeometry(
      d.bossRadius,
      24,
      16
    ),
    steelMaterial
  );

  boss.scale.set(1, 1, 0.42);
  boss.position.set(
    0,
    0.025,
    d.thickness / 2 + 0.025
  );

  shield.add(boss);

  // ---------------------------------
  // NEW SIMPLE VERTICAL REAR HANDLE
  // ---------------------------------

  // Rear of the shield faces negative Z.
  const rearSurface = -d.thickness / 2;

  // Adjustable handle geometry metadata.
  // These are local shield coordinates.
  const handle = {
    x: 0,
    y: 0.10,
    z: rearSurface - 0.15,
    length: 0.34,
    radius: 0.043
  };

  const grip = new THREE.Mesh(
    new THREE.CylinderGeometry(
      handle.radius,
      handle.radius,
      handle.length,
      12
    ),
    leatherMaterial
  );

  // Cylinder axis is naturally vertical.
  grip.position.set(
    handle.x,
    handle.y,
    handle.z
  );

  grip.name = 'GuardianShieldVerticalGrip';
  shield.add(grip);

  // Two small metal mounting points.
  // No straps or large backing plates.
  const bracketRadius = 0.038;

  for (const direction of [-1, 1]) {
    const bracketY =
      handle.y +
      direction * handle.length * 0.43;

    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.085,
        0.065,
        Math.abs(handle.z - rearSurface) + 0.035
      ),
      steelMaterial
    );

    bracket.position.set(
      handle.x,
      bracketY,
      (rearSurface + handle.z) / 2
    );

    shield.add(bracket);

    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(
        bracketRadius,
        10,
        8
      ),
      steelMaterial
    );

    cap.position.set(
      handle.x,
      bracketY,
      handle.z
    );

    shield.add(cap);
  }

  // Independent weapon metadata.
  shield.userData = {
    weaponId: shieldDefinition.id,
    weaponType: 'shield',
    attachmentArm: 'left',
    gripType: 'vertical-rear-handle',

    gripLocalPosition: [
      handle.x,
      handle.y,
      handle.z
    ],

    gripLength: handle.length,

    dimensions: {
      ...d
    }
  };

  return shield;
    }
