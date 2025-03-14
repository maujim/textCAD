# TODO: AI-Powered CAD Model Modification Web App

## Project Setup
- [ ] **Set up the development environment**
  - [x] Install Node.js and npm
  - [x] Install a code editor (e.g., VSCode)
- [x] **Install necessary dependencies**
  - [x] Frontend: React, react-three-fiber, Three.js, OpenCascade.js
  - [x] AI: Google Gemini API (or alternative LLM client library for JavaScript)
- [x] **Create the project structure**
  - [x] Create a new React app (e.g., `npx create-react-app cad-app`)
  - [x] Add a `src` folder structure: `components/`, `utils/`, `assets/`

## Frontend Development
- [x] **Set up the React application**
  - [x] Initialize the React app with `npx create-react-app cad-app`
  - [x] Install dependencies: `npm install three @react-three/fiber @react-three/drei opencascade.js`
- [x] **Integrate OpenCascade.js for CAD processing**
  - [x] Import OpenCascade.js into the project (e.g., via CDN or npm)
  - [x] Load a sample CAD model (e.g., a cube created programmatically with `BRepPrimAPI_MakeBox`)
  - [x] Implement functions to generate a mesh from the CAD model for rendering
- [x] **Set up Three.js for 3D rendering**
  - [x] Create a `<ModelViewer>` component in `src/components/ModelViewer.js`
  - [x] Render the initial CAD model mesh using `<mesh>` and `BufferGeometry`
  - [x] Add `<OrbitControls />` for model interaction (rotate, zoom)
- [x] **Create user interface components**
  - [x] `<ChatWindow>` in `src/components/ChatWindow.js`: For user input and conversation history
  - [x] `<ThinkingBox>` in `src/components/ThinkingBox.js`: To display AI reasoning
  - [x] `<RevisionDropdown>` in `src/components/RevisionDropdown.js`: To manage model versions
- [x] **Implement chat functionality**
  - [x] Add state for `messages` and `input` in `<ChatWindow>`
  - [x] Render a `<textarea>` for input and a `<button>` to submit
  - [x] Display chat messages in a scrollable `<div>`
- [x] **Implement model clicking**
  - [x] Add an `onClick` handler in `<ModelViewer>` using `useThree` to get raycaster data
  - [x] Identify the clicked face using OpenCascade.js intersection logic
  - [x] Store the selected face ID in component state
- [x] **Handle command processing**
  - [x] Send user commands and selected face ID to the AI API directly from the client
  - [x] Parse the AI response (e.g., JSON with modification instructions)
  - [x] Apply modifications to the CAD model using OpenCascade.js (e.g., add a hole)
  - [x] Generate an updated mesh and refresh the 3D viewer
- [x] **Display AI reasoning**
  - [x] Update `<ThinkingBox>` with reasoning from the AI response
  - [x] Ensure the box scrolls if reasoning text is long
- [x] **Implement revision history**
  - [x] Store model states in a local array (e.g., `revisions`) with timestamps
  - [x] Populate `<RevisionDropdown>` with revision options
  - [x] Update the model and mesh when a revision is selected
- [x] **Implement error handling**
  - [x] Handle invalid AI responses or failed modifications
  - [x] Display user-friendly error messages in `<ChatWindow>` (e.g., "Cannot add a hole here")

## Integration
- [x] **Connect UI components**
  - [x] Combine `<ModelViewer>`, `<ChatWindow>`, `<ThinkingBox>`, and `<RevisionDropdown>` in `App.js`
  - [x] Ensure state updates (e.g., new mesh, AI reasoning) propagate correctly
- [x] **Integrate with the AI API**
  - [x] Configure API keys for Google Gemini (or alternative LLM) in a `.env` file
  - [x] Use `fetch` to make API calls from the client (e.g., `POST` to Gemini endpoint)
  - [x] Test the full flow: user command → AI response → model update → UI refresh
- [x] **Ensure real-time updates**
  - [x] Verify the 3D viewer updates immediately after modifications
  - [x] Confirm chat and thinking box reflect the latest interaction

## Testing
- [x] **Unit tests for individual components**
  - [x] Test `<ModelViewer>`: Renders mesh and handles clicks
  - [x] Test `<ChatWindow>`: Submits input and displays messages
  - [x] Test OpenCascade.js functions: Model loading, modification, mesh generation
- [x] **Integration tests for combined functionality**
  - [x] Test command flow: "Add a hole" → AI response → updated model in viewer
  - [x] Test revision history: Create versions, select, and revert
- [x] **Test error handling scenarios**
  - [x] Simulate AI API failures or invalid responses
  - [x] Test impossible modifications (e.g., hole in a tiny area)
- [x] **User acceptance testing**
  - [x] Test with sample commands (e.g., "Move this part", "Add a screw hole")
  - [x] Gather feedback on usability and adjust UI if needed

## Deployment
- [ ] **Prepare the application for production**
  - [ ] Optimize the React build with `npm run build`
  - [ ] Ensure OpenCascade.js WASM files are included in the build
  - [ ] Store API keys securely (e.g., in environment variables, despite client-side usage)
- [ ] **Set up hosting**
  - [ ] Choose a static hosting platform (e.g., Vercel, Netlify)
  - [ ] Deploy the built app to the platform
- [ ] **Verify deployment**
  - [ ] Check that the app loads and renders the model in the browser
  - [ ] Test API calls and modifications in the live environment

## Additional Tasks
- [ ] **Write documentation**
  - [ ] Document how to use the chat interface and supported commands
  - [ ] Note limitations (e.g., client-side API calls, no backend validation)
- [ ] **Ensure code quality**
  - [ ] Use ESLint and Prettier for linting and formatting
  - [ ] Comment complex logic (e.g., OpenCascade.js modifications)

---

### Notes
- **OpenCascade.js**: This uses WebAssembly (WASM) to run OpenCascade in the browser. Ensure the WASM files are correctly loaded (e.g., via `opencascade.js` npm package or manual setup).
- **Client-Side API Calls**: Direct calls to the AI API from the client expose keys in the browser, which isn’t secure for production. This is noted as a trade-off for prototyping speed.
- **Scope**: The checklist focuses on a working prototype. Features like advanced security or a proper backend can be added later.

This `todo.md` should give you a clear, actionable checklist to build the app with OpenCascade.js and client-side API calls. Copy it into a `.md` file and start checking off tasks as you go! Let me know if you need further adjustments.
