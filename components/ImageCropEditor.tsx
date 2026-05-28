"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type CropConfig = {
  zoom: number;
  offsetX: number;
  offsetY: number;
  frameWidth: number;
  frameHeight: number;
};

type ImageCropEditorProps = {
  imageUrl: string;
  value: CropConfig;
  onChange: (value: CropConfig) => void;
  shape?: "circle" | "square";
  label?: string;
};

type Bounds = {
  limitX: number;
  limitY: number;
};

export const defaultCropConfig = (): CropConfig => ({
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  frameWidth: 0,
  frameHeight: 0,
});

export default function ImageCropEditor({
  imageUrl,
  value,
  onChange,
  shape = "square",
  label,
}: ImageCropEditorProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{ x: number; y: number } | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragState.current) return;

      const deltaX = event.clientX - dragState.current.x;
      const deltaY = event.clientY - dragState.current.y;
      dragState.current = { x: event.clientX, y: event.clientY };

      onChange(
        clampCrop(
          {
            ...value,
            offsetX: value.offsetX + deltaX,
            offsetY: value.offsetY + deltaY,
          },
          naturalSize
        )
      );
    };

    const handleMouseUp = () => {
      dragState.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [naturalSize, onChange, value]);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => {
      setNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    const element = frameRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      onChange(
        clampCrop({
          ...value,
          frameWidth: width,
          frameHeight: height,
        }, naturalSize)
      );
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [naturalSize, onChange, value]);

  const imageStyle = useMemo(() => {
    if (!naturalSize.width || !value.frameWidth || !value.frameHeight) {
      return undefined;
    }

    const baseScale = Math.max(
      value.frameWidth / naturalSize.width,
      value.frameHeight / naturalSize.height
    );
    const scaledWidth = naturalSize.width * baseScale * value.zoom;
    const scaledHeight = naturalSize.height * baseScale * value.zoom;
    const x = (value.frameWidth - scaledWidth) / 2 + value.offsetX;
    const y = (value.frameHeight - scaledHeight) / 2 + value.offsetY;

    return {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
      transform: `translate(${x}px, ${y}px)`,
    };
  }, [naturalSize, value]);

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zoom = Number(event.target.value);
    onChange(clampCrop({ ...value, zoom }, naturalSize));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = { x: event.clientX, y: event.clientY };
    event.preventDefault();
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  return (
    <div className="space-y-3">
      <div
        ref={frameRef}
        className={`relative mx-auto w-full max-w-[280px] overflow-hidden bg-slate-100 touch-none cursor-grab active:cursor-grabbing dark:bg-zinc-950 ${
          shape === "circle" ? "aspect-square rounded-full" : "aspect-square rounded-3xl"
        }`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {imageStyle ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Prévia do recorte"
              className="pointer-events-none absolute left-0 top-0 max-w-none select-none touch-none"
              style={imageStyle}
              draggable={false}
            />
          </>
        ) : null}

        <div
          className={`pointer-events-none absolute inset-0 border border-white/70 shadow-[inset_0_0_0_9999px_rgba(15,23,42,0.25)] dark:border-white/15 dark:shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.28)] ${
            shape === "circle" ? "rounded-full" : "rounded-3xl"
          }`}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{label || "Arraste para posicionar"}</span>
          <span>Zoom</span>
        </div>
        <input
          type="range"
          min="1"
          max="2.5"
          step="0.01"
          value={value.zoom}
          onChange={handleZoomChange}
          className="w-full accent-emerald-500"
        />
      </div>
    </div>
  );
}

function getBounds(value: CropConfig, naturalSize: { width: number; height: number }): Bounds {
  if (!naturalSize.width || !value.frameWidth || !value.frameHeight) {
    return { limitX: 0, limitY: 0 };
  }

  const baseScale = Math.max(
    value.frameWidth / naturalSize.width,
    value.frameHeight / naturalSize.height
  );
  const scaledWidth = naturalSize.width * baseScale * value.zoom;
  const scaledHeight = naturalSize.height * baseScale * value.zoom;

  return {
    limitX: Math.max(0, (scaledWidth - value.frameWidth) / 2),
    limitY: Math.max(0, (scaledHeight - value.frameHeight) / 2),
  };
}

function clampCrop(
  value: CropConfig,
  naturalSize: { width: number; height: number }
) {
  const { limitX, limitY } = getBounds(value, naturalSize);

  return {
    ...value,
    offsetX: clamp(value.offsetX, -limitX, limitX),
    offsetY: clamp(value.offsetY, -limitY, limitY),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export async function cropImageFile(
  file: File,
  crop: CropConfig,
  options: { width: number; height: number; fileName: string }
) {
  const image = await loadImage(URL.createObjectURL(file));

  try {
    const sourceFrameWidth = crop.frameWidth || options.width;
    const sourceFrameHeight = crop.frameHeight || options.height;
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = options.width;
    outputCanvas.height = options.height;

    const context = outputCanvas.getContext("2d");
    if (!context) {
      throw new Error("Não foi possível preparar a imagem.");
    }

    const baseScale = Math.max(
      options.width / image.naturalWidth,
      options.height / image.naturalHeight
    );
    const scaledWidth = image.naturalWidth * baseScale * crop.zoom;
    const scaledHeight = image.naturalHeight * baseScale * crop.zoom;
    const offsetX = crop.offsetX * (options.width / sourceFrameWidth);
    const offsetY = crop.offsetY * (options.height / sourceFrameHeight);
    const x = (options.width - scaledWidth) / 2 + offsetX;
    const y = (options.height - scaledHeight) / 2 + offsetY;

    context.drawImage(image, x, y, scaledWidth, scaledHeight);

    const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob | null>((resolve) => {
      outputCanvas.toBlob(resolve, mimeType, 0.92);
    });

    if (!blob) {
      throw new Error("Não foi possível gerar a nova imagem.");
    }

    return new File([blob], `${options.fileName}.${mimeType === "image/png" ? "png" : "jpg"}`, {
      type: mimeType,
    });
  } finally {
    URL.revokeObjectURL(image.src);
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Falha ao carregar imagem."));
    image.src = src;
  });
}
