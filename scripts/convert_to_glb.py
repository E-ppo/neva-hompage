"""
Blender 스크립트: FBX → GLB 단순 변환 (원본 그대로)
Blender > Scripting 탭 > Open > 이 파일 선택 > ▶ 실행
"""

import bpy
import os

BASE = "/Users/eppo/Desktop/project/Neva-home/public/models/cozy_coffee_shop"
FBX_PATH = os.path.join(BASE, "fbx", "cozy_coffee_shop.fbx")
OUTPUT = "/Users/eppo/Desktop/project/Neva-home/public/models/coffee-shop/cozy_coffee_shop.glb"

# 씬 초기화
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# FBX 그대로 임포트
bpy.ops.import_scene.fbx(filepath=FBX_PATH)
print(f"[OK] FBX imported: {len(bpy.context.selected_objects)} objects")

# 그대로 GLB 익스포트
bpy.ops.export_scene.gltf(
    filepath=OUTPUT,
    export_format='GLB',
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_image_format='AUTO',
    export_materials='EXPORT',
)

print(f"[DONE] GLB exported to: {OUTPUT}")
