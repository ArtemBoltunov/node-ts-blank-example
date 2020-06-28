# Init NodeJS TypeScript project

## Init project

Make sure that you have installed NodeJS 12.17+

Create base packages configuration. Run command and follow instructions:
```
npm init
```

## Add TypeScript configuration

Setup typescript packages:
```
npm install --save-dev typescript ts-node core-js @types/node
```

Configure typescript:
```
./node_modules/.bin/tsc --init
```

Uncomment `outDir` property in `tsconfig.json` and put build directory:
```
{
  "compilerOptions": {
    ...
    "outDir": "./build",
    ...
  }
}
```

## Add Unit test

Install **Jest** packages for unit tests:
```
npm install --save-dev jest ts-jest @types/jest
```

Configure **Jest**:
```
./node_modules/.bin/jest --init
```
Example for default answers:
```
✔ Would you like to use Jest when running "test" script in "package.json"? … yes
✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … no
✔ Automatically clear mock calls and instances between every test? … no
```

Uncomment `preset` property in `jest.config.js` and assign it to `ts-jest`:
```
...
module.exports = {
...
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
...
};
```

## Add a linter

Install **ESLint** packages as a linter:
```
npm install --save-dev eslint
```

Configure linter:
```
./node_modules/.bin/eslint --init
```

An example of answers:
```
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? None of these
? Does your project use TypeScript? Yes
? Where does your code run? Node
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in? JavaScript
? Would you like to install them now with npm? Yes
```

Add extra configuration for the linter into `.eslintrc.js` 

```
module.exports = {
  ...
  extends: [
    ...
    'plugin:@typescript-eslint/recommended',
  ],
  ...
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
```

## Create an example to probe configuration

Create a file `./index.ts`: 
```
export default class Example {
    static run(){
        console.log('configuration is working');
    }
}

Example.run();
```

Configure typescript running in `package.json`:
```
"scripts": {
    "build": "node_modules/.bin/tsc",
    "dev": "node --inspect=5858 -r ./node_modules/.bin/ts-node ./index.ts",
    ...
  },
```

Check dev script:
```
npm run dev
```

Check build script:
```
npm run build
```

Add simple test file `index.test.ts`:
```
import Example from './index';
console.log = jest.fn()

test("Example run display message", ()=> {
    Example.run()
    expect(console.log).toBeCalledWith("configuration is working")
})
```

Run tests:
```
npm run test
```