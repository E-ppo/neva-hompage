"""
Blender 스크립트: 개별 FBX → GLB 일괄 변환 (원본 그대로)
Blender > Scripting 탭 > Open > 이 파일 선택 > ▶ 실행
"""

import bpy
import os

FBX_DIR = "/Users/eppo/Desktop/project/Neva-home/public/models/cozy_coffee_shop/fbx"
OUTPUT_DIR = "/Users/eppo/Desktop/project/Neva-home/public/models/coffee-shop/parts"

os.makedirs(OUTPUT_DIR, exist_ok=True)


def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    for img in bpy.data.images:
        bpy.data.images.remove(img)
    for mat in bpy.data.materials:
        bpy.data.materials.remove(mat)
    for mesh in bpy.data.meshes:
        bpy.data.meshes.remove(mesh)


fbx_files = sorted([f for f in os.listdir(FBX_DIR) if f.endswith('.fbx')])
# 메인 씬은 제외 (이미 변환됨)
fbx_files = [f for f in fbx_files if f != 'cozy_coffee_shop.fbx']
total = len(fbx_files)

for i, fbx_name in enumerate(fbx_files):
    name = fbx_name.replace('.fbx', '')
    fbx_path = os.path.join(FBX_DIR, fbx_name)
    glb_path = os.path.join(OUTPUT_DIR, f"{name}.glb")

    print(f"[{i+1}/{total}] {fbx_name}")

    clear_scene()
    bpy.ops.import_scene.fbx(filepath=fbx_path)

    bpy.ops.export_scene.gltf(
        filepath=glb_path,
        export_format='GLB',
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_image_format='AUTO',
        export_materials='EXPORT',
    )

print(f"\n[DONE] {total}개 변환 완료! -> {OUTPUT_DIR}")
