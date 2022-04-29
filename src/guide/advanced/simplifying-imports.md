# Simplifying Imports

Since Cloudy is a superset of AWS CDK, you can just import Cloudy instead of CDK. It is optional, but maybe it will simplify your code a little bit.

For example:

```ts{1-2}
import * as cdk from "cloudy-cdk-lib";
import * as lambda from "cloudy-cdk-lib/aws-lambda";

const app = new cdk.App();
const stack = new cdk.Stack(app, "MyStack");
const fn = new lambda.Function(stack, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_12_X,
  handler: "index.handler",
  code: lambda.Code.fromAsset(path.join(__dirname, "lambda-handler")),
});
```
