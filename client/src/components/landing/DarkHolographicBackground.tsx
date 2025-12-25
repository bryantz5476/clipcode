import { useEffect, useRef } from 'react';

export function DarkHolographicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        // Vertex Shader
        const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        // Fragment Shader: Dark Subtle Holographic Foil
        const fragmentShaderSource = `
      precision highp float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      
      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;
        
        // Very slow movement
        float time = u_time * 0.08; 
        
        // Large scale for "very large, slow, soft folds"
        vec2 p = st * 1.5; 
        
        // Smooth warping
        float q = snoise(p + time * 0.2);
        vec2 warp = vec2(q, snoise(p + q - time * 0.1));
        
        // Main noise pattern
        float n = snoise(p + warp * 1.5 + time * 0.1); // Low frequency
        
        // Pseudo-normals for lighting
        float eps = 0.05; // Larger epsilon for smoother gradients
        float n_x = snoise(p + warp * 1.5 + time * 0.1 + vec2(eps, 0.0));
        float n_y = snoise(p + warp * 1.5 + time * 0.1 + vec2(0.0, eps));
        vec3 normal = normalize(vec3(n_x - n, n_y - n, 1.0)); // Flattened normal
        
        // Lighting
        vec3 lightDir = normalize(vec3(0.5, 0.5, 2.0)); // Frontal soft light
        float diff = max(dot(normal, lightDir), 0.0);
        
        // Base Color: Deep Navy / Black (#000d1a)
        vec3 baseColor = vec3(0.0, 0.05, 0.1); 
        
        // Accent Colors (Brand Palette)
        // Muted Brand Blue (#0066ff source)
        vec3 accentBlue = vec3(0.0, 0.2, 0.5); 
        // Muted Brand Cyan/Indigo mix (#22d3ee / #6366f1)
        vec3 accentSecondary = vec3(0.1, 0.3, 0.5); // Deep Indigo/Cyan blend
        
        // Mix logic: Keep it mostly dark
        // We use the noise value 'n' (-1 to 1) 
        // Only show color in higher peaks
        
        float t = smoothstep(0.2, 0.8, n); // Sharpen the mix slightly but keep soft edges
        
        vec3 surfaceColor = mix(baseColor, accentBlue, t * 0.4); // Subtle blue blend
        surfaceColor = mix(surfaceColor, accentSecondary, t * 0.3 * sin(time + st.x)); // Varying cyan/indigo
        
        // Specular highlights - controlled
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 8.0); // Softer specular
        
        // Add minimal highlight (muted white/blue)
        surfaceColor += spec * vec3(0.15, 0.15, 0.25) * t;
        
        // Vignette to ensure edges are dark (focus on center/content)
        // Actually, user said full screen, but premium feel often implies subtle vignette
        // Let's keep it uniform but dark
        
        // Final contrast adjustment to ensure >= 75% darkness
        surfaceColor = pow(surfaceColor, vec3(1.3)); // Darken midtones
        
        gl_FragColor = vec4(surfaceColor, 1.0);
      }
    `;

        function createShader(gl: WebGLRenderingContext, type: number, source: string) {
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
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const timeLocation = gl.getUniformLocation(program, "u_time");
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

        let animationFrameId: number;
        let startTime = performance.now();

        const render = () => {
            const currentTime = (performance.now() - startTime) / 1000;

            if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }

            gl.uniform1f(timeLocation, currentTime);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#030308]">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
