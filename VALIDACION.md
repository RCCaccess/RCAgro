# Validación de la versión Cloudflare

- TypeScript: correcto.
- Compilación de producción Vinext / Cloudflare: correcta.
- Empaquetado Wrangler en modo dry-run: correcto, sin publicar recursos.
- Pruebas de acceso con firma RSA real generada para pruebas: correctas. Rechaza otro correo, firma alterada, emisor o audiencia erróneos, token vencido y escrituras desde otro origen.
- La configuración compilada conserva run_worker_first=true para comprobar acceso antes de servir archivos estáticos.
- La prueba HTTP local del Worker no pudo completarse por la disponibilidad del servidor local en este entorno.
- Pendiente: crear y enlazar D1, publicar en la cuenta real, habilitar Access, comprobar sesión en navegador, persistencia y restauración del respaldo.

No se ha publicado una nueva URL ni modificado el dashboard original.
