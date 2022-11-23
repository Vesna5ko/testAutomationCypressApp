# testAutomationCy

This is mirrored project of https://github.com/cypress-io/cypress-realworld-app

Taken from original documentation:

## Prerequisites

The only requirement for this project is to have Node.js version 14 installed on your machine. Refer to the .node-version file for the exact version.

TypeScript will be added as a local dependency to the project, so no need to install it.

## Installation

yarn install

## Run the app

yarn dev

    🚩 Note

    The app will run on port 3000 (frontend) and 3001 (API backend) by default. Please make sure there are no other applications or services running on both ports. If you want to change the default ports, you can do so by modifying PORT and REACT_APP_BACKEND_PORT variables in .env file. However, make sure the modified port numbers in .env are not commited into Git since the CI environments still expect the application to run on the default ports.

## Start Cypress

yarn cypress:open
