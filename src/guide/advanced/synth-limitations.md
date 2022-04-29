# Synth Limitations

:::warning
If you use code promises in the lambda module, the app synth can't start before the dependencies are resolved.
:::

:::info
If you don't manually call synth or run CDK tests, you don't need to do anything. On the other hand, if you do it, the core module provides a few methods.
:::

### Using `cloudy.waitForAsyncDependencies` before synth

```ts
import * as cdk from "aws-cdk-lib";
import * as cloudy from "cloudy-cdk-lib";

const app = new cdk.App();

// Your stacks here...

await cloudy.waitForAsyncDependencies(app);
app.synth();
```

### Using `cloudy.synth` directly

Or you can just use `cloudy.synth(app)` as follows:

```ts
import * as cdk from "aws-cdk-lib";
import * as cloudy from "cloudy-cdk-lib";

const app = new cdk.App();

// Your stacks here...

await cloudy.synth(app);
```
