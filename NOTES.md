# Storybook `npx sb init` does not work with NPM v7

Solution how to fix it:
[https://github.com/storybookjs/storybook/issues/12983#issuecomment-734385670](https://github.com/storybookjs/storybook/issues/12983#issuecomment-734385670)

```bash
npx --legacy-peer-deps sb init
```

