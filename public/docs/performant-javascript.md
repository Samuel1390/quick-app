# Optimización del rendimiento en JavaScript

Es muy importante considerar cómo utilizas JavaScript en tus sitios web y pensar en cómo mitigar cualquier problema de rendimiento que pueda estar causando. Aunque las imágenes y el video representan más del 70% de los bytes descargados en un sitio web promedio, byte por byte, JavaScript tiene un potencial de impacto negativo mucho mayor: puede afectar significativamente los tiempos de descarga, el rendimiento de renderizado y el uso de la CPU y la batería. Este artículo presenta consejos y técnicas para optimizar JavaScript con el fin de mejorar el rendimiento de tu sitio web.

- **Prerrequisitos:** Software básico instalado y conocimientos básicos de tecnologías web del lado del cliente.
- **Objetivos:** Aprender sobre los efectos de JavaScript en el rendimiento web y cómo mitigar o solucionar los problemas relacionados.

---

## Optimizar o no optimizar

La primera pregunta que debes responder antes de empezar a optimizar tu código es: "¿qué necesito optimizar?". Algunos de los consejos y técnicas que se analizan a continuación son buenas prácticas que beneficiarán a casi cualquier proyecto web, mientras que otros solo son necesarios en situaciones específicas. Intentar aplicar todas estas técnicas en todas partes es probablemente innecesario y puede ser una pérdida de tiempo; debes determinar qué optimizaciones de rendimiento son realmente necesarias en cada proyecto.

Para hacer esto, necesitas medir el rendimiento de tu sitio. La mejor manera de empezar es aprender a utilizar herramientas integradas en el navegador, como las herramientas de red (_Network_) y de rendimiento (_Performance_), para ver qué partes de la carga de la página están tardando mucho tiempo y necesitan optimización.

---

## Optimización de las descargas de JavaScript

El JavaScript más eficiente y menos bloqueante que puedes usar es el que no usas en absoluto; debes utilizar la menor cantidad de JavaScript posible. Algunos consejos a tener en cuenta:

- **No siempre necesitas un framework:** Los frameworks tienen una alta carga de JavaScript. Si estás creando una experiencia bastante estática con pocos requisitos interactivos, probablemente no necesites ese framework y puedas implementar lo que necesitas con unas pocas líneas de JavaScript estándar.
- **Considera una solución más simple:** Piensa si tus usuarios realmente apreciarán una funcionalidad compleja o si preferirían algo más simple.
- **Elimina el código no utilizado:** Sorprendentemente, muchos desarrolladores olvidan limpiar las funcionalidades añadidas durante el desarrollo que ya no se usan. Todo script se analiza (_parsed_), se use o no; por lo tanto, deshacerse del código obsoleto es una victoria rápida para acelerar las descargas. Si usas un framework, evalúa si es posible crear una compilación personalizada que solo contenga los módulos que necesitas.
- **Aprovecha las características nativas del navegador:** Es posible utilizar funciones que el navegador ya tiene integradas en lugar de recrearlas con JavaScript. Por ejemplo:
- Utilizar la validación de formularios nativa en el lado del cliente.
- Utilizar el propio reproductor de video del navegador.
- Utilizar animaciones CSS en lugar de una biblioteca de animaciones de JavaScript.

También debes dividir tu JavaScript en varios archivos que representen las partes críticas y las no críticas. Los módulos de JavaScript (ES Modules) te permiten hacer esto de manera más eficiente que simplemente usando archivos JavaScript externos separados.

Una vez divididos, puedes optimizar estos archivos más pequeños mediante la **minificación** (que reduce los caracteres y los bytes del archivo) y la compresión con **Gzip** o **Brotli** (que generalmente supera la compresión de Gzip). Aunque puedes dividir y optimizar tu código manualmente, los empaquetadores de módulos (_bundlers_) como webpack suelen hacer un mejor trabajo.

---

## Manejo del análisis (_parsing_) y la ejecución

Cuando se carga una página web, el navegador procesa los elementos en un orden simplificado:

1. El HTML generalmente se analiza primero, en el orden en que aparece en la página.
2. Cuando se encuentra CSS, se analiza para comprender los estilos que deben aplicarse. Al mismo tiempo, se inicia la descarga de recursos vinculados como imágenes y fuentes web.
3. **Cuando se encuentra JavaScript, el navegador lo analiza, evalúa y ejecuta en la página.**
4. Un poco más tarde, el navegador calcula cómo debe estructurarse cada elemento HTML y el resultado se pinta (_paint_) en la pantalla.

El paso clave aquí es el **Paso 3**. Por defecto, el análisis y la ejecución de JavaScript bloquean el renderizado (_render-blocking_). Esto significa que el navegador detiene el análisis de cualquier HTML que aparezca después del script hasta que este se haya procesado completamente; como resultado, el diseño y el pintado también se bloquean. Por lo tanto, debes pensar cuidadosamente no solo en qué estás descargando, sino también en cuándo y cómo se ejecuta ese código.

---

## Carga de recursos críticos lo antes posible

Si un script es realmente importante y te preocupa que afecte al rendimiento por no cargarse lo suficientemente rápido, puedes colocarlo dentro del `<head>` del documento:

```html
<head>
  ...
  <script src="main.js"></script>
  ...
</head>
```

Esto funciona, pero bloquea el renderizado. Una mejor estrategia es utilizar `rel="preload"` para crear una precarga del JavaScript crítico:

```html
<head>
  ...
  <link rel="preload" href="important-js.js" as="script" />
  <link rel="modulepreload" href="important-module.js" />
  ...
</head>
```

La etiqueta `<link>` con `preload` descarga el archivo JavaScript lo antes posible sin bloquear el renderizado de la página. Luego puedes utilizarlo en cualquier otra parte de tu código de forma normal:

```html
<script src="important-js.js"></script>
```

O mediante una importación si se trata de un módulo:

```javascript
import { someFunction } from "important-module.js"
```

> **Nota:** La precarga no garantiza que el script esté completamente cargado en el momento exacto en que lo incluyas, pero inicia su descarga mucho antes, reduciendo drásticamente el tiempo de bloqueo del renderizado.

---

## Aplazar la ejecución de JavaScript no crítico

Por otro lado, debes intentar posponer el análisis y la ejecución del JavaScript que no sea crítico para el primer pintado. Puedes añadir el atributo `async` a tus elementos `<script>`:

```html
<head>
  ...
  <script async src="main.js"></script>
  ...
</head>
```

Esto hace que el script se descargue en paralelo con el análisis del DOM, por lo que estará listo sin detener el flujo de renderizado inicial.

> **Nota:** El atributo `defer` tiene un comportamiento similar, pero garantiza que el script se ejecute estrictamente después de que todo el documento haya sido analizado, justo antes de que se active el evento `DOMContentLoaded`.

También puedes optar por no cargar el JavaScript en absoluto hasta que ocurra un evento específico que lo requiera mediante la inyección dinámica en el DOM:

```javascript
const scriptElem = document.createElement("script")
scriptElem.src = "index.js"
scriptElem.addEventListener("load", () => {
  // Ejecuta una función interna una vez cargado por completo
  init()
})
document.head.append(scriptElem)
```

En el caso de los módulos de JavaScript, puedes realizar cargas dinámicas bajo demanda utilizando la función `import()`:

```javascript
import("./modules/myModule.js").then((module) => {
  // Hacer algo con el módulo cargado
})
```

---

## Dividir las tareas largas (_Long Tasks_)

Cuando el navegador ejecuta tu JavaScript, organiza el script en tareas que se ejecutan secuencialmente en el **hilo principal** (_main thread_). El hilo principal solo puede ejecutar una tarea a la vez.

Cuando una sola tarea tarda **más de 50 ms** en ejecutarse, se clasifica como una **tarea larga** (_long task_). Si el usuario intenta interactuar con la página o se solicita una actualización visual importante de la interfaz mientras se ejecuta una tarea larga, la actualización se retrasará, haciendo que la interfaz parezca lenta o congelada.

Para mitigar esto, necesitas dividir las tareas largas en tareas más pequeñas. Esto le da al navegador la oportunidad de intercalar la gestión de interacciones del usuario o las actualizaciones de renderizado entre cada tarea pequeña. Dividir tu código en funciones separadas ayuda a la organización, pero no evita por sí mismo el bloqueo si se ejecutan de forma síncrona dentro de una misma función contenedora:

```javascript
function main() {
  a()
  b()
  c()
  d()
  e()
} // El navegador sigue procesando esto como una única tarea larga si tarda más de 50ms.
```

Para solucionarlo de verdad, podemos implementar una función de "cedido" (_yield_) de manera periódica para devolverle temporalmente el control al hilo principal mediante un patrón con `setTimeout()`:

```javascript
function yieldFunc() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0) // Pospone la ejecución a una nueva tarea en la cola
  })
}
```

Esto se puede integrar en un bucle asíncrono que procese un arreglo de funciones dispersas:

```javascript
async function main() {
  const tasks = [a, b, c, d, e]
  while (tasks.length > 0) {
    const task = tasks.shift()
    task()
    await yieldFunc() // Cede el control al hilo principal después de cada tarea
  }
}
```

Para llevar esto a un nivel más avanzado y eficiente, puedes verificar la disponibilidad de la API nativa `Scheduler.yield()`:

```javascript
function yieldFunc() {
  if ("scheduler" in window && "yield" in scheduler) {
    return scheduler.yield() // API nativa de optimización de tareas de alta prioridad
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}
```

---

## Conclusión

Gestionar el presupuesto de JavaScript es crítico, ya que su costo de ejecución en la CPU suele ser el cuello de botella invisible más importante en dispositivos móviles de gama media y baja. Al combinar descargas optimizadas, atributos de carga asíncrona (`async`/`defer`) y la fragmentación activa de tareas en el hilo principal, puedes prevenir de manera drástica los bloqueos visuales y ofrecer aplicaciones web altamente interactivas e instantáneas.
