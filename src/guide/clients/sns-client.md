# SNS Client

```ts
import { SNSClient } from "cloudy-cdk-lib/client-sns";
```

See the [SNS Client - AWS SDK for JavaScript v3 documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/index.html).

## Commands

### PublishCommand

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sns from "cloudy-cdk-lib/aws-sns";
import { SNSClient, PublishCommand } from "cloudy-cdk-lib/client-sns";

const topic = new sns.Topic(this, "Topic", {
  messageType: cloudy.ValueType.json<{
    action: "create" | "delete";
    orderId: string;
  }>(),
});

const client = new SNSClient({});
await client.send(
  new PublishCommand({
    TopicArn: topic.topicArn,
    Message: cloudy.jsonEncode({
      action: "create",
      orderId: "order_1",
    }),
  }),
);
```

### PublishBatchCommand

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sns from "cloudy-cdk-lib/aws-sns";
import { SQSClient, PublishBatchCommand } from "cloudy-cdk-lib/client-sns";

const topic = new sns.Topic(this, "Topic", {
  messageType: cloudy.ValueType.as<"create" | "delete">(),
});

const client = new SQSClient({});
await client.send(
  new PublishBatchCommand({
    TopicArn: topic.topicArn,
    PublishBatchRequestEntries: [
      {
        Id: "1",
        Message: "create",
      },
      {
        Id: "2",
        Message: "delete",
      },
    ],
  }),
);
```
