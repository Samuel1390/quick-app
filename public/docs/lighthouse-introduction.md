# Introducción a Lighthouse

[Lighthouse](https://github.com/GoogleChrome/lighthouse) es una herramienta automatizada y de código abierto para ayudarte a mejorar la calidad de las páginas web. Puedes ejecutarla en cualquier página web, ya sea pública o que requiera autenticación. Cuenta con auditorías de rendimiento, accesibilidad, SEO y más.

Puedes ejecutar Lighthouse en Chrome DevTools, desde la línea de comandos o como un módulo de Node. Dale a Lighthouse una URL para auditar, este ejecutará una serie de auditorías en la página y luego generará un informe sobre el rendimiento de la misma. Utiliza las auditorías fallidas como indicadores de cómo mejorar la página. Cada auditoría cuenta con una referencia que explica por qué es importante, así como la manera de solucionarla.

También puedes usar [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md) para prevenir regresiones en tus sitios.

[Video](https://www.youtube.com/watch?v=mLjxXPHuIJo)

## Primeros pasos

Elige el flujo de trabajo de Lighthouse que mejor se adapte a tus necesidades:

- [En Chrome DevTools](https://developer.chrome.com/docs/lighthouse/overview#devtools). Audita páginas que requieren autenticación y lee tus informes en un formato amigable para el usuario, directamente desde el navegador.
- [Desde la línea de comandos](https://developer.chrome.com/docs/lighthouse/overview#cli). Automatiza tus ejecuciones de Lighthouse mediante scripts de shell.
- [Como módulo de Node](https://developer.chrome.com/docs/lighthouse/overview#programmatic). Integra Lighthouse en tus sistemas de integración continua.
- [Desde una interfaz de usuario web](https://developer.chrome.com/docs/lighthouse/overview#psi). Ejecuta Lighthouse y enlaza a los informes, sin necesidad de instalación.

> [!NOTE]
> **Nota:** Los flujos de trabajo de la CLI y de Node requieren que tengas una instancia de Google Chrome instalada en tu equipo.

### Ejecutar Lighthouse en Chrome DevTools

Lighthouse tiene su propio panel en Chrome DevTools. Para generar un informe:

1. Descarga [Google Chrome para escritorio](https://www.google.com/chrome/browser/desktop/).
2. Abre Chrome e ingresa a la URL que deseas auditar. Puedes auditar cualquier URL en la web.
3. [Abre Chrome DevTools](https://developer.chrome.com/docs/devtools/open).
4. Haz clic en la pestaña **Lighthouse**.
   A la izquierda está el viewport de la página web a auditar. A la derecha está el panel **Lighthouse** de Chrome DevTools.
5. Haz clic en **Analyze page load** (Analizar carga de la página). DevTools te mostrará una lista de categorías de auditoría. Déjalas todas activadas.
6. Haz clic en **Run audit** (Ejecutar auditoría). Después de 30 a 60 segundos, Lighthouse te entregará un informe sobre la página.
   Un informe de Lighthouse en Chrome DevTools.

### Instalar y ejecutar la herramienta de línea de comandos de Node

Para instalar el módulo de Node:

1. Descarga [Google Chrome para escritorio](https://www.google.com/chrome/browser/desktop/).
2. Instala la versión actual con [Soporte a Largo Plazo](https://github.com/nodejs/Release) (LTS) de [Node](https://nodejs.org).
3. Instala Lighthouse. La bandera `-g` lo instala como un módulo global.

```bash
npm install -g lighthouse

```

Para ejecutar una auditoría:

```
lighthouse <url>

```

Para ver todas las opciones:

```
lighthouse --help

```

#### Ejecutar el módulo de Node de forma programática

Consulta [Using programmatically](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically) para ver un ejemplo de cómo ejecutar Lighthouse de forma programática como un módulo de Node.

### Ejecutar PageSpeed Insights

Para ejecutar Lighthouse en PageSpeed Insights:

1. Ve a [PageSpeed Insights](https://pagespeed.web.dev/).
2. Introduce la URL de una página web.
3. Haz clic en **Analyze** (Analizar).
   El sitio web de PageSpeed Insights.

### Ejecutar Lighthouse como una extensión de Chrome

> [!CAUTION]
> **Precaución:** A menos que tengas una razón específica, deberías usar el flujo de trabajo de [Chrome DevTools](https://developer.chrome.com/docs/lighthouse/overview#devtools) en lugar de esta extensión de Chrome. El flujo de trabajo de DevTools permite realizar pruebas en sitios locales y páginas autenticadas, mientras que la extensión no lo permite.

Para instalar la extensión:

1. Descarga [Google Chrome para escritorio](https://www.google.com/chrome/browser/desktop/).
2. Instala la [Extensión de Chrome de Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) desde la Chrome Webstore.

Para ejecutar una auditoría:

1. En Chrome, ve a la página que deseas auditar.
2. Haz clic en **Lighthouse**, junto a la barra de direcciones de Chrome o en el menú de extensiones de Chrome. Al hacer clic, el menú de Lighthouse se expandirá.
   La extensión te solicita generar un informe.
3. Haz clic en **Generate report** (Generar informe). Lighthouse ejecutará sus auditorías en la página que tiene el foco actual y luego abrirá una nueva pestaña con el informe de los resultados.
   Un informe de Lighthouse generado desde la extensión.

Utiliza el [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/) para ver y compartir informes en línea.
El Visor de Lighthouse (Lighthouse Viewer)

### Compartir informes como JSON

El Visor de Lighthouse necesita la salida JSON de un informe de Lighthouse. Genera las salidas JSON de la siguiente manera:

- **Desde un informe de Lighthouse**. Haz clic en el menú, luego haz clic en **Save as JSON** (Guardar como JSON)
- **Línea de comandos**. Ejecuta:

```shell
lighthouse --output json --output-path <ruta/para/la/salida.json>

```

Para ver los datos del informe:

1. Abre el [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/).
2. Arrastra el archivo JSON al Visor, o haz clic en cualquier parte del Visor para abrir el navegador de archivos y seleccionar el archivo.

### Compartir informes como GitHub Gists

Si no quieres transferir archivos JSON manualmente, también puedes compartir tus informes como gists secretos de GitHub. Una de las ventajas de los gists es el control de versiones gratuito.

Para exportar un informe como un gist desde el propio informe:

1. Haz clic en el menú, luego haz clic en **Open In Viewer** (Abrir en el Visor). El informe se ubicará en `https://googlechrome.github.io/lighthouse/viewer/`.
2. Desde el Visor, haz clic en el menú y luego haz clic en **Save as Gist** (Guardar como Gist). La primera vez que hagas esto, una ventana emergente te solicitará permiso para acceder a tus datos básicos de GitHub y para leer y escribir en tus gists.

Para exportar un informe como un gist desde la versión CLI de Lighthouse, [crea un gist manualmente](https://gist.github.com/) y copia y pega la salida JSON del informe dentro del gist. El nombre del archivo del gist que contiene la salida JSON debe terminar en `.lighthouse.report.json`. Consulta [Compartir informes como JSON](https://developer.chrome.com/docs/lighthouse/overview#json) para ver un ejemplo de cómo generar una salida JSON desde la herramienta de línea de comandos.

Para ver un informe que ha sido guardado como un gist:

- Añade `?gist=<ID>` a la URL del Visor, donde `<ID>` es el ID del gist.

```text
https://googlechrome.github.io/lighthouse/viewer/?gist=<ID>

```

- Abre el [Visor](https://googlechrome.github.io/lighthouse/viewer/) y pega la URL de un gist en él.

## Extensibilidad de Lighthouse

Lighthouse tiene como objetivo proporcionar orientación que sea relevante y aplicable para todos los desarrolladores web. Con este fin, existen dos características disponibles que te permiten adaptar Lighthouse a tus necesidades específicas.

### Stack packs (Paquetes de tecnologías)

Los desarrolladores utilizan muchas tecnologías diferentes (backend, sistemas de gestión de contenidos y frameworks de JavaScript) para construir sus páginas web. En lugar de mostrar recomendaciones generales, Lighthouse ofrece consejos relevantes y aplicables según las herramientas utilizadas.

Los _Stack packs_ permiten a Lighthouse detectar en qué plataforma está construido tu sitio y mostrar recomendaciones específicas basadas en ese conjunto de tecnologías. Estas recomendaciones son definidas y organizadas por expertos de la comunidad.

Para contribuir con un stack pack, revisa las [Directrices para colaboradores](https://github.com/GoogleChrome/lighthouse-stack-packs/blob/master/CONTRIBUTING.md).

### Complementos de Lighthouse (Lighthouse plugins)

Los complementos de Lighthouse permiten a los expertos en la materia ampliar la funcionalidad de Lighthouse para las necesidades específicas de su comunidad. Puedes aprovechar los datos que recopila Lighthouse para crear nuevas auditorías. En esencia, un complemento de Lighthouse es un módulo de node que implementa un conjunto de comprobaciones para ser ejecutadas por Lighthouse y añadidas al informe como una nueva categoría.

Para obtener más información sobre cómo crear tu propio complemento, echa un vistazo a nuestro [Manual de complementos](https://github.com/GoogleChrome/lighthouse/blob/master/docs/plugins.md) en el repositorio de GitHub de Lighthouse.

## Integrar Lighthouse

Si eres una empresa o un particular que está integrando Lighthouse como parte de los productos o servicios que ofreces, ¡eso es genial! Queremos que la mayor cantidad de gente posible utilice Lighthouse.

Consulta las [Directrices y activos de marca para la integración de Lighthouse](https://docs.google.com/document/d/e/2PACX-1vRWKW9RiB3suYt1KqgBJhwLnvV-AiFne8iAudADtwK-LWLNParYsFts92InHNtB_BV5x-xtSVcnTO2n/pub) para mostrar que se está utilizando Lighthouse, protegiendo al mismo tiempo nuestra marca.

## Contribuir a Lighthouse

Lighthouse es de código abierto y [¡las contribuciones son bienvenidas!](https://github.com/GoogleChrome/lighthouse/blob/master/CONTRIBUTING.md) Visita el [Gestor de problemas](https://github.com/GoogleChrome/lighthouse/issues) del repositorio para encontrar [errores que puedas solucionar](https://github.com/GoogleChrome/lighthouse/labels/good%20first%20issue), o auditorías que puedas crear o mejorar. El gestor de problemas es un buen lugar para debatir sobre métricas de rendimiento, ideas para nuevas auditorías o cualquier otro asunto relacionado con Lighthouse.
