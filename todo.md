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
- [ ] **Implement chat functionality**
  - [ ] Add state for `messages` and `input` in `<ChatWindow>`
  - [ ] Render a `<textarea>` for input and a `<button>` to submit
  - [ ] Display chat messages in a scrollable `<div>`
- [ ] **Implement model clicking**
  - [ ] Add an `onClick` handler in `<ModelViewer>` using `useThree` to get raycaster data
  - [ ] Identify the clicked face using OpenCascade.js intersection logic
  - [ ] Store the selected face ID in component state
- [ ] **Handle command processing**
  - [ ] Send user commands and selected face ID to the AI API directly from the client
  - [ ] Parse the AI response (e.g., JSON with modification instructions)
  - [ ] Apply modifications to the CAD model using OpenCascade.js (e.g., add a hole)
  - [ ] Generate an updated mesh and refresh the 3D viewer
- [ ] **Display AI reasoning**
  - [ ] Update `<ThinkingBox>` with reasoning from the AI response
  - [ ] Ensure the box scrolls if reasoning text is long
- [ ] **Implement revision history**
  - [ ] Store model states in a local array (e.g., `revisions`) with timestamps
  - [ ] Populate `<RevisionDropdown>` with revision options
  - [ ] Update the model and mesh when a revision is selected
- [ ] **Implement error handling**
  - [ ] Handle invalid AI responses or failed modifications
  - [ ] Display user-friendly error messages in `<ChatWindow>` (e.g., "Cannot add a hole here")

## Integration
- [ ] **Connect UI components**
  - [ ] Combine `<ModelViewer>`, `<ChatWindow>`, `<ThinkingBox>`, and `<RevisionDropdown>` in `App.js`
  - [ ] Ensure state updates (e.g., new mesh, AI reasoning) propagate correctly
- [ ] **Integrate with the AI API**
  - [ ] Configure API keys for Google Gemini (or alternative LLM) in a `.env` file
  - [ ] Use `fetch` to make API calls from the client (e.g., `POST` to Gemini endpoint)
  - [ ] Test the full flow: user command → AI response → model update → UI refresh
- [ ] **Ensure real-time updates**
  - [ ] Verify the 3D viewer updates immediately after modifications
  - [ ] Confirm chat and thinking box reflect the latest interaction

## Testing
- [ ] **Unit tests for individual components**
  - [ ] Test `<ModelViewer>`: Renders mesh and handles clicks
  - [ ] Test `<ChatWindow>`: Submits input and displays messages
  - [ ] Test OpenCascade.js functions: Model loading, modification, mesh generation
- [ ] **Integration tests for combined functionality**
  - [ ] Test command flow: "Add a hole" → AI response → updated model in viewer
  - [ ] Test revision history: Create versions, select, and revert
- [ ] **Test error handling scenarios**
  - [ ] Simulate AI API failures or invalid responses
  - [ ] Test impossible modifications (e.g., hole in a tiny area)
- [ ] **User acceptance testing**
  - [ ] Test with sample commands (e.g., "Move this part", "Add a screw hole")
  - [ ] Gather feedback on usability and adjust UI if needed

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
