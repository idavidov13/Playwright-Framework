# Playwright-Framework

MVP(Minimal Viable Product) for Playwright Automation Framework. Features TypeScript, Page Object Model Design Pattern, Custom Fixtures, REST API Testing and Mocking, Schema Validation with Zod, Environment Utilization, and CI/CD integration with GitHub Actions and GitLab CI/CD.

## Table of Contents

-   [Introduction](#introduction)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Project Structure](#project-structure)
-   [Usage](#usage)
-   [Environment Variables](#environment-variables)
-   [Running Tests Locally](#running-tests-locally)
-   [GitHub Actions](#github-actions)
-   [GitLab CI/CD](#gitlab-ci---cd)
-   [Coding Standards](#coding-standards)

## Introduction

This repository contains a Playwright framework written in TypeScript. The framework follows the Page Object Model design pattern and uses `.env` files for managing environment-specific variables. For example purpose is used the following webapp - https://conduit.bondaracademy.com/

This Framework was developed during my practice as an Automation QA and is based on invaluable lessons learned from:

1. **Stefan Judis** - [GitHub](https://github.com/stefanjudis), [Website](https://www.stefanjudis.com/)
2. **Murat Ozcan** - [GitHub](https://github.com/muratkeremozcan), [Udemy Course](https://www.udemy.com/course/playwright-vitest-vs-cypress-the-epic-showdown/)
3. **Filip Hric** - [GitHub](https://github.com/filiphric), [Website](https://filiphric.com/)
4. **Artem Bondar** - [GitHub](https://github.com/bondar-artem), [Website](https://www.bondaracademy.com/)

Feel free to use or update the provided framework to best suit your needs.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (version 20.13.1 or later)
-   **npm** (version 10 or later) or **yarn** (version 4.2.2 or later)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/idavidov13/Playwright-Framework.git
    cd Playwright-Framework
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Install Playwright Browsers:**

    ```sh
    npx playwright install --with-deps
    ```

    This command ensures all necessary browser binaries and dependencies are installed.

4. **Set up environment variables:**

    Create a `.env.{environmentName}` file in the `env/` directory and add your environment-specific variables. Refer to the [Environment Variables](#environment-variables) section for details.

## Project Structure

```
Playwright-Framework/
├── .github/
│   ├── actions
|   |   └── playwright-setup
|   └── workflows
│       ├── playwright-container.yml
│       ├── playwright-custom-runner.yml
│       └── playwright-runner.yml
│
├── env/
│   └── .env.dev
│
├── fixture/
│   ├── api
│   |   ├── api-request-fixture.ts
│   |   ├── plain-function.ts
│   |   ├── schemas.ts
│   |   └── types-guards.ts
│   └── pom
│       ├── page-object-fixture.ts
│       └── test-options.ts
|
├── pages/
│   └── clientSite/
|       ├── articlePage.ts
|       ├── homePage.ts
|       └── navPage.ts
|
├── tests-data/
│   ├── articleData.json
│   └── invalidCredentials.json
|
├── tests/
│   ├── auth.setup.ts
│   ├── API/
│   |   ├──article.spec.ts
│   |   └──authentication.spec.ts
|   |
│   └── ClientSite/
│       ├──article.ts
│       ├──home.spec.ts
│       └──nav.spec.ts
|
├── .gitignore
├── .prettierrc
├── LICENSE
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```

## Usage

1. **Define your page objects:**

    Create your page object classes in the `pages/` directory. Each class should encapsulate the interactions and assertions for a single page.

2. **Write your tests:**
   Write your tests in the `tests/` directory. Import your page objects and use them to interact with the application.

## Environment Variables

The framework uses `.env` files for managing environment-specific variables. Create a folder `env/` in the root directory and add `.env.{environmentName}` files. Example for `.env.dev`:

```
# .env.dev
URL=https://conduit.bondaracademy.com/
API_URL=https://conduit-api.bondaracademy.com/
USER_NAME={your username}
EMAIL={your email}
PASSWORD={your password}
```

The default environment name should be DEV (.env.dev). The script is built to use the file if `process.env.VARIABLE_NAME` is `undefined`.

These variables can be accessed in your tests and page objects using `process.env.VARIABLE_NAME`.

To set desired environment, run the following command into terminal, before starting the tests:

```
$env:ENVIRONMENT='{environmentName}'
```

You can verify the set variable with:

```sh
echo $env:ENVIRONMENT
```

## Running Tests Locally

To run tests, use the following commands (defined in the `scripts` section of `package.json`):

```sh
npm run test        # Run all tests
npm run smoke       # Run smoke tests
npm run sanity      # Run sanity tests
npm run api         # Run API tests
npm run regression  # Run regression tests
npm run fullTest    # Run the full test suite
```

## GitHub Actions

The framework includes four GitHub Actions workflows for CI/CD (you can find the repository with implemented GitHub Actions [here](https://github.com/idavidov13/Playwright-Framework)):

1. **playwright-container.yml**: Runs tests inside a Docker container for consistent and isolated environments.
2. **playwright-custom-runner.yml**: Executes tests on a custom GitHub runner for enhanced control over the test environment.
3. **playwright-runner.yml**: Runs tests on the default GitHub runner.
4. **playwright-custom-runner-extended.yml**: Runs tests on the default GitHub runner, Merge all uploaded test Reports, Build GitHub Page and Deploy it.

### Workflow Details

-   **Environment Variables**: All workflows use environment variables defined in GitHub Secrets.
-   **Test Stages**: The Pipeline includes stages for setup and smoke test, and testing stage (sanity tests, API tests, and regression tests)
-   **Reports**: Test reports are uploaded as artifacts for review.
-   **Merge Report (Optional)**: All uploaded reports are downloaded, merged in one, and merged report is uploaded as artifact.
-   **Build Report (Optional)**: Merged report is downloaded and github-pages are genereted and uploaded as artifact.
-   **Deploy Report (Optional)**: Uploaded github-pages is deployed in GitHub Pages for the workflow.
    -   **Note:** Due to GitHub consideration of url to consist secrets, the workaround was to hardcode the url for the GitHub Pages, so it appears just below the job name and it is easily accesible for everyone.
    -   **TO DO:** If the job is implemented, the URL should be updated.

## GitLab CI - CD

The framework includes GitLab pipeline for CI/CD (you can find the repository with implemented GitLab CI/CD [here](https://gitlab.com/idavidov13/playwright-framework)):

### Pipeline Details

-   **Environment Variables**: The Pipeline use environment variables defined in GitLab Setting > CI/CD > Variables.
-   **Test Stages**: The Pipeline includes stages for setup and smoke test, and testing stage (sanity tests, API tests, and regression tests)
-   **Reports**: All test reports are uploaded as artifacts for review.
-   **Merge Report**: All uploaded reports are merged in one, and merged report is uploaded as artifact.
-   **Deploy Report**: Uploaded merged report is deployed in GitLab Pages for the workflow.
    -   **Note:** The report is public and can be accessed on [link](https://idavidov13.gitlab.io/playwright-framework). The configuration can be set from Deploy > Pages.

## Coding Standards

1. **Type Annotations**: Always use type annotations for variables, function parameters, and return types.

    ```typescript
    function add(a: number, b: number): number {
        return a + b;
    }
    ```

2. **Type Inference**: Let TypeScript infer types when it's obvious.

    ```typescript
    let count = 0; // TypeScript infers count as number
    ```

3. **Interfaces and Types**: Prefer `interface` for object shapes and `type` for unions or intersections.

    ```typescript
    interface User {
        id: number;
        name: string;
    }

    type Result<T> =
        | { success: true; value: T }
        | { success: false; error: string };
    ```

4. **Naming Conventions**:

    - Use `camelCase` for variables and functions.
    - Use `PascalCase` for classes and interfaces.

5. **Readability**:

    - Use descriptive names for variables, functions, and classes.
    - Keep functions small and focused on a single task.

6. **Documentation**: Use JSDoc for documenting code.

    ```typescript
    /**
     * Adds two numbers together.
     * @param a - First number
     * @param b - Second number
     * @returns The sum of the two numbers
     */
    function add(a: number, b: number): number {
        return a + b;
    }
    ```

7. **Test Tags**: Each test must have at least one tag. The default tags, which are used are: [@Smoke, @Sanity, @Api, @Regression]
