
// LIFE RPG — Guardian Arrow
// Build 3K.5E — Test 1
// Independent cosmetic equipment asset.

import * as THREE from 'three';

export const arrowDefinition={
 id:'guardian-arrow-001',
 name:'Guardian Hunter Arrow',
 version:'3K.5E',
 equipmentType:'bow-cosmetic',
 cosmeticSlot:'arrow',
 setId:'guardian-hunter-set-001',

 dimensions:{
  length:2.25,
  shaftRadius:0.018,
  headLength:0.19,
  headWidth:0.10,
  fletchingLength:0.30,
  fletchingHeight:0.075,
  nockLength:0.055
 },

 appearance:{
  shaft:0x805334,
  head:0xb6bec8,
  feathers:0xe8dfc9,
  nock:0x443426
 },

 attachment:{
  // Arrow's local -Y end is the nock.
  // Its local +Y direction points forward.
  nockPosition:[0,0,0]
 }
};

export function createGuardianArrow(
 dimensions=arrowDefinition.dimensions,
 appearance=arrowDefinition.appearance
){
 const d={...arrowDefinition.dimensions,...dimensions};
 const a={...arrowDefinition.appearance,...appearance};

 const arrow=new THREE.Group();
 arrow.name=arrowDefinition.id;

 const shaftMaterial=new THREE.MeshStandardMaterial({
  color:a.shaft,
  roughness:0.82
 });

 const headMaterial=new THREE.MeshStandardMaterial({
  color:a.head,
  metalness:0.75,
  roughness:0.3
 });

 const featherMaterial=new THREE.MeshStandardMaterial({
  color:a.feathers,
  side:THREE.DoubleSide,
  roughness:0.9
 });

 const nockMaterial=new THREE.MeshStandardMaterial({
  color:a.nock,
  roughness:0.8
 });

 const shaftLength=d.length-d.headLength;

 // The arrow origin is its rear nock.
 // This makes future string attachment easier.

 const shaft=new THREE.Mesh(
  new THREE.CylinderGeometry(
   d.shaftRadius,
   d.shaftRadius,
   shaftLength,
   12
  ),
  shaftMaterial
 );

 shaft.position.y=shaftLength/2;
 shaft.name='ArrowShaft';
 arrow.add(shaft);

 // Steel arrowhead, pointing along local +Y.

 const head=new THREE.Mesh(
  new THREE.ConeGeometry(
   d.headWidth/2,
   d.headLength,
   4
  ),
  headMaterial
 );

 head.position.y=shaftLength+d.headLength/2;
 head.rotation.y=Math.PI/4;
 head.name='Arrowhead';
 arrow.add(head);

 // Three independent feather vanes.

 const featherShape=new THREE.Shape();
 featherShape.moveTo(0,0);
 featherShape.lineTo(d.fletchingHeight,0.06);
 featherShape.lineTo(
  d.fletchingHeight*0.85,
  d.fletchingLength*0.72
 );
 featherShape.lineTo(0,d.fletchingLength);
 featherShape.closePath();

 const featherGeometry=new THREE.ShapeGeometry(
  featherShape
 );

 for(let i=0;i<3;i++){
  const vane=new THREE.Mesh(
   featherGeometry,
   featherMaterial
  );

  const angle=i*Math.PI*2/3;

  vane.position.set(
   Math.cos(angle)*d.shaftRadius,
   0.10,
   Math.sin(angle)*d.shaftRadius
  );

  vane.rotation.y=angle;
  vane.name='Fletching_'+(i+1);

  arrow.add(vane);
 }

 // Rear nock.

 const nock=new THREE.Mesh(
  new THREE.CylinderGeometry(
   d.shaftRadius*1.3,
   d.shaftRadius*1.3,
   d.nockLength,
   12
  ),
  nockMaterial
 );

 nock.position.y=d.nockLength/2;
 nock.name='ArrowNock';
 arrow.add(nock);

 // Reference marker for future alignment.
 // Invisible in the rendered scene.

 const nockAnchor=new THREE.Object3D();
 nockAnchor.name='NockAnchor';
 nockAnchor.position.set(0,0,0);
 arrow.add(nockAnchor);

 arrow.userData={
  definitionId:arrowDefinition.id,
  cosmeticSetId:arrowDefinition.setId,
  dimensions:{...d},
  appearance:{...a},
  nockAnchor
 };

 return arrow;
}
