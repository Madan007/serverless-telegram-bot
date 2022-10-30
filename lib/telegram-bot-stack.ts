// Standard CDK imports
import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";

// Custom Constructs Imports
import { BotMicroservice } from "./microservice";
import { BotApiGateway } from "./apigateway";
import { Construct } from "constructs";

export class TelegramBotStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // Create the Bot Microservices
    const botMicroservice = new BotMicroservice(this, "Microservice");

    // Create the Bot Api Gateway
    const restApiId = new BotApiGateway(this, "ApiGateway", {
      telegramBotMicroservice: botMicroservice.telegramBotMicroservice,
    });

    // All constructs take these same three arguments : scope, id/name, props
    new CfnOutput(this, "BotURL", {
      value: `https://${restApiId}.execute-api.${this.region}.amazonaws.com/dev/bot`,
    });
  }
}
