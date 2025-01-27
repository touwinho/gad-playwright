## Overview

This repository contains end-to-end (E2E) tests for the GAD application. The tests ensure the proper functionality of the application's user interface and workflows.

### Table of Contents

- [Overview](#overview)
- [Project Link](#project-link)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Available Commands](#available-commands)
- [Decision Log](./DECISIONLOG.md)

## Project Link

Access the GAD application repository here: [GAD GUI & API Demo](https://github.com/jaktestowac/gad-gui-api-demo). This repository is maintained by [jaktestowac.pl](https://github.com/jaktestowac).

## Prerequisites

Ensure that the GAD application is set up and running locally before proceeding with the tests.

## Setup Instructions

1. **Clone the GAD Repository**
   Clone the GAD application repository from the [link](https://github.com/jaktestowac/gad-gui-api-demo). Install the necessary dependencies and follow the instructions to run the application.

2. **Clone This Repository**
   Clone this test repository to your local machine.

3. **Install right Node.js version** Using nvm, proper Node version will be applied.

   ```
   nvm i
   ```

4. **Install Dependencies**
   Navigate to the test project directory and install the dependencies by running:

   ```
   npm install
   ```

5. **Install Browsers**
   To run tests using Playwright, you need to install the required browsers. This command will download and set up the necessary browser binaries for testing:

   ```
   npx playwright install
   ```

6. **Set Up GAD Application**
   Visit the GAD application running on `localhost:3000` and create an account. This step is essential for running the tests.

7. **Configure Environment Variables**
   Create a `.env` file in the root directory of the test project. You can use the `.env.example` file as a template to set up the necessary environment variables.

8. **Run the Tests**
   Execute the tests using Playwright with the following command:

   ```
   npx playwright test
   ```

## Available Commands

### Install Dependencies

```
npm install
```

### Install Browsers

```
npx playwright install
```

### Run Tests (Headless Mode)

```
npm run test
```

### Run Tests (With Browser GUI)

```
npm run test:headed
```

### Run API Tests

```
npm run test:api
```

### Run GUI Tests (Headless Mode)

```
npm run test:gui
```

### Run GUI Tests (With Browser GUI)

```
npm run test:gui-headed
```
