import {
  Architecture,
  Code,
  Function,
  FunctionProps,
  Runtime,
  Version,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
const path = require("path");

// TODO: Need to Move To Env File
const BOT_TOKEN = ""; // PASTE Telegram API BOT TOKEN here

export class BotMicroservice extends Construct {
  public readonly telegramBotMicroservice: Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    //Telegram bot microservice
    this.telegramBotMicroservice = this.createTelegramBotMicroservice();
  }

  private createTelegramBotMicroservice(): Function {
    // TODO: Need to move the function props configuration file
    const nodejsFunctionProps: FunctionProps = {
      architecture: Architecture.ARM_64,
      code: Code.fromAsset(""),
      description: `Generated on: ${new Date().toISOString()}`, // added to keep pushing latest code on AWS lambda on each deployment.
      environment: {
        BOT_TOKEN,
        CURRENT_ENV: "dev",
      },
      handler: "index.handler",
      runtime: Runtime.NODEJS_14_X,
    };

    const lambdaTelegram = new Function(this, "telegramBotHandler", {
      ...nodejsFunctionProps,
      code: Code.fromAsset(path.join(__dirname, "../src/telegram-bot")), // Get relevant path to lambda directory.
    });

    /*Versioning every new changes and keeping track of it. Check AWS Lambda UI Console*/
    const version = new Version(this, `Ver ${new Date().toISOString()}`, {
      lambda: lambdaTelegram,
    });

    return lambdaTelegram;
  }
}
