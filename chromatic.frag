uniform float time;
uniform float slider;
out vec4 fragColor;

void main() {
    vec4 color = texture(sTD2DInputs[0], vUV.st);
    vec2 uv = vUV.st;

    int N = 20;

    // float d = (sin(time) * .5 + .5) * 0.005;
    float d = slider * 0.001;

    for (int i = 0; i < N; i++) {
        float fi = float(i);
        color.r += texture(sTD2DInputs[0], (uv - .5) * (1. - fi * d * 7.) + .5).r;
        color.g += texture(sTD2DInputs[0], (uv - .5) * (1. - fi * d * 3.) + .5).g;
        color.b += texture(sTD2DInputs[0], (uv - .5) * (1. - fi * d * 1.) + .5).b;
    }

    color.rgb /= float(N);

    fragColor = TDOutputSwizzle(color);

    fragColor.rgb *= 1. - length(uv - .5) * slider * 2.;
    fragColor.a = 1.;
}
