"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import CopyButton, { SimpleCopyButton } from "./CopyButton"
import getModelObj from "../../../utils/getModelObj"
import "./output.css"
import { GoogleSearch, ComplexProblems, FileSupport } from "./ModelCapabilities"
import type { HistoryData } from "../../../server-actions/chatFormAction"

import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

// EL markdow generado por gpt aun es muy dificil de interpretar con librerias comunes
// por lo que aun es necesario trabajar en el renderizado de markdown
// para asegurarse de que cubrimos todos los casos esto para formulas matematicas fisicas y quimicas

type Props = {
  content: string
  historyData?: HistoryData
}

const MarkdownRenderer = ({ content, historyData }: Props) => {
  const modelHash = historyData?.model
  const modelObj = modelHash ? getModelObj(modelHash) : null
  // Aplicamos la limpieza antes de pasarla al componente
  const preprocessedContent = preprocessContent(content)

  return (
    <div className={`model-output dark max-md:px-4`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code(props) {
            const { children, className, node, ref, ...rest } = props
            const match = /language-(\w+)/.exec(className || "")

            return match ? (
              <div className="my-4 overflow-hidden rounded-lg">
                <CopyButton
                  language={match[1]}
                  content={String(children).replace(/\n$/, "")}
                />
                <SyntaxHighlighter
                  {...rest}
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    fontSize: "0.875rem",
                    backgroundColor: "#0a0a0a",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-sm text-pink-500 dark:bg-gray-800"
                {...rest}
              >
                {children}
              </code>
            )
          },
          a: ({ ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline transition-colors hover:text-blue-400"
            />
          ),
          table: ({ ...props }) => (
            <div className="table-wrapper flex max-w-full overflow-x-auto">
              <table {...props} />
            </div>
          ),
        }}
      >
        {preprocessedContent}
      </ReactMarkdown>
      {/* Footer de la respuesta del modelo | contiene informacion adicional */}
      {historyData && modelObj && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t-2 border-neutral-300 py-4 pt-3 dark:border-neutral-700">
          <div className="flex items-center gap-1 text-[0.7rem] text-neutral-500 dark:text-neutral-400">
            Modelo: {modelObj.label}
            {modelObj?.icon && modelObj.icon}
          </div>
          <span className="flex items-center gap-2">
            {(modelObj.supportsBrowserSearch ||
              modelObj.nativeBrowserSearchFunctionality) && <GoogleSearch />}
            {modelObj.supportsReasoning && <ComplexProblems />}
            {modelObj.supportsFiles && <FileSupport />}
            <SimpleCopyButton
              hoverContent="Copiar markdown"
              copiedContent="Markdown copiado!"
              content={content}
            />
          </span>
        </div>
      )}
    </div>
  )
}

// Importante: Esta funcion es generada con ia, es necesario probarla
// con una gran variedad de formulas para asegurarse de que
// el renderizado sea correcto y estético en el frontend, ademas de ir ajustandola
// segun se vayan encontrando casos que no rendericen correctamente, esto
// con la finalidad de asegurar que el renderizado de markdown sea lo
// mas robusto posible.
const preprocessContent = (content: string): string => {
  if (!content) return ""

  let processed = content

  // 1. Convertir entornos LaTeX a display math $$...$$
  //    \begin{equation} ... \end{equation}
  processed = processed.replace(
    /\\begin\{equation\}([\s\S]*?)\\end\{equation\}/g,
    (_, eq) => `\n$$\n${eq.trim()}\n$$\n`
  )
  //    \begin{align} ... \end{align}  (y similares: align*, gather, etc.)
  processed = processed.replace(
    /\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g,
    (_, eq) => `\n$$\n\\begin{aligned}${eq.trim()}\\end{aligned}\n$$\n`
  )

  // 2. Convertir \[ ... \] y $$ ... $$ ya están manejados, pero reforzamos
  processed = processed.replace(/\\\[/g, "\n$$\n").replace(/\\\]/g, "\n$$\n")

  // 3. Convertir \( ... \) a $ ... $
  processed = processed.replace(/\\\(/g, "$").replace(/\\\)/g, "$")

  // 4. Limpiar espacios alrededor de $ (evita $ x $)
  processed = processed.replace(/\$\s+/g, "$").replace(/\s+\$/g, "$")

  // 5. (NUEVO) Detectar patrones de matemáticas en línea sin delimitadores
  //    Buscamos secuencias que comiencen con un comando LaTeX típico y sigan hasta
  //    un espacio o signo de puntuación, y que no estén ya dentro de $...$ o $$...$$
  //    Para evitar falsos positivos, solo aplicamos si el patrón aparece fuera de
  //    cualquier entorno matemático existente.
  //    Usamos una regex que ignora contenido ya envuelto.
  const inlineMathPattern = /(?<!\$)(\\[a-zA-Z]+|\\[^\s]+)(?![^$]*\$)/g
  //    Esto es demasiado simple; mejor: buscar fragmentos que parezcan matemáticas completas.
  //    Un enfoque más seguro: buscar todo lo que no está dentro de $ y que contiene \sum, \int, \frac, etc.
  //    Lo hacemos en varios pasos:

  //    a) Primero protegemos los bloques $$...$$ y $...$ existentes (temporalmente)
  const mathBlocks: string[] = []
  processed = processed.replace(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/g, (match) => {
    mathBlocks.push(match)
    return `@@MATHBLOCK${mathBlocks.length - 1}@@`
  })

  //    b) Ahora, fuera de esos bloques, buscamos candidatos a matemáticas.
  //       Patrón: comienza con \, luego letras, posiblemente seguido de { }, [ ], etc.
  //       Capturamos hasta un espacio, signo de puntuación o fin de línea.
  const rawOutside = processed
  const fixedOutside = rawOutside.replace(
    /(\\[a-zA-Z]+(?:\{[^}]*\}|\[[^\]]*\]|\{[^{}]*\}|\([^)]*\)|\s*[\\^_{}]?)*)/g,
    (candidate) => {
      // Si el candidato es muy corto (ej: \n) o claramente texto, lo ignoramos
      if (candidate.length < 2) return candidate
      // Verificar si ya parece estar en un contexto matemático (ej: dentro de \text)
      // Por simplicidad, lo envolvemos con $...$
      return `$${candidate}$`
    }
  )

  //    c) Restaurar los bloques originales
  processed = fixedOutside.replace(
    /@@MATHBLOCK(\d+)@@/g,
    (_, idx) => mathBlocks[parseInt(idx)]
  )

  // 6. Eliminar múltiples $ consecutivos (por si acaso)
  processed = processed.replace(/\${3m,}/g, "$$")

  // 7. Normalizar \displaystyle y otros comandos que KaTeX maneja bien, pero que a veces causan espacios extra
  processed = processed.replace(/\\displaystyle\s*/g, "") // No es necesario en $$, y en línea puede ir sin él

  // 8. Asegurar que fórmulas largas (con \bigl, \bigr, etc.) tengan saltos de línea amigables
  //    Esto se hace con CSS, pero podemos insertar \n después de $$ para mejor legibilidad
  processed = processed.replace(/\$\$\n?/g, "\n$$\n")

  return processed
}

export default MarkdownRenderer
