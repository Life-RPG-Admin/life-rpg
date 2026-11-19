// LIFE RPG — Build 3K.8C — Natural stance (original pose values unchanged).
export function applyNaturalStance({bone,bones,world}) {
 const l=bone('upperarm_l');
 const r=bone('upperarm_r');

 if(l)l.rotateZ(-1.35);
 if(r)r.rotateZ(1.35);

 for(const side of ['l','r']){
  const fore=bone('lowerarm_'+side);
  const hand=bone('hand_'+side);

  if(fore)fore.rotateX(.46*.18);
  if(hand)hand.rotateX(.19*.14);
 }

 for(const [name,b] of Object.entries(bones)){
  if(/finger|thumb|index|middle|ring|pinky/.test(name)){
   b.rotateX(.66*.35);
  }
 }

 world();
}