// LIFE RPG Build 3K.8G — Battlemage Staff stance module
// Extracted from the supplied Build 3K.8F without changing calibration.
export const initialStaffSettings={
 grip:{
  l:{
   raise:-18,
   spread:-1,
   bend:29,
   across:64,
   twist:22,
   wristX:14,
   wristY:-3,
   fingerCurl:100,
   thumbGrip:0
  },
  r:{
   raise:14,
   spread:-31,
   bend:46,
   across:66,
   twist:9,
   wristX:24,
   wristY:90,
   fingerCurl:100,
   thumbGrip:0
  }
 },
 legs:{
  leftThigh:8,
  leftSpread:-6,
  leftKnee:25,
  leftAnkle:-12,
  rightThigh:-15,
  rightSpread:5,
  rightKnee:15,
  rightAnkle:-10
 },
 position:[2,-1.6,-1.3],
 rotation:[74,-24,50],
 length:7.1,
 shaftRadius:0.075,
 headRadius:0.205
};

export function applyStaffStance({applyArm,applyLeftLeg,applyRightLeg,settings}) {
  applyArm('l',settings.grip.l);
  applyArm('r',settings.grip.r);
  applyLeftLeg();
  applyRightLeg();
}

// Build 3K.10 — approved feminine-specific offsets; masculine baselines unchanged.
export const feminineCalibration = {
  "arms": {
    "l": {},
    "r": {}
  },
  "legs": {},
  "equipment": {
    "staff": [
      0,
      0,
      0
    ]
  }
};

// Separate approved feminine Staff pose; shared masculine Staff baseline unchanged.
export const feminineStaffSettings = {
  "grip": {
    "l": {
      "raise": -16,
      "spread": -10,
      "bend": 29,
      "across": 64,
      "twist": 22,
      "wristX": 14,
      "wristY": -3,
      "fingerCurl": 100,
      "thumbGrip": 0
    },
    "r": {
      "raise": 14,
      "spread": -31,
      "bend": 46,
      "across": 78,
      "twist": 9,
      "wristX": 11,
      "wristY": 90,
      "fingerCurl": 100,
      "thumbGrip": 0
    }
  },
  "legs": {
    "leftThigh": 8,
    "leftSpread": -6,
    "leftKnee": 25,
    "leftAnkle": -12,
    "rightThigh": -15,
    "rightSpread": 5,
    "rightKnee": 15,
    "rightAnkle": -10
  },
  "position": [
    2,
    -1.59,
    -1.45
  ],
  "rotation": [
    68,
    -20,
    46
  ],
  "length": 7.1,
  "shaftRadius": 0.075,
  "headRadius": 0.205
};
