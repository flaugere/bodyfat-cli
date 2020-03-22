const bodyfat = require("bodyfat");
const inquirer = require("inquirer");
const { Command, flags } = require("@oclif/command");
const SkinZone = require("./enum/skinzone");
const Gender = require("./enum/gender");
const Method = require("./enum/method");

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
    for (var methodName in Method) {
      const methodByGender = Method[methodName];
      methodByGender.forEach((method) => {
        if (method.gender === responses.gender) {  
          const percentage = method.algo.calculate(
            ...this.getSkinsValues(method.skins, skins),
            responses.age
          );
          if (!!percentage) {
            this.log(
              `${methodName} : ${percentage} %`
            );
            return;
          }
          this.log(`${methodName} : not enough values`)
        }
      });
    }
  }
  getSkinsValues(skinZones, skinsValues) {
    let values = [];
    skinZones.forEach(skinZone => {
      values.push(skinsValues[skinZone]);
    })
    return values;
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
