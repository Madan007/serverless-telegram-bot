import { IFunction } from "aws-cdk-lib/aws-lambda";
import {
  Cors,
  Deployment,
  IRestApi,
  LambdaIntegration,
  RestApi,
  Stage,
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface BotApiGatewayProps {
  telegramBotMicroservice: IFunction;
}

export class BotApiGateway extends Construct {
  public readonly telegramBotAPI: IRestApi;

  constructor(scope: Construct, id: string, props: BotApiGatewayProps) {
    super(scope, id);

    const { telegramBotMicroservice } = props;

    //Telegram bot Api Gateway
    this.telegramBotAPI = this.createtelegramBotAPI(telegramBotMicroservice);
  }

  /**
   * @param {IFunction} telegramBotMicroservice
   */
  private createtelegramBotAPI(telegramBotMicroservice: IFunction): IRestApi {
    // All constructs take these same three arguments : scope, id/name, props
    // defines an API Gateway REST API resource backed by our "telegrambot-api" function.
    const TelegramRestAPI = new RestApi(this, "telegrambot-api", {
      defaultCorsPreflightOptions: {
        allowCredentials: false,
        // Enable CORS policy to allow from any origin. Customize as needed.
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowOrigins: Cors.ALL_ORIGINS,
      },
      deploy: false,
    });

    // Let's keep this as it as and use it for normal 'Hello World' Response with GET method integration with lamhda.
    const telegramRootAPI = TelegramRestAPI.root.addResource("bot");

    telegramRootAPI.addMethod(
      "GET",
      new LambdaIntegration(telegramBotMicroservice, {
        proxy: true,
      })
    ); // GET /bot

    // Lets add nested resource under /bot resource path and attach a POST method with same Lambda integration.
    telegramRootAPI
      .addResource("webhook")
      .addMethod(
        "POST",
        new LambdaIntegration(telegramBotMicroservice, { proxy: true })
      ); // POST /bot/webhook

    // All constructs take these same three arguments : scope, id/name, props
    const devDeploy = new Deployment(this, "dev-deployment", {
      api: TelegramRestAPI,
    });

    // All constructs take these same three arguments : scope, id/name, props
    // TODO: Need to Configure the Stage name and type based on configuration
    const devStage = new Stage(this, "devStage", {
      deployment: devDeploy,
      stageName: "dev", // If not passed, by default it will be 'prod'
    });

    console.log("Check inner properties of API", TelegramRestAPI);

    return TelegramRestAPI;
  }
}
