"use client";

import { Component, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, Line } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import { cosmosEntities, cosmosRelations, type CosmosEntity } from "../../../lib/story/cosmos";
import styles from "./cosmos.module.css";

export type CameraRequest = { id: string | null; serial: number; zoom?: number };
type Props = {
  selectedId: string | null;
  visibleIds: string[];
  showRelations: boolean;
  cameraRequest: CameraRequest;
  onSelect: (id: string) => void;
};

function Unavailable() {
  return <div className={styles.unavailable} role="status"><strong>Không thể mở không gian 3D trên thiết bị này.</strong><p>Bạn vẫn có thể tìm và chọn các thế giới trong danh mục để xem chi tiết, quan hệ và chương nguồn.</p></div>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Unavailable /> : this.props.children; }
}

function Camera({ request }: { request: CameraRequest }) {
  const controls = useRef<CameraControls>(null);
  const { size } = useThree();
  useEffect(() => {
    const camera = controls.current;
    if (!camera) return;
    if (request.zoom) { void camera.dolly(request.zoom, true); return; }
    const target = cosmosEntities.find((item) => item.id === request.id);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (target) {
      const [x, y, z] = target.position;
      const distance = target.kind === "region" ? 29 : 26;
      void camera.setLookAt(x + 3, y + distance * .7, z + distance, x, y, z, !reducedMotion);
    } else {
      const distance = size.width < 600 ? 60 : 47;
      void camera.setLookAt(-5, distance * .65, distance, -5, 0, 5, !reducedMotion);
    }
  }, [request, size.width]);
  return <CameraControls ref={controls} makeDefault minDistance={6} maxDistance={150} maxPolarAngle={Math.PI * .82} smoothTime={.3} />;
}

function StarField() {
  // Seeded coordinates keep renders stable, without a texture/network request.
  const positions = useMemo(() => {
    let seed = 42;
    const coordinates = new Float32Array(1500);
    for (let index = 0; index < coordinates.length; index++) {
      seed = (seed * 16807) % 2147483647;
      coordinates[index] = (seed / 2147483647 - .5) * 230;
    }
    return coordinates;
  }, []);
  return <points raycast={() => {}}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#ced8ed" size={.09} transparent opacity={.55} sizeAttenuation /></points>;
}

function Region({ entity, active, dimmed }: { entity: CosmosEntity; active: boolean; dimmed: boolean }) {
  return <group position={entity.position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
      <ringGeometry args={[entity.radius - .05, entity.radius, 96]} />
      <meshBasicMaterial color={entity.color} transparent opacity={dimmed ? .08 : active ? .7 : .3} side={DoubleSide} depthWrite={false} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
      <circleGeometry args={[entity.radius, 80]} />
      <meshBasicMaterial color={entity.color} transparent opacity={dimmed ? .012 : .045} side={DoubleSide} depthWrite={false} />
    </mesh>
  </group>;
}

function World({ entity, active, dimmed, onSelect }: { entity: CosmosEntity; active: boolean; dimmed: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  return <group position={entity.position}>
    <mesh onClick={(event) => { event.stopPropagation(); onSelect(); }} onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)} scale={hovered ? 1.12 : 1}>
      {entity.kind === "concept" ? <octahedronGeometry args={[entity.radius, 0]} /> : <sphereGeometry args={[entity.radius, 32, 24]} />}
      <meshStandardMaterial color={entity.color} emissive={entity.color} emissiveIntensity={active ? .8 : .25} roughness={.65} metalness={.15} transparent opacity={dimmed ? .2 : 1} wireframe={entity.kind === "system"} />
    </mesh>
    {(active || hovered || entity.kind === "system") && <mesh rotation={[-Math.PI / 2, .2, 0]} raycast={() => {}}>
      <torusGeometry args={[entity.radius * 1.55, .025, 8, 64]} /><meshBasicMaterial color={entity.color} transparent opacity={.8} />
    </mesh>}
  </group>;
}

/** Project labels owned by the normal React tree; no nested DOM roots or per-frame React state. */
function LabelProjection({ labels }: { labels: RefObject<Map<string, HTMLDivElement>> }) {
  const projection = useRef(new Vector3());
  useFrame(({ camera, size }) => {
    const point = projection.current;
    for (const entity of cosmosEntities) {
      const label = labels.current.get(entity.id);
      if (!label) continue;
      const [x, y, z] = entity.position;
      point.set(x, entity.kind === "region" ? y : y - entity.radius - .75, entity.kind === "region" ? z - entity.radius : z);
      // Keep the small-screen overview legible; zooming in reveals world labels.
      label.hidden = size.width < 500 && !["region", "system"].includes(entity.kind) && camera.position.distanceTo(point) > 48;
      point.project(camera);
      label.style.visibility = Math.abs(point.x) > 1.1 || Math.abs(point.y) > 1.05 || Math.abs(point.z) > 1 ? "hidden" : "visible";
      label.style.transform = `translate(${(point.x + 1) * size.width / 2}px, ${(1 - point.y) * size.height / 2}px) translate(-50%, -50%)`;
    }
  });
  return null;
}

function Connections({ selectedId, visible }: { selectedId: string | null; visible: Set<string> }) {
  return cosmosRelations.filter((edge) => selectedId && (edge.source === selectedId || edge.target === selectedId) && visible.has(edge.source) && visible.has(edge.target)).map((edge) => {
    const source = cosmosEntities.find((entity) => entity.id === edge.source)!;
    const target = cosmosEntities.find((entity) => entity.id === edge.target)!;
    const start = source.position;
    const end = target.position;
    const points = Array.from({ length: 33 }, (_, index): [number, number, number] => {
      const t = index / 32;
      return [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 3, start[2] + (end[2] - start[2]) * t];
    });
    return <Line key={`${edge.source}-${edge.target}-${edge.kind}`} points={points} color={edge.kind === "fusion" ? "#e2bd79" : edge.kind === "secret" ? "#be9ee1" : "#92bcc5"} lineWidth={edge.kind === "fusion" ? 1.6 : 1} dashed={edge.kind === "secret" || edge.kind === "passage"} dashSize={.4} gapSize={.2} transparent opacity={.65} raycast={() => {}} />;
  });
}

export default function CosmosScene({ selectedId, visibleIds, showRelations, cameraRequest, onSelect }: Props) {
  const [ready, setReady] = useState(false);
  const labels = useRef(new Map<string, HTMLDivElement>());
  const visible = useMemo(() => new Set(visibleIds), [visibleIds]);
  return <div className={styles.canvas} data-testid="cosmos-canvas" data-ready={ready} aria-label="Bản đồ vũ trụ 3D; kéo để xoay, cuộn để thu phóng">
    <SceneBoundary><Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [-5, 31, 47], fov: 48, near: .1, far: 500 }} gl={{ antialias: true, alpha: true }} fallback={<Unavailable />} onCreated={({ gl }) => { gl.setClearColor("#09111e", 0); setReady(true); }}>
      <ambientLight intensity={1.2} /><directionalLight position={[15, 30, 20]} intensity={2.5} color="#e3eeff" />
      <StarField />
      {cosmosEntities.map((entity) => entity.kind === "region"
        ? <Region key={entity.id} entity={entity} active={entity.id === selectedId} dimmed={!visible.has(entity.id)} />
        : <World key={entity.id} entity={entity} active={entity.id === selectedId} dimmed={!visible.has(entity.id)} onSelect={() => onSelect(entity.id)} />)}
      {showRelations && <Connections selectedId={selectedId} visible={visible} />}
      <Camera request={cameraRequest} />
      <LabelProjection labels={labels} />
    </Canvas></SceneBoundary>
    {ready && <div className={styles.projectedLabels}>{cosmosEntities.map((entity) => <div key={entity.id} className={styles.projectedLabel} ref={(element) => { if (element) labels.current.set(entity.id, element); else labels.current.delete(entity.id); }} style={{ opacity: visible.has(entity.id) ? 1 : .3 }}>
      <button type="button" className={entity.kind === "region" ? styles.regionLabel : `${styles.worldLabel} ${selectedId === entity.id ? styles.activeLabel : ""}`} style={entity.kind === "region" ? { color: entity.color } : undefined} aria-label={`Xem ${entity.name}`} aria-pressed={selectedId === entity.id} onClick={() => onSelect(entity.id)}>{entity.shortName}{entity.kind === "region" && <span>{entity.id === "roi-rac" ? "NGOÀI BIỂU TẦNG" : "KHU VỰC"}</span>}</button>
    </div>)}</div>}
  </div>;
}
