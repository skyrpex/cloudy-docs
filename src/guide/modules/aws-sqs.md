# SQS Construct Library

```ts
import * as sqs from "cloudy-cdk-lib/aws-sqs";
```

See the [CDK AWS SQS documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs-readme.html).

## The Queue construct

The Queue construct allows defining the types of the message and the message attributes.

The message type must derive from string, because that's what AWS uses behind the hood. You can read the [Complex Value Types](/guide/advanced/complex-value-types) guide to learn how to define robust and complex message types.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sqs from "cloudy-cdk-lib/aws-sqs";

const topic = new sqs.Queue(this, "Queue", {
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
import * as sqs from "cloudy-cdk-lib/aws-sqs";

const queue = new sqs.Queue(this, "Queue", {
  messageType: cloudy.ValueType.json<{
    action: "create" | "delete";
    orderId: string;
  }>(),
});
```

The queue above will only allow JSON messages with that specific shape. The Cloudy [SQS Client](/guide/clients/sqs-client) will enforce that.

### Additional types for FIFO queues

FIFO Queues have some additional properties such as message group IDs and message deduplication IDs. These can be customized with `messageGroupIdType` and `messageDeduplicationIdType` respectively.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as sqs from "cloudy-cdk-lib/aws-sqs";
import { type EventId } from "./my-types.js";

const topic = new sqs.Queue(this, "Queue", {
  fifo: true,
  // Only allow the "default" message group ID.
  messageGroupIdType: cloudy.ValueType.as<"default">(),
  // Restrict the deduplication ID type to a custom type.
  messageDeduplicationIdType: cloudy.ValueType.as<EventId>(),
});
```

By the way, Cloudy allows you to skip manually writing your FIFO Queue name.
