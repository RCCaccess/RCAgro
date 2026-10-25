# RC Agro — versión independiente para Cloudflare

Dashboard privado de Oscar Rojas para proyectos agrícolas. Incluye inversión, ingresos, resultados, financiamiento, reparto de beneficios, historial y reportes PDF / Excel con vista previa.

Esta versión funciona en tu cuenta de Cloudflare Workers + D1 y usa Cloudflare Access para iniciar sesión con tu correo. No depende del inicio de sesión de ChatGPT ni necesita dominio propio.

## 1. Guarda tus datos actuales
En la web actual: Reportes → Respaldos y exportación de datos → Respaldo JSON. Conserva ese archivo en tu computadora. Esta carpeta incluye el historial importado; los movimientos nuevos no se copian de la base de datos actual automáticamente.

## 2. Actualiza GitHub
Descomprime el ZIP y sube el CONTENIDO de RCAgro a RCCaccess/RCAgro, reemplazando archivos existentes. Incluye wrangler.json y los archivos nuevos. No subas node_modules, dist, .wrangler, .env ni respaldos JSON.
Mantén privado el repositorio, porque incluye tu historial financiero y los Excel originales.

## 3. Base D1 configurada
La configuración ya utiliza rc-agro-db con Database ID b0fcd4d8-6fbc-4543-8a6d-60dc454b9dbf, proporcionado por el propietario. No necesitas crear otra base ni modificar el binding DB. La conexión real se comprobará al publicar en tu cuenta.

## 4. Publica desde GitHub
Cloudflare → Workers & Pages → Create application → Import a repository (o Connect Git) → GitHub → autoriza RCCaccess/RCAgro.
- Nombre del Worker: rc-agro (debe coincidir con wrangler.json).
- Rama: main, o la rama donde cargaste los archivos.
- Directorio raíz: / (donde están package.json y wrangler.json).
- Comando de instalación, si se solicita: pnpm install --frozen-lockfile
- Comando de compilación: pnpm build
- Comando de despliegue: pnpm run deploy
- Variables de compilación si se necesitan: NODE_VERSION=22 y PNPM_VERSION=11.25.0.
Usa Workers, NO Pages ni la opción de subir solamente archivos estáticos.
El comando deploy aplica las migraciones D1 y publica el Worker compilado.

La primera publicación permanecerá bloqueada con un mensaje de configuración pendiente. Es intencional: nadie podrá consultar archivos ni datos antes de terminar Access.

## 5. Protege la URL con Access
Activa Zero Trust en tu cuenta si todavía no está habilitado.
En Workers & Pages → rc-agro → Access → Protect this Worker behind Access.
Protege producción y vistas previas. Configura una política Allow por correo exacto: oscar0180@gmail.com. No uses Everyone ni un dominio completo como gmail.com. Puedes usar código de un solo uso por correo como método de acceso.
En Zero Trust → Access controls → Applications → tu aplicación → Additional settings, copia Application Audience (AUD) Tag.
Obtén también tu Team domain, con formato https://tu-equipo.cloudflareaccess.com.

En GitHub edita wrangler.json, en vars:
- ADMIN_EMAIL: tu correo autorizado. Por defecto oscar0180@gmail.com.
- ACCESS_TEAM_DOMAIN: https://tu-equipo.cloudflareaccess.com (sin barra final).
- ACCESS_AUD: el AUD que copiaste.
Guarda. Cloudflare volverá a compilar y publicar con esos valores. No son contraseñas ni tokens; deben coincidir con tu aplicación Access. Guardarlos en la configuración evita perderlos con futuras publicaciones.
No elimines la política Access: el código verifica también la firma del token, el emisor, audiencia, vencimiento y correo; sin Access rechazará las peticiones.

La URL tendrá un formato similar a https://rc-agro.TU-SUBDOMINIO.workers.dev. Usa la URL exacta que entregue Cloudflare.

## 6. Restaura el respaldo
Entra en la nueva URL y autentícate con tu correo. En Reportes → Respaldos y exportación de datos → Restaurar respaldo, carga el JSON de la web anterior. La restauración reemplaza los registros del nuevo dashboard: hazla antes de comenzar a introducir datos en la nueva web.
Comprueba número de proyectos, últimos movimientos, inversión, ingresos, reparto y descargas antes de dejar de usar la web anterior. Las dos webs tienen bases distintas: no se sincronizan entre ellas.

## 7. Comprueba el acceso
- Abre la URL en una ventana privada: debe pedir inicio de sesión.
- Otro correo no debe poder entrar.
- Los reportes y /sources/ también deben pedir sesión.
- Registra un movimiento, recarga y verifica que siga guardado.
- Genera un PDF y un Excel y abre su vista previa.

## Desarrollo y pruebas
Requiere Node >=22.13.0 y pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm test:access
pnpm build
```

El desarrollo local también exige un token Access válido; no contiene un usuario ficticio ni un modo de acceso público. La prueba de autenticación usa claves efímeras, sin credenciales reales. Para probar el bloqueo sin sesión puedes ejecutar pnpm start después de compilar.

## Publicaciones posteriores
Los commits en la rama conectada disparan la publicación de Cloudflare. La base D1 persiste entre versiones; no se guarda en GitHub. Descarga respaldos periódicos desde Reportes.

## Fuentes de configuración
- https://developers.cloudflare.com/workers/configuration/cloudflare-access/
- https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/
- https://developers.cloudflare.com/d1/get-started/

Paquete preparado para migración. La publicación y el acceso real aún deben configurarse en tu cuenta; este ZIP no crea recursos por sí solo.
