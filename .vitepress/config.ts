import { DefaultTheme, defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "src",
  title: "Cloudy",
  description: "",
  lastUpdated: true,

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/logo.svg",
      },
    ],
  ],

  themeConfig: {
    repo: "skyrpex/cloudy",
    docsRepo: "skyrpex/cloudy-docs",
    docsBranch: "main",
    logo: "/logo.svg",
    editLinks: true,

    nav: [
      { text: "Guide", link: "/", activeMatch: "^/$|^/guide/" },
      // {
      //   text: 'Config Reference',
      //   link: '/config/basics',
      //   activeMatch: '^/config/'
      // },
      // {
      //   text: 'Release Notes',
      //   link: 'https://github.com/vuejs/vitepress/releases'
      // }
    ],

    sidebar: {
      "/guide/": getGuideSidebar(),
      // '/config/': getConfigSidebar(),
      "/": getGuideSidebar(),
    },
  },
});

function getGuideSidebar(): DefaultTheme.SideBarConfig {
  return [
    {
      text: "Introduction",
      children: [
        { text: "What is Cloudy?", link: "/" },
        {
          text: "Getting Started",
          link: "/guide/getting-started",
        },
      ],
    },
    {
      text: "Modules",
      children: [
        {
          text: "aws_dynamodb",
          link: "/guide/modules/aws-dynamodb",
        },
        {
          text: "aws_lambda",
          link: "/guide/modules/aws-lambda",
        },
        // {
        //   text: "aws_lambda_event_sources",
        //   link: "/guide/modules/aws-lambda-event-sources/index",
        // },
        {
          text: "aws_sns",
          link: "/guide/modules/aws-sns",
        },
        // // {
        // //   text: "aws_sns_subscriptions",
        // //   link: "/guide/modules/aws-sns-subscriptions/index",
        // // },
        {
          text: "aws_sqs",
          link: "/guide/modules/aws-sqs",
        },
        // {
        //   text: "core",
        //   link: "/guide/modules/core/index",
        // },
      ],
    },
    {
      text: "Clients",
      children: [
        {
          text: "DynamoDB Client",
          link: "/guide/clients/dynamodb-client",
        },
        {
          text: "Lambda Client",
          link: "/guide/clients/lambda-client",
        },
        {
          text: "SNS Client",
          link: "/guide/clients/sns-client",
        },
        {
          text: "SQS Client",
          link: "/guide/clients/sqs-client",
        },
      ],
    },
    {
      text: "Advanced",
      children: [
        {
          text: "Simplifying Imports",
          link: "/guide/advanced/simplifying-imports",
        },
        {
          text: "Complex Value Types",
          link: "/guide/advanced/complex-value-types",
        },
        { text: "Unit Testing", link: "/guide/advanced/unit-testing" },
        {
          text: "Function Serialization Limitations",
          link: "/guide/advanced/function-serialization-limitations",
        },
        {
          text: "Synth Limitations",
          link: "/guide/advanced/synth-limitations",
        },
      ],
    },
  ];
}

// function getConfigSidebar(): DefaultTheme.SideBarConfig {
//   return [
//     {
//       text: 'App Config',
//       children: [{ text: 'Basics', link: '/config/basics' }]
//     },
//     {
//       text: 'Theme Config',
//       children: [
//         { text: 'Homepage', link: '/config/homepage' },
//         { text: 'Algolia Search', link: '/config/algolia-search' },
//         { text: 'Carbon Ads', link: '/config/carbon-ads' }
//       ]
//     }
//   ]
// }
