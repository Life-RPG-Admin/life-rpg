// LIFE RPG Build 3K.8E — Sword & Shield stance.
// Original Build 3K.8D calibration values, unchanged.
// Objects remain mutable for existing development sliders and exports.

export const shieldGrip={
 l:{
  raise:35,spread:-35,bend:60,across:43,
  twist:3,wristX:-3,wristY:-42,
  fingerCurl:100,thumbGrip:0
 },
 r:{
  raise:30,spread:-12,bend:51,across:18,
  twist:0,wristX:22,wristY:35,
  fingerCurl:100,thumbGrip:9
 }
};

export const armingAttachment={
 position:[-0.17,0.47,0.07],
 rotation:[-1,82,82]
};

export const shieldAttachment={
 position:[0.09,2.12,0.03],
 rotation:[64,-170,-50]
};

export const shieldLegs={
 leftThigh:-5,
 leftSpread:-3,
 leftKnee:4,
 leftAnkle:0,
 rightThigh:-5,
 rightSpread:3,
 rightKnee:5,
 rightAnkle:0
};

export function applySwordShieldStance({applyArm,applyLeftLeg,applyRightLeg}) {
 applyArm('l',shieldGrip.l);
 applyArm('r',shieldGrip.r);
 applyLeftLeg();
 applyRightLeg();
}

// Build 3K.10 — approved feminine-specific offsets; masculine baselines unchanged.
export const feminineCalibration = {
  "arms": {
    "l": {
      "raise": -23,
      "spread": 5,
      "bend": 28,
      "across": -8
    },
    "r": {
      "raise": -36,
      "spread": -2,
      "bend": 45,
      "across": 11,
      "wristX": -7,
      "wristY": -1,
      "fingerCurl": 100,
      "thumbGrip": -48
    }
  },
  "legs": {},
  "equipment": {
    "armingSword": [
      -0.03,
      -0.08,
      -0.1
    ],
    "shield": [
      0.08,
      -0.01,
      -0.11
    ]
  }
};
