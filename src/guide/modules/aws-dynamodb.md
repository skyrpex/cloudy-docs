# DynamoDB Construct Library

```ts
import * as dynamodb from "cloudy-cdk-lib/aws-dynamodb";
```

See the [CDK AWS DynamoDB documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_dynamodb-readme.html).

## Table

The Table construct from Cloudy extends the [AWS CDK Table construct](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_dynamodb.Table.html),
and allows you to define the type of the items it will contain.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as dynamodb from "cloudy-cdk-lib/aws-dynamodb";

const usersTable = new dynamodb.Table(this, "Users", {
  partitionKey: {
    name: "userId",
    type: dynamodb.AttributeType.STRING,
  },
  itemType: cloudy.ValueType.as<{
    userId: string;
    name: string;
    age: number;
  }>(),
});
```

Some restrictions apply to the `itemType`:

- The item type must be compatible with DynamoDB items. That means that the properties must be strings, numbers, binary data (`Uint8Array`-based), arrays or maps of the previous data types
- The partition key (and the sort key, if provided) must be present at the item type

### Single Table Design

The itemType property allows defining conjunctions of types.

```ts
import * as cloudy from "cloudy-cdk-lib";
import * as dynamodb from "cloudy-cdk-lib/aws-dynamodb";

interface UserItem<UserID extends string = string> {
  pk: `user#${UserID}`;
  sk: "profile";
  name: string;
  email: string;
}

interface OrderItem<
  UserID extends string = string,
  OrderID extends string = string,
> {
  pk: `user#${UserID}`;
  sk: `order#${OrderID}`;
  orderId: OrderID;
  status: "placed" | "shipped";
}

const usersTable = new dynamodb.Table(this, "Users", {
  partitionKey: {
    name: "pk",
    type: dynamodb.AttributeType.STRING,
  },
  sortKey: {
    name: "sk",
    type: dynamodb.AttributeType.STRING,
  },
  itemType: cloudy.ValueType.as<UserItem | OrderItem>(),
});
```

## Streams

```ts
import * as cloudy from "cloudy-cdk-lib";
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
```
