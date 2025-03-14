import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import model from "../../assets/models/scene.gltf";

function CassetteVideo() {
    let [progression, setProgression] = useState(0);

    const canvasRef = useRef();

    let camera, scene, renderer;
    let cassette;

    useEffect(() => {
        creerModele();
    }, []);

    function creerModele() {
        const width = window.innerWidth;
        const height = (window.innerHeight / 3) * 2;
        scene = new THREE.Scene();
        // scene.add(new THREE.AxesHelper());

        camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        camera.position.z = 1.75;

        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
        renderer.setSize(width, height);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        // controls.minPolarAngle = 0;
        // controls.maxPolarAngle = Math.PI * 0.5;

        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshLambertMaterial();
        // const cube = new THREE.Mesh(geometry, material);
        // cube.castShadow = true;
        // scene.add(cube);

        const ambiant = new THREE.AmbientLight(0xffffff, 1.5); // soft white light
        scene.add(ambiant);

        const pointLight = new THREE.PointLight(0xffffff, 1000, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const loader = new GLTFLoader();
        loader.load(
            "vhs_tape/scene.gltf",
            function (gltf) {
                if (!cassette) {
                    cassette = gltf.scene;
                    cassette.scale.set(3.2, 3.2, 3.2);
                    cassette.position.set(0, -0.25, 0);
                    cassette.rotation.set(45, 45, 45);
                    scene.add(gltf.scene);
                }
            },
            function (xhr) {
                setProgression(xhr.loaded / xhr.total);
            },
            function (error) {
                console.log("ICI", error);
            }
        );

        const animate = () => {
            //Rappelle la fonction animate à chaque rafraîchissement de l'écran
            requestAnimationFrame(animate);

            if (cassette) {
                // cassette.rotation.x += 0.01;
                cassette.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
        };
        animate();
    }
    return (
        <>
            {progression < 1 && <p>Chargement en cours</p>}
            <canvas ref={canvasRef} />
        </>
    );
}

export default CassetteVideo;
