import initOpenCascade from 'opencascade.js';

let oc = null;

export const initOC = async () => {
  if (!oc) {
    oc = await initOpenCascade();
  }
  return oc;
};

export const createSampleCube = async () => {
  const occ = await initOC();
  
  // Create a box with dimensions 10x10x10
  const box = new occ.BRepPrimAPI_MakeBox_1(10, 10, 10);
  const shape = box.Shape();
  
  // Create a mesh from the shape
  const mesh = new occ.BRepMesh_IncrementalMesh_2(shape, 0.1, false, 0.1, false);
  mesh.Perform();
  
  // Get vertices and faces for Three.js
  const vertices = [];
  const indices = [];
  
  // Extract triangulation data
  const explorer = new occ.TopExp_Explorer_1();
  for (explorer.Init(shape, occ.TopAbs_FACE); explorer.More(); explorer.Next()) {
    const face = occ.TopoDS.Face_1(explorer.Current());
    const location = new occ.TopLoc_Location_1();
    const triangulation = occ.BRep_Tool.Triangulation(face, location);
    
    if (!triangulation.IsNull()) {
      const nodes = triangulation.get().Nodes();
      const triangles = triangulation.get().Triangles();
      
      // Add vertices
      for (let i = 1; i <= nodes.Length(); i++) {
        const point = nodes.Value(i);
        vertices.push(point.X(), point.Y(), point.Z());
      }
      
      // Add triangles
      for (let i = 1; i <= triangles.Length(); i++) {
        const triangle = triangles.Value(i);
        indices.push(triangle.Value(1) - 1);
        indices.push(triangle.Value(2) - 1);
        indices.push(triangle.Value(3) - 1);
      }
    }
  }
  
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint32Array(indices)
  };
};
