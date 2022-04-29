# Unit Testing

As mentioned in [Synth Limitations](/guide/advanced/synth-limitations), you must wait for async dependencies to resolve before a synth happens.

If you are running tests on your CDK apps, you can use Cloudy's assertions module. The `Template.fromStack` and `Assertions.fromStack` functions now return a promise.

First, see the [AWS CDK's Testing constructs](https://docs.aws.amazon.com/cdk/v2/guide/testing.html#testing_getting_started) page for reference.

The highlighted lines are the differences between raw CDK tests and Cloudy's CDK tests.

```ts{1,13-14}
import { Capture, Match, Template } from "cloudy-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import { ProcessorStack } from "../lib/processor-stack";

describe("ProcessorStack", () => {
  test("synthesizes the way we expect", () => {
    const app = new cdk.App();

    // Instantiate the stack to test...
    const myStack = new cdk.Stack(app, "MyStack");

    // Prepare the stack for assertions.
    const template = await Template.fromStack(myStack);
}
```
