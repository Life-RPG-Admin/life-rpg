// LIFE RPG Build 3K.8F — Guardian Bow stance.
// Exact locked 3K.8E bow grip, attachment, and leg calibrations.
// Mutable objects retain existing UI slider behavior.

const initialBowGrip={
 l:{
  raise:21,
  spread:-23,
  bend:8,
  across:25,
  twist:-10,
  wristX:27,
  wristY:-47,
  fingerCurl:95,
  thumbGrip:0
 },
 r:{
  raise:0,
  spread:-36,
  bend:69,
  across:120,
  twist:0,
  wristX:0,
  wristY:20,
  fingerCurl:65,
  thumbGrip:16
 }
};

export const bowGrip={
 l:{...initialBowGrip.l},
 r:{...initialBowGrip.r}
};

const initialBowAttachment={
 position:[0.15,0.48,0.03],
 rotation:[-117,-135,164]
};

export const bowAttachment={
 position:[...initialBowAttachment.position],
 rotation:[...initialBowAttachment.rotation]
};

const initialBowLegs={
 leftThigh:2,
 leftSpread:-8,
 leftKnee:15,
 leftAnkle:-12,
 rightThigh:-14,
 rightSpread:8,
 rightKnee:14,
 rightAnkle:0
};

export const bowLegs={...initialBowLegs};


export function applyBowStance({applyArm,applyLeftLeg,applyRightLeg}) {
 applyArm('l',bowGrip.l);
 applyArm('r',bowGrip.r);
 applyLeftLeg();
 applyRightLeg();
}
