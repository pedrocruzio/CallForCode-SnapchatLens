//@ui {"widget":"group_start", "label":"Materials [DO NOT EDIT]"}
//@input Asset.Material logoMaterial
//@input Asset.Material capMaterialPrimary
//@input Asset.Material capMaterialSecondary
//@ui {"widget":"group_end"}

//@ui {"widget":"group_start", "label":"Blendshapes [DO NOT EDIT]"}
//@input Component.BlendShapes[] blendshapes
//@input string[] blendshapeNames
//@ui {"widget":"group_end"}

//@ui {"widget":"group_start", "label":"Objects [DO NOT EDIT]"}
//@input SceneObject hatTransform
//@ui {"widget":"group_end"}


script.api.logoMaterial = script.logoMaterial;
script.api.capMaterialPrimary = script.capMaterialPrimary;
script.api.capMaterialSecondary = script.capMaterialSecondary;
script.api.blendshapes = script.blendshapes;
script.api.blendshapeNames = script.blendshapeNames;
script.api.hatTransform = script.hatTransform;
