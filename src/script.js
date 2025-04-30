import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/Addons.js'
import { OBJLoader } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const drag = document.getElementById('drag')

const scene = new THREE.Scene()

/**
 * Mesh 
*/

// Modelo 3D
let skullObj
let skullObj2

const objLoader = new OBJLoader();

objLoader.load('./models/skull.obj', (obj)=> {
    
    obj.traverse((child) => {
        
        if (child.isMesh) {
            child.material = new THREE.MeshNormalMaterial({
                wireframe: true,
                transparent: true,
                opacity: 0.9
            })

            child.position.y = 0.5
        }
    })

    skullObj = obj

    scene.add(obj)
})

objLoader.load('./models/skull.obj', (obj)=> {
    
    obj.traverse((child) => {
        
        if (child.isMesh) {
            child.material = new THREE.MeshNormalMaterial({
                wireframe: true,
                transparent: true,
                opacity: 0.5
            })

            child.scale.set(147, 140., 147.)
            child.position.y = 1.5
            child.rotation.x = -5
        }
    })

    skullObj2 = obj

    scene.add(obj)

    window.dispatchEvent(new CustomEvent('modeloCargado', {detail: obj}))
})

window.addEventListener('modeloCargado', (e) => {
    console.log(e.detail);
    drag.textContent = "Drag it!"
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRate, 2))

})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0., 0., 3.)
scene.add(camera)

const controls = new TrackballControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


const tick = () => {

    controls.update()

    if (skullObj) {
        skullObj.rotation.x -= 0.0005
        skullObj.rotation.y += 0.0004
        skullObj.rotation.z += 0.0003

        skullObj2.rotation.x += 0.0005
        skullObj2.rotation.y -= 0.0004
        skullObj2.rotation.z -= 0.0003
    }

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
