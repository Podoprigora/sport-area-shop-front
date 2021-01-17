# Storybook `npx sb init` does not work with NPM v7

Solution how to fix it:
[https://github.com/storybookjs/storybook/issues/12983#issuecomment-734385670](https://github.com/storybookjs/storybook/issues/12983#issuecomment-734385670)

```bash
npx --legacy-peer-deps sb init
```

# To solve TS error for function: 'this' implicitly has type 'any' because it does not have a type annotation.
https://github.com/Microsoft/TypeScript/issues/19639#issuecomment-590680337


