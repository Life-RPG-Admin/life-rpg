// LIFE RPG — Build 3K.8B
// Reusable masculine Guardian model loader.
// Preserve the original 3K.7 mesh, proportions, and normalization.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const masculineGuardianDefinition = Object.freeze({
  id: 'guardian-masculine',
  assetPath: '../../guardian-3d-test/Superhero_Male_FullBody.gltf',
  targetHeight: 2.5,
  verticalOffset: 1.25,
  supportedStances: ['natural','stance','shield','bow','staff']
});

export function loadMasculineGuardian({ onLoad, onError, loader = new GLTFLoader() } = {}) {
  return loader.load(masculineGuardianDefinition.assetPath, gltf => {
    try {
      const guardian = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(guardian);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      guardian.position.sub(center);
      guardian.scale.setScalar(masculineGuardianDefinition.targetHeight / Math.max(size.y, .001));
      guardian.position.y += masculineGuardianDefinition.verticalOffset;
      onLoad?.(guardian);
    } catch (error) { onError?.(error); }
  }, undefined, error => onError?.(error));
}
