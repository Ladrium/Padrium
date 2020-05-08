import { Command } from "../../../Lib";
import { Message } from "discord.js";
import { inspect } from "util";

export = class extends Command {
  constructor() {
    super("eval");
  }
  async run(message: Message, args: string[]) {
    let returnEmbed;

    try {
      // we declare d as the Date timestamp when the evaluation started
      let d = Date.now();

      // here we evaluate the input
      let evaluated = await eval(`(async() => { return ${args.join(" ")} })()`);

      const evalType = evaluated.constructor.name;

      if (typeof evaluated !== "string") {
        // we format the output as string
        evaluated = inspect(evaluated, {
          depth: 0
        });
      }
      // if it was successful and no error occured it's going to return this embed
      returnEmbed = message
        .embed()
        .setTitle("Evaluation Output")
        .addField("Input", toJS(args.join(" ")))
        .setDescription(toJS(evaluated))
        .addField("Type", toJS(evalType))
        .setFooter(`Evaluated in: ${Date.now() - d}ms`);
    } catch (e) {
      // if there was an error it's going to return this embed
      returnEmbed = message
        .embed("error")
        .setTitle("Evaluation Error")
        .addField("Input", toJS(args.join(" ")))
        .addField("Error", toJS(e.toString()));
    }

    return message.channel.send(returnEmbed);
  }
};

// formats the input string as ```js\ninput```
function toJS(input: string): string {
  return `\`\`\`js\n${input}\`\`\``;
}
