// LIFE RPG Build 3K.9D — feminine model loader.
// Uses the same normalization and shared stance engine as the masculine Guardian.
// No feminine-specific stance calibrations or pose overrides.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export const feminineGuardianDefinition = Object.freeze({
 id:'guardian-feminine',
 assetPath:'../../guardian-3d-test/feminine-test/Superhero_Female_FullBody.gltf',
 targetHeight:2.5,
 verticalOffset:1.25,
 supportedStances:['natural','stance','shield','bow','staff']
});
export function loadFeminineGuardian({onLoad,onError,loader=new GLTFLoader()}={}){
 return loader.load(feminineGuardianDefinition.assetPath,gltf=>{
  try{
   const guardian=gltf.scene;
   const bounds=new THREE.Box3().setFromObject(guardian);
   const size=bounds.getSize(new THREE.Vector3());
   const center=bounds.getCenter(new THREE.Vector3());
   guardian.position.sub(center);
   guardian.scale.setScalar(feminineGuardianDefinition.targetHeight/Math.max(size.y,.001));
   guardian.position.y+=feminineGuardianDefinition.verticalOffset;
   onLoad?.(guardian);
  }catch(e){onError?.(e);}
 },undefined,e=>onError?.(e));
}
