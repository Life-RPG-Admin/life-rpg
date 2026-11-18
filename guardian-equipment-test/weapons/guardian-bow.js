
import * as THREE from 'three';

// LIFE RPG — Build 3K.5C
// Guardian Recurve Bow — Proportion Refinement
// Independent reusable 3D weapon asset.
// Guardian stance and attachment origin unchanged.

export const bowDefinition = {
  id: 'guardian-recurve-bow-001',
  name: 'Guardian Recurve Bow',
  version: '3K.5C',
  weaponType: 'bow',
  arm: 'left',

  dimensions: {
    height: 2.15,
    width: 0.48,
    limbRadius: 0.044,
    gripLength: 0.30,
    gripRadius: 0.052,
    stringRadius: 0.006
  },

  attachment: {
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  }
};

export function createGuardianBow(
  dimensions = bowDefinition.dimensions
) {
  const d = {
    ...bowDefinition.dimensions,
    ...dimensions
  };

  const bow = new THREE.Group();
  bow.name = bowDefinition.id;

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x59371f,
    roughness: 0.62,
    metalness: 0.04
  });

  const limbMaterial = new THREE.MeshStandardMaterial({
    color: 0x78502c,
    roughness: 0.56,
    metalness: 0.03
  });

  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d2019,
    roughness: 0.92
  });

  const stringMaterial = new THREE.MeshStandardMaterial({
    color: 0xd3c4a4,
    roughness: 0.9
  });

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x9d8964,
    metalness: 0.72,
    roughness: 0.38
  });

  const halfHeight = d.height / 2;

  // LOCAL COORDINATES
  // Y = bow height
  // X = recurve profile
  // Z = depth
  // Grip remains centered at origin.

  // Refined, longer recurve limbs.
  const upperPoints = [
    [0, 0],
    [-0.08, halfHeight * 0.20],
    [-0.18, halfHeight * 0.46],
    [-0.23, halfHeight * 0.71],
    [-0.15, halfHeight * 0.89],
    [0.025, halfHeight]
  ];

  const makeLimb = side => {
    const points = upperPoints.map(
      ([x, y]) => new THREE.Vector3(
        x,
        y * side,
        0
      )
    );

    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      'centripetal'
    );

    const geometry = new THREE.TubeGeometry(
      curve,
      64,
      d.limbRadius,
      12,
      false
    );

    const mesh = new THREE.Mesh(
      geometry,
      limbMaterial
    );

    mesh.name = side > 0
      ? 'UpperRecurveLimb'
      : 'LowerRecurveLimb';

    bow.add(mesh);
  };

  makeLimb(1);
  makeLimb(-1);

  // CENTRAL WOODEN RISER.
  const riser = new THREE.Mesh(
    new THREE.CylinderGeometry(
      d.gripRadius * 0.85,
      d.gripRadius * 0.85,
      d.gripLength * 1.45,
      12
    ),
    woodMaterial
  );

  riser.name = 'BowRiser';
  bow.add(riser);

  // LEATHER-WRAPPED GRIP.
  const grip = new THREE.Mesh(
    new THREE.CylinderGeometry(
      d.gripRadius,
      d.gripRadius,
      d.gripLength,
      12
    ),
    leatherMaterial
  );

  grip.name = 'BowGrip';
  bow.add(grip);

  // DECORATIVE GRIP WRAPS.
  for (let i = 0; i < 7; i++) {
    const wrap = new THREE.Mesh(
      new THREE.TorusGeometry(
        d.gripRadius + 0.002,
        0.004,
        6,
        20
      ),
      metalMaterial
    );

    wrap.rotation.x = Math.PI / 2;
    wrap.position.y =
      -d.gripLength / 2 +
      (i + 0.5) * d.gripLength / 7;

    bow.add(wrap);
  }

  // BOWSTRING — STATIC FOR THIS SIZE TEST.
  const upperTip = new THREE.Vector3(
    0.025,
    halfHeight,
    0
  );

  const lowerTip = new THREE.Vector3(
    0.025,
    -halfHeight,
    0
  );

  const stringCenter = new THREE.Vector3(
    d.width * 0.55,
    0,
    0
  );

  const stringCurve = new THREE.CatmullRomCurve3([
    lowerTip,
    stringCenter,
    upperTip
  ]);

  const bowstring = new THREE.Mesh(
    new THREE.TubeGeometry(
      stringCurve,
      40,
      d.stringRadius,
      8,
      false
    ),
    stringMaterial
  );

  bowstring.name = 'Bowstring';
  bow.add(bowstring);

  // REINFORCED LIMB TIPS.
  for (const side of [-1, 1]) {
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(
        d.limbRadius * 1.25,
        12,
        8
      ),
      metalMaterial
    );

    tip.position.set(
      0.025,
      side * halfHeight,
      0
    );

    bow.add(tip);
  }

  // INDEPENDENT EQUIPMENT METADATA.
  bow.userData = {
    weaponId: bowDefinition.id,
    weaponType: 'bow',
    attachmentArm: 'left',
    gripType: 'single-hand-center-grip',

    gripLocalPosition: [0, 0, 0],

    stringRestLocalPosition: [
      stringCenter.x,
      stringCenter.y,
      stringCenter.z
    ],

    stringUpperTip: upperTip.toArray(),
    stringLowerTip: lowerTip.toArray(),

    dimensions: { ...d },

    supportsDrawAnimation: true,
    supportsArrowAttachment: true
  };

  return bow;
}
  
