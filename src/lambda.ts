import { S3 } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
const s3 = new S3();

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const result = await s3.putObject({
    Bucket: process.env.BUCKET_NAME!,
    Key: "hello.txt",
    Body: "world",
  }).promise();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(result, null, 2),
  };
};
