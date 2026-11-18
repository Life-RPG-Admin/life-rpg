
  // BASIC REAR HANDLE — Build 3K.4G
  // Single vertical grip, no cosmetics.

  const rearSurfaceZ = -d.thickness / 2 - 0.018;
  const handleZ = rearSurfaceZ - 0.19;
  const handleLength = d.height * 0.38;

  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.055,
      0.055,
      handleLength,
      16
    ),
    new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 0.7
    })
  );

  handle.name = 'Basic Shield Handle';
  handle.position.set(0, 0, handleZ);
  shield.add(handle);
