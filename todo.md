# TODO: AI-Powered CAD Model Modification Web App

## Project Setup
- [ ] **Set up the development environment**
  - [ ] Install Node.js and npm
  - [ ] Install Python and pip
  - [ ] Set up a virtual environment for Python
- [ ] **Install necessary dependencies**
  - [ ] Backend: FastAPI, Uvicorn, PyOCC (OpenCascade Python bindings), Google Gemini API (or alternative LLM)
  - [ ] Frontend: React, react-three-fiber, Three.js
- [ ] **Create the project structure**
  - [ ] Create a backend directory with `app.py`
  - [ ] Create a frontend directory with a React app (e.g., using `create-react-app`)

## Backend Development
- [ ] **Set up the server**
  - [ ] Create a basic FastAPI application in `app.py`
  - [ ] Run the server with Uvicorn (`uvicorn app:app --reload`)
- [ ] **Integrate OpenCascade for CAD processing**
  - [ ] Install PyOCC
  - [ ] Load a sample CAD model (e.g., a simple cube in STEP format)
  - [ ] Implement functions to modify the model (e.g., add holes, move parts)
- [ ] **Implement API endpoints**
  - [ ] `/model`: Load and return the current CAD model as a mesh for rendering
  - [ ] `/modify`: Process user commands and apply modifications to the model
  - [ ] `/revisions`: Retrieve the list of model revisions
  - [ ] `/load_revision/{id}`: Load a specific revision of the model
- [ ] **Connect to the AI model**
  - [ ] Set up API keys for Google Gemini (or alternative LLM)
  - [ ] Implement a function to send user commands to the AI for interpretation
  - [ ] Parse the AI's response to generate CAD modification instructions
- [ ] **Implement error handling**
  - [ ] Handle invalid or ambiguous user commands
  - [ ] Manage cases where model modifications fail (e.g., conflicting changes)
- [ ] **Ensure security**
  - [ ] Validate and sanitize user input
  - [ ] Protect API endpoints from unauthorized access (if applicable)

## Frontend Development
- [ ] **Set up the React application**
  - [ ] Create a new React app using `create-react-app`
  - [ ] Install `react-three-fiber` and `three`
- [ ] **Integrate Three.js for 3D rendering**
  - [ ] Create a `<ModelViewer>` component to render the CAD model
  - [ ] Implement orbit controls for interacting with the model (e.g., rotate, zoom)
- [ ] **Create user interface components**
  - [ ] `<ChatWindow>`: For user input and displaying conversation history
  - [ ] `<ThinkingBox>`: To display the AI's reasoning above the chat window
  - [ ] `<RevisionDropdown>`: To select and revert to previous model versions
- [ ] **Implement chat functionality**
  - [ ] Handle user input in the chat window
  - [ ] Send commands to the backend via the `/modify` endpoint
  - [ ] Display AI responses in the chat window
- [ ] **Implement error handling**
  - [ ] Display user-friendly error messages (e.g., for invalid commands)
  - [ ] Handle network or server errors gracefully

## Integration
- [ ] **Connect frontend to backend**
  - [ ] Use `fetch` or Axios to make API calls from the frontend
  - [ ] Handle API responses and update the UI accordingly
- [ ] **Ensure data flows correctly**
  - [ ] Fetch the initial model mesh and render it in the 3D viewer
  - [ ] Update the 3D viewer with new mesh data after modifications
  - [ ] Display AI reasoning in the thinking box after each modification
- [ ] **Implement revision history**
  - [ ] Store model versions on the backend with timestamps
  - [ ] Retrieve and display revision options in the dropdown
  - [ ] Load the selected revision into the 3D viewer when chosen

## Testing
- [ ] **Unit tests for individual components**
  - [ ] Backend: Test model loading, modification functions, and API endpoints
  - [ ] Frontend: Test UI components (chat, 3D viewer, dropdown)
- [ ] **Integration tests for combined functionality**
  - [ ] Test the full flow: user command → AI interpretation → model modification → UI update
  - [ ] Test revision history: create revisions, select, and revert to previous versions
- [ ] **Test error handling scenarios**
  - [ ] Simulate invalid or ambiguous user inputs
  - [ ] Test conflicting modifications (e.g., adding a hole where there's no space)
- [ ] **User acceptance testing**
  - [ ] Have users test the application with sample commands
  - [ ] Gather feedback and make necessary adjustments

## Deployment
- [ ] **Prepare the application for production**
  - [ ] Optimize the frontend build (e.g., `npm run build`)
  - [ ] Set up environment variables for sensitive data (e.g., API keys)
- [ ] **Set up hosting**
  - [ ] Choose a hosting platform (e.g., Heroku for backend, Vercel for frontend)
  - [ ] Configure the server for production (e.g., set `DEBUG=False` for FastAPI)
- [ ] **Deploy the application**
  - [ ] Deploy the backend and frontend to the chosen platforms
  - [ ] Verify the application is running correctly in the production environment

## Additional Tasks
- [ ] **Write documentation**
  - [ ] Document API endpoints and usage
  - [ ] Create a user guide for interacting with the application
- [ ] **Ensure code quality**
  - [ ] Use linters and formatters (e.g., ESLint for JavaScript, Black for Python)
  - [ ] Conduct code reviews (if working in a team)

---

This `todo.md` provides a detailed roadmap for developing the web app. You can copy this into a `.md` file and check off tasks as you complete them. While some steps (like extensive testing or deployment) could be simplified for a prototype, they are included here for thoroughness. Feel free to adapt the checklist to your specific needs or project timeline.
