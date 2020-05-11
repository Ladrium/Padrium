import { PadClient } from "./PadClient";
import { readdirSync } from "fs";
import { Command } from "../..";

export class Handler {
  public dirs: {
    commands: string;
    events: string;
  };
  public bot: PadClient;

  constructor(
    bot: PadClient,
    dirs: {
      commands: string;
      events: string;
    }
  ) {
    this.bot = bot;
    this.dirs = dirs;
  }

  load() {
    // Commands
    readdirSync(this.dirs.commands).forEach((category) => {
      readdirSync(`${this.dirs.commands}/${category}`)
        .filter((f) => f.endsWith(".js"))
        .forEach((cmd) => {
          try {
            let Command = require(`${this.dirs.commands}/${category}/${cmd}`);
            Command = new Command();
            Command.bot = this.bot;
            Command.category = category;
            this.bot.commands.set(Command.name, Command);
            console.log(`✅ [${cmd.slice(0, -3)}] => Loaded!`);
          } catch (e) {
            console.log(`❌ [${cmd.slice(0, -3)}] => ${e.toString()}`);
          }
        });
    });
    // Events
    readdirSync(this.dirs.events).forEach((category) => {
      readdirSync(`${this.dirs.events}/${category}`)
        .filter((f) => f.endsWith(".js"))
        .forEach((event) => {
          try {
            let Event = require(`${this.dirs.events}/${category}/${event}`);
            Event = new Event();

            this.bot.on(Event.name, Event.run.bind(null, this.bot));
            console.log(`✅ [${event.slice(0, -3)}] => Loaded!`);
          } catch (e) {
            console.log(`❌ [${event.slice(0, -3)}] => ${e.toString()}`);
          }
        });
    });
  }
  getCommand(command: string): Command | null {
    return (
      this.bot.commands.get(command) ||
      this.bot.commands.find((cmd) => cmd.aliases.includes(command)) ||
      null
    );
  }
  commands(categories: boolean = false) {
    return categories
      ? this.bot.commands.reduce(
          (acc: string[], val) =>
            acc.includes(val.category!) ? acc : [...acc, val.category!],
          []
        )
      : this.bot.commands.array();
  }
}
