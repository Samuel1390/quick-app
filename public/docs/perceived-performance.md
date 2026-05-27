# Rendimiento percibido

El rendimiento percibido es una medida subjetiva del rendimiento, la capacidad de respuesta y la fiabilidad de un sitio web. En otras palabras, qué tan rápido le parece un sitio web al usuario. Es más difícil de cuantificar y medir que la velocidad real de operación, pero quizás sea incluso más importante.

Este artículo proporciona una breve introducción a los factores que afectan el rendimiento percibido, junto con una serie de herramientas para evaluar y mejorar esta percepción.

- **Prerrequisitos:** Software básico instalado y conocimientos básicos de tecnologías web del lado del cliente.
- **Objetivo:** Obtener una familiaridad básica sobre la percepción del usuario respecto al rendimiento web.

## Descripción general

La percepción de qué tan rápido (y con qué fluidez) se cargan las páginas y responden a la interacción del usuario es aún más importante que el tiempo real requerido para descargar los recursos. Aunque físicamente no puedas hacer que tu sitio funcione más rápido, es muy posible que puedas mejorar la velocidad que tus usuarios perciben.

Una buena regla general para mejorar el rendimiento percibido es que usualmente es mejor proporcionar una respuesta rápida y actualizaciones de estado periódicas que hacer esperar al usuario hasta que una operación se complete por completo (antes de ofrecer cualquier información). Por ejemplo, al cargar una página es mejor mostrar el texto en cuanto llega en lugar de esperar a que se descarguen todas las imágenes y otros recursos. Aunque el contenido no se haya descargado por completo, el usuario puede ver que algo está sucediendo y empezar a interactuar con lo que tiene en pantalla.

> **Nota:** El tiempo parece pasar más rápido para los usuarios que están activamente comprometidos, distraídos o entretenidos, que para aquellos que esperan pasivamente a que ocurra algo. Siempre que sea posible, mantén a los usuarios informados e interactuando activamente mientras esperan que se complete una tarea.

Del mismo modo, es mejor mostrar una "animación de carga" tan pronto como un usuario hace clic en un enlace para realizar una operación prolongada. Aunque esto no cambia el tiempo que tarda en completarse la operación, el sitio se siente con mayor capacidad de respuesta y el usuario sabe que se está trabajando en algo útil.

## Métricas de rendimiento

No existe una única métrica o prueba que se pueda ejecutar en un sitio para evaluar cómo se "siente" un usuario. Sin embargo, hay una serie de métricas que pueden servir como indicadores útiles:

- **First Paint (Primer pintado):** El tiempo hasta el inicio de la primera operación de pintado en pantalla. Ten en cuenta que este cambio puede no ser visible; puede ser una simple actualización del color de fondo o algo incluso menos perceptible.
- **First Contentful Paint / FCP (Primer pintado con contenido):** El tiempo que transcurre hasta el primer renderizado significativo (por ejemplo, de texto, una imagen de primer plano o de fondo, un canvas o un SVG, etc.). Ten en cuenta que este contenido no es necesariamente útil o significativo.
- **First Meaningful Paint / FMP (Primer pintado significativo):** El tiempo en el que el contenido útil se renderiza en la pantalla.
- **Largest Contentful Paint / LCP (Pintado del contenido más grande):** El tiempo de renderizado del elemento de contenido más grande visible en el viewport.
- **Speed Index (Índice de velocidad):** Mide el tiempo promedio que tardan en pintarse los píxeles de la pantalla visible.
- **Time to Interactive / TTI (Tiempo para interactuar):** El tiempo hasta que la interfaz de usuario está disponible para la interacción del usuario (es decir, cuando termina la última tarea larga del proceso de carga).

## Mejorando el rendimiento

Aquí tienes algunos consejos y trucos que te ayudarán a mejorar el rendimiento percibido:

### Minimizar la carga inicial

Para mejorar el rendimiento percibido, minimiza la carga original de la página. En otras palabras, descarga primero el contenido con el que el usuario va a interactuar de inmediato y descarga el resto después "en segundo plano". Puede que la cantidad total de contenido descargado aumente, pero el usuario solo espera por una porción muy pequeña, por lo que la descarga se siente más veloz.

Separa las funcionalidades interactivas del contenido y carga los textos, estilos e imágenes visibles en la carga inicial. Retrasa o aplica carga diferida (_lazy load_) a imágenes, iframes, multimedia o scripts que no se utilicen o no sean visibles en la carga inicial de la página. Además, debes optimizar los recursos que sí cargas. Las imágenes y los videos deben servirse en el formato más óptimo, comprimidos y en el tamaño correcto.

### Evitar saltos de contenido y otros reflujos (reflows)

Las imágenes u otros recursos que hacen que el contenido sea empujado hacia abajo o salte a una ubicación diferente, como la carga de anuncios de terceros, pueden hacer que la página se sienta como si todavía se estuviera cargando, lo cual es perjudicial para el rendimiento percibido. Los cambios en el diseño (_content reflowing_) son especialmente dañinos para la experiencia del usuario cuando no son iniciados por una interacción suya. Si algunos recursos van a tardar más en cargarse que otros, y hay elementos que se cargarán después de que el resto del contenido ya se haya pintado en la pantalla, planifica con antelación y reserva un espacio en el diseño para ellos, de modo que el contenido no salte ni cambie de tamaño, sobre todo después de que el sitio ya sea interactivo.

### Evitar retrasos en los archivos de fuentes

La elección de las fuentes es importante. Seleccionar una fuente adecuada puede mejorar enormemente la experiencia del usuario. Desde el punto de vista del rendimiento percibido, la "importación subóptima de fuentes" puede provocar parpadeos a medida que se aplica el estilo al texto o cuando se recurre a fuentes alternativas (_fallback fonts_).

Haz que las fuentes alternativas tengan el mismo tamaño y peso para que, cuando las fuentes principales se carguen, el cambio en la página sea menos perceptible.

### Asegurar que los elementos interactivos sean reactivos

Asegúrate de que los elementos interactivos visibles sean siempre interactivos y responsivos. Si los elementos de entrada (_inputs_) son visibles, el usuario debería poder interactuar con ellos sin retrasos. Los usuarios sienten que algo va lento (_laggy_) cuando tarda más de 50 ms en reaccionar. Sienten que una página se comporta mal cuando el contenido se vuelve a pintar a una velocidad inferior a 16.67 ms (o 60 fotogramas por segundo) o cuando se repinta a intervalos irregulares.

Haz que funciones como la búsqueda predictiva o autocompletado sean una mejora progresiva: utiliza CSS para mostrar el modal de entrada y JavaScript para añadir el autocompletado a medida que esté disponible.

### Hacer que los iniciadores de tareas parezcan más interactivos

Realizar una solicitud de contenido en el evento `keydown` (al presionar la tecla) en lugar de esperar al `keyup` (al soltarla) puede reducir el tiempo de carga percibido del contenido en 200 ms. Añadir una animación interesante pero sutil de 200 ms a ese evento `keyup` puede reducir otros 200 ms de la carga percibido. No estás ahorrando 400 ms de tiempo real, pero el usuario no siente que está esperando el contenido hasta que, bueno, realmente tiene que esperar por él.

## Conclusión

Al reducir el tiempo que un usuario tiene que esperar por contenido útil, y manteniendo el sitio responsivo y atractivo, los usuarios sentirán que el sitio rinde mejor —incluso si el tiempo real de carga de los recursos sigue siendo el mismo.
