/*
 * lowlidev Destiny Gear Viewer → OBJ/MTL + textures exporter
 * -----------------------------------------------------------
 * Works with the viewer's three.js (r83) + three.tgxloader.js.
 *
 * USAGE (DevTools console on https://lowlidev.com.au/destiny/gear-viewer):
 *   1. Paste this whole file into the console (any time — before or after loading an item).
 *   2. Load / view an item. Rotate the view once so a frame renders.
 *   3. Run:   tgxExport()              → downloads model.obj, model.mtl and all textures
 *             tgxExport('ace')         → same, but files are prefixed "ace_"
 *             tgxExport('', false)     → dry run, just returns stats (no downloads)
 *   Allow "multiple downloads" if Chrome asks.
 *
 * WHAT IT DOES
 *   - Grabs the live scene by hooking Object3D.updateMatrixWorld (r83's renderer.render
 *     is a per-instance function, so patching WebGLRenderer.prototype doesn't work).
 *   - Keeps the original shared vertices (no per-face vertex explosion).
 *   - Drops zero-area triangle-strip stitching faces (these cause the "wild edges"
 *     between unrelated vertices in Blender edit mode).
 *   - Exports every texture per material: diffuse (map_Kd), normal (map_Bump / norm),
 *     and Bungie's packed gearstack map (referenced as a comment in the MTL).
 *   - Inverts V because the TGX textures use flipY = false.
 *   - Writes each material's dye colors (primary/secondary) as MTL comments.
 *
 * BLENDER NOTES
 *   - Normal map image node → Color Space: Non-Color → Normal Map node → BSDF Normal.
 *   - Gearstack is NOT a standard ORM. Split it with Separate Color and inspect channels
 *     (typically AO / smoothness (invert for roughness) / dye mask).
 *   - Don't "Merge by Distance" unless you mark seams first — duplicate positions are UV seams.
 */
(function () {
  if (!window.THREE) { console.error('three.js not found on this page'); return; }

  // --- 1. scene capture hook (installed once) ---
  if (!THREE.Object3D.prototype.__tgxHooked) {
    const orig = THREE.Object3D.prototype.updateMatrixWorld;
    THREE.Object3D.prototype.updateMatrixWorld = function (force) {
      if (this instanceof THREE.Scene) window.__scene = this;
      return orig.call(this, force);
    };
    THREE.Object3D.prototype.__tgxHooked = true;
  }

  // --- 2. exporter ---
  window.tgxExport = function (prefix = '', DOWNLOAD = true, scene = window.__scene) {
    if (!scene) { console.warn('No scene captured yet — load an item and rotate the view once.'); return; }
    const P = prefix ? prefix + '_' : '';
    const dl = (name, data) => {
      if (!DOWNLOAD) return;
      const a = document.createElement('a');
      a.href = data.startsWith('data:') ? data : URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
      a.download = P + name; document.body.appendChild(a); a.click(); a.remove();
    };

    const texNames = new Map(); let texCount = 0;
    const saveTex = (tex, kind) => {
      const img = tex && tex.image; if (!img) return null;
      const key = img.src || img;
      if (texNames.has(key)) return texNames.get(key);
      const name = `${kind}_${texCount++}.png`;
      let data = img.src && img.src.startsWith('data:image/png') ? img.src : null;
      if (!data) {
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0); data = c.toDataURL('image/png');
      }
      texNames.set(key, P + name); dl(name, data); return P + name;
    };

    const f3 = n => +n.toFixed(6);
    const uniTex = (mat, k) => (mat.uniforms && mat.uniforms[k] && mat.uniforms[k].value) || mat[k] || null;
    const col = (mat, k) => {
      const u = mat.uniforms && mat.uniforms[k];
      return u && u.value && u.value.toArray ? u.value.toArray().map(f3).join(' ') : '';
    };

    let obj = `mtllib ${P}model.mtl\n`, mtl = '';
    let vOff = 1, vtOff = 1, vnOff = 1, meshI = 0, kept = 0, dropped = 0;
    const tri = new THREE.Triangle(), doneMats = new Set();
    scene.updateMatrixWorld(true);

    scene.traverse(m => {
      if (!(m instanceof THREE.Mesh) || !m.visible) return;
      let g = m.geometry;
      if (!g.faces && g instanceof THREE.BufferGeometry) g = new THREE.Geometry().fromBufferGeometry(g);
      if (!g.faces) return;

      const V = g.vertices, F = g.faces, UV = g.faceVertexUvs[0] || [];
      const mats = m.material.materials || [m.material];
      const nm = new THREE.Matrix3().getNormalMatrix(m.matrixWorld), v = new THREE.Vector3();

      obj += `o mesh_${meshI}\n`;
      V.forEach(p => { v.copy(p).applyMatrix4(m.matrixWorld); obj += `v ${f3(v.x)} ${f3(v.y)} ${f3(v.z)}\n`; });

      // group faces by material; drop degenerate strip-stitching triangles
      const byMat = {};
      F.forEach((f, i) => {
        tri.set(V[f.a], V[f.b], V[f.c]);
        if (f.a === f.b || f.b === f.c || f.a === f.c || tri.area() < 1e-12) { dropped++; return; }
        (byMat[f.materialIndex] = byMat[f.materialIndex] || []).push(i);
      });

      let vt = '', vn = '', faces = '', tc = 0, nc = 0;
      Object.keys(byMat).forEach(mi => {
        const mat = mats[mi] || mats[0];
        const mname = `m${meshI}_${mi}_${(mat.name || '').replace(/\W+/g, '_')}`;
        if (!doneMats.has(mname)) {
          doneMats.add(mname);
          const d = saveTex(uniTex(mat, 'map'), 'diffuse');
          const n = saveTex(uniTex(mat, 'normalMap'), 'normal');
          const gs = saveTex(uniTex(mat, 'gearstackMap'), 'gearstack');
          mtl += `newmtl ${mname}\nKd 1 1 1\n` +
            (d ? `map_Kd ${d}\n` : '') +
            (n ? `map_Bump -bm 1 ${n}\nnorm ${n}\n` : '') +
            (gs ? `# gearstack ${gs}\n` : '') +
            `# primaryColor ${col(mat, 'primaryColor')}  secondaryColor ${col(mat, 'secondaryColor')}\n\n`;
        }
        faces += `usemtl ${mname}\n`;
        byMat[mi].forEach(i => {
          const f = F[i], uv = UV[i];
          const parts = [f.a, f.b, f.c].map((id, k) => {
            let s = `${id + vOff}/`;
            if (uv && uv[k]) { vt += `vt ${f3(uv[k].x)} ${f3(1 - uv[k].y)}\n`; s += `${vtOff + tc++}`; } // flipY=false → invert V
            if (f.vertexNormals[k]) {
              v.copy(f.vertexNormals[k]).applyMatrix3(nm).normalize();
              vn += `vn ${f3(v.x)} ${f3(v.y)} ${f3(v.z)}\n`; s += `/${vnOff + nc++}`;
            }
            return s;
          });
          faces += `f ${parts.join(' ')}\n`; kept++;
        });
      });

      obj += vt + vn + faces;
      vOff += V.length; vtOff += tc; vnOff += nc; meshI++;
    });

    dl('model.obj', obj); dl('model.mtl', mtl);
    const stats = { meshes: meshI, facesKept: kept, facesDropped: dropped, textures: [...texNames.values()] };
    console.log('tgxExport:', stats);
    return stats;
  };

  console.log('TGX exporter ready. Load an item, rotate once, then run tgxExport()');
})();