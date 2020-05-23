import {Command, PadEmbed} from "../../../Lib";
import {Message} from "discord.js"
//Creates an array that only accepts string elements, this will be all the possible answers
const answers: string[] = ["Yeah!","Yes","Uhhm, I guess..","Not a 100% sure about that pal","No","Nah","I dont think so..","I dont know, ask again!"]
//Gives result a value of 0 to answers.length (In this case meaning 0 - 7)
const result = Math.round(Math.random() * answers.length)
export = class extends Command {
    constructor() {
        //Calls Command´s constructor, and gives the name, desc, category etc.
        super("8ball", {
            cooldown: 6000,
            description: "Answers the given question with a selections of answers.",
            category: "utility"
        });
    }
    run(message: Message, args: string[]) {
        //Check if the message contains two words, eg: p!8ball First Second, p!8ball is removed, so [0] refers to First.
        if(!args[1]) {
            //If not, we create an embed using our class PadEmbed.
            let embed = new PadEmbed(message, this.bot!).error("Please enter a valid question!")
            return message.channel.send(embed)
        }
        //Using try...catch will try a code block whilst running it, if an error occurs, catch will be called
        try {
            let embed = new PadEmbed(message, this.bot!).base("Done!").addField("Question:",args.join(" "),true).addField("Answer:",answers[result],true)
            return message.channel.send(embed)
        }catch (e) {
            console.log(e)
            let embed = new PadEmbed(message, this.bot!).error("An error occurred! Please report this to the developers or try again!")
            return message.channel.send(embed)
        }
    }
}