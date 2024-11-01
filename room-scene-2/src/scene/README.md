## Setup of the 3D part of the Atom Space Room (room-scene-2)

Here, functions are grouped that setup parts of the 3D scene, which are related only to the main scene.

The main **setupScene** function initializes all key elements of the scene, such as 3D models **(setupModels)**, screens **(setupScreens)**, and event posters **(setupEventPosters)**, which are linked from the shared code and described there.

Additionally, the **AreaSystem (setupAreaLayers, setupAreaEvents)** is also initialized here.

The Area System is a trigger system that operates based on the Raycast System. It is used to start/stop video content playing on screens, which are managed through the DAO HQ Admin Panel.
The **setupAreaLayers** and **setupAreaEvents** functions are responsible for setting up layers and the necessary events in the scene, respectively.
