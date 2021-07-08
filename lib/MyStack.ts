import * as cdk from "@aws-cdk/core";
import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket
    const bucket = new sst.Bucket(this, "MyBucket", {
      s3Bucket: {
        autoDeleteObjects: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    });

    // Create a HTTP API
    const api = new sst.Api(this, "MyApi", {
      defaultFunctionProps: {
        permissions: [bucket],
        environment: {
          BUCKET_NAME: bucket.bucketName,
        },
      },
      routes: {
        "GET /": "src/lambda.handler",
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }
}
