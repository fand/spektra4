uniform float time;
uniform float slider;
out vec4 fragColor;

void main() {
    vec2 uv = vUV.st;
    vec4 color = vec4(0);

    /**
     * float TDSimplexNoise(vec3 v); を使う
     */
    float noise = TDSimplexNoise(uv);
    // noise = TDSimplexNoise(uv * 20.);
    // noise = TDSimplexNoise(vec3(uv * 10., time));
    // noise = TDSimplexNoise(vec2(uv.y * 10., time * 10.));
    // noise = step(0.8, noise);

    vec2 d = vec2(.02) * slider;

    /**
     * y座標でランダムにグリッチ
     */
    // noise = TDSimplexNoise(vec2(uv.y * 10., time * 10.));
    // color = texture(sTD2DInputs[0], uv);
    // if (noise > 0.5) {
    //     color.r = texture(sTD2DInputs[0], fract(uv + d)).r;
    //     color.b = texture(sTD2DInputs[0], fract(uv + d)).b;
    // }

    /**
     * 2次元グリッチ
     */
    float NUM_BLOCKS = 20.;
    vec2 block = floor(uv * NUM_BLOCKS) / NUM_BLOCKS;
    noise = TDSimplexNoise(vec3(block * 30., time * 10.));
    color = texture(sTD2DInputs[0], uv);
    if (noise > 0.5) {
        color.r = texture(sTD2DInputs[0], fract(uv - d)).r;
        color.b = texture(sTD2DInputs[0], fract(uv + d)).b;
    }

    // color = vec4(noise);

    fragColor = TDOutputSwizzle(color);
}
