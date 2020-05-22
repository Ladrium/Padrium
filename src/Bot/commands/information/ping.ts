import { Command } from "../../../Lib";
import { Message } from "discord.js";

const comments = [
  "Logging into NASA...",
  "Keylogging the NSA",
  "Playing ping-pong with Obama",
  "Hacked the entire world!"
];
const wait = (time: number) => new Promise((r) => setTimeout(r, time));

export = class extends Command {
  constructor() {
    super("ping", {
      aliases: ["pong"],
      cooldown: 5000
    });
  }
  async run(message: Message) {
    const msg = await message.channel.send("Hacking the Mainframe...");
    const pings = [msg.createdTimestamp - message.createdTimestamp];
    let last = msg.createdTimestamp;

    await wait(500);

    for await (const comment of comments) {
      await msg.edit(comment);

      pings.push(msg.editedTimestamp! - last);
      last = msg.editedTimestamp!;

      await wait(500);
    }
    msg.delete();
    message.sem(
      `Ping check finished!\n${pings
        .map((x, i) => `Ping ${i + 1}: ${x - 500}`)
        .join("\n")}`
    );
  }
};
