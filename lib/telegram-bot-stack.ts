// Standard CDK imports
import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

// Custom Constructs Imports
import { BotMicroservice } from "./microservice";
import { BotApiGateway } from "./apigateway";

export class TelegramBotStack extends Stack {
  /**
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // Create the Bot Microservices
    const botMicroservice = new BotMicroservice(this, "Microservice");

    // Create the Bot Api Gateway
    const restApi = new BotApiGateway(this, "ApiGateway", {
      telegramBotMicroservice: botMicroservice.telegramBotMicroservice,
    });

    // All constructs take these same three arguments : scope, id/name, props
    new CfnOutput(this, "BotURL", {
      value: `https://${restApi.telegramBotAPI.restApiId}.execute-api.${this.region}.amazonaws.com/dev/bot`,
    });

    new CfnOutput(this, "BotWebhookUrl", {
      value: `https://${restApi.telegramBotAPI.restApiId}.execute-api.${this.region}.amazonaws.com/dev/bot/webhook`,
    });

    new CfnOutput(this, "Lambda Cloudwatch Log URL", {
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${this.region}#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${botMicroservice.telegramBotMicroservice.functionName}`,
    });
  }
}
