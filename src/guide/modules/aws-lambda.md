# Lambda Construct Library

```ts
import * as lambda from "cloudy-cdk-lib/aws-lambda";
```

See the [CDK AWS Lambda documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html).

## Function

### Handler Code

Same as CDK's `lambda.Function`, but allows passing a `Promise<lambda.Code>` rather than just a `lambda.Code`. For example,

```ts
const fn = new lambda.Function(this, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_12_X,
  handler: "index.handler",
  code: buildCodeUsingRollup("my-function.handler.ts"),
});

async function buildCodeUsingRollup(filename: string): Promise<lambda.Code> {
  // Use rollup to build the handler and return it...
}
```

:::warning
See [Synth Limitations](/guide/advanced/synth-limitations) if you use `app.synth()` or run tests on your CDK apps.
:::

## CallbackFunction

The `lambda.CallbackFunction` construct allows passing a callback as a handler, instead of a `lambda.Code` object. It uses [Pulumi's function serialization](https://www.pulumi.com/docs/intro/concepts/function-serialization/#serialization-details) behind the hood, so it may be a good idea to read their documentation to understand the gotchas (also, see our [Function Serialization Limitations](/guide/advanced/function-serialization-limitations) section).

```ts
const helloWorld = new lambda.CallbackFunction(stack, "HelloWorld", {
  async handler(input: unknown) {
    return `hello world, ${JSON.stringify(input, undefined, 2)}!`;
  },
});
```

The `lambda.CallbackFunction` is very powerful because it can capture CloudFormation tokens from other resources and make them available during runtime. For example:

```ts
import * as aws_sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "cloudy-cdk-lib/aws-lambda";
import * as client_sqs from "cloudy-cdk-lib/client-sqs";

declare const queue: aws_sqs.IQueue;

const myFunction = new lambda.CallbackFunction(stack, "MyFunction", {
  async handler() {
    // This variable will contain the actual queue URL when the handler is called.
    const queueUrl = queue.queueUrl;
    // This makes it possible to instantiate a SQSClient and send messages to the queue.
    const sqs = new client_sqs.SQSClient({});
    await sqs.send(
      new client_sqs.SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: "hello world!",
      }),
    );
  },
});

queue.grantSendMessages(myFunction);
```

## Event Sources

In order to add an event source to a lambda function, the function must accept the proper event type as input. In order to do so, the `aws_lambda_event_sources` module exports the `LambdaEventType` type.

### DynamoEventSource

Only tables that have the stream property defined can be used as event sources.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as lambda from "cloudy-cdk-lib/aws-lambda";
import * as eventsources from "cloudy-cdk-lib/aws-lambda-event-sources";
import * as dynamodb from "cloudy-cdk-lib/aws-dynamodb";

const table = new dynamodb.Table(this, "Users", {
  partitionKey: {
    name: "userId",
    type: dynamodb.AttributeType.STRING,
  },
  itemType: cloudy.ValueType.as<{
    userId: string;
    name: string;
  }>(),
  stream: dynamodb.StreamViewType.NEW_IMAGE,
});

const fn = new lambda.CallbackFunction(this, "Function", {
  async handler(event: eventsources.LambdaEventType<typeof table>) {
    for (const record of event.Records) {
      const newImage = record.dynamodb.NewImage;

      if (newImage) {
        const item = unmarshall(newImage);
        console.log(`The created item is: ${JSON.stringify(item)}`);
      }
    }
  },
});
fn.addEventSource(new eventsources.DynamoEventSource(table));
```

### SnsEventSource

:::info
TODO
:::

<!-- ```ts
import * as lambda from "cloudy-cdk-lib/aws-lambda";
import * as eventsources from "cloudy-cdk-lib/aws-lambda-event-sources";
import * as sns from "cloudy-cdk-lib/aws-sns";

const topic = new sns.Topic(this, "Topic", {
  messageType: cloudy.ValueType.as<"create" | "delete">(),
});

const fn = new lambda.CallbackFunction(this, "Function", {
  async handler(event: eventsources.LambdaEventType<typeof queue>) {
    for (const record of event.Records) {
      console.log(`The message is: ${record.body}`);
    }
  },
});
fn.addEventSource(new eventsources.SnsEventSource(topic));
``` -->

### SqsEventSource

```ts
import * as lambda from "cloudy-cdk-lib/aws-lambda";
import * as eventsources from "cloudy-cdk-lib/aws-lambda-event-sources";
import * as sqs from "cloudy-cdk-lib/aws-sqs";

const queue = new sqs.Queue(this, "Queue", {
  messageType: cloudy.ValueType.as<"create" | "delete">(),
});

const fn = new lambda.CallbackFunction(this, "Function", {
  async handler(event: eventsources.LambdaEventType<typeof queue>) {
    for (const record of event.Records) {
      console.log(`The message is: ${record.body}`);
    }
  },
});
fn.addEventSource(new eventsources.SqsEventSource(queue));
```
