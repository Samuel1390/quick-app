# Feature: Creación de ruta para visualizar los archivos que se le pasan a segment

### Descripción:

- El botón generado por attachments aunque dice que se puede ver el contenido del archivo al hacer hover, en realidad no se puede, tu tarea es crear un contexto usado para almacenar estos archivos en memoria, de esta forma, cuando el usuario haga click sobre alguno de estos botones, se redirige a /dashboard/view-file/[file-name] aqui se muestra el contenido del archivo, en una pagina totalmente a parte.

# notas adicionales

- crear un header con un breadcrumb que especifique la ruta actual, por ejemplo, "Dashboard / segment / view-file / [file-name], con shadcn ademas darle un formato correcto según el tipo de archivo puedes usar el archivo Output.tsx y parametrizar las clases para no romper el diseño actual, o puedes crear un archivo nuevo a parte, tambien deberás mostrar el icono para cada archivo, en Attachments.tsx tienes la forma de hacerlo si necesitas ver más archivos, estan ubicados en la carpeta app/dashboard/components/ai-assistant/segment-ai/app".
