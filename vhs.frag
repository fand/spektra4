uniform float time;
uniform float slider;
out vec4 fragColor;

void main() {
    vec4 color = texture(sTD2DInputs[0], vUV.st);
    vec2 uv = vUV.st;

    // Add X noise
    uv.x += TDSimplexNoise(vec2(uv.y, time)) * 0.01;
    uv.x += TDSimplexNoise(vec2(uv.y * 100., time * 20.)) * 0.003;

    // Add band noise
    float band = 1. - smoothstep(0.1, 0.12, mod(uv.y + time * 0.4, 1.));
    uv.x += TDSimplexNoise(vec2(uv.y * 300., time * 20.)) * band * 0.03;
    uv.x = fract(uv.x);

    // Bleed
    float d = slider * 0.01;
    int N = 30;
    vec3 bleed = vec3(0);
    for (int i = 0; i < N; i++) {
        float fi = float(i);
        bleed.r += texture(sTD2DInputs[0], fract(uv + d)).r;
        bleed.g += texture(sTD2DInputs[0], uv).g;
        bleed.b += texture(sTD2DInputs[0], fract(uv - d)).b;
    }
    bleed /= float(N);
    color.xyz = mix(color.xyz, bleed, 0.8);

    // Grain
    color -= fract(TDSimplexNoise(vec3(uv * 1000., time))) * 0.2;

    fragColor = TDOutputSwizzle(color);

    fragColor.rgb *= 1. - length(uv - .5) * slider;
    fragColor.a = 1.;
}
