## Debug Menu

Here, the logic for the scene's debug menu is implemented.

The **loadingUI** and **debugUI** components are directly responsible for the user interface.

The **initialConfigParams** function initializes the query parameter data for the correct display of the debug menu. When adding new parameters to the debug menu, it is necessary to call the **initialConfigSet** function, which will initialize this new parameter.
