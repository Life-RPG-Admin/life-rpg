
import * as THREE from 'three';

// LIFE RPG — Build 3K.5D
// Guardian Recurve Bow
// Independent reusable 3D weapon asset.
// Dynamic three-point bowstring.

export const bowDefinition = {
  id: 'guardian-recurve-bow-001',
  name: 'Guardian Recurve Bow',
  version: '3K.5D',
  weaponType: 'bow',
  arm: 'left',

  dimensions: {
    height: 1.85,
    width: 0.42,
    limbRadius: 0.038,
    gripLength: 0.28,
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

  // Original recurve limb profile — preserved.

  const upperPoints = [
    [0, 0],
    [-0.075, halfHeight * 0.22],
    [-0.17, halfHeight * 0.48],
    [-0.21, halfHeight * 0.72],
    [-0.13, halfHeight * 0.89],
    [0.02, halfHeight]
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

    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        48,
        d.limbRadius,
        10,
        false
      ),
      limbMaterial
    );

    mesh.name = side > 0
      ? 'UpperRecurveLimb'
      : 'LowerRecurveLimb';

    bow.add(mesh);
  };

  makeLimb(1);
  makeLimb(-1);

  // Original wooden riser.

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

  // Original leather grip.

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

  // Original decorative wraps.

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

  // String anchor points in bow-local space.

  const upperTip = new THREE.Vector3(
    0.02,
    halfHeight,
    0
  );

  const lowerTip = new THREE.Vector3(
    0.02,
    -halfHeight,
    0
  );

  const stringRest = new THREE.Vector3(
    d.width * 0.55,
    0,
    0
  );

  // Dynamic string is made of two straight segments.
  // The centre will be controlled by the drawing hand.

  const stringGeometry = new THREE.BufferGeometry();

  const stringPositions = new Float32Array(9);

  stringGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      stringPositions,
      3
    )
  );

  const bowstring = new THREE.Line(
    stringGeometry,
    new THREE.LineBasicMaterial({
      color: 0xd3c4a4
    })
  );

  bowstring.name = 'Bowstring';
  bow.add(bowstring);

  // Update the three string vertices.

  function setStringLocalPoint(point) {
    const p = point || stringRest;

    const a = stringGeometry.attributes.position;

    a.setXYZ(
      0,
      lowerTip.x,
      lowerTip.y,
      lowerTip.z
    );

    a.setXYZ(
      1,
      p.x,
      p.y,
      p.z
    );

    a.setXYZ(
      2,
      upperTip.x,
      upperTip.y,
      upperTip.z
    );

    a.needsUpdate = true;
    stringGeometry.computeBoundingSphere();
  }

  setStringLocalPoint(stringRest);

  // Convert a world-space drawing-hand position
  // into bow-local coordinates.

  function connectStringToWorldPoint(worldPoint) {
    if (!worldPoint) {
      setStringLocalPoint(stringRest);
      return;
    }

    bow.updateWorldMatrix(true, false);

    const localPoint = bow.worldToLocal(
      worldPoint.clone()
    );

    setStringLocalPoint(localPoint);
  }

  // Reinforced limb tips.

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
      0.02,
      side * halfHeight,
      0
    );

    bow.add(tip);
  }

  // Public methods for Guardian integration.

  bow.connectStringToWorldPoint =
    connectStringToWorldPoint;

  bow.resetString = () => {
    setStringLocalPoint(stringRest);
  };

  bow.userData = {
    weaponId: bowDefinition.id,
    weaponType: 'bow',
    attachmentArm: 'left',
    gripType: 'single-hand-center-grip',

    gripLocalPosition: [0, 0, 0],

    stringRestLocalPosition:
      stringRest.toArray(),

    stringUpperTip:
      upperTip.toArray(),

    stringLowerTip:
      lowerTip.toArray(),

    dimensions: { ...d },

    supportsDrawAnimation: true,
    supportsArrowAttachment: true,
    dynamicString: true
  };

  return bow;
        }
