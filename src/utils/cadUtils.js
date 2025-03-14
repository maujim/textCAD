import opencascade from 'opencascade.js/dist/opencascade.wasm.js';
import opencascadeWasm from 'opencascade.js/dist/opencascade.wasm.wasm?url';

let occPromise = null;

const initOCC = async () => {
  if (!occPromise) {
    occPromise = opencascade({
      locateFile: () => opencascadeWasm,
    });
  }
  return occPromise;
};

export const createSampleCube22 = async () => {
  const occ = await initOCC();

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

  console.debug(shape);
  console.debug(mesh);
  console.debug(box);
  console.debug(explorer);

  const f = occ.TopAbs_ShapeEnum.TopAbs_FACE;
  const s = occ.TopAbs_ShapeEnum.TopAbs_SHAPE;

  console.debug(f, s);

  explorer.Init(shape, f, s);

  let loop_i = 0;
  while (explorer.More()) {
    console.log('face number is ', loop_i);
    loop_i += 1;

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

      console.log(triangles.Length());

      // Add triangles
      for (let i = 1; i <= triangles.Length(); i++) {
        const triangle = triangles.Value(i);
        indices.push(triangle.Value(1) - 1);
        indices.push(triangle.Value(2) - 1);
        indices.push(triangle.Value(3) - 1);
      }
    }
    explorer.Next();
  }

  console.log(vertices, indices);
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  };
};
