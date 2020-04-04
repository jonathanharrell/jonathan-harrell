import * as THREE from 'three-js/three'
import gsap, { Power1 } from 'gsap'
import { Noise } from 'noisejs'

const noise = new Noise(Math.random())

const init = () => {
  const canvas = document.querySelector('canvas')
  let width = canvas.offsetWidth
  let height = canvas.offsetHeight

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  })

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
  camera.position.set(0, 0, 350)

  const sphere = new THREE.Group()
  scene.add(sphere)

  const X_AXIS = new THREE.Vector3(1, 0, 0)
  sphere.rotateOnAxis(X_AXIS, 80)

  const computedStyles = window.getComputedStyle(document.documentElement)

  const material = new THREE.LineBasicMaterial({
    color: computedStyles.getPropertyValue('--accent')
  })

  const linesAmount = 18
  const radius = 100
  const verticesAmount = 50

  for (let j = 0; j < linesAmount; j++) {
    const index = j
    const geometry = new THREE.Geometry()
    geometry.y = (index / linesAmount) * radius * 2

    for (let i = 0; i <= verticesAmount; i++) {
      let vector = new THREE.Vector3()
      vector.x = Math.cos((i / verticesAmount) * Math.PI * 2)
      vector.z = Math.sin((i / verticesAmount) * Math.PI * 2)
      vector._o = vector.clone()
      geometry.vertices.push(vector)
    }

    const line = new THREE.Line(geometry, material)
    sphere.add(line)
  }

  const updateVertices = a => {
    for (let j = 0; j < sphere.children.length; j++) {
      const line = sphere.children[j]
      line.geometry.y += 0.15

      if (line.geometry.y > radius * 2) {
        line.geometry.y = 0
      }

      const radiusHeight = Math.sqrt(
        line.geometry.y * (2 * radius - line.geometry.y)
      )

      for (let i = 0; i <= verticesAmount; i++) {
        const vector = line.geometry.vertices[i]
        const ratio =
          noise.simplex3(
            vector.x * 0.009,
            vector.z * 0.009 + a * 0.0006,
            line.geometry.y * 0.009
          ) * 15
        vector.copy(vector._o)
        vector.multiplyScalar(radiusHeight + ratio)
        vector.y = line.geometry.y - radius
      }

      line.geometry.verticesNeedUpdate = true
    }
  }

  const render = a => {
    requestAnimationFrame(render)
    updateVertices(a)
    renderer.render(scene, camera)
  }

  const onResize = () => {
    canvas.style.width = ''
    canvas.style.height = ''
    width = canvas.offsetWidth
    height = canvas.offsetHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  const mouse = new THREE.Vector2(0.8, 0.5)

  const initialXRotation = sphere.rotation.x
  const initialYRotation = sphere.rotation.y

  const onMouseMove = event => {
    mouse.x = event.clientX / window.innerWidth - 0.5
    mouse.y = event.clientY / window.innerHeight - 0.5

    gsap.to(sphere.rotation, 2, {
      x: initialXRotation + mouse.y,
      z: initialYRotation + mouse.x,
      ease: Power1.easeOut
    })
  }

  requestAnimationFrame(render)
  window.addEventListener('mousemove', onMouseMove)

  let resizeTimeout

  window.addEventListener('resize', function() {
    resizeTimeout = clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(onResize, 200)
  })
}

export default init
