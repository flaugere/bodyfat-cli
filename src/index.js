const { JP3Man, JP3Woman } = require('bodyfat');
const inquirer = require('inquirer')
const { Command, flags } = require('@oclif/command')

const Method = {
  JP3: 'jp3',
  JP4: 'jp4',
  DURNIN: 'durnin',
};

const Gender = {
  FEMALE: 'female',
  MALE: 'male'
};

const Skins = {
  ABDOMEN: 'abdomen',
  SUBSCAPULAR: 'subscapular',
  CHEST: 'chest',
  TRICEPS: 'triceps',
  BICEPS: 'biceps',
  THIGH: 'thigh',
  SUPRAILIAC: 'suprailiac'
};

class BodyfatCommand extends Command {
  async run() {
    const { flags } = this.parse(BodyfatCommand);
    let responses = await inquirer.prompt([{
      name: 'method',
      message: 'Select a method',
      type: 'list',
      choices: [{ name: Method.JP3 }, { name: Method.JP4 }, { name: Method.DURNIN}],
    }, {
      name: 'gender',
      message: 'Select a gender',
      type: 'list',
      choices: [{ name: Gender.FEMALE }, { name: Gender.MALE }],
    },
    {
      name: 'weight',
      message: 'Enter your weight',
      type: 'number'
    },
    {
      name: 'age',
      message: 'How old are you ?',
      type: 'number'
    }]);
    switch (responses.method) {
      case Method.JP3:
        let skins = await this.getSkins(Skins.CHEST, Skins.ABDOMEN, Skins.THIGH);
        let method = Gender.FEMALE == responses.gender ? JP3Woman : JP3Man;
        this.log(`${method.calculate(responses.age, skins[Skins.CHEST], skins[Skins.ABDOMEN], skins[Skins.THIGH])}`);
    }
  }
  async getSkins(...skins) {
    let choices = [];
    skins.forEach(skin => {
      choices.push({
        name: skin,
        message: `${skin} (mm)`,
        type: 'number'
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
