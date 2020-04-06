//@ui {"widget":"group_start", "label":"Logo"}
//@input Asset.Texture logoTexture
//@input int logoBlendMode = "normal" {"widget": "combobox", "values":[{"label": "Normal", "value": 0}, {"label": "Multiply", "value": 10}, {"label": "Screen", "value": 3}]}
//@input float logoSize = 0.5 {"widget":"slider", "min":0, "max":1, "step":0.05}
//@input float logoOffsetX = 0 {"widget":"slider", "min":-1, "max":1, "step":0.05}
//@input float logoOffsetY = 0 {"widget":"slider", "min":-1, "max":1, "step":0.05}
//@ui {"widget":"group_end"}

//@ui {"widget":"group_start", "label":"Cap"}
//@input vec4 primaryCapColor = {1, 1, 1, 1} {"widget":"color"}
//@input vec4 secondaryCapColor = {1, 1, 1, 1} {"widget":"color"}
//@input float brimCurve = 0.5 {"widget":"slider", "min":0, "max":1, "step":0.05}
//@input float hatSwivel = 0.0 {"widget":"slider", "min":-1, "max":1, "step":0.05}
//@input float hatTilt = 0.0 {"widget":"slider", "min":-1, "max":1, "step":0.05}
//@ui {"widget":"group_end"}

//@ui {"widget":"group_start", "label":"DO NOT EDIT", "showIf": "hideMe", "showIfValue": true}
//@input bool hideMe = false {"showIf": "hideMe"}
//@input Component.ScriptComponent properties
//@ui {"widget":"group_end"}

var logoAspect = 1.0;

var uvWidth = remap(script.logoSize, 0, 1, 0.4, 0.7);
var uvHeight = remap(script.logoSize, 0, 1, 0.2, 0.4);
var logoOffset = new vec2(script.logoOffsetX, -script.logoOffsetY);

var minHatSwivel = -22.5;
var maxHatSwivel = 22.5;

var minHatTilt = 10;
var maxHatTilt = -7;

var uvAspect = uvWidth / uvHeight;

init();

function init()
{
	if(script.logoTexture)
	{	
		if(script.properties.api.logoMaterial)
		{
			script.properties.api.logoMaterial.mainPass.baseTex = script.logoTexture;
			script.properties.api.logoMaterial.mainPass.blendMode = script.logoBlendMode;
		}

		var logoWidth = script.logoTexture.getWidth();
		var logoHeight = script.logoTexture.getHeight();

		logoAspect = logoWidth / logoHeight;

		var newScaleX = 1;
		var newScaleY = 1;

		if(logoAspect >= uvAspect)
		{
			// Logo image is wider than mappable area
			newScaleX = 1 / uvWidth;
			newScaleY = 1 / (uvWidth / logoAspect);
		}
		else
		{
			// Logo image is taller than mappable area
			newScaleX = 1 / (uvHeight * logoAspect);
			newScaleY = 1 / uvHeight;
		}

		var logoScale = new vec2(newScaleX, newScaleY);
		script.properties.api.logoMaterial.mainPass.uv2Scale = logoScale;
		var logoPlacement = new vec2( (1 - logoScale.x) / 2, (1 - logoScale.y) / 2);
		logoOffset = new vec2(-logoPlacement.x * logoOffset.x, logoPlacement.y * logoOffset.y);
		script.properties.api.logoMaterial.mainPass.uv2Offset = logoPlacement.sub(logoOffset);
	}

	// Set Cap Primary Color
	if(script.properties.api.capMaterialPrimary)
	{
		script.primaryCapColor.a = 1;
		script.properties.api.capMaterialPrimary.mainPass.baseColor = script.primaryCapColor;
	}

	// Set Cap Secondary Color
	if(script.properties.api.capMaterialSecondary)
	{
		script.secondaryCapColor.a = 1;
		script.properties.api.capMaterialSecondary.mainPass.baseColor = script.secondaryCapColor;
	}

	// Set Brim Curve blendshape
	for(var index in script.properties.api.blendshapes)
	{
		script.properties.api.blendshapes[index].setBlendShape(script.properties.api.blendshapeNames[index], script.brimCurve)
	}

	// Set Cap Orientation
	if(script.properties.api.hatTransform)
	{
		var swivel = remap(script.hatSwivel, -1, 1, minHatSwivel, maxHatSwivel) * Math.PI / 180;
		var tilt = remap(script.hatTilt, -1, 1, minHatTilt, maxHatTilt) * Math.PI / 180;

		var angles = new vec3(tilt, swivel, 0);

		script.properties.api.hatTransform.getTransform().setLocalRotation(quat.fromEulerVec(angles));
	}
}

function remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}