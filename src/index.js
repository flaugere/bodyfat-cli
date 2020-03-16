const bodyfat = require("bodyfat");
const inquirer = require("inquirer");
const { Command, flags } = require("@oclif/command");
const SkinZone = require("./enum/skinzone");
const Gender = require("./enum/gender");

class BodyfatCommand extends Command {
  async run() {
    const { flags } = this.parse(BodyfatCommand);
    let responses = await inquirer.prompt([
      {
        name: "gender",
        message: "Select a gender",
        type: "list",
        choices: [{ name: Gender.FEMALE }, { name: Gender.MALE }]
      },
      {
        name: "weight",
        message: "Enter your weight",
        type: "number"
      },
      {
        name: "age",
        message: "How old are you ?",
        type: "number"
      }
    ]);
    let skins = await this.getSkinZone(
      SkinZone.SUBSCAPULAR,
      SkinZone.SUPRAILIAC,
      SkinZone.TRICEPS,
      SkinZone.BICEPS,
      SkinZone.CHEST,
      SkinZone.ABDOMEN,
      SkinZone.AXILLARY,
      SkinZone.THIGH
    );
    if (Gender.FEMALE == responses.gender) {
      if (
        !!skins[SkinZone.TRICEPS] &&
        !!skins[SkinZone.SUPRAILIAC] &&
        !!skins[SkinZone.THIGH]
      ) {
        this.log(
          `JP3 : ${bodyfat.JP3Woman.calculate(
            skins[SkinZone.TRICEPS],
            skins[SkinZone.SUPRAILIAC],
            skins[SkinZone.THIGH],
            responses.age
          )}`
        );
      }
    }
    if (
      !!skins[SkinZone.TRICEPS] &&
      !!skins[SkinZone.SUPRAILIAC] &&
      !!skins[SkinZone.THIGH] &&
      !!skins[SkinZone.ABDOMEN]
    ) {
      let method =
        Gender.FEMALE == responses.gender ? bodyfat.JP4Woman : bodyfat.JP4Man;
      this.log(
        `JP4 : ${method.calculate(
          skins[SkinZone.TRICEPS],
          skins[SkinZone.SUPRAILIAC],
          skins[SkinZone.THIGH],
          skins[SkinZone.ABDOMEN],
          responses.age
        )}`
      );
    }
    if (
      !!skins[SkinZone.TRICEPS] &&
      !!skins[SkinZone.SUPRAILIAC] &&
      !!skins[SkinZone.THIGH] &&
      !!skins[SkinZone.ABDOMEN] &&
      !!skins[SkinZone.CHEST] &&
      !!skins[SkinZone.AXILLARY] &&
      !!skins[SkinZone.SUBSCAPULAR]
    ) {
      let method =
        Gender.FEMALE == responses.gender ? bodyfat.JP7Woman : bodyfat.JP7Man;
      this.log(
        `JP7 : ${method.calculate(
          skins[SkinZone.TRICEPS],
          skins[SkinZone.SUPRAILIAC],
          skins[SkinZone.THIGH],
          skins[SkinZone.ABDOMEN],
          skins[SkinZone.CHEST],
          skins[SkinZone.AXILLARY],
          skins[SkinZone.SUBSCAPULAR],
          responses.age
        )}`
      );
    }
    if (
      !!skins[SkinZone.TRICEPS] &&
      !!skins[SkinZone.BICEPS] &&
      !!skins[SkinZone.SUBSCAPULAR] &&
      !!skins[SkinZone.SUPRAILIAC]
    ) {
      let method =
        Gender.FEMALE == responses.gender
          ? bodyfat.DurninWoman
          : bodyfat.DurninMan;
      this.log(
        `Durnin : ${method.calculate(
          skins[SkinZone.TRICEPS],
          skins[SkinZone.BICEPS],
          skins[SkinZone.SUBSCAPULAR],
          skins[SkinZone.SUPRAILIAC],
          responses.age
        )}`
      );
    }
  }
  async getSkinZone(...skins) {
    let choices = [];
    skins.forEach(skin => {
      choices.push({
        name: skin,
        message: `${skin} (mm)`,
        type: "number"
      });
    });
    return await inquirer.prompt(choices);
  }
}

BodyfatCommand.description = `Bodyfat 
...
Process body fat calculation according skin measurements
`;

BodyfatCommand.flags = {
  version: flags.version({
    char: "v"
  }),
  help: flags.help({
    char: "h"
  }),
  method: flags.string({
    char: "m",
    description: "Method : JP3, JP4, Durnin"
  })
};

module.exports = BodyfatCommand;
