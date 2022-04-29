// eslint-disable-next-line import/no-extraneous-dependencies
import { JsonFile, SampleFile, TextFile } from "projen";
import {
  NodePackageManager,
  NodeProject,
  TrailingComma,
  TypeScriptModuleResolution,
} from "projen/lib/javascript";
import { TypeScriptProject } from "projen/lib/typescript";

const project = new TypeScriptProject({
  name: "cloudy-docs",
  description: "Documentation for Cloudy",
  defaultReleaseBranch: "main",

  deps: [],
  peerDeps: [],
  devDeps: [],

  packageManager: NodePackageManager.PNPM,
  projenrcJs: false,
  sampleCode: false,
  release: false,

  prettier: true,
  prettierOptions: {
    settings: {
      trailingComma: TrailingComma.ALL,
    },
  },

  jest: false,

  tsconfig: {
    compilerOptions: {
      module: "ES2022",
      moduleResolution: TypeScriptModuleResolution.NODE,
      lib: ["DOM", "ES2020"],
      noUncheckedIndexedAccess: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      target: "ES2020",
    },
  },
});

// Use cloudy-node to run projen.
project.deps.removeDependency("ts-node");
project.addDevDeps("cloudy-node");
project.defaultTask?.exec("cloudy-node .projenrc.ts");

// Lint.
project.addDevDeps("eslint-plugin-unicorn", "@cloudy-ts/eslint-plugin");
project.eslint?.addExtends(
  "plugin:unicorn/recommended",
  "plugin:@cloudy-ts/recommended",
);
project.eslint?.addRules({
  "unicorn/prevent-abbreviations": [
    "error",
    {
      replacements: {
        props: false,
      },
    },
  ],
});
new TextFile(project, ".editorconfig", {
  lines: [
    "root = true",
    "",
    "[*]",
    "indent_style = space",
    "indent_size = 2",
    "end_of_line = lf",
    "charset = utf-8",
    "trim_trailing_whitespace = true",
    "insert_final_newline = true",
    "",
    "[*.md]",
    "trim_trailing_whitespace = false",
    "",
  ],
});
project.addPackageIgnore(".editorconfig");

// Docs.
project.setScript("preinstall", "npx only-allow pnpm");
project.addFields({
  pnpm: {
    peerDependencyRules: {
      ignoreMissing: [
        "@algolia/client-search",
        "react",
        "react-dom",
        "@types/react",
      ],
    },
  },
});
project.addDeps("vitepress", "vue");
project.addGitIgnore("/.vitepress/dist");
project.addTask("docs:dev", { exec: "vitepress dev" });
project.addTask("docs:build", { exec: "vitepress build" });
project.addTask("docs:serve", { exec: "vitepress serve" });
new SampleFile(project, ".vitepress/config.ts", {
  contents: [
    'import { defineConfig } from "vitepress";',
    "",
    "export default defineConfig({",
    "  //",
    "});",
    "",
  ].join("\n"),
});

project.compileTask.reset();
project.compileTask.exec("vitepress build");
project.packageTask.reset();

project.synth();
