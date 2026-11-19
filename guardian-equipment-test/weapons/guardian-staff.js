
import * as THREE from 'three';

// LIFE RPG — BUILD 3K.6B
// Independent Guardian Staff
// Experimental base model — NOT LOCKED

export const staffDefinition = {
  id: 'guardian-staff-001',
  category: 'staff',
  dimensions: {
    length: 3.35,
    shaftRadius: 0.052,
    headRadius: 0.105
  }
};

export function createGuardianStaff(
  dimensions = staffDefinition.dimensions
) {
  const d = dimensions;

  const staff = new THREE.Group();
  staff.name = staffDefinition.id;

  const wood = new THREE.MeshStandardMaterial({
    color: 0x76502e,
    roughness: 0.95
  });

  const darkWood = new THREE.MeshStandardMaterial({
    color: 0x4c301c,
    roughness: 1
  });

  // Main wooden shaft
  const geometry = new THREE.CylinderGeometry(
    d.shaftRadius * 0.85,
    d.shaftRadius,
    d.length,
    12,
    12
  );

  const positions = geometry.attributes.position;

  // Subtle natural wood irregularities
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);

    positions.setX(
      i,
      positions.getX(i) +
      Math.sin(y * 2.5) * 0.012
    );

    positions.setZ(
      i,
      positions.getZ(i) +
      Math.sin(y * 3.4) * 0.008
    );
  }

  geometry.computeVertexNormals();

  const shaft = new THREE.Mesh(
    geometry,
    wood
  );

  shaft.position.y = d.length / 2;
  staff.add(shaft);

  // Slightly enlarged wooden head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(
      d.headRadius,
      16,
      12
    ),
    wood
  );

  head.scale.set(1, 1.4, 0.95);
  head.position.y = d.length - 0.025;
  staff.add(head);

  // Natural reinforcement beneath head
  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(
      d.shaftRadius * 1.2,
      d.shaftRadius,
      0.18,
      12
    ),
    darkWood
  );

  collar.position.y = d.length - 0.2;
  staff.add(collar);

  staff.userData.weaponId = staffDefinition.id;
  staff.userData.dimensions = { ...d };

  return staff;
    }
