uniform float time;
uniform float grid;
uniform float size;
out vec4 fragColor;

vec4 angles = vec4(15.0, 45.0, 75.0, 0.0);

// during calculation we find the closest dot to a frag, determine its size, and then determine the size of the four dots above/below/right/left of it. this array of offsets move "one left", "one up", "one right", and "one down"...
vec2 originOffsets[4];

vec2 rotate(vec2 p, float t) {
    float c = cos(t), s = sin(t);
    return mat2(c, -s, s, c) * p;
}

void main() {
    vec4 color = vec4(0, 0, 0, 0);
    vec2 uv = vUV.st;
    uv.y *= uTD2DInfos[0].res.x / uTD2DInfos[0].res.y;

    float rep = grid * 192.;

    float radius = texture(sTD2DInputs[0], uv).r;
    radius = radius * size - .1;
    vec2 uv2 = fract(rotate(uv, radians(angles.r)) * rep);
    color.r += 1. - smoothstep(radius, radius + 0.1, length(uv2 - .5));

    radius = texture(sTD2DInputs[0], uv).g;
    radius = radius * size - .1;
    uv2 = fract(rotate(uv, radians(angles.g)) * rep + .1);
    color.g += 1. - smoothstep(radius, radius + 0.1, length(uv2 - .5));

    radius = texture(sTD2DInputs[0], uv).b;
    radius = radius * size - .1;
    uv2 = fract(rotate(uv, radians(angles.b)) * rep + .2);
    color.b += 1. - smoothstep(radius, radius + 0.1, length(uv2 - .5));

    fragColor = TDOutputSwizzle(color);
}
