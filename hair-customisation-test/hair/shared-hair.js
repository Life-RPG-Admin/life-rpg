import * as THREE from 'three';
export const HAIR_COLORS={Black:'#211b1b','Dark Brown':'#39251e',Brown:'#65412b','Light Brown':'#977050',Blonde:'#d6b27b',Red:'#a4472c',Auburn:'#713824','White/Grey':'#c7c4be'};
const profiles={masculine:{radius:.103,offsetY:.065,offsetZ:.006},feminine:{radius:.099,offsetY:.063,offsetZ:.006}};
export function createShortAdventurer(head,gender='masculine',color='Dark Brown'){
 const profile=profiles[gender], group=new THREE.Group();group.name='LIFE_RPG_SharedHair_ShortAdventurer';head.add(group);
 const mat=new THREE.MeshStandardMaterial({color:HAIR_COLORS[color]||HAIR_COLORS['Dark Brown'],roughness:.88,metalness:0,side:THREE.DoubleSide});
 const r=profile.radius;
 // A low-poly sculpted cap plus directional locks; prototype geometry, not final production hair.
 const cap=new THREE.Mesh(new THREE.SphereGeometry(r,24,14,0,Math.PI*2,0,Math.PI*.51),mat);
 cap.scale.set(1.04,.65,1.02);group.add(cap);
 for(let i=0;i<26;i++){
  const a=i/26*Math.PI*2,front=Math.cos(a)>0;
  const lock=new THREE.Mesh(new THREE.ConeGeometry(r*.115,r*(front?.35:.29),5),mat);
  lock.position.set(Math.sin(a)*r*.91,-r*.095,Math.cos(a)*r*.91);
  lock.rotation.z=Math.sin(a)*.26;lock.rotation.x=Math.cos(a)*.21;group.add(lock);
 }
 for(let i=0;i<13;i++){
  const x=(i-6)/6*r*.81;
  const strand=new THREE.Mesh(new THREE.ConeGeometry(r*.13,r*.60,5),mat);
  strand.position.set(x,r*.36,r*.65-Math.abs(x)*.2);
  strand.rotation.z=-.85;strand.rotation.x=.38;group.add(strand);
 }
 group.position.set(0,profile.offsetY,profile.offsetZ);
 return {group,material:mat,profile};
}
