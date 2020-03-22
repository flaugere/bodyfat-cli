const bodyfat = require("bodyfat");
const SkinZone = require("./skinzone");
const Gender = require("./gender");

const Method = {
  jp3: [
    {
      gender: Gender.FEMALE,
      algo: bodyfat.JP3Woman,
      skins: [SkinZone.TRICEPS, SkinZone.SUPRAILIAC, SkinZone.THIGH],
      age: false
    },
    {
      gender: Gender.MALE,
      algo: bodyfat.JP3Man,
      skins: [SkinZone.CHEST, SkinZone.ABDOMEN, SkinZone.THIGH],
      age: false
    }
  ],
  jp4: [
    {
      gender: Gender.FEMALE,
      algo: bodyfat.JP4Woman,
      skins: [
        SkinZone.TRICEPS,
        SkinZone.SUPRAILIAC,
        SkinZone.THIGH,
        SkinZone.ABDOMEN
      ],
      age: true
    },
    {
      gender: Gender.MALE,
      algo: bodyfat.JP4Man,
      skins: [
        SkinZone.TRICEPS,
        SkinZone.SUPRAILIAC,
        SkinZone.THIGH,
        SkinZone.ABDOMEN
      ],
      age: true
    }
  ],
  jp7: [
    {
      gender: Gender.FEMALE,
      algo: bodyfat.JP7Woman,
      skins: [
        SkinZone.TRICEPS,
        SkinZone.SUPRAILIAC,
        SkinZone.THIGH,
        SkinZone.ABDOMEN,
        SkinZone.CHEST,
        SkinZone.AXILLARY,
        SkinZone.SUBSCAPULAR
      ],
      age: true
    },
    {
      gender: Gender.MALE,
      algo: bodyfat.JP7Man,
      skins: [
        SkinZone.TRICEPS,
        SkinZone.SUPRAILIAC,
        SkinZone.THIGH,
        SkinZone.ABDOMEN,
        SkinZone.CHEST,
        SkinZone.AXILLARY,
        SkinZone.SUBSCAPULAR
      ],
      age: true
    }
  ],
  durnin: [
    {
      gender: Gender.FEMALE,
      algo: bodyfat.DurninWoman,
      skins: [
        SkinZone.TRICEPS,
        SkinZone.BICEPS,
        SkinZone.SUBSCAPULAR,
        SkinZone.SUPRAILIAC
      ],
      age: true
    },
    {
      gender: Gender.MALE,
      algo: bodyfat.DurninMan,
      skins: [
        SkinZone.TRICEPS,
        SkinZone.BICEPS,
        SkinZone.SUBSCAPULAR,
        SkinZone.SUPRAILIAC
      ],
      age: true
    }
  ]
};

Object.assign(module.exports, Method);
