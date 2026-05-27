# Multimedia: Imágenes

Los elementos multimedia, específicamente las imágenes y el video, representan más del 70% de los bytes descargados en un sitio web promedio. En términos de rendimiento de descarga, eliminar archivos multimedia y reducir su tamaño es la fruta más fácil de alcanzar. Este artículo analiza la optimización de imágenes y videos para mejorar el rendimiento web.

- **Prerrequisitos:** Software básico instalado y conocimientos básicos de tecnologías web del lado del cliente.
- **Objetivo:** Aprender sobre los distintos formatos de imagen, su impacto en el rendimiento y cómo reducir su repercusión en el tiempo total de carga de la página.

> **Nota:** Esta es una introducción de alto nivel para optimizar la entrega de contenido multimedia en la web que abarca principios y técnicas generales. Para una guía más detallada, consulta [web.dev/learn/images](https://web.dev/learn/images).

## ¿Por qué optimizar tu contenido multimedia?

En un sitio web promedio, el 51% de su ancho de banda proviene de las imágenes, seguido por el video con un 25%, por lo que se puede afirmar con seguridad que es importante abordar y optimizar tu contenido multimedia.

Es necesario tener en consideración el uso de datos. Muchas personas tienen planes de datos limitados o incluso sistemas de prepago donde literalmente pagan por cada megabyte. Esto tampoco es un problema exclusivo de los mercados emergentes; por ejemplo, en 2018, el 24% del Reino Unido todavía utilizaba planes de prepago según datos oficiales.

También debes tener en cuenta la memoria, ya que muchos dispositivos móviles disponen de una memoria RAM limitada. Es crucial recordar que cuando se descargan imágenes, estas deben almacenarse en la memoria del dispositivo.

## Optimización en la entrega de imágenes

A pesar de ser el mayor consumidor de ancho de banda, el impacto de la descarga de imágenes en el rendimiento percibido es mucho menor de lo que muchos esperan (principalmente porque el contenido de texto de la página se descarga de inmediato y los usuarios pueden ver cómo se renderizan las imágenes a medida que llegan). Sin embargo, para ofrecer una buena experiencia de usuario, sigue siendo importante que el visitante pueda verlas lo antes posible.

### Estrategia de carga

Una de las mayores mejoras para la mayoría de los sitios web es aplicar carga diferida (_lazy-loading_) a las imágenes que están debajo del primer pliegue de la pantalla (_below the fold_), en lugar de descargarlas todas durante la carga inicial de la página, independientemente de si el visitante hace scroll para verlas o no. Los navegadores proporcionan esto de forma nativa mediante el atributo `loading="lazy"` en los elementos `<img>`, `<iframe>`, `<video>` y `<audio>`. También existen muchas librerías de JavaScript del lado del cliente que pueden encargarse de ello.

Más allá de cargar solo un subconjunto de imágenes, debes examinar el formato de las propias imágenes:

- ¿Estás cargando los formatos de archivo más óptimos?
- ¿Has comprimido correctamente las imágenes?
- ¿Estás cargando los tamaños correctos?

### El formato más óptimo

El formato de archivo óptimo suele depender de las características de la imagen.

El formato **SVG** es más apropiado para imágenes que tienen pocos colores y que no son fotorrealistas. Esto requiere que el recurso original esté disponible en un formato de gráficos vectoriales. Si dicha imagen solo existiera como mapa de bits, entonces el formato **PNG** sería la alternativa a elegir. Ejemplos de estos tipos de diseños son logotipos, ilustraciones, gráficos o iconos. Ambos formatos admiten transparencias.

Los archivos PNG se pueden guardar con tres combinaciones de salida diferentes:

1. **Color de 24 bits + transparencia de 8 bits:** Ofrece una precisión de color total y una transparencia suave a expensas del tamaño del archivo. Probablemente querrás evitar esta combinación en favor de WebP.
2. **Color de 8 bits + transparencia de 8 bits:** No ofrece más de 255 colores pero mantiene transparencias suaves. El tamaño no es demasiado grande. Estos son los PNG que probablemente querrás utilizar.
3. **Color de 8 bits + transparencia de 1 bit:** No ofrece más de 255 colores y solo permite o total transparencia o ninguna por píxel, lo que hace que los bordes transparentes parezcan duros y pixelados. El tamaño es pequeño, pero el costo es la fidelidad visual.

Una buena herramienta en línea para optimizar SVGs es _SVGOMG_. Para los archivos PNG existen opciones como _ImageOptim_ en línea o _Squoosh_.

Con los diseños fotográficos que no cuentan con transparencias, existe una gama mucho más amplia de formatos para elegir. Si quieres ir a lo seguro, la opción ideal son los **Progressive JPEGs** bien comprimidos. Los JPEGs progresivos, a diferencia de los JPEGs normales, se renderizan progresivamente; es decir, el usuario ve una versión de baja resolución que va ganando claridad a medida que se descarga la imagen, en lugar de que la imagen se cargue a resolución completa de arriba a abajo o que se renderice únicamente cuando se ha descargado por completo. Un buen compresor para esto es _MozJPEG_, disponible en la herramienta de optimización en línea _Squoosh_. Un ajuste de calidad del 75% debería ofrecer resultados bastante decentes.

Otros formatos mejoran las capacidades de compresión de JPEG, pero no están disponibles en todos los navegadores:

- **WebP:** Excelente opción tanto para imágenes estáticas como animadas. WebP ofrece una compresión mucho mejor que PNG o JPEG, con soporte para mayores profundidades de color, fotogramas animados, transparencia, etc. (pero no cuenta con visualización progresiva). Está soportado por los principales navegadores modernos.
- **AVIF:** Una gran alternativa para imágenes estáticas y animadas debido a su alto rendimiento y a ser un formato libre de regalías (es incluso más eficiente que WebP, aunque no está tan ampliamente extendido en versiones antiguas de navegadores). Herramientas como _Squoosh_ facilitan la conversión de formatos anteriores a AVIF.
- **JPEG2000:** Diseñado originalmente para ser el sucesor de JPEG, pero su soporte quedó muy limitado históricamente (principalmente en entornos Safari) y tampoco admite la visualización progresiva.

Teniendo en cuenta la madurez del soporte y los costos de decodificación, el competidor más sólido para sustituir a JPEG es WebP. Por ello, podrías ofrecer tus imágenes también en esta variante. Esto se puede lograr mediante el elemento `<picture>` con la ayuda de una etiqueta `<source>` equipada con el atributo `type`.

Si todo esto te parece un poco complicado o implica demasiado trabajo para tu equipo, existen servicios en línea que puedes utilizar como CDNs de imágenes independientes, los cuales automatizarán la entrega del formato de imagen correcto sobre la marcha, según el tipo de dispositivo o navegador que solicite el recurso. Las opciones más populares incluyen _Cloudinary_, _Image Engine_, _ImageKit_ e _imgix_.

Por último, si deseas incluir imágenes animadas en tu página, debes saber que navegadores como Safari permiten el uso de archivos de video dentro de los elementos `<img>` y `<picture>`. Esto te permite añadir un archivo en formato WebP animado para el resto de navegadores modernos y delegar en un fallback estructurado:

```html
<picture>
  <source type="video/mp4" src="giphy.mp4" />
  <source type="image/webp" src="giphy.webp" />
  <img src="giphy.gif" alt="Una animación en formato GIF" />
</picture>
```

### Servir el tamaño óptimo

En la entrega de imágenes, el enfoque de "un solo tamaño para todos" no ofrecerá los mejores resultados, lo que significa que para pantallas más pequeñas querrás servir imágenes con una resolución menor y viceversa para pantallas más grandes. Además, querrás servir imágenes de mayor resolución a aquellos dispositivos que cuenten con una pantalla de alta densidad de píxeles (por ejemplo, pantallas "Retina").

Por lo tanto, además de crear múltiples variantes intermedias de la imagen, necesitas una forma de servir el archivo correcto al navegador adecuado. Ahí es donde necesitas potenciar tus elementos `<picture>` y `<source>` con los atributos `media` y/o `sizes`.

Dos efectos interesantes a tener en cuenta respecto a las pantallas de alta densidad (DPI) son:

1. Con una pantalla de alta densidad, los seres humanos detectan los artefactos de compresión mucho más tarde, lo que significa que para las imágenes destinadas a estas pantallas puedes aumentar la compresión más de lo habitual.
2. Muy pocas personas pueden distinguir un aumento de resolución más allá de 2× DPI, lo que significa que no necesitas servir imágenes con una resolución superior a 2×.

### Controlar la prioridad (y el orden) de descarga de las imágenes

Hacer que las imágenes más importantes se muestren a los visitantes antes que las menos importantes puede mejorar significativamente el rendimiento percibido.

Lo primero que debes comprobar es que las imágenes de contenido utilicen los elementos `<img>` o `<picture>`, y que las imágenes de fondo se definan en CSS con `background-image`. Las imágenes a las que se hace referencia en los elementos HTML nativos tienen asignada una prioridad de carga mayor que las imágenes de fondo de CSS.

En segundo lugar, con la adopción de los _Priority Hints_ (Pistas de Prioridad), puedes controlar aún más la prioridad añadiendo el atributo `fetchPriority` a tus etiquetas de imagen. Un caso de uso típico para las pistas de prioridad son los carruseles (_sliders_), donde la primera imagen requiere una prioridad alta (`high`) en comparación con las imágenes posteriores.

### Estrategia de renderizado: prevención de saltos (_jank_) al cargar imágenes

Dado que las imágenes se cargan de forma asíncrona y continúan descargándose después del primer pintado en pantalla, si sus dimensiones no están definidas antes de la carga, pueden provocar reflujos (_reflows_) en el contenido de la página (por ejemplo, cuando el texto es empujado abruptamente hacia abajo por una imagen que acaba de cargarse). Por esta razón, es fundamental establecer los atributos `width` y `height` para que el navegador pueda reservar el espacio correspondiente en el diseño estructural.

Cuando se incluyen los atributos de ancho y alto en un elemento HTML `<img>`, el navegador puede calcular la relación de aspecto (_aspect ratio_) de la imagen antes de que esta se cargue. Esta relación de aspecto se utiliza para reservar el espacio necesario para mostrar la imagen, reduciendo o incluso previniendo un cambio de diseño (_Layout Shift_). Reducir los cambios drásticos en el diseño es un componente crucial para lograr una buena experiencia de usuario y optimizar el rendimiento web.

La métrica **CLS (Cumulative Layout Shift)** mide precisamente esos saltos o desplazamientos visuales en la carga de la página. Los principales culpables de un CLS deficiente son los elementos reemplazados que carecen de dimensiones declaradas, incluidos los anuncios, incrustaciones (_embeds_), iframes y las fuentes web de terceros.

En los diseños responsivos, cuando un contenedor es más estrecho que una imagen, generalmente se utiliza el siguiente bloque CSS para evitar que las imágenes rompan sus contenedores:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Aunque resulta muy útil para los diseños adaptables, esto causa saltos visuales si no se incluyen los atributos HTML de origen, ya que si no hay información sobre la altura cuando se analiza el elemento `<img>` antes de cargarse, este CSS establece la altura efectivamente en 0. Al completarse la descarga más tarde, la página experimenta un cambio brusco para crear el espacio necesario para la altura recién determinada.

Al incluir los atributos correspondientes, el navegador web calcula las proporciones de manera anticipada. Una vez que la imagen se ha cargado por completo, prevalecerá la relación de aspecto intrínseca real del archivo, garantizando que se muestre de forma correcta incluso si los valores numéricos de los atributos no fueran milimétricamente exactos. Incluir ambos atributos vuelve a considerarse una de las mejores prácticas de desarrollo actuales.

Para las imágenes de fondo basadas en CSS, es igualmente importante definir un valor de `background-color` de respaldo para garantizar que cualquier texto superpuesto siga siendo legible mientras se completa la descarga del archivo multimedia.

## Conclusión

En esta sección hemos analizado la optimización de imágenes. Ahora tienes una comprensión general de cómo optimizar la mitad del ancho de banda total de un sitio web promedio. Este es solo uno de los tipos de medios que consumen el ancho de banda de los usuarios y ralentizan la carga de la página. Pasemos a la optimización de video para abordar el siguiente 20% del consumo de ancho de banda.
