# Welcome to Serverless-Telegram-Bot[s]

Here you will learn to use CDK to deploy different AWS resources.

1. ## 🧰 Prerequisites

   - 🛠 AWS Free Tier Account & Configured - [Get help here](https://www.youtube.com/watch?v=FRQ9fE4fd5g)
   - 🛠 AWS CLI Installed & Configured - [Get help here](https://youtu.be/TPyyfmQte0U)
   - 🛠 AWS CDK Installed & Configured - [Get help here](https://www.youtube.com/watch?v=MKwxpszw0Rc)
   - 🛠 Node JS Runtime - [Get help here](https://www.youtube.com/watch?v=TQks1p7xjdI)

1. ## ⚙️ Setting up the environment

   Providing the detailed instructions for project setup.

   ```bash
   git clone --branch main https://github.com/Madan007/serverless-telegram-bot.git
   cd serverless-telegram-bot

   # Make sure you in root directory
   npm install

   # Install microservice feature dependencies
   cd src/telegram-bot
   npm install
   ```

1. ## 🚀 Deployment using AWS CDK

   ```bash
   # If you DONT have cdk installed
   npm install -g aws-cdk

   # If this is first time you are using cdk then, run cdk bootstrap
   # cdk bootstrap

   # Synthesize the template and deploy it to AWS stack
   cdk synth
   cdk deploy

   # Keep Note of Outputs: for easy access
   #TelegramBotStack.BotURL
   #TelegramBotStack.BotWebhookUrl
   #TelegramBotStack.LambdaCloudwatchLogURL
   ```

1. ## 👷🏾 Telegram Bot Setup

   ```bash
   # search for "BotFather" bot in Telegram search bar
    Select /newbot
    Provide Bot Name
    Provide unique username

   # Save the API KEY token which would be required to access telegram APIs
   # Telegram Bot Access Link
    https://t.me/{Name_of_the_bot}

   # Webhook Setup
   #bot_token=Collected while creating new telegram bot.
   #url_to_send_updates_to = BotWebhookURL from cdk deploy outputs or from AWS Api Gateway wekbook endpoint link.

   https://api.telegram.org/bot{bot_token}/setWebhook?url={url_to_send_updates_to}

   # Get Webhook Info which will contain info on pending replies count and last response(OPTIONAL)
   https://api.telegram.org/bot{bot_token}/getWebhookInfo?url={url_to_send_updates_to}

   # Delete webhook and stop pushing message to API Gateway URL.
   https://api.telegram.org/bot{bot_token}/deleteWebhook?url={url_to_send_updates_to}

   ```

1. ## :camera: Screenshot

   <div>
   <img width="1249" alt="image" src="https://user-images.githubusercontent.com/15178258/199100708-11c06cee-3d62-4063-9698-b81f01c67d82.png">
   </div>

1. ## 🧹 CleanUp

If you want to destroy all the resources created by the AWS Cloudfront stack, Execute the below command to delete the stack, or _you can delete the stack from console as well_

```bash
cdk destroy *
```

This is not an exhaustive list, please carry out other necessary steps as maybe applicable to your needs.

### 💡 Help/Suggestions or 🐛 Bugs

Thank you for your interest in contributing to our project. Whether it is a bug report, new feature, correction, or additional documentation or solutions, we greatly value feedback and contributions from our community. [Start here][200]

### :snowman: Built with ❤️ and

- [AWS](https://aws.amazon.com/)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [Typescript](https://www.typescriptlang.org/docs)
- [Node.Js](https://nodejs.org/en/docs/)

### :man: Author

[Madan K](https://www.linkedin.com/in/madan-k-97606010a/)

### :clipboard: License

MIT

### 🏷️ Metadata

**Level**: 200

![miztiik-success-green](https://img.shields.io/badge/miztiik-cdk-success-green)

[200]: https://github.com/Madan007/serverless-telegram-bot/issues
