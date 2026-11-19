// LIFE RPG — Build 3K.8D — Locked masculine Longsword stance.
// Values extracted verbatim from verified Build 3K.8C.
// No calibration or pose adjustments.

const lockedGrip={
 l:{
  raise:16,spread:-21,bend:59,across:90,
  twist:0,wristX:0,wristY:-28,
  fingerCurl:84,thumbGrip:0
 },
 r:{
  raise:16,spread:-22,bend:71,across:72,
  twist:0,wristX:11,wristY:45,
  fingerCurl:100,thumbGrip:0
 }
};

const longswordLegs={
 leftThigh:10,
 leftSpread:-10,
 leftKnee:-10,
 leftAnkle:-10,
 rightThigh:10,
 rightSpread:10,
 rightKnee:10,
 rightAnkle:0
};

export { longswordLegs };

export function applyLongswordStance({applyArm,applyLeftLeg,applyRightLeg}) {
 applyArm('l',lockedGrip.l);
 applyArm('r',lockedGrip.r);
 applyLeftLeg();
 applyRightLeg();
}
