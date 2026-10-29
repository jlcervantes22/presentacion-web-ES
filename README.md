# Presentación web — Kouchea × El Salvador

Entrega para GitHub Pages o un alojamiento con cPanel. Preparada el 29 de octubre de 2026 desde la versión aprobada de ocho pantallas, incluidas las cuatro notas «* Más impuesto al valor agregado» de la pantalla 8 y el encabezado con el logo oficial de Gobierno.

Es un sitio estático: no requiere instalar programas, ejecutar comandos, compilar, configurar una base de datos ni escribir código para publicarlo.

## Archivos incluidos

| Archivo o carpeta | Contenido |
| --- | --- |
| `index.html` | Estructura, textos, pantallas y gráficas vectoriales. |
| `styles.css` | Diseño, colores, tipografía, animaciones y adaptación a tamaños de pantalla. |
| `app.js` | Navegación, tarjetas, galerías, ventanas ampliables y simulador. |
| `assets/` | 21 imágenes y logos locales: portada, Gobierno, Kouchea, Kouchi, paisaje y 16 capturas de producto. |
| `.nojekyll` | Archivo vacío que indica a GitHub Pages que publique los archivos estáticos directamente. |
| `README.md` | Esta guía. No se muestra dentro de la presentación. |

Mantén estos nombres y esta organización. `index.html`, `styles.css`, `app.js` y la carpeta `assets` deben quedar al mismo nivel. Los recursos utilizan rutas relativas y admiten publicación en una subcarpeta.

## Ver la presentación en tu computadora

1. Descomprime el ZIP completo.
2. Abre `index.html` en un navegador moderno con JavaScript habilitado.
3. No abras el HTML dentro del ZIP ni lo separes del resto de los archivos.

La prueba de navegador de esta entrega se realizó mediante un servidor web de revisión; no se probó directamente el modo de archivos locales `file://`.

## Guardar y publicar en GitHub Pages

1. Descomprime el ZIP y abre el repositorio de destino en GitHub.
2. Usa **Add file → Upload files** para subir el contenido descomprimido completo, incluida la carpeta `assets`. Confirma los cambios con **Commit changes**. Sube los archivos, no solamente el ZIP.
3. Verifica que `index.html` esté directamente en la raíz del repositorio, sin una carpeta envolvente adicional.
4. Cuando quieras publicar, abre **Settings → Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**; elige **main**, carpeta **/(root)** y pulsa **Save**.
6. Cuando termine la publicación, abre la dirección que GitHub muestre en Pages. No hace falta cambiar ninguna ruta dentro del código.

En macOS, si `.nojekyll` no aparece al seleccionar los archivos, puedes mostrar los archivos ocultos con **Command + Shift + .**. Es un archivo vacío incluido en la entrega.

Guía oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Publicar mediante cPanel

1. Entra en **Administrador de archivos / File Manager**.
2. Abre la raíz web del dominio correspondiente; suele ser `public_html`. Dentro de ella puedes crear una carpeta exclusiva para esta presentación, por ejemplo `presentaciones/kouchea-el-salvador`.
3. Sube el ZIP a esa carpeta y pulsa **Extract / Extraer**.
4. Confirma que `index.html`, `styles.css`, `app.js` y `assets/` quedaron directamente en la carpeta elegida.
5. Abre en el navegador la dirección del dominio seguida de la ruta de esa carpeta.
6. Después de verificar la publicación, puedes retirar el ZIP del servidor. Conserva una copia como respaldo en tu computadora.

No se necesita PHP, una base de datos, un archivo `.htaccess` ni reglas especiales de redirección. Si el dominio tiene otra raíz web configurada en cPanel, usa esa carpeta en lugar de `public_html`.

Guía oficial: https://docs.cpanel.net/cpanel/files/file-manager/

## Actualizaciones posteriores

- Guarda una copia de la versión que está funcionando antes de reemplazar archivos.
- En la primera publicación, sube todo el contenido de esta entrega.
- En actualizaciones futuras, reemplaza únicamente los archivos que se indiquen como modificados. Conserva los demás y sus rutas.
- En GitHub puedes revisar cambios en una rama y luego integrarlos a `main`. En cPanel reemplaza los archivos en la misma carpeta de publicación.
- Si ves una versión anterior después de actualizar, recarga sin caché: **Command + Shift + R** en Chrome para Mac o **Ctrl + Shift + R** en Windows.
- Esta copia exportada es independiente de la presentación alojada en ChatGPT. Actualizar una no actualiza automáticamente la otra; no es necesario hacer público el sitio de ChatGPT para publicar estos archivos.

## Recursos externos y requisitos

**No hay dependencias externas necesarias para mostrar la presentación o usar sus interacciones.** No se cargan fuentes remotas, bibliotecas de terceros, imágenes remotas, servicios de cálculo ni APIs. Todos los recursos gráficos necesarios están en `assets/`; las gráficas de resultados permanecen como SVG dentro del HTML.

Se conserva la familia tipográfica original: Century Gothic, Avenir Next, Avenir, Trebuchet MS y, finalmente, la fuente sans-serif del sistema. Se utiliza la primera disponible en el equipo, igual que en la versión aprobada; por eso puede haber diferencias entre sistemas operativos. No se han añadido ni sustituido fuentes.

Solo requieren conexión a Internet los enlaces que el visitante decida abrir:

- Kouchea: https://kouchea.com/
- Perfil educativo de El Salvador en la OCDE: https://gpseducation.oecd.org/CountryProfile?primaryCountry=SLV&topic=PI
- Documento de referencia PISA: https://argentinosporlaeducacion.org/wp-content/uploads/2026/09/LATAM_Resultados_PISA25.pdf

Son enlaces de consulta; no intervienen en la carga ni en el funcionamiento de la presentación. Se conservaron tal como estaban, sin volver a auditar su contenido o disponibilidad.

## Comprobaciones realizadas

- Comparación con la versión aprobada: al reconstruir el HTML original desde los archivos separados y las imágenes extraídas, el resultado coincide exactamente. No se cambiaron textos, cifras, reglas de cálculo, estilos ni animaciones.
- Las 21 imágenes conservan sus bytes originales; no se recomprimieron ni redibujaron.
- Referencias de archivos locales verificadas y sintaxis de JavaScript comprobada.
- Ocho pantallas comparadas en Chrome de escritorio y a 390 × 844 px: mismos textos y dimensiones que el original, sin desbordamiento horizontal en móvil.
- Botón Comenzar, navegación de las ocho pantallas, regreso explícito al inicio y límite de flecha derecha en la última pantalla.
- Selección de los cinco hitos y de los cuatro pares de correspondencia; apertura y cierre de la ventana curricular.
- Las 16 capturas de las tres galerías cargan correctamente; miniaturas, ampliación y avance dentro del visor comprobados.
- Desplegables de los estudios; tres pestañas de resultados con sus cinco gráficas; cierre de diálogos con Escape.
- Cinco escenarios predefinidos, tarifas y totales del simulador, reinicio a cero, cuatro notas de IVA y desplegable de implementación.
- Pantalla 8 a 1280 × 700 px con implementación abierta: sin scroll vertical sobrante.
- Integridad del ZIP y correspondencia de sus archivos con los archivos comprobados.
- Entrega limitada a archivos públicos de la presentación: sin credenciales, claves, historial Git, documentos de trabajo ni configuración privada del alojamiento original.

## Límites de las pruebas

No se ha publicado esta entrega en tu cuenta de GitHub ni en tu servidor cPanel, ni se han probado sus permisos, dominio, HTTPS o caché. Las pruebas se realizaron en Chrome mediante un servidor de revisión; no se ejecutó una comprobación en Safari, Firefox ni dispositivos físicos. Las vistas móviles se comprobaron con tamaños de pantalla simulados. El contenido amplio conserva el desplazamiento permitido en la versión aprobada.

La presentación publicada en ChatGPT no se modificó durante esta exportación.
