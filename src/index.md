<p align="center">
  <img src="/assets/cloudy.svg" height="100">
</p>

# What is Cloudy?

:::warning Work In Progress!
Cloudy is still highly experimental and subject to change.
:::

Cloudy is a set of constructs for the AWS Cloud Development Kit that aim to improve the DX by providing a faster and type-safe code environment. If you are already used to the CDK, you will feel at home with Cloudy.

You can find the Cloudy repository at [skyrpex/cloudy](https://github.com/skyrpex/cloudy).

:::tip Prerequisites
The documentation assumes basic familiarity with the AWS CDK. If you are totally new, we recommend visiting the [Official AWS CDK Guide](https://docs.aws.amazon.com/cdk/v2/guide/home.html) page.
:::

## Motivation

Cloudy's motivation is to leverage TypeScript's type-safety to your IAC code, along with seamless integration between infrastructure code and runtime code. Get rid of most of your serverless apps bugs thanks to TypeScript.

## Design Goals

- Consistency with the [AWS CDK](https://docs.aws.amazon.com/cdk/api/v2/) constructs: offer the same API for constructs, but enhanced with types
- Consistency with the [AWS SDK v3](https://github.com/aws/aws-sdk-js-v3): offer the same API for clients, but enhanced with types
- Using raw TypeScript to provide the enhancements. No custom compilers

## Related Projects

Huge thanks to [Sam Goodwin](https://github.com/sam-goodwin) to promote this movement. See their projects:

- https://github.com/sam-goodwin/functionless
- https://github.com/sam-goodwin/typesafe-dynamodb
- https://github.com/sam-goodwin/punchcard (kind of deprecated, but inspiring nonetheless!)
