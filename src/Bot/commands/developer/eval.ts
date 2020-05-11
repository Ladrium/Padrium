import { Command } from "../../../Lib";
import { Message } from "discord.js";
import { inspect } from "util";
import fetch from "node-fetch";

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

      const evalType = evaluated ? evaluated.constructor.name : undefined;

      if (typeof evaluated !== "string") {
        // we format the output as string
        evaluated = inspect(evaluated, {
          depth: 0
        });
      }
      if (evaluated.length > 2000) {
        const { key } = await (
          await fetch("https://hasteb.in/documents", {
            body: evaluated,
            method: "POST"
          })
        ).json();

        evaluated = `https://hasteb.in/${key}`;
      }
      // if it was successful and no error occured it's going to return this embed
      returnEmbed = message
        .embed()
        .setTitle("Evaluation Output")
        .addField("Input", toJS(args.join(" ")))
        .setDescription(
          evaluated.startsWith("https://hasteb.in")
            ? `[Full Output](${evaluated})`
            : toJS(evaluated)
        )
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
