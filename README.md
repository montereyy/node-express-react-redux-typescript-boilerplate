npm run

    * "start": "NODE_PATH=./src ENVIRONMENT=development nodemon src/index.js --exec babel-node",
    * "build": "rm -rf dist/; babel src -d dist",
    * "serve": "NODE_PATH=./dist ENVIRONMENT=production nodemon dist/index.js"