const randnum = (min, max) => Math.round(Math.random() * (max - min) + min);

class CannonHelper {
  constructor(scene) {
    this.scene = scene;
  }

  addLights(renderer) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // LIGHTS
    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6);
    this.scene.add(ambient);

    const light = new THREE.DirectionalLight(0xdddddd, 0.15);
    light.position.set(3, 10, 4);
    light.castShadow = true;
    this.scene.add(light);

    this.sun = light;
  }

  set shadowTarget(obj) {
    if (this.sun) this.sun.target = obj;
  }

  createCannonTrimesh(geometry) {
    if (!geometry.isBufferGeometry) return null;

    const vertices = geometry.attributes.position.array;
    const indices = Array.from({ length: geometry.attributes.position.count }, (_, i) => i);

    return new CANNON.Trimesh(vertices, indices);
  }

  createCannonConvex(geometry) {
    if (!geometry.isBufferGeometry) return null;

    const vertices = [];
    const faces = [];
    const posAttr = geometry.attributes.position;
    const floats = posAttr.array;

    for (let i = 0; i < posAttr.count; i += 3) {
      vertices.push(new CANNON.Vec3(floats[i], floats[i + 1], floats[i + 2]));
      if (i % 3 === 0) faces.push([i, i + 1, i + 2]);
    }

    return new CANNON.ConvexPolyhedron(vertices, faces);
  }

  addVisual(body, name, castShadow = false, receiveShadow = true) {
    body.name = name;
    if (!this.currentMaterial) {
      this.currentMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
    }

    let mesh;
    if (body instanceof CANNON.Body) mesh = this.shape2Mesh(body, castShadow, receiveShadow);

    if (mesh) {
      body.threemesh = mesh;
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      this.scene.add(mesh);
    }
  }

  shape2Mesh(body, castShadow, receiveShadow) {
    const obj = new THREE.Object3D();
    const material = this.currentMaterial;
    const game = this;
    let index = 0;

    body.shapes.forEach((shape) => {
      let mesh;
      let geometry;

      switch (shape.type) {
        case CANNON.Shape.types.SPHERE:
          geometry = new THREE.SphereGeometry(shape.radius, 8, 8);
          mesh = new THREE.Mesh(geometry, material);
          break;
        case CANNON.Shape.types.PARTICLE:
          mesh = new THREE.Mesh(game.particleGeo, game.particleMaterial);
          mesh.scale.set(game.settings.particleSize, game.settings.particleSize, game.settings.particleSize);
          break;
        case CANNON.Shape.types.PLANE:
          geometry = new THREE.PlaneGeometry(100, 100, 4, 4);
          mesh = new THREE.Object3D();
          const submesh = new THREE.Object3D();
          const ground = new THREE.Mesh(geometry, groundMaterial);
          ground.scale.set(1, 1, 1);
          submesh.add(ground);
          mesh.add(submesh);
          break;
        case CANNON.Shape.types.BOX:
          geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2);
          mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x888888, wireframe: true, transparent: true, opacity: 0 }));
          break;
        case CANNON.Shape.types.CONVEXPOLYHEDRON:
          geometry = new THREE.Geometry();
          shape.vertices.forEach((v) => {
            geometry.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
          });
          shape.faces.forEach((face) => {
            const a = face[0];
            for (let j = 1; j < face.length - 1; j++) {
              geometry.faces.push(new THREE.Face3(a, face[j], face[j + 1]));
            }
          });
          geometry.computeBoundingSphere();
          geometry.computeFaceNormals();
          mesh = new THREE.Mesh(geometry, material);
          break;
        case CANNON.Shape.types.HEIGHTFIELD:
          geometry = new THREE.Geometry();
          for (let xi = 0; xi < shape.data.length - 1; xi++) {
            for (let yi = 0; yi < shape.data[xi].length - 1; yi++) {
              for (let k = 0; k < 2; k++) {
                shape.getConvexTrianglePillar(xi, yi, k === 0);
                const [v0, v1, v2] = shape.pillarConvex.vertices.map((v) => new THREE.Vector3(v.x + shape.pillarOffset.x, v.y + shape.pillarOffset.y, v.z + shape.pillarOffset.z));
                geometry.vertices.push(v0, v1, v2);
                const i = geometry.vertices.length - 3;
                geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));
              }
            }
          }
          geometry.computeBoundingSphere();
          geometry.computeFaceNormals();
          setGradient(geometry, gradientColors, 'z', true);
          mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          break;
        case CANNON.Shape.types.TRIMESH:
          geometry = new THREE.Geometry();
          for (let i = 0; i < shape.indices.length / 3; i++) {
            const [v0, v1, v2] = [new CANNON.Vec3(), new CANNON.Vec3(), new CANNON.Vec3()];
            shape.getTriangleVertices(i, v0, v1, v2);
            geometry.vertices.push(new THREE.Vector3(v0.x, v0.y, v0.z), new THREE.Vector3(v1.x, v1.y, v1.z), new THREE.Vector3(v2.x, v2.y, v2.z));
            const j = geometry.vertices.length - 3;
            geometry.faces.push(new THREE.Face3(j, j + 1, j + 2));
          }
          geometry.computeBoundingSphere();
          geometry.computeFaceNormals();
          mesh = new THREE.Mesh(geometry, material);
          break;
        default:
          throw new Error(`Visual type not recognized: ${shape.type}`);
      }

      mesh.receiveShadow = receiveShadow;
      mesh.castShadow = castShadow;
      obj.add(mesh);
    });

    return obj;
  }

  updateBodies(world) {
    world.bodies.forEach((body) => {
      if (body.threemesh) {
        body.threemesh.position.copy(body.position);
        body.threemesh.quaternion.copy(body.quaternion);
      }
    });
  }
}

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(3, 0.9, -3);
camera.lookAt(scene.position);

const container = document.getElementById('info');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

container.appendChild(renderer.domElement);
renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);
renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false);

function onContextLost(event) {
  event.preventDefault();
  console.error('WebGL context lost. You might need to handle this situation by recreating WebGL resources.');
}

function onContextRestored(event) {
  console.log('WebGL context restored. Re-rendering shadows...');
}

// Cannon.js Setup
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.gravity.set(0, -10, 0);
world.defaultContactMaterial.friction = 0;

const groundMaterial = new CANNON.Material("groundMaterial");
const wheelMaterial = new CANNON.Material("wheelMaterial");
const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
  friction: 0,
  restitution: 0,
  contactEquationStiffness: 1000
});
world.addContactMaterial(wheelGroundContactMaterial);

const helper = new CannonHelper(scene);
helper.addLights(renderer);

const gradientColors = [
  { stop: 0, color: new THREE.Color('#270059') },
  { stop: 0.25, color: new THREE.Color('#6225E6') },
  { stop: 0.5, color: new THREE.Color('#8225e6') },
  { stop: 0.75, color: new THREE.Color('#a043ed') },
  { stop: 1, color: new THREE.Color('#f1f3f4') }
];

function setGradient(geometry, colors, axis, reverse) {
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  const size = new THREE.Vector3().subVectors(bbox.max, bbox.min);
  const vertexIndices = ['a', 'b', 'c'];
  for (let c = 0; c < colors.length - 1; c++) {
    const colorDiff = colors[c + 1].stop - colors[c].stop;
    geometry.faces.forEach((face) => {
      vertexIndices.forEach((v, i) => {
        const vertex = geometry.vertices[face[v]];
        const normalized = new THREE.Vector3().subVectors(vertex, bbox.min).divide(size)[axis];
        const localNormalizedAxis = reverse ? 1 - normalized : normalized;
        if (localNormalizedAxis >= colors[c].stop && localNormalizedAxis <= colors[c + 1].stop) {
          const t = (localNormalizedAxis - colors[c].stop) / colorDiff;
          face.vertexColors[i] = colors[c].color.clone().lerp(colors[c + 1].color, t);
        }
      });
    });
  }
}

const geometry = new THREE.BoxBufferGeometry(0.5, 1, 0.5);
geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
const material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight(new THREE.Color('white'), 0.5);
light.position.set(0, 1, 0);
light.castShadow = true;
light.target = mesh;
mesh.add(light);

let clip1, clip2;

const loader = new THREE.GLTFLoader();
loader.load('./astronaut.glb', (object) => {
  object.scene.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true;
      node.material.side = THREE.DoubleSide;
    }
  });

  const player = object.scene;
  player.position.set(0, -0.1, 0);
  player.scale.set(0.25, 0.25, 0.25);
  mesh.add(player);

  const spotlight = new THREE.SpotLight(0xffffff, 1);
  spotlight.position.set(50, 10, 5);
  spotlight.angle = Math.PI / 2;
  scene.add(spotlight);

  const mixer = new THREE.AnimationMixer(player);
  clip1 = mixer.clipAction(object.animations[0]);
  clip2 = mixer.clipAction(object.animations[1]);
  mixers.push(mixer);
});

const sizeX = 64, sizeY = 64, minHeight = 0, maxHeight = 30;
const img2matrix = {
  fromImage(image, width, depth, minHeight, maxHeight) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heightRange = maxHeight - minHeight;

    canvas.width = width;
    canvas.height = depth;
    ctx.drawImage(image, 0, 0, width, depth);
    const imgData = ctx.getImageData(0, 0, width, depth).data;
    const matrix = Array.from({ length: depth }, (_, i) => Array.from({ length: width }, (_, j) => imgData[(i * depth + j) * 4] / 255 * heightRange + minHeight));

    return matrix;
  },
  fromUrl(url, width, depth, minHeight, maxHeight) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(this.fromImage(image, width, depth, minHeight, maxHeight));
      image.src = url;
    });
  }
};

img2matrix.fromUrl('https://upload.wikimedia.org/wikipedia/commons/5/57/Heightmap.png', sizeX, sizeY, minHeight, maxHeight).then((matrix) => {
  const terrainShape = new CANNON.Heightfield(matrix, { elementSize: 10 });
  const terrainBody = new CANNON.Body({ mass: 0 });

  terrainBody.addShape(terrainShape);
  terrainBody.position.set(-sizeX * terrainShape.elementSize / 2, -10, sizeY * terrainShape.elementSize / 2);
  terrainBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.add(terrainBody);
  helper.addVisual(terrainBody, 'landscape');

  const raycastHelperGeometry = new THREE.CylinderGeometry(0, 1, 5, 1.5);
  raycastHelperGeometry.translate(0, 0, 0);
  raycastHelperGeometry.rotateX(Math.PI / 2);
  const raycastHelperMesh = new THREE.Mesh(raycastHelperGeometry, new THREE.MeshNormalMaterial());
  scene.add(raycastHelperMesh);

  function check() {
    const raycaster = new THREE.Raycaster(mesh.position, new THREE.Vector3(0, -1, 0));
    const intersects = raycaster.intersectObject(terrainBody.threemesh.children[0]);
    if (intersects.length > 0) {
      raycastHelperMesh.position.copy(intersects[0].point);
      raycastHelperMesh.lookAt(intersects[0].face.normal);
      mesh.position.y = intersects[0].point.y + 0.1;
    }
  }

  setInterval(check, 100);
});

// Resize Event
window.addEventListener("resize", () => {
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Joystick Implementation
class JoyStick {
  constructor(options) {
    const container = document.getElementById('info');
    const circle = document.createElement("div");
    circle.style.cssText = "position:absolute; left: 50%; bottom:40px; width:80px; height:80px; background:rgba(126, 126, 126, 0.5); border:#444 solid medium; border-radius:50%; transform:translateX(-50%);";
    const thumb = document.createElement("div");
    thumb.style.cssText = "position:absolute; left: 17px; top: 17px; width: 40px; height: 40px; border-radius: 50%; background: #fff;";
    circle.appendChild(thumb);
    container.appendChild(circle);

    this.domElement = thumb;
    this.maxRadius = options.maxRadius || 40;
    this.onMove = options.onMove;
    this.game = options.game;
    this.origin = { left: this.domElement.offsetLeft, top: this.domElement.offsetTop };

    this.addEventListeners();
  }

  addEventListeners() {
    if ('ontouchstart' in window) {
      this.domElement.addEventListener('touchstart', this.tap.bind(this));
    } else {
      this.domElement.addEventListener('mousedown', this.tap.bind(this));
    }
  }

  getMousePosition(evt) {
    const clientX = evt.targetTouches ? evt.targetTouches[0].pageX : evt.clientX;
    const clientY = evt.targetTouches ? evt.targetTouches[0].pageY : evt.clientY;
    return { x: clientX, y: clientY };
  }

  tap(evt) {
    this.offset = this.getMousePosition(evt);
    if ('ontouchstart' in window) {
      document.ontouchmove = this.move.bind(this);
      document.ontouchend = this.up.bind(this);
    } else {
      document.onmousemove = this.move.bind(this);
      document.onmouseup = this.up.bind(this);
    }
  }

  move(evt) {
    const mouse = this.getMousePosition(evt);
    let left = mouse.x - this.offset.x;
    let top = mouse.y - this.offset.y;

    const sqMag = left * left + top * top;
    if (sqMag > this.maxRadius * this.maxRadius) {
      const magnitude = Math.sqrt(sqMag);
      left /= magnitude;
      top /= magnitude;
      left *= this.maxRadius;
      top *= this.maxRadius;
    }

    this.domElement.style.top = `${top + this.domElement.clientHeight / 2}px`;
    this.domElement.style.left = `${left + this.domElement.clientWidth / 2}px`;

    const forward = -(top - this.origin.top + this.domElement.clientHeight / 2) / this.maxRadius;
    const turn = (left - this.origin.left + this.domElement.clientWidth / 2) / this.maxRadius;

    if (this.onMove) this.onMove.call(this.game, forward, turn);
  }

  up() {
    document.ontouchmove = document.ontouchend = document.onmousemove = document.onmouseup = null;
    this.domElement.style.top = `${this.origin.top}px`;
    this.domElement.style.left = `${this.origin.left}px`;

    if (this.onMove) this.onMove.call(this.game, 0, 0);
  }
}

const js = { forward: 0, turn: 0 };
const joystick = new JoyStick({ onMove: (forward, turn) => { js.forward = forward; js.turn = -turn; } });

function updateDrive(forward = js.forward, turn = js.turn) {
  const maxSteerVal = 0.05;
  const maxForce = 0.15;
  const force = maxForce * forward;
  const steer = maxSteerVal * turn;

  if (forward !== 0) {
    mesh.translateZ(force);
    if (clip2) clip2.play();
    if (clip1) clip1.stop();
  } else {
    if (clip2) clip2.stop();
    if (clip1) clip1.play();
  }
  mesh.rotateY(steer);
}

// Camera and Animation Loop
const followCam = new THREE.Object3D();
followCam.position.copy(camera.position);
scene.add(followCam);
followCam.parent = mesh;

function updateCamera() {
  camera.position.lerp(followCam.getWorldPosition(new THREE.Vector3()), 0.05);
  camera.lookAt(mesh.position.x, mesh.position.y + 0.5, mesh.position.z);
}

const clock = new THREE.Clock();
let lastTime;
const mixers = [];
const fixedTimeStep = 1.0 / 60.0;  // Defined fixedTimeStep here

function animate() {
  requestAnimationFrame(animate);
  updateCamera();
  updateDrive();
  renderer.render(scene, camera);

  const delta = clock.getDelta();
  mixers.forEach((mixer) => mixer.update(delta));

  const now = Date.now();
  if (lastTime === undefined) lastTime = now;
  const dt = (now - lastTime) / 1000.0;
  lastTime = now;

  world.step(fixedTimeStep, dt);
  helper.updateBodies(world);
}

// Load the font and create text meshes
const loader2 = new THREE.FontLoader();

loader2.load('./font/Hack_Bold.json', function(font) {

  const geometry_text_two = new THREE.TextGeometry('PILLAP', {
    font: font,
    size: 75,
    height: 75,
  });

  const textMesh2 = new THREE.Mesh(geometry_text_two, new THREE.MeshPhongMaterial({
    color: 0xffffff
  }));

  textMesh2.scale.set(0.1, 0.1, 0.1);
  textMesh2.position.set(-20, 13, 90);
  textMesh2.rotation.y = 700;
  scene.add(textMesh2);

  const geometry_text_three = new THREE.TextGeometry('GITHUB', {
    font: font,
    size: 80,
    height: 80,
  });

  var textMesh3 = new THREE.Mesh(geometry_text_three, [
    new THREE.MeshPhongMaterial({
      color: 0xffffff
    })
  ])

  textMesh3.scale.set(.1, .1, .1);
  textMesh3.position.x = -90;
  textMesh3.position.y = 4;
  textMesh3.position.z = 90;
  textMesh3.rotation.y = 800;
  scene.add(textMesh3);


});

animate();
