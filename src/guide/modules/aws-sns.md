# SNS Construct Library

```ts
import * as sns from "cloudy-cdk-lib/aws-sns";
```

See the [CDK AWS SNS documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sns-readme.html).

## The Topic construct

The Topic construct allows defining the types of the message and the message attributes.

The message type must derive from string, because that's what AWS uses behind the hood. You can read the [Complex Value Types](/guide/advanced/complex-value-types) guide to learn how to define robust and complex message types.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sns from "cloudy-cdk-lib/aws-sns";

const topic = new sns.Topic(this, "Topic", {
  // Only allow the messages "create" or "delete".
  messageType: cloudy.ValueType.as<"create" | "delete">(),
  // Require the "orderId" message attribute, which must be an string.
  messageAttributesType: {
    orderId: {
      DataType: "String"
      StringValue: cloudy.ValueType.as<string>(),
    },
  },
});
```

### Using JSON messages

If you need more complex messages, you can leverage JSON value types:

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sns from "cloudy-cdk-lib/aws-sns";

const topic = new sns.Topic(this, "Topic", {
  messageType: cloudy.ValueType.json<{
    action: "create" | "delete";
    orderId: string;
  }>(),
});
```

The topic above will only allow JSON messages with that specific shape. The Cloudy [SNS Client](/guide/clients/sns-client) will enforce that.

### Additional types for FIFO topics

FIFO Topics have some additional properties such as message group IDs and message deduplication IDs. These can be customized with `messageGroupIdType` and `messageDeduplicationIdType` respectively.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sns from "cloudy-cdk-lib/aws-sns";
import { type EventId } from "./my-types.js";

const topic = new sns.Topic(this, "Topic", {
  fifo: true,
  // Only allow the "default" message group ID.
  messageGroupIdType: cloudy.ValueType.as<"default">(),
  // Restrict the deduplication ID type to a custom type.
  messageDeduplicationIdType: cloudy.ValueType.as<EventId>(),
});
```

By the way, Cloudy allows you to skip manually writing your FIFO Topic name.

## Subscriptions

### Filter policy

:::info TODO
The filter policy will be typed as well, but it is not yet implemented.
:::

### Example of SqsSubscription

SQS subscriptions require that the queue and the topic share the same attribute types such as the message type, the FIFO type and the other message types.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sns from "cloudy-cdk-lib/aws-sns";
import * as subscriptions from "cloudy-cdk-lib/aws-sns-subscriptions";
import * as sqs from "cloudy-cdk-lib/aws-sqs";

const myTopic = new sns.Topic(this, "MyTopic", {
  messageType: cloudy.ValueType.as<"create" | "delete">(),
});

const myQueue = new sqs.Queue(this, "Queue", {
  // Inherit the same message type, otherwise it won't be valid.
  messageType: myTopic.messageType,
});

myTopic.addSubscription(new subscriptions.SqsSubscription(queue));
```
