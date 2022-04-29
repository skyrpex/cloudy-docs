# Getting Started

## Installation

:::tip
We use [pnpm](https://pnpm.io/) instead of npm, but you can just whatever package manager you prefer.
:::

First, install `cloudy-cdk-lib` along with the AWS CDK dependencies. We also recommend installing `cloudy-node` to synthesize the cloudy assembly.

```bash
$ pnpm add cloudy-cdk-lib cloudy-node aws-cdk-lib aws-cdk constructs
```

## Create your CDK files

Create the `cdk.json` file. We will use [cloudy-node](https://github.com/skyrpex/cloudy-node) to run our CDK code because it is faster than [ts-node](https://github.com/TypeStrong/ts-node), thanks to [esbuild](https://github.com/evanw/esbuild). It also works better in conjunction of some Cloudy constructs such as `aws_lambda.CallbackFunction`.

```json
{
  "app": "pnpx cloudy-node index.ts"
}
```

Create the `index.ts` file:

```ts
import * as cdk from "aws-cdk-lib";
import * as cloudy from "cloudy-cdk-lib";

const app = new cdk.App();
const stack = new cdk.Stack(app, "HelloWorldStack");
const helloWorld = new cloudy.aws_lambda.CallbackFunction(stack, "HelloWorld", {
  async handler(name: string) {
    console.log(`hello world, ${name}!`);
  },
});
new cdk.CfnOutput(helloWorld, "FunctionName", {
  value: helloWorld.functionName,
});
```

## Deploy

Now, you can use your stack as usual:

```bash
$ pnpx cdk deploy
```
