# First, set up your project

    Initialize your Node.js project:

    ```bash

    npm init -y
    ```

## Install necessary dependencies

    ```bash

    npm install express axios body-parser
    ```

## Create the directory structure

    ```bash

    mkdir src
    touch src/server.js
    touch src/routes.js
    touch src/controllers.js
    ```

## Update package.json to include a start script

    ```json

    "scripts": {
        "start": "node src/server.js"
    }
    ```
