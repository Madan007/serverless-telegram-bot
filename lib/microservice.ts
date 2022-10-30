import {
  Architecture,
  Code,
  Function,
  FunctionProps,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

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
      environment: {
        CURRENT_ENV: "dev",
      },
      handler: "index.handler",
      runtime: Runtime.NODEJS_14_X,
    };

    const lambdaTelegram = new Function(this, "telegramBotHandler", {
      ...nodejsFunctionProps,
      code: Code.fromAsset("./src/telegram-bot"),
    });

    return lambdaTelegram;
  }
}
