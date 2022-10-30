import { IFunction } from "aws-cdk-lib/aws-lambda";
import {
  CfnRestApiProps,
  Deployment,
  GatewayResponse,
  LambdaIntegration,
  LambdaRestApi,
  RestApi,
  RestApiAttributes,
  Stage,
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface BotApiGatewayProps {
  telegramBotMicroservice: IFunction;
}

export class BotApiGateway extends Construct {
  public readonly telegramBotAPI: string;

  constructor(scope: Construct, id: string, props: BotApiGatewayProps) {
    super(scope, id);

    const { telegramBotMicroservice } = props;

    //Telegram bot Api Gateway
    this.telegramBotAPI = this.createtelegramBotAPI(telegramBotMicroservice);
  }

  /**
   * @param {IFunction} telegramBotMicroservice
   */
  private createtelegramBotAPI(telegramBotMicroservice: IFunction): string {
    // All constructs take these same three arguments : scope, id/name, props
    // defines an API Gateway REST API resource backed by our "telegrambot-api" function.
    const telegramBotApi = new RestApi(this, "telegrambot-api", {
      deploy: false,
    });

    telegramBotApi.root.addResource("bot").addMethod(
      "GET",
      new LambdaIntegration(telegramBotMicroservice, {
        proxy: true,
      })
    );

    // All constructs take these same three arguments : scope, id/name, props
    const devDeploy = new Deployment(this, "dev-deployment", {
      api: telegramBotApi,
    });

    // All constructs take these same three arguments : scope, id/name, props
    // TODO: Need to Configure the Stage name and type based on configuration
    const devStage = new Stage(this, "devStage", {
      deployment: devDeploy,
      stageName: "dev", // If not passed, by default it will be 'prod'
    });

    console.log("Check inner properties of API", telegramBotApi);

    return telegramBotApi.restApiId;
  }
}
