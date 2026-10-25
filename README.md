# RC Agro — Dashboard agrícola

Código fuente del dashboard de RC Agro, preparado para RCCaccess/RCAgro.

## Funciones
- Proyectos de melón, ají pimentón, pacas y otros cultivos.
- Historial por año, resumen gráfico, inversión, ingresos y resultado.
- Financiamiento editable, movimientos y porcentajes por socio.
- El capitalista asume inversión y pérdidas; el trabajador participa solo del beneficio positivo.
- Reportes PDF, XLSX y XLS, con vistas previas.

## Subir a GitHub
1. Descomprime este ZIP.
2. Abre https://github.com/RCCaccess/RCAgro.
3. Usa Upload files y carga el CONTENIDO de la carpeta RCAgro, no el ZIP.
4. Si el navegador limita la cantidad de archivos, sube las carpetas en varias tandas.
5. Incluye los archivos cuyo nombre empieza con punto: .gitignore, .npmrc y .openai/hosting.json. En macOS puedes mostrarlos con Cmd+Shift+punto.
6. Confirma cada carga con Commit changes. Mantén el repositorio privado por los datos históricos incluidos.

## Contenido y datos
Incluye el código actual, logo, pruebas, migraciones SQL, historial importado y siete archivos Excel originales en public/sources.
No incluye la base de datos de producción ni los proyectos o movimientos ingresados manualmente en la web. Para conservar esos registros se necesita un respaldo aparte.
No incluye contraseñas, tokens de acceso, node_modules, compilados ni estado local de desarrollo.

## Tecnología
React / TypeScript / Vinext, Cloudflare Workers, D1 y Drizzle.
Node >=22.13; pnpm 11.25.0, según package.json.

## Desarrollo
Desde esta carpeta, con Node y pnpm instalados:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Para compilar: `pnpm build`.
Consulta DESARROLLO.md para migraciones D1, configuración local y detalles del alojamiento.

## Alojamiento
Subir el código a GitHub no publica el dashboard ni migra sus datos. El sitio actual continúa funcionando en https://rc-agro-control.truequail257.chatgpt.site.
Este código conserva la integración con Sites y la autenticación de ChatGPT. Ejecutarlo en otro alojamiento requiere configurar o adaptar la autenticación, los bindings de Cloudflare y la base D1; no es un sitio estático para GitHub Pages.
.openai/hosting.json identifica el sitio actual y no es una credencial. No cambies esa identidad al continuar trabajando sobre ese mismo sitio.
