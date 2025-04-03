import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import '../../styles/ModelViewer.css';

function Model() {
  const gltfUrl = '/src/assets/World_Map_v1.gltf';
  const modelRef = useRef();
  const { camera } = useThree();
  
  // Utiliser une référence pour le modèle chargé
  const model = useRef();
  
  // Configurer le loader avec Draco
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Configurer le DRACOLoader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
        dracoLoader.setDecoderConfig({ type: 'js' });
        
        // Configurer le GLTFLoader avec le support Draco
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        
        // Charger le modèle
        gltfLoader.load(
          gltfUrl,
          (gltf) => {
            model.current = gltf;
            if (modelRef.current) {
              // Ajouter la scène chargée
              modelRef.current.add(gltf.scene);
              
              // Configurer les matériaux
              gltf.scene.traverse((obj) => {
                if (obj.isMesh) {
                  obj.material.side = THREE.FrontSide;
                  obj.material.needsUpdate = true;
                  obj.material.emissive = new THREE.Color(0x3a86ff);
                  obj.material.emissiveIntensity = 0.2;
                }
              });
              
              // Configurer l'animation
              if (gltf.animations && gltf.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(gltf.scene);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
              }
            }
          },
          // Progression
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          // Erreur
          (error) => {
            console.error('Error loading model:', error);
          }
        );
      } catch (error) {
        console.error('Error in model setup:', error);
      }
    };
    
    loadModel();
    
    return () => {
      // Nettoyage
      if (model.current && model.current.animations) {
        // Arrêter les animations si nécessaire
      }
    };
  }, []);
  
  // Configurer la caméra à une bonne distance
  useEffect(() => {
    if (camera) {
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);
  
  // Rotation de base si l'animation ne fonctionne pas
  useFrame((state, delta) => {
    if (modelRef.current && (!model.current || !model.current.animations || model.current.animations.length === 0)) {
      modelRef.current.rotation.y += delta * 0.1;
    }
  });

  return <group ref={modelRef} scale={1.8} position={[0, 0, 0]} />;
}

export default function ModelViewer() {
  return (
    <div className="model-viewer">
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3a86ff" />
        
        <Suspense fallback={null}>
          <Model />
          <Environment preset="night" />
        </Suspense>
        
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
