
const DEFAULT_WIDTHS = [480, 768, 1024, 1440, 1920];

interface ResponsiveImageProps {
    src: string;
}

export const ResponsivePic: React.FC<ResponsiveImageProps> = ({src}) => {
    // Разделяем имя и расширение
    const dotIndex = src.lastIndexOf(".");
    const name = src.slice(0, dotIndex);
    const ext = src.slice(dotIndex);

    // Генерируем srcSet
    const srcSet = DEFAULT_WIDTHS.map((w) => `${name}-${w}px${ext} ${w}w`).join(", ");

    // Генерируем sizes, если не передан
    const defaultSizes = DEFAULT_WIDTHS
        .map((w) => `(max-width: ${w}px) ${w}px`)
        .join(", ") + `, ${DEFAULT_WIDTHS[DEFAULT_WIDTHS.length - 1]}px`;

    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={defaultSizes}
            alt=""
            className="mw-100"
            style={{maxHeight: "50vh", objectFit: "contain"}}
        />
    );
};