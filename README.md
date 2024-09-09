## Overview

This repository contains end-to-end (E2E) tests for the GAD application. The tests ensure the proper functionality of the application's user interface and workflows.

## Project Link

Access the GAD application repository here: [GAD GUI & API Demo](https://github.com/jaktestowac/gad-gui-api-demo). This repository is maintained by [jaktestowac.pl](https://github.com/jaktestowac).

## Prerequisites

Ensure that the GAD application is set up and running locally before proceeding with the tests.

## Setup Instructions

1. **Clone the GAD Repository**
   Clone the GAD application repository from the link above. Install the necessary dependencies and follow the instructions to run the application.

2. **Clone This Repository**
   Clone this test repository to your local machine.

3. **Install Dependencies**
   Navigate to the test project directory and install the dependencies by running:

   ```
   npm install
   ```

4. **Set Up GAD Application**
   Visit the GAD application running on `localhost:3000` and create an account. This step is essential for running the tests.

5. **Configure Environment Variables**
   Create a `.env` file in the root directory of the test project. You can use the `.env.example` file as a template to set up the necessary environment variables.

6. **Run the Tests**
   Execute the tests using Playwright with the following command:

   ```
   npx playwright test
   ```

## Available Commands

### Install Dependencies

To install all required Node.js dependencies, run:

```
npm install
```

### Run Tests (Headless Mode)

```
npm run test
```

### Run Tests (With Browser GUI)

```
npm run test:headed
```

## Project Structure

This project is organized into two primary folders for test cases:

- blog: Contains tests related to the blog functionality of the GAD application.
- practice: Contains tests for various practice features of the application.

Each folder focuses on verifying different functionalities within the GAD application, ensuring comprehensive test coverage across critical user interactions.
