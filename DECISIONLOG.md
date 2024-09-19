# Decision Log

This document contains a record of important decisions made during the development of the **GAD Playwright**.

## Table of Contents

- [Decision #1: Selection of Automation Testing Library](#decision-1-selection-of-automation-testing-library)
- [Decision #2: Selection of Development Dependencies](#decision-2-selection-of-development-dependencies)
- [Decision #3: Adoption of the Page Object Model (POM)](#decision-3-adoption-of-the-page-object-model-pom)
- [Decision #4: Adding API Testing in Playwright](#decision-4-adding-api-testing-in-playwright)
- [How to Use This Document](#how-to-use-this-document)

## Decisions

### Decision #1: Selection of Automation Testing Library

**Date**: 2024-08-14

**Responsible Person**: Łukasz Tołwiński

**Context**:
The team needed to select an automation testing library that is modern, forward-looking, and easy to work with. The main requirement was to choose a solution that is not outdated, is actively maintained, and offers a solid ecosystem for future growth.

**Considered Options**:

1. **Playwright**: A modern end-to-end testing framework that has recently gained significant popularity. Playwright Test, specifically in TypeScript, offers a wide range of built-in functions and powerful features, making it very flexible for different testing scenarios.
2. **Cypress**: Another popular end-to-end testing framework known for its simplicity and ease of use. It has a strong community but lacks some of the advanced features and flexibility that Playwright provides, particularly in terms of multi-browser support.

**Decision Made**:
The team selected **Playwright** due to its rising popularity and the comprehensive feature set it offers. Playwright Test, written in TypeScript, provides built-in capabilities such as parallel test execution, network interception, and support for multiple browsers, including Chrome, Firefox, and WebKit. This makes Playwright a robust and future-proof option for automation testing.

**Consequences**:

- **Positive**:

  - **Modern and forward-looking**: Playwright is rapidly evolving, and its growing adoption in the industry ensures continued support and feature development.
  - **Feature-rich**: The built-in features of Playwright Test eliminate the need for additional plugins, reducing setup complexity and increasing developer productivity.
  - **TypeScript integration**: Native TypeScript support allows for type safety and better developer experience, aligning with the project's technology stack.
  - **Cross-browser support**: Playwright provides strong multi-browser testing capabilities, which could expand test coverage compared to Cypress, which is primarily optimized for Chrome.

- **Negative**:
  - **Steeper learning curve**: Compared to Cypress, Playwright's flexibility and broader feature set may require more time to learn and fully utilize.
  - **Community size**: While Playwright's popularity is growing, Cypress still has a larger, more established community with more readily available resources and plugins.

---

### Decision #2: Selection of Development Dependencies

**Date**: 2024-08-14

**Responsible Person**: Łukasz Tołwiński

**Context**:
To streamline development and ensure code quality, the team needed to choose a set of key development dependencies (`devDependencies`) that would support efficient development practices, such as code formatting, linting, environment variable management, and test data generation. These packages should be aligned with the project’s technology stack, in particular TypeScript and Playwright, while also maintaining the overall code consistency and clarity.

**Considered Options**:

1. **Use of specific tools and libraries**: The team considered specific libraries to handle linting, formatting, environment configuration, and test data generation. The key tools included:
   - **ESLint**: For enforcing code quality through static analysis.
   - **Prettier**: For automated code formatting to ensure a consistent coding style.
   - **Dotenv**: For loading environment variables from `.env` files, supporting flexible configuration across different environments.
   - **Faker**: For generating mock data in tests to simulate realistic test scenarios.
2. **Manual management of configuration and utilities**: This would involve using native or built-in utilities for tasks like environment configuration and code quality checks, but without dedicated tools, this approach could lead to inconsistencies and higher maintenance costs as the project scales.

**Decision Made**:
The team decided to adopt the following set of development dependencies to enhance the efficiency, maintainability, and consistency of the codebase:

- **`eslint` & `@eslint/js`**: For ensuring code quality and adherence to coding standards. ESLint helps catch syntax errors and enforce best practices during development.
- **`prettier` & `eslint-config-prettier`, `eslint-plugin-prettier`**: Prettier is used to automate code formatting, and its integration with ESLint (`eslint-config-prettier` and `eslint-plugin-prettier`) ensures that formatting and linting rules do not conflict.
- **`dotenv`**: For managing environment variables across different development environments, allowing the team to securely store sensitive configuration data such as API keys or database credentials.
- **`faker` (@faker-js/faker)**: For generating dynamic and realistic test data, simulating different scenarios during testing, and ensuring that tests are not dependent on hardcoded values.
- **`@playwright/test`**: Playwright’s testing library, integrated with TypeScript, to streamline writing and executing test scripts.
- **`typescript-eslint`**: Provides TypeScript support for ESLint, allowing for consistent linting in a TypeScript codebase.
- **`@types/node`**: Ensures proper TypeScript typings for Node.js, which is essential for type safety when interacting with Node.js APIs.

**Consequences**:

- **Positive**:

  - **Code Quality**: The combination of ESLint and Prettier ensures a clean, standardized codebase. ESLint enforces coding best practices, while Prettier handles consistent formatting automatically.
  - **Environment Management**: Dotenv simplifies environment configuration by centralizing variables in a `.env` file, making the application easily adaptable to different environments (development, staging, production).
  - **Realistic Test Data**: The `faker` library allows for easy generation of mock data, which improves test coverage and reliability by avoiding hardcoded values in tests.
  - **TypeScript Support**: `typescript-eslint` and `@types/node` ensure strong typing throughout the codebase, reducing potential bugs and improving the development experience.
  - **Playwright Integration**: Using `@playwright/test` provides built-in Playwright testing capabilities that work seamlessly with TypeScript, enhancing the development process for test automation.

- **Negative**:
  - **Additional Configuration Overhead**: While these tools improve development in the long run, the initial setup and configuration might take additional time, especially when integrating multiple tools such as ESLint and Prettier.
  - **Learning Curve**: Developers unfamiliar with the ESLint/Prettier ecosystem or tools like Dotenv and Faker may need to spend time understanding their usage and configuration.

---

### Decision #3: Adoption of the Page Object Model (POM)

**Date**: 2024-08-16

**Responsible Person**: Łukasz Tołwiński

**Context**:
The team needed to select a design pattern to organize test automation code in a scalable and maintainable way. Given the growing number of test cases and the complexity of the web pages being tested, it was crucial to implement a structure that minimizes code duplication and improves readability.

**Considered Options**:

1. **Page Object Model (POM)**: A design pattern that encapsulates page-specific details into separate classes or objects, making the code easier to maintain and reuse. Each page of the application is represented by a corresponding "page object," which contains methods to interact with that page’s elements.
2. **Direct Scripting**: Writing test scripts without any abstraction. This option would have involved interacting directly with web elements in each test case, which could lead to duplication and more complex test maintenance as the project scales.

**Decision Made**:
The team decided to adopt the **Page Object Model (POM)** as the standard design pattern for organizing the test automation code. POM provides a clear separation between test scripts and page-specific logic, which increases test readability and reusability. By defining page objects with reusable methods, tests become more concise, and any future changes to the UI can be managed in a single place, reducing the maintenance burden.

**Consequences**:

- **Positive**:

  - **Maintainability**: With POM, changes to the UI can be easily reflected in the corresponding page objects, avoiding the need to update every individual test case.
  - **Reusability**: Common actions such as clicking buttons, filling forms, or navigating between pages are encapsulated in the page objects, reducing code duplication and improving consistency.
  - **Scalability**: As the number of test cases grows, POM ensures that the codebase remains organized and scalable, making it easier for new team members to understand and contribute to the project.
  - **Readability**: The separation of test logic and page interaction improves the readability of test scripts, which can lead to better collaboration among team members.

- **Negative**:
  - **Initial Setup Time**: Implementing POM requires an upfront investment in setting up page object classes for each page, which can slightly slow down initial development.
  - **Overhead for Simple Tests**: For very basic test cases, POM might introduce unnecessary complexity, as even straightforward interactions need to be abstracted into page objects.

---

### Decision #4: Adding API Testing in Playwright

**Date**: 2024-09-16

**Responsible Person**: Łukasz Tołwiński

**Context**:
As the project evolved, the team identified a need to implement API testing alongside UI tests to ensure the reliability and correctness of backend services. Integrating API tests within the same framework as UI tests would allow for unified testing and more efficient workflows, especially given that Playwright already supports API requests and responses.

**Considered Options**:

1. **Add API Testing in Playwright**: Playwright includes native support for API testing, allowing the team to make HTTP requests, assert on responses, and manage API testing within the same framework as UI tests. This provides the benefit of keeping all tests (UI and API) in a single toolset.
2. **Use a separate API testing framework (e.g., Postman, Supertest)**: While dedicated API testing tools like Postman and Supertest offer robust features for API testing, they would require managing a separate testing framework, which could lead to more fragmented workflows.

**Decision Made**:
The team decided to extend the Playwright testing framework to include **API testing**. This decision was made to maintain consistency in the test suite by leveraging Playwright’s built-in API testing capabilities. Playwright allows for making API calls, validating responses, and incorporating API tests seamlessly within the existing test architecture.

**Consequences**:

- **Positive**:

  - **Unified Framework**: By using Playwright for both UI and API tests, the team can maintain a single test suite, simplifying setup, maintenance, and execution. There’s no need to switch between tools for different types of testing.
  - **Efficient Workflows**: Running both UI and API tests in the same framework can lead to more efficient CI/CD pipelines and test management, reducing the need for context switching.
  - **Strong Playwright Support**: Playwright’s API testing capabilities include features like network request interception, response validation, and mocking, which simplify the process of creating end-to-end tests that cover both frontend and backend.
  - **End-to-End Testing**: Combining UI and API tests allows for comprehensive end-to-end testing, ensuring that both the frontend and backend are working together as expected.

- **Negative**:
  - **Limited Advanced Features**: Although Playwright offers strong support for API testing, it may lack some of the more advanced features provided by dedicated API testing tools such as Postman (e.g., graphical interfaces, automated schema validation).
  - **Learning Curve**: For team members who are primarily focused on UI testing, there might be a slight learning curve to fully understand and implement API testing using Playwright.

---

## How to Use This Document

1. Record every significant technical decision using the format outlined above.
2. Ensure that each decision has a clear context, considered options, the decision made, and its consequences.
3. Regularly review and update this document to reflect changes in the project.
