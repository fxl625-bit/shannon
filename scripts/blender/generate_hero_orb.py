"""
Blender Python script: Generate hero-orb 3D asset for AI x Human Potential site.
v4 — Uses EEVEE for reliable headless emission rendering.
Generates: hero-orb.blend, hero-orb.glb, hero-orb-preview.png
"""

import bpy
import math
import os
import sys
import time

# ── Configuration ──────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))

BLEND_PATH = os.path.join(PROJECT_ROOT, "assets", "blender", "hero-orb.blend")
GLB_PATH = os.path.join(PROJECT_ROOT, "public", "models", "hero-orb.glb")
PREVIEW_PATH = os.path.join(PROJECT_ROOT, "public", "renders", "hero-orb-preview.png")

RENDER_WIDTH = 1920
RENDER_HEIGHT = 1080

# Colors (linear sRGB)
COLOR_CYAN = (0.15, 0.85, 0.95)
COLOR_CYAN_BRIGHT = (0.30, 0.95, 1.0)
COLOR_VIOLET = (0.60, 0.45, 1.0)
COLOR_BLUE = (0.30, 0.60, 1.0)
COLOR_WARM = (1.0, 0.82, 0.45)
COLOR_WHITE = (0.95, 0.97, 1.0)
COLOR_GLASS = (0.20, 0.30, 0.50)


def ensure_dir(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)


def cleanup_scene():
    """Remove all default objects."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block in bpy.data.meshes:
        if block.users == 0:
            bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0:
            bpy.data.materials.remove(block)
    for block in bpy.data.cameras:
        if block.users == 0:
            bpy.data.cameras.remove(block)
    for block in bpy.data.lights:
        if block.users == 0:
            bpy.data.lights.remove(block)


# ── Material Factories ─────────────────────────────────────────────────────

def make_emission_mat(name, color, strength=5.0):
    """Bright emission material — use Emission shader node."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    emit = nodes.new('ShaderNodeEmission')
    emit.inputs['Color'].default_value = (*color, 1.0)
    emit.inputs['Strength'].default_value = strength
    out = nodes.new('ShaderNodeOutputMaterial')
    links.new(emit.outputs['Emission'], out.inputs['Surface'])
    return mat


def make_glass_mat(name, color, roughness=0.05, emit_strength=0.3):
    """Glass with subtle emission tint so it's visible on dark background."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    mat.blend_method = 'BLEND'
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    # Glass BSDF
    glass = nodes.new('ShaderNodeBsdfGlass')
    glass.inputs['Color'].default_value = (*color, 1.0)
    glass.inputs['Roughness'].default_value = roughness
    glass.inputs['IOR'].default_value = 1.15

    # Add faint emission to make glass visible
    emit = nodes.new('ShaderNodeEmission')
    emit.inputs['Color'].default_value = (*COLOR_CYAN, 1.0)
    emit.inputs['Strength'].default_value = emit_strength

    add = nodes.new('ShaderNodeAddShader')
    links.new(glass.outputs['BSDF'], add.inputs[0])
    links.new(emit.outputs['Emission'], add.inputs[1])

    out = nodes.new('ShaderNodeOutputMaterial')
    links.new(add.outputs['Shader'], out.inputs['Surface'])
    return mat


def make_ring_mat(name, color, strength=5.0):
    """Thin ring with emission — mostly glowing, slightly transparent."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    mat.blend_method = 'BLEND'
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    emit = nodes.new('ShaderNodeEmission')
    emit.inputs['Color'].default_value = (*color, 1.0)
    emit.inputs['Strength'].default_value = strength

    transparent = nodes.new('ShaderNodeBsdfTransparent')

    mix = nodes.new('ShaderNodeMixShader')
    mix.inputs['Fac'].default_value = 0.2  # 80% emission, 20% transparent

    links.new(transparent.outputs['BSDF'], mix.inputs[1])
    links.new(emit.outputs['Emission'], mix.inputs[2])

    out = nodes.new('ShaderNodeOutputMaterial')
    links.new(mix.outputs['Shader'], out.inputs['Surface'])
    return mat


# ── Scene Builders ─────────────────────────────────────────────────────────

def build_center_sphere():
    """Translucent glass sphere with faint glow — center of the orb."""
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=32, radius=1.8, location=(0, 0, 0))
    sphere = bpy.context.active_object
    sphere.name = "CenterSphere"
    sphere.data.materials.append(make_glass_mat("GlassSphere", COLOR_GLASS, roughness=0.02, emit_strength=0.5))
    bpy.ops.object.shade_smooth()
    mod = sphere.modifiers.new(name="Subsurf", type='SUBSURF')
    mod.levels = 1
    mod.render_levels = 2
    return sphere


def build_core():
    """Inner glowing cores."""
    # Outer core — cyan
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=24, radius=0.7, location=(0, 0, 0))
    core = bpy.context.active_object
    core.name = "CoreGlow"
    core.data.materials.append(make_emission_mat("CoreEmission", COLOR_CYAN_BRIGHT, strength=15.0))
    bpy.ops.object.shade_smooth()

    # Inner core — white hot
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=16, radius=0.3, location=(0, 0, 0))
    inner = bpy.context.active_object
    inner.name = "InnerCore"
    inner.data.materials.append(make_emission_mat("InnerEmission", COLOR_WHITE, strength=25.0))
    bpy.ops.object.shade_smooth()


def build_orbit_rings():
    """Three glowing orbit rings at different angles."""
    rings_data = [
        (2.4, 72, 15, 0.020, COLOR_CYAN_BRIGHT, 15.0),
        (2.8, -35, 60, 0.016, COLOR_VIOLET, 10.0),
        (3.2, 50, -30, 0.012, COLOR_BLUE, 8.0),
    ]
    for radius, tx, ty, thick, color, strength in rings_data:
        bpy.ops.mesh.primitive_torus_add(
            major_radius=radius, minor_radius=thick,
            major_segments=128, minor_segments=8,
            location=(0, 0, 0),
            rotation=(math.radians(tx), math.radians(ty), 0)
        )
        ring = bpy.context.active_object
        ring.name = f"OrbitRing_{radius:.1f}"
        ring.data.materials.append(make_ring_mat(f"RingMat_{radius:.1f}", color, strength=strength))
        bpy.ops.object.shade_smooth()


def build_nodes(radius=3.0, count=20, important_indices=None):
    """Distribute glowing nodes on a sphere surface."""
    if important_indices is None:
        important_indices = [0, 4, 8, 13, 17]

    golden_ratio = (1 + math.sqrt(5)) / 2
    nodes = []

    for i in range(count):
        theta = 2 * math.pi * i / golden_ratio
        phi = math.acos(1 - 2 * (i + 0.5) / count)

        x = radius * math.sin(phi) * math.cos(theta)
        y = radius * math.sin(phi) * math.sin(theta)
        z = radius * math.cos(phi)

        is_important = i in important_indices
        r = 0.14 if is_important else 0.08
        color = COLOR_WARM if is_important else COLOR_VIOLET
        brightness = 12.0 if is_important else 6.0

        bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=12, radius=r, location=(x, y, z))
        node = bpy.context.active_object
        node.name = f"Node_{'Key' if is_important else 'Dot'}_{i}"
        node.data.materials.append(
            make_emission_mat(f"NodeMat_{i}", color, strength=brightness)
        )
        bpy.ops.object.shade_smooth()
        nodes.append((node, (x, y, z), is_important))

    return nodes


def build_connections(nodes, max_connections=18):
    """Connect nearby nodes with glowing bezier curves."""
    import random
    random.seed(42)

    important_positions = [pos for _, pos, imp in nodes if imp]
    all_positions = [pos for _, pos, _ in nodes]
    connections = []

    # Connect important nodes to each other
    for i, pos_a in enumerate(important_positions):
        for j, pos_b in enumerate(important_positions):
            if j <= i:
                continue
            dist = math.sqrt(sum((a - b) ** 2 for a, b in zip(pos_a, pos_b)))
            if dist < 4.5:
                conn = _make_curve(pos_a, pos_b, color=COLOR_CYAN_BRIGHT, thickness=0.012)
                connections.append(conn)

    # Additional random connections
    attempts = 0
    while len(connections) < max_connections and attempts < 100:
        attempts += 1
        idx_a = random.randint(0, len(all_positions) - 1)
        idx_b = random.randint(0, len(all_positions) - 1)
        if idx_a == idx_b:
            continue
        pos_a = all_positions[idx_a]
        pos_b = all_positions[idx_b]
        dist = math.sqrt(sum((a - b) ** 2 for a, b in zip(pos_a, pos_b)))
        if dist < 3.5 and random.random() < 0.4:
            color = random.choice([COLOR_BLUE, COLOR_VIOLET, COLOR_CYAN])
            conn = _make_curve(pos_a, pos_b, color=color, thickness=0.008)
            connections.append(conn)

    print(f"  Created {len(connections)} connection lines")
    return connections


def _make_curve(start, end, color, thickness):
    """Create a single glowing bezier curve connection line."""
    curve_data = bpy.data.curves.new(name=f"Conn_{start}_{end}", type='CURVE')
    curve_data.dimensions = '3D'
    curve_data.bevel_depth = thickness
    curve_data.bevel_resolution = 4

    spline = curve_data.splines.new('BEZIER')
    spline.bezier_points.add(1)

    spline.bezier_points[0].co = start
    spline.bezier_points[0].handle_left_type = 'AUTO'
    spline.bezier_points[0].handle_right_type = 'AUTO'

    spline.bezier_points[1].co = end
    spline.bezier_points[1].handle_left_type = 'AUTO'
    spline.bezier_points[1].handle_right_type = 'AUTO'

    curve_obj = bpy.data.objects.new(f"Line_{start}_{end}", curve_data)
    bpy.context.collection.objects.link(curve_obj)

    mat = make_emission_mat(f"LineMat_{start}_{end}", color, strength=6.0)
    curve_data.materials.append(mat)
    return curve_obj


def setup_camera():
    """Camera positioned to frame the orb nicely."""
    cam_data = bpy.data.cameras.new("Camera")
    cam_data.lens = 55
    cam_data.clip_start = 0.1
    cam_data.clip_end = 100

    cam_obj = bpy.data.objects.new("Camera", cam_data)
    bpy.context.collection.objects.link(cam_obj)
    # Slight elevation to show the 3D structure
    cam_obj.location = (5.0, -4.5, 3.5)

    direction = cam_obj.location
    rot_quat = direction.to_track_quat('-Z', 'Y')
    cam_obj.rotation_euler = rot_quat.to_euler()

    bpy.context.scene.camera = cam_obj
    print(f"  Camera at {cam_obj.location}, lens {cam_data.lens}mm")
    return cam_obj


def setup_lights():
    """Bright area/point lights to illuminate the scene."""
    # Key — warm white area light
    bpy.ops.object.light_add(type='AREA', location=(6, -4, 7))
    key = bpy.context.active_object
    key.name = "KeyLight"
    key.data.energy = 800
    key.data.size = 5
    key.data.color = (0.92, 0.95, 1.0)

    # Fill — cool fill
    bpy.ops.object.light_add(type='AREA', location=(-5, -2, 4))
    fill = bpy.context.active_object
    fill.name = "FillLight"
    fill.data.energy = 400
    fill.data.size = 8
    fill.data.color = (0.80, 0.82, 1.0)

    # Rim — violet accent
    bpy.ops.object.light_add(type='POINT', location=(-2, 5, 3))
    rim = bpy.context.active_object
    rim.name = "RimLight"
    rim.data.energy = 300
    rim.data.color = COLOR_VIOLET

    # Bottom — cyan glow
    bpy.ops.object.light_add(type='POINT', location=(0, 0, -4))
    ambient = bpy.context.active_object
    ambient.name = "AmbientLight"
    ambient.data.energy = 150
    ambient.data.color = COLOR_CYAN


def setup_world():
    """Visible dark blue-gray world — brighter for headless EEVEE preview."""
    world = bpy.data.worlds.get("World")
    if world is None:
        world = bpy.data.worlds.new("World")
    bpy.context.scene.world = world
    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links
    nodes.clear()

    bg = nodes.new('ShaderNodeBackground')
    # Brighter blue-gray so the preview isn't crushed black
    bg.inputs['Color'].default_value = (0.04, 0.05, 0.10, 1.0)
    bg.inputs['Strength'].default_value = 0.8

    out = nodes.new('ShaderNodeOutputWorld')
    links.new(bg.outputs['Background'], out.inputs['Surface'])


def setup_render():
    """Use EEVEE for reliable headless emission rendering (v4 fix)."""
    scene = bpy.context.scene

    # EEVEE renders emission shaders correctly in headless mode (unlike Cycles).
    # BLENDER_EEVEE_NEXT is preferred on Blender 4.2+; fall back to BLENDER_EEVEE.
    try:
        scene.render.engine = 'BLENDER_EEVEE_NEXT'
        engine_label = 'EEVEE Next'
    except TypeError:
        scene.render.engine = 'BLENDER_EEVEE'
        engine_label = 'EEVEE'

    # EEVEE render settings
    if hasattr(scene, 'eevee'):
        eevee = scene.eevee
        eevee.taa_render_samples = 64
        eevee.use_taa_reprojection = True
        # Enable bloom for emissive glow
        if hasattr(eevee, 'use_bloom'):
            eevee.use_bloom = True
            eevee.bloom_intensity = 0.15
            eevee.bloom_radius = 4.0

    scene.render.resolution_x = RENDER_WIDTH
    scene.render.resolution_y = RENDER_HEIGHT
    scene.render.resolution_percentage = 100

    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGB'
    scene.render.film_transparent = False

    # Standard with moderate exposure — emission is already bright in EEVEE
    scene.view_settings.view_transform = 'Standard'
    scene.view_settings.exposure = 1.2
    scene.view_settings.gamma = 1.0

    print(f"  Engine: {engine_label}")
    print(f"  View transform: {scene.view_settings.view_transform}")
    print(f"  Exposure: {scene.view_settings.exposure}")


# ── Main ───────────────────────────────────────────────────────────────────
def main():
    t0 = time.time()
    print("=" * 60)
    print("  Hero Orb Generator v4 — AI x Human Potential (EEVEE)")
    print("=" * 60)

    ensure_dir(BLEND_PATH)
    ensure_dir(GLB_PATH)
    ensure_dir(PREVIEW_PATH)

    print("[1/9] Cleaning scene...")
    cleanup_scene()

    print("[2/9] Setting up render (EEVEE)...")
    setup_render()
    setup_world()

    print("[3/9] Creating camera...")
    setup_camera()

    print("[4/9] Creating lights...")
    setup_lights()

    print("[5/9] Building center sphere...")
    build_center_sphere()
    build_core()

    print("[6/9] Building orbit rings...")
    build_orbit_rings()

    print("[7/9] Building knowledge nodes...")
    nodes = build_nodes(radius=3.0, count=20, important_indices=[0, 4, 8, 13, 17])

    print("[8/9] Building connection lines...")
    build_connections(nodes, max_connections=18)

    print("[9/9] Saving, exporting, rendering...")

    # Save .blend
    bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)
    print(f"  ✓ Saved: {BLEND_PATH}")

    # Export GLB
    bpy.ops.export_scene.gltf(
        filepath=GLB_PATH,
        export_format='GLB',
        use_selection=False,
        export_apply=True,
    )
    glb_size = os.path.getsize(GLB_PATH) / (1024 * 1024)
    print(f"  ✓ Exported: {GLB_PATH} ({glb_size:.2f} MB)")

    # Render preview — Cycles at 64 samples
    scene = bpy.context.scene
    scene.render.filepath = PREVIEW_PATH
    bpy.ops.render.render(write_still=True)
    print(f"  ✓ Rendered: {PREVIEW_PATH}")

    dt = time.time() - t0
    print(f"  Total time: {dt:.1f}s")
    print("=" * 60)
    print("  Done!")
    print("=" * 60)


if __name__ == "__main__":
    main()
