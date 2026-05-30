"use client"
import "@/app/dashboard/components/markdownRenderer.css"
import ReactMarkdown from "react-markdown"
import CopyButton from "./CopyButton"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { SimpleCopyButton } from "./CopyButton"
import { useMarkdown } from "../../hooks/useMarkdown"
import { ArrowRight, ArrowLeft, Info } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import type { DocsSection } from "../sections"
import { docsSections } from "../sections"
import Link from "next/link"

type Props = {
  selectedSection: DocsSection
  setSelectedSection: (newSection: DocsSection) => void
}

const MarkdownRenderer = ({ selectedSection, setSelectedSection }: Props) => {
  const { content, loading, error } = useMarkdown(selectedSection.markdownUrl)
  const position = docsSections.findIndex(
    (section) => section.slug === selectedSection.slug
  )

  if (loading)
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Cargando documento...
      </div>
    )
  if (error)
    return (
      <div className="p-4 text-sm text-destructive">
        Error al cargar el contenido.
      </div>
    )

  return (
    <div className="output prose prose-zinc dark:prose-invert w-full max-w-180">
      <div className="flex w-full flex-col justify-start gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-100 items-center justify-center gap-4 rounded-xl border border-yellow-800 bg-yellow-500/50 p-1 shadow shadow-md dark:text-yellow-50">
          <Info size={26} className="ml-3" />
          <p className="text-sm text-inherit">
            La información que está en este documento fue traducida al español y
            extraída de{" "}
            <Link
              target="_black"
              className="text-blue-500 underline"
              href={selectedSection.sourceLink}
            >
              {selectedSection.source}
            </Link>
          </p>
        </div>
        <ButtonGroup className="text-foreground hover:cursor-pointer">
          <ButtonGroup>
            <SimpleCopyButton
              label="Copiar página"
              content={content || ""}
              hoverContent="Copiar markdown de la página"
            />
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant={"outline"}
              size={"icon-sm"}
              disabled={position === 0}
              onClick={() =>
                position > 0 && setSelectedSection(docsSections[position - 1])
              }
            >
              <HoverCard>
                <HoverCardTrigger>
                  <ArrowLeft className="text-foreground" />
                </HoverCardTrigger>
                <HoverCardContent>Anterior</HoverCardContent>
              </HoverCard>
            </Button>
            <Button
              size={"icon-sm"}
              variant={"outline"}
              disabled={position === docsSections.length - 1}
              onClick={() =>
                position < docsSections.length - 1 &&
                setSelectedSection(docsSections[position + 1])
              }
            >
              <HoverCard>
                <HoverCardTrigger>
                  <ArrowRight className="text-foreground" />
                </HoverCardTrigger>
                <HoverCardContent>Siguiente</HoverCardContent>
              </HoverCard>
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
      <ReactMarkdown
        components={{
          code(props) {
            const { children, className, node, ref, ...rest } = props
            const match = /language-(\w+)/.exec(className || "")

            return match ? (
              // Rompemos el estilo "prose" para los bloques de código usando "not-prose"
              // para que los botones y márgenes internos se rijan 100% por tus clases.
              <div className="not-prose my-4 overflow-hidden rounded-lg">
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
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-pink-500 dark:bg-muted/50"
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
            // "not-prose" evita conflictos de espaciado con la tabla personalizada
            <div className="not-prose table-wrapper my-4 flex max-w-full overflow-x-auto">
              <table {...props} className="w-full border-collapse text-sm" />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      <footer className="mt-8 border-t border-border py-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-between border-t border-b border-border px-4 py-6">
          {position > 0 && (
            <div className="gap-1/2 flex flex-col items-start">
              <Button
                onClick={() => setSelectedSection(docsSections[position - 1])}
                className="ml-2"
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                <span className="block font-semibold">Anterior</span>
              </Button>
              <p className="text-secondary-background block text-xs">
                {docsSections[position - 1].title}
              </p>
            </div>
          )}
          {position < docsSections.length - 1 && (
            <div className="gap-1/2 flex flex-col items-end">
              <Button
                onClick={() => setSelectedSection(docsSections[position + 1])}
                className="ml-2"
              >
                <span className="block font-semibold">Siguiente</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-secondary-background block text-xs">
                {docsSections[position + 1].title}
              </p>
            </div>
          )}
        </div>
        <div className="my-4">
          fuente:{" "}
          <Link
            href={selectedSection.sourceLink}
            className="text-blue-500 underline"
          >
            {selectedSection.source}
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default MarkdownRenderer
