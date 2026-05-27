# Optimización del rendimiento de CSS

Al desarrollar un sitio web, debes tener en cuenta cómo maneja el navegador el CSS de tu sitio. Para mitigar cualquier problema de rendimiento que pueda estar causando el CSS, debes optimizarlo. Por ejemplo, debes optimizar el CSS para mitigar el [bloqueo de renderizado](https://www.google.com/search?q=/en-US/docs/Glossary/Render_blocking) y minimizar el número de reflows (reflujos) requeridos. Este artículo te guiará a través de las técnicas clave de optimización del rendimiento de CSS.

Prerrequisitos:

[Software básico instalado](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software) y conocimientos básicos de [tecnologías web del lado del cliente](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Getting_started/Your_first_website).

Objetivo:

Aprender sobre el impacto del CSS en el rendimiento de un sitio web y cómo optimizar tu CSS para mejorar dicho rendimiento.

## Optimizar o no optimizar

La primera pregunta que debes responder antes de comenzar a optimizar tu CSS es "¿qué necesito optimizar?". Algunos de los consejos y técnicas que se analizan a continuación son buenas prácticas que beneficiarán a casi cualquier proyecto web, mientras que otros solo se necesitan en determinadas situaciones. Intentar aplicar todas estas técnicas en todas partes probablemente sea innecesario y pueda ser una pérdida de tiempo. Debes averiguar qué optimizaciones de rendimiento se necesitan realmente en cada proyecto.

Para hacer esto, necesitas [medir el rendimiento](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Extensions/Performance/Measuring_performance) de tu sitio. Como muestra el enlace anterior, existen varias formas diferentes de medir el rendimiento, algunas de las cuales involucran sofisticadas [APIs de rendimiento](https://www.google.com/search?q=/en-US/docs/Web/API/Performance_API). Sin embargo, la mejor manera de comenzar es aprender a usar herramientas como las herramientas integradas del navegador de [red](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Extensions/Performance/Measuring_performance%23network_monitor_tools) y [rendimiento](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Extensions/Performance/Measuring_performance%23performance_monitor_tools), para ver qué partes de la carga de la página están tardando mucho tiempo y necesitan optimización.

## Optimización del renderizado

Los navegadores siguen una ruta de renderizado específica: el pintado (paint) solo ocurre después del diseño (layout), el cual ocurre después de que se crea el árbol de renderizado (render tree), que a su vez requiere tanto el árbol DOM como el CSSOM.

Mostrar a los usuarios una página sin estilos y luego volver a pintarla (repaint) después de que se hayan analizado los estilos CSS sería una mala experiencia de usuario. Por esta razón, el CSS bloquea el renderizado hasta que el navegador determina que es necesario. El navegador puede pintar la página después de haber descargado el CSS y construido el [Modelo de Objetos de CSS (CSSOM)](https://www.google.com/search?q=/en-US/docs/Glossary/CSSOM).

Para optimizar la construcción del CSSOM y mejorar el rendimiento de la página, puedes realizar una o más de las siguientes acciones según el estado actual de tu CSS:

- **Eliminar estilos innecesarios**: Esto puede parecer obvio, pero es sorprendente cuántos desarrolladores se olvidan de limpiar las reglas CSS no utilizadas que se agregaron a sus hojas de estilo durante el desarrollo y terminaron no usándose. Todos los estilos se analizan, ya sea que se utilicen durante el diseño y el pintado o no, por lo que eliminar los que no se usan puede acelerar el renderizado de la página. Como resume [How Do You Remove Unused CSS From a Site?](https://css-tricks.com/how-do-you-remove-unused-css-from-a-site/) (csstricks.com, 2019), este es un problema difícil de resolver para una base de código grande, y no existe una solución mágica para encontrar y eliminar de manera confiable el CSS no utilizado. Debes hacer el arduo trabajo de mantener tu CSS modular y ser cuidadoso y deliberado con lo que se agrega y se elimina.
- **Dividir el CSS en módulos separados**: Mantener el CSS modular significa que el CSS que no se requiere al cargar la página se puede cargar más tarde, lo que reduce el bloqueo de renderizado inicial y los tiempos de carga. La forma más sencilla de hacer esto es dividiendo tu CSS en archivos separados y cargando solo lo que se necesita:
  El ejemplo anterior proporciona tres conjuntos de estilos: estilos predeterminados que siempre se cargarán, estilos que solo se cargarán cuando el documento se esté imprimiendo y estilos que se cargarán solo en dispositivos con pantallas estrechas. Por defecto, el navegador asume que cada hoja de estilo especificada bloquea el renderizado. Puedes indicarle al navegador cuándo se debe aplicar una hoja de estilo agregando un atributo `media` que contenga una [consulta de medios (media query)](https://www.google.com/search?q=/en-US/docs/Web/CSS/Guides/Media_queries/Using). Cuando el navegador ve una hoja de estilo que solo necesita aplicar en un escenario específico, aun así descarga la hoja de estilo, pero no bloquea el renderizado. Al separar el CSS en múltiples archivos, el archivo principal que bloquea el renderizado, en este caso `styles.css`, es mucho más pequeño, lo que reduce el tiempo durante el cual se bloquea el renderizado.
- **Minificar y comprimir tu CSS**: La minificación implica eliminar todos los espacios en blanco del archivo que solo están allí para la legibilidad humana, una vez que el código se pasa a producción. Puedes reducir considerablemente los tiempos de carga minificando tu CSS. La minificación generalmente se realiza como parte de un proceso de compilación (por ejemplo, la mayoría de los frameworks de JavaScript minificarán el código cuando compiles un proyecto listo para su despliegue). Además de la minificación, asegúrate de que el servidor en el que está alojado tu sitio utilice compresión como gzip en los archivos antes de servirlos.
- **Simplificar selectores**: La gente suele escribir selectores que son más complejos de lo necesario para aplicar los estilos requeridos. Esto no solo aumenta el tamaño de los archivos, sino también el tiempo de análisis de esos selectores. Por ejemplo:
  Hacer que tus selectores sean menos complejos y específicos también es bueno para el mantenimiento. Es fácil entender qué hacen los selectores simples y es fácil invalidar o sobrescribir estilos cuando sea necesario más adelante si los selectores son menos [específicos](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts%23specificity_2).
- **No aplicar estilos a más elementos de los necesarios**: Un error común es aplicar estilos a todos los elementos utilizando el [selector universal](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Selectors/Universal_selectors), o al menos, a más elementos de los necesarios. Este tipo de diseño puede afectar negativamente al rendimiento, especialmente en sitios más grandes.
  Recuerda que muchas propiedades (como [`font-size`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/font-size)) heredan sus valores de sus elementos padres, por lo que no es necesario aplicarlas en todas partes. Y las herramientas potentes como [Flexbox](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox) deben usarse con moderación. Usarlas en todas partes puede causar todo tipo de comportamientos inesperados.
- **Reducir las solicitudes HTTP de imágenes con sprites CSS**: Los [sprites CSS](https://css-tricks.com/css-sprites/) son una técnica que coloca varias imágenes pequeñas (como iconos) que deseas usar en tu sitio en un solo archivo de imagen, y luego usa diferentes valores de [`background-position`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/background-position) para mostrar la parte de la imagen que deseas mostrar en cada lugar diferente. Esto puede reducir drásticamente la cantidad de solicitudes HTTP necesarias para obtener las imágenes.
- **Precargar activos importantes**: Puedes usar [`rel="preload"`](https://www.google.com/search?q=/en-US/docs/Web/HTML/Reference/Attributes/rel/preload) para convertir los elementos [`<link>`](https://www.google.com/search?q=/en-US/docs/Web/HTML/Reference/Elements/link) en precargadores de activos críticos. Esto incluye archivos CSS, fuentes e imágenes:
  Con `preload`, el navegador buscará los recursos referenciados lo antes posible y los pondrá a disposición en la caché del navegador para que estén listos para su uso más pronto cuando se haga referencia a ellos en el código subsiguiente. Es útil precargar recursos de alta prioridad con los que el usuario se encontrará al principio de una página para que la experiencia sea lo más fluida posible. Ten en cuenta que también puedes usar atributos `media` para crear precargadores receptivos (responsive).
  Consulta también [Preload critical assets to improve loading speed](https://web.dev/articles/preload-critical-assets) en web.dev (2020)

## Manejo de animaciones

Las animaciones pueden mejorar el rendimiento percibido, haciendo que las interfaces se sientan más ágiles y que los usuarios sientan que se está progresando mientras esperan que se cargue una página (los indicadores de carga o spinners, por ejemplo). Sin embargo, las animaciones más grandes y un mayor número de animaciones requerirán naturalmente más potencia de procesamiento, lo que puede degradar el rendimiento.

El consejo más sencillo es reducir todas las animaciones innecesarias. También podrías proporcionar a los usuarios un control o preferencia del sitio para desactivar las animaciones si están usando un dispositivo de baja potencia o un dispositivo móvil con batería limitada. También podrías usar JavaScript para controlar si la animación se aplica o no a la página en primer lugar. También existe una consulta de medios llamada [`prefers-reduced-motion`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) que se puede usar para servir o no estilos de animación de manera selectiva según las preferencias del sistema operativo del usuario.

Para las animaciones esenciales del DOM, se recomienda utilizar [animaciones CSS](https://www.google.com/search?q=/en-US/docs/Web/CSS/Guides/Animations/Using) siempre que sea posible, en lugar de animaciones JavaScript (la [API de animaciones web](https://www.google.com/search?q=/en-US/docs/Web/API/Web_Animations_API) proporciona una forma de conectarse directamente a las animaciones CSS mediante JavaScript).

### Elegir propiedades para animar

A continuación, el rendimiento de la animación depende en gran medida de las propiedades que estés animando. Ciertas propiedades, cuando se animan, provocan un [reflow](https://www.google.com/search?q=/en-US/docs/Glossary/Reflow) (y, por lo tanto, también un [repaint](https://www.google.com/search?q=/en-US/docs/Glossary/Repaint)) y deben evitarse. Estas incluyen propiedades que:

- Alteran las dimensiones de un elemento, como [`width`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/width), [`height`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/height), [`border`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/border) y [`padding`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/padding).
- Reposicionan un elemento, como [`margin`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/margin), [`top`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/top), [`bottom`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/bottom), [`left`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/left) y [`right`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/right).
- Cambian el diseño (layout) de un elemento, como [`align-content`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/align-content), [`align-items`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/align-items) y [`flex`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/flex).
- Agregan efectos visuales que cambian la geometría del elemento, como [`box-shadow`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/box-shadow).

Los navegadores modernos son lo suficientemente inteligentes como para repintar solo el área cambiada del documento, en lugar de toda la página. Como resultado, las animaciones más grandes son más costosas.

Si es posible, es mejor animar propiedades que no causen reflow ni repaint. Esto incluye:

- [Transformaciones](https://www.google.com/search?q=/en-US/docs/Web/CSS/Guides/Transforms)
- [`opacity`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/opacity)
- [`filter`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/filter)

### Animación en la GPU

Para mejorar aún más el rendimiento, deberías considerar mover el trabajo de animación fuera del hilo principal (main thread) y llevarlo a la GPU del dispositivo (también conocido como composición). Esto se hace eligiendo tipos específicos de animaciones que el navegador enviará automáticamente a la GPU para que las maneje; estas incluyen:

- Animaciones de transformación 3D como [`transform: translateZ()`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/transform) y [`rotate3d()`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Values/transform-function/rotate3d).
- Elementos con ciertas otras propiedades animadas, como [`position: fixed`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/position).
- Elementos con [`will-change`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/will-change) aplicado (consulta la sección siguiente).
- Ciertos elementos que se renderizan en su propia capa, incluyendo [`<video>`](https://www.google.com/search?q=/en-US/docs/Web/HTML/Reference/Elements/video), [`<canvas>`](https://www.google.com/search?q=/en-US/docs/Web/HTML/Reference/Elements/canvas) e [`<iframe>`](https://www.google.com/search?q=/en-US/docs/Web/HTML/Reference/Elements/iframe).

La animación en la GPU puede resultar en un mejor rendimiento, especialmente en dispositivos móviles. Sin embargo, mover animaciones a la GPU no siempre es tan sencillo. Lee [CSS GPU Animation: Doing It Right](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/) (smashingmagazine.com, 2016) para un análisis muy útil y detallado.

## Optimización de cambios de elementos con `will-change`

Los navegadores pueden configurar optimizaciones antes de que un elemento cambie realmente. Este tipo de optimizaciones pueden aumentar la capacidad de respuesta de una página al realizar un trabajo potencialmente costoso antes de que sea necesario. La propiedad CSS [`will-change`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/will-change) sugiere a los navegadores cómo se espera que cambie un elemento.

**Nota:** `will-change` está destinada a ser utilizada como último recurso para intentar lidiar con problemas de rendimiento existentes. No debe usarse para anticiparse a problemas de rendimiento.

## Optimización para el bloqueo de renderizado

CSS puede limitar el alcance (scope) de los estilos a condiciones particulares con consultas de medios (media queries). Las consultas de medios son importantes para un diseño web receptivo (responsive) y nos ayudan a optimizar una ruta de renderizado crítica. El navegador bloquea el renderizado hasta que analiza todos estos estilos, pero no bloqueará el renderizado en estilos que sabe que no usará, como las hojas de estilo de impresión. Al dividir el CSS en múltiples archivos según las consultas de medios, puedes evitar el bloqueo de renderizado durante la descarga de CSS no utilizado. Para crear un enlace CSS que no bloquee el renderizado, mueve los estilos que no se usan inmediatamente, como los estilos de impresión, a un archivo separado, agrega un [`<link>`](https://www.google.com/search?q=/en-US/docs/Web/HTML/Reference/Elements/link) al marcado HTML y agrega una consulta de medios, especificando en este caso que es una hoja de estilo de impresión.

Por defecto, el navegador asume que cada hoja de estilo especificada bloquea el renderizado. Dile al navegador cuándo se debe aplicar la hoja de estilo agregando un atributo `media` con la [consulta de medios](https://www.google.com/search?q=/en-US/docs/Web/CSS/Guides/Media_queries/Using). Cuando el navegador ve una hoja de estilo que sabe que solo necesita aplicar para un escenario específico, aun así descarga la hoja de estilo, pero no bloquea el renderizado. Al separar el CSS en múltiples archivos, el archivo principal que bloquea el renderizado, en este caso `styles.css`, es mucho más pequeño, lo que reduce el tiempo durante el cual se bloquea el renderizado.

## Mejorar el rendimiento de las fuentes

Esta sección contiene algunos consejos útiles para mejorar el rendimiento de las fuentes web.

En general, piensa detenidamente en las fuentes que utilizas en tu sitio. Algunos archivos de fuentes pueden ser muy grandes (varios megabytes). Si bien puede ser tentador usar muchas fuentes para generar impacto visual, esto puede ralentizar significativamente la carga de la página y hacer que tu sitio parezca desordenado. Probablemente solo necesites unas dos o tres fuentes, y puedes arreglártelas con menos si eliges usar [fuentes seguras para la web (web safe fonts)](https://www.google.com/search?q=/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals%23web_safe_fonts).

### Carga de fuentes

Ten en cuenta que una fuente solo se carga cuando se aplica realmente a un elemento mediante la propiedad [`font-family`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/font-family), no cuando se hace referencia a ella por primera vez mediante la regla arroba [`@font-face`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/At-rules/%40font-face):

Por lo tanto, puede ser beneficioso usar `rel="preload"` para cargar fuentes importantes de manera anticipada, de modo que estén disponibles más rápidamente cuando realmente se necesiten:

Es más probable que esto sea beneficioso si la declaración de tu `font-family` está oculta dentro de una hoja de estilo externa grande y no se llegará a ella hasta mucho más tarde en el proceso de análisis. Sin embargo, es un compromiso (trade-off): los archivos de fuentes son bastante grandes y, si precargas demasiados, puedes retrasar otros recursos.

También puedes considerar:

- Usar [`rel="preconnect"`](https://www.google.com/search?q=/en-US/docs/Web/HTML/Reference/Attributes/rel/preconnect) para realizar una conexión temprana con el proveedor de fuentes. Consulta [Preconnect to critical third-party origins](https://web.dev/articles/font-best-practices#preconnect_to_critical_third-party_origins) para más detalles.
- Usar la [API de carga de fuentes CSS](https://www.google.com/search?q=/en-US/docs/Web/API/CSS_Font_Loading_API) para personalizar el comportamiento de carga de fuentes a través de JavaScript.

### Cargar solo los glifos que necesitas

Al elegir una fuente para el texto principal (body copy), es más difícil estar seguro de los glifos que se utilizarán en ella, especialmente si se trata de contenido generado por el usuario y/o contenido en varios idiomas.

Sin embargo, si sabes que vas a utilizar un conjunto específico de glifos (for example, glifos solo para títulos o caracteres de puntuación específicos), podrías limitar la cantidad de glifos que el navegador tiene que descargar. Esto se puede hacer creando un archivo de fuente que solo contenga el subconjunto requerido. Un proceso llamado [subfragmentación (subsetting)](https://fonts.google.com/knowledge/glossary/subsetting). El descriptor [`unicode-range`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/At-rules/%40font-face/unicode-range) de `@font-face` se puede usar luego para especificar cuándo se utiliza tu fuente subfragmentada. Si la página no utiliza ningún carácter de este rango, la fuente no se descarga.

### Definir el comportamiento de visualización de fuentes con el descriptor `font-display`

Aplicado a la regla arroba `@font-face`, el descriptor [`font-display`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/At-rules/%40font-face/font-display) define cómo el navegador carga y muestra los archivos de fuentes, lo que permite que el texto aparezca con una fuente alternativa (fallback) mientras se carga una fuente, o si esta no se carga. Esto mejora el rendimiento al hacer que el texto sea visible en lugar de tener una pantalla en blanco, con la desventaja de que se produce un parpadeo de texto sin estilo (FOUT - flash of unstyled text).

## Optimización de la recalculación de estilos con contención CSS (CSS containment)

Al usar las propiedades definidas en el módulo de [contención CSS](https://www.google.com/search?q=/en-US/docs/Web/CSS/Guides/Containment), puedes indicarle al navegador que aísle diferentes partes de una página y optimice su renderizado de forma independiente entre sí. Esto permite mejorar el rendimiento al renderizar secciones individuales. Como ejemplo, puedes especificarle al navegador que no renderice ciertos contenedores hasta que sean visibles en el puerto de visión (viewport).

La propiedad [`contain`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/contain) permite a un autor especificar exactamente qué [tipos de contención](https://www.google.com/search?q=/en-US/docs/Web/CSS/Guides/Containment/Using) desea aplicar a los contenedores individuales de la página. Esto permite al navegador volver a calcular el diseño, el estilo, el pintado, el tamaño o cualquier combinación de ellos para una parte limitada del DOM.

La propiedad [`content-visibility`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/content-visibility) es un atajo útil que permite a los autores aplicar un conjunto fuerte de contenciones en un grupo de contenedores y especificar que el navegador no debe realizar el diseño ni renderizar esos contenedores hasta que sea necesario.

También está disponible una segunda propiedad, [`contain-intrinsic-size`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-size), que te permite proporcionar un tamaño de marcador de posición (placeholder) para los contenedores mientras están bajo los efectos de la contención. Esto significa que los contenedores ocuparán espacio incluso si su contenido aún no se ha renderizado, lo que permite que la contención haga su magia de rendimiento sin el riesgo de saltos en la barra de desplazamiento y tirones (jank) a medida que los elementos se renderizan y entran en vista. Esto mejora la calidad de la experiencia del usuario a medida que se carga el contenido.

## Optimización de los selectores `:has()`

La pseudoclase [`:has()`](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Selectors/:has) permite capacidades de selección potentes, pero requiere un uso cuidadoso para evitar cuellos de botella en el rendimiento. Para obtener una guía detallada sobre cómo escribir selectores `:has()` eficientes, consulta las [Consideraciones de rendimiento en la documentación de referencia de `:has()](https://www.google.com/search?q=/en-US/docs/Web/CSS/Reference/Selectors/:has%23performance_considerations)`.
