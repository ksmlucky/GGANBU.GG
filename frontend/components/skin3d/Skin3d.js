import styles from "./Skin3d.module.css";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CCChampion from "../clickChooseChampion/CCChampion";
export default function Skin3d() {
  const canvas = useRef();
  const [champ, setChamp] = useState("");
  function clickChamp(c) {
    setChamp(c);
  }
  useEffect(() => {
    if (canvas.current) {
      let WIDTH = 500;
      let HEIGHT = 500;

      // Scene
      const scene = new THREE.Scene();
      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.current,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(WIDTH, HEIGHT);
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

      // Camera
      const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
      camera.position.y = 1.5;
      camera.position.z = 4;
      scene.add(camera);

      // Light
      const ambientLight = new THREE.AmbientLight("white", 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight("white", 1);
      directionalLight.position.x = 1;
      directionalLight.position.z = 2;
      scene.add(directionalLight);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);

      // gltf loader
      const gltfLoader = new GLTFLoader();
      let mixer;

      gltfLoader.load("/skin3d/her.glb", (gltf) => {
        // console.log(gltf.scene.children[0]);
        const ilbuniMesh = gltf.scene.children[0];
        scene.add(ilbuniMesh);

        mixer = new THREE.AnimationMixer(ilbuniMesh);
        const actions = [];
        actions[0] = mixer.clipAction(gltf.animations[0]);
        actions[0].play();
      });

      // 그리기
      const clock = new THREE.Clock();

      function draw() {
        const delta = clock.getDelta();

        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
        renderer.setAnimationLoop(draw);
      }

      function setSize() {
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH / HEIGHT);
        renderer.render(scene, camera);
      }

      // 이벤트
      window.addEventListener("resize", () => setSize);

      draw();
    }
  }, [canvas]);

  return (
    <div className={styles.container}>
      <CCChampion clickChamp={clickChamp}></CCChampion>
      <canvas id="canvasWrap" ref={canvas}></canvas>
      <div>{champ}</div>
    </div>
  );
}
