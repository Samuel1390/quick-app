# Optimización del rendimiento en HTML

- **Prerrequisitos:** Software básico instalado y conocimiento básico de tecnologías web del lado del cliente.
- **Objetivo:** Aprender sobre el impacto de HTML en el rendimiento de un sitio web y cómo optimizar el HTML para mejorar dicho rendimiento.

---

## ¿Optimizar o no optimizar?

La primera pregunta que debes responder antes de comenzar a optimizar tu HTML es: "¿qué necesito optimizar?". Algunos de los consejos y técnicas que se discuten a continuación son buenas prácticas que beneficiarán a casi cualquier proyecto web, mientras que otros solo son necesarios en ciertas situaciones. Intentar aplicar todas estas técnicas en todas partes es probablemente innecesario y puede ser una pérdida de tiempo. Debes averiguar qué optimizaciones de rendimiento son realmente requeridas en cada proyecto.

Para hacer esto, necesitas medir el rendimiento de tu sitio. Existen varias formas diferentes de medir el rendimiento, algunas de las cuales involucran APIs de rendimiento sofisticadas. La mejor manera de comenzar, sin embargo, es aprender a usar herramientas como las funciones de red y rendimiento integradas en el navegador, para examinar las partes de la página que tardan mucho en cargarse y necesitan optimización.

---

## Problemas clave de rendimiento en HTML

HTML es simple en términos de rendimiento: es principalmente texto, el cual es de tamaño pequeño y, por lo tanto, generalmente rápido de descargar y renderizar. Los problemas clave que pueden afectar el rendimiento de una página web incluyen:

- **Tamaño de los archivos de imagen y video:** Es importante considerar cómo manejar el contenido de los elementos reemplazados como `<img>` y `<video>`. Los archivos de imagen y video son grandes y pueden aumentar significativamente el peso de la página. Por lo tanto, es importante minimizar la cantidad de bytes que se descargan en el dispositivo de un usuario (por ejemplo, servir imágenes más pequeñas para dispositivos móviles). También debes considerar mejorar el rendimiento percibido cargando imágenes y videos en una página solo cuando sean necesarios.
- **Entrega de contenido incrustado:** Esto suele ser el contenido incrustado en elementos `<iframe>`. Cargar contenido dentro de un `<iframe>` puede afectar significativamente el rendimiento, por lo que debe considerarse cuidadosamente.
- **Orden de carga de recursos:** Para maximizar el rendimiento percibido y real, el HTML debe cargarse primero, en el orden en que aparece en la página. Luego, puedes usar varias funciones para influir en el orden de carga de los recursos para obtener un mejor rendimiento. Por ejemplo, puedes precargar CSS y fuentes críticas temprano, pero posponer el JavaScript no crítico para más tarde.

> **Nota:** Existe un argumento a favor de simplificar la estructura de tu HTML y minificar tu código fuente para que la renderización y las descargas sean más rápidas. Sin embargo, el tamaño del archivo HTML es insignificante en comparación con las imágenes y los videos, y la renderización del navegador es muy rápida hoy en día. Si tu fuente HTML es tan grande y compleja que está creando problemas de rendimiento en la renderización y descarga, probablemente tengas problemas más grandes y deberías intentar simplificarla y dividir el contenido.

---

## Manejo responsivo de elementos reemplazados

El diseño responsivo ha revolucionado la forma en que se maneja el diseño del contenido web en diferentes dispositivos. Una ventaja clave que permite es el cambio dinámico de diseños optimizados para diferentes tamaños de pantalla; por ejemplo, un diseño de pantalla ancha frente a un diseño de pantalla estrecha (móvil). También puede manejar el cambio dinámico de contenido en función de otros atributos del dispositivo, como la resolución o la preferencia por un esquema de color claro u oscuro.

La técnica denominada _“mobile first”_ (el móvil primero) puede garantizar que el diseño predeterminado sea para dispositivos de pantalla pequeña, de modo que los móviles puedan simplemente descargar imágenes adecuadas para sus pantallas y no tengan que sufrir el impacto en el rendimiento de descargar imágenes de escritorio más grandes. Sin embargo, dado que esto se controla mediante consultas de medios (_media queries_) en tu CSS, solo puede afectar positivamente el rendimiento de las imágenes cargadas mediante CSS.

En las secciones siguientes, se resume cómo implementar elementos reemplazados responsivos. Puedes encontrar muchos más detalles sobre estas implementaciones en las guías de _HTML video and audio_ y _Responsive images_.

### Proporcionar diferentes resoluciones de imagen a través de `srcset`

Para proporcionar versiones con diferentes resoluciones de la misma imagen según la resolución del dispositivo y el tamaño de la ventana gráfica (_viewport_), puedes usar los atributos `srcset` y `sizes`.

Este ejemplo proporciona imágenes de diferentes tamaños para diferentes anchos de pantalla:

```html
<img
  srcset="480w.jpg 480w, 800w.jpg 800w"
  sizes="(width <= 600px) 480px, 800px"
  src="800w.jpg"
  alt="Family portrait"
/>
```

`srcset` proporciona el tamaño intrínseco de las imágenes de origen junto con sus nombres de archivo, y `sizes` proporciona consultas de medios junto con los anchos de los espacios (_slots_) de imagen que deben completarse en cada caso. El navegador decide entonces qué imágenes tiene sentido cargar para cada espacio. Como ejemplo, si el ancho de la pantalla es de 600px o menos, entonces `width <= 600px` es verdadero y, por lo tanto, se define que el espacio a llenar es de `480px`. En este caso, el navegador probablemente elegirá cargar el archivo `480w.jpg` (imagen de 480px de ancho). Esto ayuda con el rendimiento porque los navegadores no cargan imágenes más grandes de lo necesario.

Este ejemplo proporciona imágenes de diferentes resoluciones para diferentes resoluciones de pantalla:

```html
<img
  srcset="320w.jpg, 480w.jpg 1.5x, 640w.jpg 2x"
  src="640w.jpg"
  alt="Family portrait"
/>
```

`1.5x`, `2x`, etc., son indicadores de resolución relativa. Si la imagen está estilizada para tener 320px de ancho (por ejemplo, con `width: 320px` en CSS), el navegador cargará `320w.jpg` si el dispositivo es de baja resolución (un píxel de dispositivo por píxel de CSS), o `640w.jpg` si el dispositivo es de alta resolución (dos píxeles de dispositivo por píxel de CSS o más).

En ambos casos, el atributo `src` proporciona una imagen predeterminada para cargar si el navegador no admite `srcset`.

### Proporcionar diferentes fuentes para imágenes y videos

El elemento `<picture>` se basa en el elemento tradicional `<img>`, lo que te permite proporcionar múltiples fuentes diferentes para diferentes situaciones. Por ejemplo, si el diseño es ancho, probablemente querrás una imagen ancha, y si es estrecho, querrás una imagen más estrecha que funcione en ese contexto.

Por supuesto, esto también funciona para ofrecer una descarga de información más ligera en dispositivos móviles, lo que ayuda al rendimiento.

Un ejemplo es el siguiente:

```html
<picture>
  <source media="(width < 800px)" srcset="narrow-banner-480w.jpg" />
  <source media="(width >= 800px)" srcset="wide-banner-800w.jpg" />
  <img src="large-banner-800w.jpg" alt="Dense forest scene" />
</picture>
```

Los elementos `<source>` contienen consultas de medios dentro de los atributos `media`. Si una consulta de medios devuelve verdadero, se carga la imagen a la que se hace referencia en el atributo `srcset` de su elemento `<source>`. En el ejemplo anterior, si el ancho de la ventana gráfica es menor que 800px, se carga la imagen `narrow-banner-480w.jpg`. También ten en cuenta cómo el elemento `<picture>` incluye un elemento `<img>`, el cual proporciona una imagen predeterminada para cargar en el caso de navegadores que no admitan `<picture>`.

Ten en cuenta el uso del atributo `srcset` en este ejemplo. Como se mostró en la sección anterior, puedes proporcionar diferentes resoluciones para cada fuente de imagen.

Los elementos `<video>` funcionan de manera similar en cuanto a proporcionar diferentes fuentes:

```html
<video controls>
  <source src="video/smaller.mp4" type="video/mp4" />
  <source src="video/smaller.webm" type="video/webm" />
  <source src="video/larger.mp4" type="video/mp4" media="(width >= 800px)" />
  <source src="video/larger.webm" type="video/webm" media="(width >= 800px)" />
  <a href="video/larger.mp4">download video</a>
</video>
```

Existen, sin embargo, algunas diferencias clave entre proporcionar fuentes para imágenes y videos:

- En el ejemplo anterior, estamos usando `src` en lugar de `srcset`; no puedes especificar diferentes resoluciones para videos a través de `srcset`. En su lugar, especificas diferentes resoluciones dentro de los diferentes elementos `<source>`.
- Ten en cuenta que también estamos especificando diferentes formatos de video dentro de diferentes elementos `<source>`, identificándose cada formato a través de su tipo MIME dentro del atributo `type`. Los navegadores cargarán el primero que encuentren que sea compatible y donde la prueba de la consulta de medios devuelva verdadero.

### Carga diferida de imágenes (_Lazy loading_)

Una técnica muy útil para mejorar el rendimiento es la carga diferida (_lazy loading_). Esto se refiere a la práctica de no cargar todas las imágenes inmediatamente cuando se renderiza el HTML, sino cargarlas únicamente cuando son realmente visibles para el usuario en la ventana gráfica (o están a punto de serlo). Esto significa que el contenido inmediatamente visible/utilizable está listo para usarse más rápidamente, mientras que el contenido subsiguiente solo renderiza sus imágenes al desplazarse (_scroll_), y el navegador no desperdiciará ancho de banda cargando imágenes que el usuario nunca llegará a ver.

Históricamente, la carga diferida se ha manejado mediante JavaScript, pero los navegadores ahora tienen disponible un atributo `loading` que puede indicarle al navegador que realice la carga diferida de imágenes automáticamente:

```html
<img src="800w.jpg" alt="Family portrait" loading="lazy" />
```

Consulta _Browser-level image lazy loading for the web_ en web.dev para obtener información detallada.

### Carga diferida de video y audio

También puedes diferir la carga de contenido de video hasta que se reproduzca el video, utilizando el atributo `preload`. Por ejemplo:

```html
<video controls preload="none" poster="poster.jpg">
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
</video>
```

Asignar a `preload` un valor de `none` le indica al navegador que no precargue ningún dato de video antes de que el usuario decida reproducirlo, lo cual es obviamente bueno para el rendimiento. En su lugar, simplemente mostrará la imagen indicada por el atributo `poster`. Los diferentes navegadores tienen comportamientos predeterminados de carga de video distintos, por lo que es recomendable ser explícito.

Asignar a `preload` un valor de `metadata` le pide al navegador que descargue los datos mínimos necesarios para mostrar el video antes de reproducirlo (por ejemplo: la duración, las dimensiones y tal vez el fotograma inicial).

El atributo `loading` puede mejorar aún más la carga diferida para videos al posponer la carga de cualquier dato de video, independientemente del valor de `preload`, así como posponer la carga de la imagen del póster, hasta que el video esté cerca de la ventana gráfica (momento en el cual el valor de `preload` se utiliza de la manera habitual).

```html
<video controls preload="none" poster="poster.jpg" loading="lazy">
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
</video>
```

Esto también se puede usar con contenido de audio:

```html
<audio
  controls
  src="/shared-assets/audio/t-rex-roar.mp3"
  loading="lazy"
></audio>
```

Consulta _Fast playback with audio and video preload_ en web.dev para obtener información detallada.

---

## Manejo de contenido incrustado

Es muy común que se incruste contenido en páginas web proveniente de otras fuentes. Esto se hace con mayor frecuencia al mostrar publicidad en un sitio para generar ingresos: los anuncios suelen ser generados por algún tipo de empresa externa e incrustados en tu página. Otros usos pueden incluir:

- Mostrar contenido compartido que un usuario pueda necesitar en varias páginas, como un carrito de compras o información de perfil.
- Mostrar contenido de terceros relacionado con el sitio principal de la organización, como un feed de publicaciones de redes sociales.

La incrustación de contenido se realiza más comúnmente utilizando elementos `<iframe>`, aunque existen otros elementos de incrustación menos utilizados, como `<object>` y `<embed>`. Nos concentraremos en los `<iframe>` en esta sección.

El consejo más importante y clave para usar `<iframe>` es: **"No uses `<iframe>` incrustados a menos que sea absolutamente necesario"**. Si estás creando una página con múltiples paneles de información diferentes, puede sonar organizativamente sensato dividirlos en páginas separadas y cargarlos en diferentes `<iframe>`. Sin embargo, esto tiene una serie de problemas asociados en términos de rendimiento y otros aspectos:

1. Cargar el contenido en un `<iframe>` es mucho más costoso que cargar el contenido como parte de la misma página directa; no solo requiere solicitudes HTTP adicionales para cargar el contenido, sino que el navegador también necesita crear una instancia de página separada para cada uno. Cada uno es efectivamente una instancia de página web independiente incrustada en la página de nivel superior.
2. Continuando con el punto anterior, también deberás manejar cualquier estilo CSS o manipulación de JavaScript por separado para cada `<iframe>` diferente (a menos que las páginas incrustadas sean del mismo origen), lo que se vuelve mucho más complejo. No puedes apuntar a contenido incrustado con CSS y JavaScript aplicados a la página de nivel superior, ni viceversa. Esta es una medida de seguridad sensata que es fundamental para la web. ¡Imagina todos los problemas con los que te podrías topar si el contenido incrustado de terceros pudiera ejecutar scripts arbitrariamente contra cualquier página en la que estuviera incrustado!
3. Cada `<iframe>` también necesitaría cargar cualquier dato compartido y archivos multimedia por separado; no puedes compartir activos almacenados en caché entre diferentes páginas incrustadas (nuevamente, a menos que las páginas incrustadas sean del mismo origen). Esto puede llevar a que una página use mucho más ancho de banda de lo esperado.

Se recomienda colocar el contenido en una sola página. Si deseas incorporar contenido nuevo dinámicamente a medida que cambia la página, sigue siendo mejor para el rendimiento cargarlo en la misma página en lugar de colocarlo en un `<iframe>`. Podrías obtener los nuevos datos utilizando el método `fetch()`, por ejemplo, y luego inyectarlos en la página mediante scripts del DOM. Consulta _Making network requests with JavaScript_ y _DOM scripting introduction_ para obtener más información.

> **Nota:** Si controlas el contenido y es relativamente simple, podrías considerar el uso de contenido codificado en base-64 en el atributo `src` para rellenar el `<iframe>`, o incluso insertar HTML sin procesar en el atributo `srcdoc` (Consulta _Iframe Performance Part 2: The Good News_ para obtener más información).

Si debes usar `<iframe>`, utilízalos con moderación.

### Carga diferida de iframes (_Lazy loading iframes_)

De la misma manera que con los elementos `<img>`, también puedes usar el atributo `loading` para indicarle al navegador que realice la carga diferida del contenido del `<iframe>` que inicialmente se encuentra fuera de la pantalla, mejorando así el rendimiento:

```html
<iframe src="https://example.com" loading="lazy" width="600" height="400">
</iframe>
```

Consulta _It's time to lazy-load offscreen iframes!_ para obtener más información.

---

## Manejo del orden de carga de recursos

El orden de carga de recursos es importante para maximizar el rendimiento percibido y real. Cuando se carga una página web:

1. Generalmente, el HTML se analiza (_parsea_) primero, en el orden en que aparece en la página.
2. Cualquier CSS encontrado se analiza para comprender los estilos que deben aplicarse a la página. Durante este tiempo, los activos vinculados, como imágenes y fuentes web, comienzan a recuperarse.
3. Cualquier JavaScript encontrado se analiza, evalúa y ejecuta en la página. Por defecto, esto bloquea el análisis del HTML que aparece después de los elementos `<script>` donde se encuentra el JavaScript.
4. Un poco más tarde, el navegador calcula cómo se debe diseñar cada HTML, dado el CSS aplicado. El resultado estilizado se pinta entonces en la pantalla.

> **Nota:** Este es un relato muy simplificado de lo que sucede, pero te da una idea general.

Varios recursos de HTML te permiten modificar cómo ocurre la carga de recursos para mejorar el rendimiento. Exploraremos algunos de estos ahora.

### Manejo de la carga de JavaScript

El análisis y la ejecución de JavaScript bloquean el análisis del contenido subsiguiente del DOM. Esto aumenta el tiempo hasta que ese contenido se renderiza y es utilizable por los usuarios de la página. Un script pequeño no marcará mucha diferencia, pero considera que las aplicaciones web modernas tienden a ser muy pesadas en JavaScript.

Otro efecto secundario del comportamiento de análisis de JavaScript predeterminado es que, si el script que se está procesando depende del contenido del DOM que aparece más adelante en la página, obtendrás errores.

Por ejemplo, imagina un párrafo simple en una página:

```html
<p>My paragraph</p>
```

Ahora imagina un archivo JavaScript que contiene el siguiente código:

```javascript
const pElem = document.querySelector("p")
pElem.addEventListener("click", () => {
  alert("You clicked the paragraph")
})
```

Podemos aplicar este script a la página haciendo referencia a él en un elemento `<script>` como este:

```html
<script src="index.js"></script>
```

Si colocamos este elemento `<script>` antes del elemento `<p>` en el orden del código fuente (por ejemplo, en el elemento `<head>`), la página lanzará un error (Chrome, por ejemplo, informa `"Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')"` en la consola). Esto ocurre porque el script depende del elemento `<p>` para funcionar, pero en el punto en que se analiza el script, el elemento `<p>` no existe en la página ya que aún no se ha renderizado.

Puedes solucionar el problema anterior colocando el elemento `<script>` después del elemento `<p>` (por ejemplo, al final del cuerpo del documento) o ejecutando el código dentro de un manejador de eventos adecuado (por ejemplo, ejecutarlo en el evento `DOMContentLoaded`, que se dispara cuando el DOM se ha analizado por completo).

Sin embargo, esto no resuelve el problema de esperar a que se cargue el script. Se puede lograr un mejor rendimiento agregando el atributo `async` al elemento `<script>`:

```html
<script async src="index.js"></script>
```

Esto hace que el script se recupere en paralelo con el análisis del DOM, por lo que está listo al mismo tiempo y no bloqueará la renderización, mejorando así el rendimiento.

> **Nota:** Existe otro atributo, `defer`, que hace que el script se ejecute después de que se haya analizado el documento, pero antes de que se dispare `DOMContentLoaded`. Esto tiene un efecto similar a `async`.

Otro consejo para el manejo de la carga de JavaScript es dividir tu script en módulos de código y cargar cada parte cuando sea necesario, en lugar de colocar todo tu código en un solo script gigante y cargarlo todo al principio. Esto se hace usando módulos de JavaScript. Lee el artículo enlazado para obtener una guía detallada.

### Precarga de contenido con `rel="preload"`

La recuperación de otros recursos (como imágenes, videos o archivos de fuentes) vinculados desde tu HTML, CSS y JavaScript también puede causar problemas de rendimiento, bloqueando la ejecución de tu código y ralentizando la experiencia. Una forma de mitigar tales problemas es usar `rel="preload"` para convertir los elementos `<link>` en precargadores. Por ejemplo:

```html
<link rel="preload" href="sintel-short.mp4" as="video" type="video/mp4" />
```

Al encontrarse con un enlace `rel="preload"`, el navegador buscará el recurso referenciado lo antes posible y lo pondrá a disposición en la caché del navegador para que esté listo para su uso más rápidamente cuando se haga referencia a él en el código subsiguiente. Es útil precargar recursos de alta prioridad con los que el usuario se topará al principio de una página para que la experiencia sea lo más fluida posible.

Consulta los siguientes artículos para obtener información detallada sobre el uso de `rel="preload"`:

- `rel="preload"`
- _Preload critical assets to improve loading speed_ en web.dev (2020)

> **Nota:** Puedes usar `rel="preload"` para precargar archivos CSS y JavaScript también.

> **Nota:** Existen otros valores de `rel` que también están diseñados para acelerar varios aspectos de la carga de páginas: `dns-prefetch`, `preconnect`, `modulepreload` y `prefetch`. Accede a la página enlazada para descubrir qué hacen exactamente.

---

## Ver también

- _Making network requests with JavaScript_
- _DOM scripting introduction_
