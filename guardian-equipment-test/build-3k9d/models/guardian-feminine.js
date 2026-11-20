// LIFE RPG Build 3K.9D — FEMININE MATERIAL DIAGNOSTIC ONLY
// Preserves the original GLTF loading, normalization, rig and shared stances.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const feminineGuardianDefinition = Object.freeze({
 id:'guardian-feminine',
 assetPath:'../../guardian-3d-test/feminine-test/Superhero_Female_FullBody.gltf',
 targetHeight:2.5,
 verticalOffset:1.25,
 supportedStances:['natural','stance','shield','bow','staff']
});

function textureInfo(texture) {
 if (!texture) return 'NONE';
 const img=texture.image;
 const src=img?.currentSrc || img?.src || img?.url || img?.data?.src || '(embedded / no URL)';
 const dimensions=img?.width && img?.height ? `${img.width}x${img.height}` : 'unknown dimensions';
 const uv=Number.isInteger(texture.channel) ? texture.channel : 0;
 return `${src} | ${dimensions} | UV channel ${uv} | flipY=${texture.flipY} | colorSpace=${texture.colorSpace}`;
}

function buildReport(guardian,gltf) {
 const lines=[
  'LIFE RPG 3K.9D | Feminine material diagnostic',
  'READ ONLY: no textures, meshes, poses, or calibrations changed',
  `GLTF materials: ${(gltf.parser?.json?.materials || []).map(m=>m.name||'(unnamed)').join(', ') || 'unknown'}`
 ];
 let meshCount=0;
 guardian.traverse(obj=>{
  if (!obj.isMesh && !obj.isSkinnedMesh) return;
  meshCount++;
  lines.push(`\nMESH: ${obj.name || '(unnamed)'} | skinned=${!!obj.isSkinnedMesh}`);
  const uvAttrs=Object.keys(obj.geometry?.attributes || {}).filter(k=>/^uv\d*$/.test(k));
  lines.push(`UV attributes: ${uvAttrs.join(', ') || 'NONE'}`);
  const materials=Array.isArray(obj.material)?obj.material:[obj.material];
  materials.forEach((mat,i)=>{
   if(!mat){lines.push(`Material ${i}: NONE`);return;}
   lines.push(`Material ${i}: ${mat.name||'(unnamed)'} | ${mat.type} | visible=${mat.visible} | opacity=${mat.opacity} | transparent=${mat.transparent} | side=${mat.side}`);
   lines.push(`  Base colour: ${textureInfo(mat.map)}`);
   lines.push(`  Normal: ${textureInfo(mat.normalMap)}`);
   lines.push(`  Roughness: ${textureInfo(mat.roughnessMap)}`);
   lines.push(`  Metalness: ${textureInfo(mat.metalnessMap)}`);
   if(mat.color) lines.push(`  Material tint: #${mat.color.getHexString()}`);
  });
 });
 lines.push(`\nMesh count: ${meshCount}`);
 lines.push('Screenshot this panel and send it back for diagnosis.');
 return lines.join('\n');
}

function showDiagnostic(report){
 console.info(report);
 if(typeof document==='undefined') return;
 let panel=document.getElementById('life-rpg-feminine-material-diagnostic');
 if(panel) panel.remove();
 panel=document.createElement('section');
 panel.id='life-rpg-feminine-material-diagnostic';
 Object.assign(panel.style,{
  position:'fixed',left:'8px',right:'8px',bottom:'8px',zIndex:'2147483647',
  maxHeight:'45vh',overflow:'auto',background:'rgba(8,15,26,.96)',
  color:'#f4e4c2',border:'1px solid #b89a5c',borderRadius:'10px',
  padding:'10px',font:'12px/1.5 monospace',boxShadow:'0 5px 20px #0009'
 });
 const heading=document.createElement('div');
 heading.style.cssText='display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:6px';
 const title=document.createElement('strong');
 title.textContent='Feminine texture diagnostic';
 const close=document.createElement('button');
 close.textContent='Hide';
 close.style.cssText='background:#3d4758;color:white;border:1px solid #b89a5c;border-radius:6px;padding:5px 12px';
 close.addEventListener('click',()=>panel.remove());
 heading.append(title,close);
 const body=document.createElement('pre');
 body.textContent=report;
 body.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font:inherit';
 panel.append(heading,body);
 document.body.append(panel);
}

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
   try{showDiagnostic(buildReport(guardian,gltf));}
   catch(diagnosticError){
    console.warn('Feminine diagnostic failed; Guardian still loads:',diagnosticError);
   }
   onLoad?.(guardian);
  }catch(e){onError?.(e);}
 },undefined,e=>onError?.(e));
}
