import React, { useRef, useEffect } from 'react';

const vertexShaderSource = `#version 300 es
in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Simplex 3D Noise (standard implementation)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    // Normalize coordinates
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    float time = u_time * 0.05;

    // Domain Warping for SILK effect
    vec3 p = vec3(st * 1.2, time); // Larger swirls, more coverage

    float n1 = snoise(p);
    float n2 = snoise(p + vec3(n1 * 2.0 + time * 0.2, n1 * 3.0 - time * 0.1, 0.0));
    float n3 = snoise(p + vec3(n2 * 4.0 - time * 0.3, n2 * 2.0 + time * 0.1, 0.0));

    // Create the "folds" (ridge noise)
    float fold = n3 * 0.5 + 0.5; // 0..1

    // Wider coverage - lower exponent spreads the glow across more pixels
    float silk = smoothstep(0.1, 0.9, fold);
    float glow = pow(silk, 1.8);

    vec3 bg = vec3(0.01, 0.02, 0.09); // #020617
    vec3 purple = vec3(0.5, 0.1, 0.8);
    vec3 blue = vec3(0.1, 0.3, 0.9);

    vec3 smokeColor = mix(blue, purple, n1 * 0.5 + 0.5);

    vec3 finalColor = bg + smokeColor * glow * 1.4;

    // Soft vignette — only slightly darkens edges, keeps corners visible
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float vig = 1.0 - length(uv - 0.5) * 0.3;
    finalColor *= vig;

    fragColor = vec4(finalColor, 1.0);
}
`;

export default function PlasmaBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const canvas = document.createElement('canvas');
        mount.appendChild(canvas);
        const gl = canvas.getContext('webgl2');

        if (!gl) return;

        // Compile Shaders
        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vert = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const frag = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vert || !frag) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vert);
        gl.attachShader(program, frag);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Geometry (Fullscreen Quad)
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        // Uniforms
        const uResolution = gl.getUniformLocation(program, 'u_resolution');
        const uTime = gl.getUniformLocation(program, 'u_time');
        const uMouse = gl.getUniformLocation(program, 'u_mouse');

        let animationId: number = 0;
        let isVisible = true;
        let startTime = performance.now();

        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const resize = () => {
            // Limit DPR to 1.5 for performance on high-res screens
            // Background fluids don't need perfect pixel ratio
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResolution, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            if (!isVisible) return;
            const time = (performance.now() - startTime) * 0.001;
            gl.uniform1f(uTime, time);
            gl.uniform2f(uMouse, mouse.x, window.innerHeight - mouse.y); // Flip Y

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationId = requestAnimationFrame(render);
        };

        // Pause WebGL when hero scrolls out of view to save GPU/CPU
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    isVisible = true;
                    render();
                } else if (!entry.isIntersecting) {
                    isVisible = false;
                    cancelAnimationFrame(animationId);
                }
            },
            { threshold: 0.01 }
        );
        observer.observe(mount);
        render();

        return () => {
            isVisible = false;
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
            if (mount.contains(canvas)) mount.removeChild(canvas);
            gl.deleteProgram(program);
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 bg-[#020617]" />;
}
