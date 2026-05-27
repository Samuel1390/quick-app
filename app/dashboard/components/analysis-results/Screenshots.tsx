import React from "react"
import Image from "next/image"
import { type LighthouseResult } from "../../../server-functions/types"

type Props = {
  lighthouseResult: LighthouseResult
}

const Screenshots = ({ lighthouseResult }: Props) => {
  const screenshotThumbnails = lighthouseResult.audits["screenshot-thumbnails"]
  const items = screenshotThumbnails?.details?.items

  if (!items || items.length === 0) {
    return (
      <div className="my-4 w-full text-center text-xl font-semibold md:text-2xl">
        No se encontraron capturas de pantalla
      </div>
    )
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="my-4 text-center text-xl font-semibold md:text-2xl">
        Visualización de carga de la página
      </h2>
      <div className="flex w-fit max-w-full items-center gap-2 overflow-x-auto p-4">
        {items.map((item, i) => {
          const timeInSecondsString =
            (item.timing / 1000).toFixed(1).toString() + "s"
          return (
            <div
              className="shrink-0 text-right"
              key={item.timestamp + i.toString()}
            >
              <span>{timeInSecondsString}</span>
              <Image
                height={192}
                width={108}
                src={item.data}
                alt="Screenshot"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Screenshots
