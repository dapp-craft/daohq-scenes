# Atom Space Room (room-scene-2) for DAO HQ

This scene supposed to be deployed in wordls

#### Links to sections of the documentation describing each part of the code in the context of each directory:

(Each directory in "/src" contains a description of the current section)

- [DEBUG](src/debug/README.md)
- [SCENE](src/scene/README.md)
  - [constants](src/scene/constants/README.md)

### Building the project

1. Install dependencies for room-scene and shared folder
   ```sh
   npm install
   ```
   _Run this command twice. From ./room-scene-2 and ./shared folder_
2. Link the shared folder. In the ./room-scene-2 folder:
   ```sh
   npm run link-shared
   ```
3. Build the project
   ```sh
   npm run build
   ```
4. Start the project
   ```sh
   npm run start
   ```
