# Getting Started

## Installation

:::tip
We use [pnpm](https://pnpm.io/) instead of npm, but you can just whatever package manager you prefer.
:::

First, install `cloudy-cdk-lib` along with the AWS CDK dependencies. We also recommend installing `tsx` to synthesize the cloudy assembly.

```bash
$ pnpm add cloudy-cdk-lib aws-cdk-lib aws-cdk constructs tsx
```

## Create your CDK files

Create the `cdk.json` file. We will use [tsx](https://github.com/esbuild-kit/tsx) to run our CDK code while transpiling it with TypeScript.

```json
{
  "app": "pnpm exec tsx index.ts"
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
$ pnpm exec cdk deploy
```
