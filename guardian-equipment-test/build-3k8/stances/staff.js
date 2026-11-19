// LIFE RPG — Build 3K.8G
// Battlemage Staff stance extracted from approved Build 3K.6B.1
// Weapon geometry remains in weapons/guardian-staff.js.

export const initialStaffSettings = {
  grip: {
    l: { raise:-18, spread:-1, bend:29, across:64, twist:22, wristX:14, wristY:-3, fingerCurl:100, thumbGrip:0 },
    r: { raise:14, spread:-31, bend:46, across:66, twist:9, wristX:24, wristY:90, fingerCurl:100, thumbGrip:0 }
  },
  legs: {
    leftThigh:8, leftSpread:-6, leftKnee:25, leftAnkle:-12,
    rightThigh:-15, rightSpread:5, rightKnee:15, rightAnkle:-10
  },
  position:[2,-1.6,-1.3],
  rotation:[74,-24,50],
  length:7.1,
  shaftRadius:0.075,
  headRadius:0.205
};

export const staffSettings = JSON.parse(JSON.stringify(initialStaffSettings));

export function resetStaffSettings(){
  const fresh=JSON.parse(JSON.stringify(initialStaffSettings));
  for(const key of Object.keys(staffSettings)) delete staffSettings[key];
  Object.assign(staffSettings,fresh);
  return staffSettings;
}

export function applyStaffStance({applyArm,applyLeftLeg,applyRightLeg}){
  applyArm('l',staffSettings.grip.l);
  applyArm('r',staffSettings.grip.r);
  applyLeftLeg();
  applyRightLeg();
}

export const staffLegs=staffSettings.legs;
