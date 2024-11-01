## Debug Params

Here, the logic for scene debugging is implemented.

The **initialConfigParams** function initializes query parameter data to visualize scene elements that require testing. When adding new parameters for debugging, it is necessary to call the **initialConfigSet** function, which will initialize the new parameter.

To add **new config parameter**, you need to do changes to the existing config in the **debugConfig.ts** file.

```
  export let config: Config = {
    ...
    newParameter: false
  }
```

Then, you need to additionally call the initialConfigSet function with the necessary arguments when initializing debug parameters with the initialConfigParams function.

```
export const initialConfigParams = async () => {
  ...
  await initialConfigSet(config, 'NEW_PARAMETER', 'newParameter', 'true')
}
```

Now you can control the new debug parameter by adding it as a query parameter.

```
&NEW_PARAMETER=true
```
