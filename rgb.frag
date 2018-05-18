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
    // color = vec4(noise);

    /**
     * y座標でランダムにグリッチ
     */
    // noise = TDSimplexNoise(vec2(uv.y * 10., time * 10.));
    // if (noise < 0.5) {
    //     color = texture(sTD2DInputs[0], uv);
    // } else {
    //     color.g = texture(sTD2DInputs[0], fract(uv + vec2(.01))).g;
    //     color.b = texture(sTD2DInputs[0], fract(uv + vec2(.01))).b;
    // }

    /**
     * 2次元グリッチ
     */
    float NUM_BLOCKS = 20.;
    vec2 block = floor(uv * NUM_BLOCKS) / NUM_BLOCKS;

    noise = TDSimplexNoise(vec3(block, time * 10.));

    // color = vec4(block, 0, 1);

    color = texture(sTD2DInputs[0], uv);
    if (noise > 0.7) {
        color.r = texture(sTD2DInputs[0], fract(uv - vec2(.01))).r;
        color.b = texture(sTD2DInputs[0], fract(uv + vec2(.01))).b;
    }

    fragColor = TDOutputSwizzle(color);
}
