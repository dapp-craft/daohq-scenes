## Shared Components

This directory contains components that are used in various scenes at different levels of nesting.

Specifically, these components include:

- **AreaTrigger :**
  Area System, which is based on a Raycast System. Area System is a class that defines system functionality.
  It is used to determine the correct location for turning music on and off, as well as to invoke the
  necessary callbacks in the trigger system for activating video content on the screens of the scene.
- **EstateBoard :**
  EstateBoard is a class used for creating estate information screens and setting up relevant content for them.
- **EventPoster :**
  EventPoster is a class used to create boards displaying information about closest events. Additionally, when a user clicks on the board, they can navigate between scenes.
- **PlazaBoard :**
  Creates boards for the Worlds room. These boards are identical to the ones at the Genesis Plaza location.
- **Screen :**
  Screen is a class that is used to create a screen in the scene. It takes a configuration object
  as an argument. The content on these created screens is set using a web service - DAO HQ Admin Panel.
- **ScreenContentManager :**
  ScreenContentManager is a class that is used to manage the content on the screens. When a user enters or
  exits the trigger zone of the screen, the state of the active content changes.
- **SoundManager :**
  SoundManager is a class that is used to manage the background music in the scene.
- **UiSizer :**
  UiSizer is a class that allows setting a responsive size for the 2D interface. It is used only within the UI component.
