"""
Blender 스크립트: 메인 씬에 사이드 벽 추가 후 GLB 재익스포트
Blender > Scripting 탭 > Open > 이 파일 선택 > ▶ 실행
"""

import bpy
import os
import math

BASE = "/Users/eppo/Desktop/project/Neva-home/public/models/cozy_coffee_shop"
FBX_DIR = os.path.join(BASE, "fbx")
OUTPUT = "/Users/eppo/Desktop/project/Neva-home/public/models/coffee-shop/cozy_coffee_shop.glb"

# === 1. 씬 초기화 ===
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()
for img in bpy.data.images:
    bpy.data.images.remove(img)
for mat in bpy.data.materials:
    bpy.data.materials.remove(mat)
for mesh in bpy.data.meshes:
    bpy.data.meshes.remove(mesh)

# === 2. 메인 씬 임포트 ===
bpy.ops.import_scene.fbx(filepath=os.path.join(FBX_DIR, "cozy_coffee_shop.fbx"))
print(f"[OK] Main scene imported: {len(bpy.context.selected_objects)} objects")

# === 3. 사이드 벽 임포트 & 배치 ===
# 벽 (SM_wall)
bpy.ops.import_scene.fbx(filepath=os.path.join(FBX_DIR, "SM_wall.fbx"))
wall_objs = bpy.context.selected_objects
for obj in wall_objs:
    obj.rotation_euler[2] = math.radians(90)  # Z축 90도 회전
print(f"[OK] Side wall imported")

# 벽돌 (SM_brick_wall)
bpy.ops.import_scene.fbx(filepath=os.path.join(FBX_DIR, "SM_brick_wall.fbx"))
brick_objs = bpy.context.selected_objects
for obj in brick_objs:
    obj.rotation_euler[2] = math.radians(90)  # Z축 90도 회전
print(f"[OK] Brick wall imported")

# === 4. 위치 확인용 로그 ===
print("\n=== 오브젝트 위치 목록 ===")
for obj in bpy.data.objects:
    if obj.type == 'MESH':
        print(f"  {obj.name}: pos={[round(v, 2) for v in obj.location]}, rot={[round(math.degrees(v), 1) for v in obj.rotation_euler]}")

# === 중요: 여기서 Blender에서 직접 벽 위치를 확인하고 조정하세요! ===
# === 위치가 맞으면 아래 export 부분의 주석을 해제하고 다시 실행 ===

# === 5. GLB 익스포트 ===
# bpy.ops.export_scene.gltf(
#     filepath=OUTPUT,
#     export_format='GLB',
#     export_draco_mesh_compression_enable=True,
#     export_draco_mesh_compression_level=6,
#     export_image_format='AUTO',
#     export_materials='EXPORT',
# )
# print(f"[DONE] GLB exported to: {OUTPUT}")

print("\n[INFO] 벽 위치를 Blender에서 확인하세요!")
print("[INFO] 위치 조정 후, 스크립트 하단의 export 주석을 해제하고 다시 실행하세요.")
