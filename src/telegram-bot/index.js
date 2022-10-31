const axios = require("axios");

exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  let body;

  try {
    switch (event.httpMethod) {
      case "GET":
        body = healthCheck();
        break;
      case "POST":
        body = await sendReply(event);
        break;
      default:
        throw new Error(`Unsupported route: "${event.httpMethod}"`);
    }

    console.log(body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully finished operation: "${event.httpMethod}"`,
        body: body,
      }),
    };
  } catch (error) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to perform operation.",
        errorMsg: e.message,
        errorStack: e.stack,
      }),
    };
  }
};

const healthCheck = () =>
  `Hello, CDK! You've hit ${process.env.AWS_LAMBDA_FUNCTION_NAME} with ${process.env.AWS_LAMBDA_FUNCTION_VERSION}\n`;

const sendReply = async (event = {}) => {
  try {
    const telegramLink = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    const jsonData = JSON.parse(event?.body)?.message;
    const chatId = jsonData?.from?.id;
    const textReply = "Processing data:" + jsonData?.text;

    const data = JSON.stringify({
      chat_id: chatId,
      text: textReply,
      disable_notification: true,
    });

    const config = {
      method: "post",
      url: telegramLink,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config);
    return "Success";
  } catch (error) {
    throw error;
  }
};
