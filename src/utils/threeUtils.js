// Create a sample cube using Three.js geometry
export const createSampleCube = () => {
  // Create vertices for a 10x10x10 cube
  const vertices = new Float32Array([
    // Front face
    -5,
    -5,
    5, // 0
    5,
    -5,
    5, // 1
    5,
    5,
    5, // 2
    -5,
    5,
    5, // 3
    // Back face
    -5,
    -5,
    -5, // 4
    5,
    -5,
    -5, // 5
    5,
    5,
    -5, // 6
    -5,
    5,
    -5, // 7
  ]);

  // Create indices for triangles
  const indices = new Uint32Array([
    // Front face
    0, 1, 2, 0, 2, 3,
    // Back face
    5, 4, 7, 5, 7, 6,
    // Top face
    3, 2, 6, 3, 6, 7,
    // Bottom face
    4, 5, 1, 4, 1, 0,
    // Right face
    1, 5, 6, 1, 6, 2,
    // Left face
    4, 0, 3, 4, 3, 7,
  ]);

  return {
    vertices,
    indices,
    // Add face IDs for selection
    faceIds: Array(12)
      .fill(0)
      .map((_, i) => i),
  };
};

// Get face information for a clicked face
export const getFaceInfo = faceIndex => {
  const faces = [
    'Front face',
    'Front face',
    'Back face',
    'Back face',
    'Top face',
    'Top face',
    'Bottom face',
    'Bottom face',
    'Right face',
    'Right face',
    'Left face',
    'Left face',
  ];

  return {
    id: Math.floor(faceIndex / 2),
    name: faces[faceIndex],
    normal: getFaceNormal(faceIndex),
  };
};

// Get normal vector for a face
const getFaceNormal = faceIndex => {
  const normals = [
    [0, 0, 1], // Front face
    [0, 0, 1], // Front face
    [0, 0, -1], // Back face
    [0, 0, -1], // Back face
    [0, 1, 0], // Top face
    [0, 1, 0], // Top face
    [0, -1, 0], // Bottom face
    [0, -1, 0], // Bottom face
    [1, 0, 0], // Right face
    [1, 0, 0], // Right face
    [-1, 0, 0], // Left face
    [-1, 0, 0], // Left face
  ];

  return normals[faceIndex];
};
