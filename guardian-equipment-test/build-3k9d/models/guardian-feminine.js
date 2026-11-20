
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ============================================
// LIFE RPG — BUILD 3K.9F
// FEMININE GUARDIAN MODEL
// CLEAN VERSION — DIAGNOSTIC REMOVED
// ============================================

export const feminineGuardianDefinition = Object.freeze({
  id: 'guardian-feminine',

  assetPath:
    '../../guardian-3d-test/feminine-test/Superhero_Female_FullBody.gltf',

  targetHeight: 2.5,
  verticalOffset: 1.25,

  supportedStances: [
    'natural',
    'stance',
    'shield',
    'bow',
    'staff'
  ]
});

// ============================================
// FEMININE GUARDIAN LOADER
// ============================================

export function loadFeminineGuardian({
  onLoad,
  onError,
  loader = new GLTFLoader()
} = {}) {

  return loader.load(
    feminineGuardianDefinition.assetPath,

    gltf => {
      try {
        const guardian = gltf.scene;

        // Preserve original model dimensions.
        const bounds = new THREE.Box3()
          .setFromObject(guardian);

        const size = bounds.getSize(
          new THREE.Vector3()
        );

        const center = bounds.getCenter(
          new THREE.Vector3()
        );

        // Preserve existing model positioning.
        guardian.position.sub(center);

        guardian.scale.setScalar(
          feminineGuardianDefinition.targetHeight /
          Math.max(size.y, 0.001)
        );

        guardian.position.y +=
          feminineGuardianDefinition.verticalOffset;

        // Return the Guardian to the shared engine.
        onLoad?.(guardian);

      } catch (error) {
        console.error(
          'Feminine Guardian loading error:',
          error
        );

        onError?.(error);
      }
    },

    undefined,

    error => {
      console.error(
        'Feminine Guardian asset error:',
        error
      );

      onError?.(error);
    }
  );
}
