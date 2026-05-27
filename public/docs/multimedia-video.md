# Multimedia: Video

Como aprendimos en la sección anterior, los elementos multimedia (imágenes y video) representan más del 70% de los bytes descargados en un sitio web promedio. Ya hemos analizado la optimización de imágenes; este artículo se centra en la optimización de video para mejorar el rendimiento web.

- **Prerrequisitos:** Software básico instalado y conocimientos básicos de tecnologías web del lado del cliente.
- **Objetivo:** Aprender sobre los distintos formatos de video, su impacto en el rendimiento y cómo reducir la repercusión del video en el tiempo total de carga de la página, sirviendo el archivo de menor tamaño según el soporte de tipos de archivo de cada navegador.

## ¿Por qué optimizar tu contenido multimedia?

En un sitio web promedio, el 25% del ancho de banda proviene del video. Optimizar el video tiene el potencial de generar ahorros de ancho de banda muy significativos que se traducen de forma directa en un mejor rendimiento del sitio web.

## Optimización en la entrega de videos

Las secciones siguientes describen las siguientes técnicas de optimización:

- Comprimir todos los videos.
- Optimizar el orden del elemento `<source>`.
- Eliminar el audio de los videos silenciados (_muted_).
- Optimizar la precarga de video (_preload_).
- Considerar el uso de _streaming_.

### Comprimir todos los videos

La mayoría de los trabajos de compresión de video comparan fotogramas adyacentes dentro de un video con la intención de eliminar los detalles que son idénticos en ambos cuadros. Comprime el video y expórtalo a múltiples formatos, incluidos WebM y MPEG-4/H.264.

Tu software de edición de video probablemente disponga de una función para reducir el tamaño del archivo. Si no es así, existen herramientas en línea o de terminal como _FFmpeg_ (analizada en la sección de abajo) que codifican, decodifican, convierten y realizan otras funciones de optimización.

### Optimizar el orden de las etiquetas `<source>`

Ordena las fuentes de video del archivo más pequeño al más grande. Por ejemplo, dadas las compresiones de video en formatos de 10 MB y 12 MB, declara primero el recurso de 10 MB:

```html
<video width="400" height="300" controls="controls">
  <source src="video.webm" type="video/webm" />

  <source src="video.mp4" type="video/mp4" />
</video>
```

El navegador descargará el primer formato que sea capaz de entender. El objetivo es ofrecer las versiones más ligeras antes que las más pesadas. Al buscar la versión más pequeña, asegúrate de que el video más comprimido siga viéndose bien. Algunos algoritmos de compresión agresivos pueden hacer que el video se vea pixelado o de baja calidad (similar a un GIF animado deficiente). Aunque un video de 128 Kb parezca ofrecer una mejor velocidad de carga que una descarga de 10 MB, un video granulado puede afectar negativamente la percepción de la marca o del proyecto.

### Eliminar el audio de los videos de fondo (_hero videos_) silenciados

Para videos de portada (_hero-videos_) u otros videos que se reproducen sin audio de fondo, eliminar la pista de audio por completo es una estrategia inteligente.

```html
<video autoplay="" loop="" muted playsinline="" id="hero-video">
  <source src="banner_video.webm" type='video/webm; codecs="vp8, vorbis"' />
  <source src="web_banner.mp4" type="video/mp4" />
</video>
```

Este código de video para secciones secundarias o de portada (arriba) es muy común en sitios web de conferencias y páginas de inicio corporativas. Incluye un video que se reproduce automáticamente (_autoplay_), en bucle (_loop_) y silenciado (_muted_). Al carecer de controles de interfaz, no hay forma de que el usuario escuche el audio.

La pista de audio a menudo está vacía pero sigue presente en el contenedor, consumiendo ancho de banda innecesariamente. No hay ninguna razón para servir datos de audio en un video que siempre va a estar silenciado. Eliminar la pista de audio puede ahorrar hasta un 20% del ancho de banda del archivo.

Dependiendo del software que elijas, es posible que puedas eliminar el audio durante la exportación y compresión. Si no es así, una utilidad gratuita llamada **FFmpeg** puede hacerlo por ti. Este es el comando de FFmpeg para eliminar el audio copiando el flujo de video directamente (sin re-codificar el video completo):

```bash
ffmpeg -i original.mp4 -an -c:v copy audioFreeVersion.mp4

```

### Precarga de video (_Video preload_)

El atributo `preload` tiene tres opciones disponibles: `auto`, `metadata` y `none`. La configuración por defecto en los navegadores suele ser `metadata`. Estos ajustes controlan qué cantidad del archivo de video se descarga junto con la carga inicial de la página. Puedes ahorrar una gran cantidad de datos difiriendo la descarga para los videos menos populares.

- **`preload="none"`**: Hace que no se descargue absolutamente nada del video hasta que el usuario pulse explícitamente el botón de reproducción. Retrasa ligeramente el inicio de la reproducción, pero ofrece un ahorro masivo de datos para videos con baja probabilidad de ser vistos.
- **`preload="metadata"`**: Descarga aproximadamente hasta un 3% del video durante la carga de la página (para capturar dimensiones, duración y los primeros fotogramas). Es una opción muy útil para archivos pequeños o de tamaño moderado.
- **`preload="auto"`**: Le indica al navegador que descargue automáticamente el video completo en segundo plano. Utiliza esta opción únicamente cuando la reproducción del video por parte del usuario sea extremadamente probable. De lo contrario, desperdiciará mucho ancho de banda.

### Considerar el uso de _Streaming_

El streaming de video permite entregar el tamaño de video y el ancho de banda adecuados al usuario final según la velocidad de su red en tiempo real (mediante protocolos como HLS o DASH). De forma similar a las imágenes responsivas, se entrega el tamaño de video correcto al navegador, garantizando un inicio rápido de la reproducción, tiempos de almacenamiento en búfer mínimos y una reproducción completamente optimizada.

## Conclusión

Optimizar el video tiene el potencial de mejorar significativamente el rendimiento de un sitio web. Los archivos de video son relativamente grandes en comparación con otros archivos del ecosistema web y siempre merecen una atención especial. Este artículo explica cómo optimizar los videos reduciendo el tamaño del archivo, configurando correctamente los atributos de descarga en el HTML y evaluando el uso de transmisiones por streaming.
