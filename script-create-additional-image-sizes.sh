#!/bin/bash
# resize-images.sh — профессиональный скрипт для адаптивных JPG/PNG

if ! command -v magick &> /dev/null; then
    echo "Ошибка: ImageMagick (magick) не установлен."
    exit 1
fi

INPUT_DIR="$1"

if [ -z "$INPUT_DIR" ]; then
    echo "Использование: $0 /путь/к/папке"
    exit 1
fi

# Целевые ширины
WIDTHS=(480 768 1024 1440 1920)

# Суффиксы для проверки
SUFFIX_PATTERN='-(480|768|1024|1440|1920)px\.jpg$'

# Рекурсивно ищем JPG/PNG
find "$INPUT_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while IFS= read -r file; do
    base=$(basename "$file")

    # Пропускаем уже уменьшённые копии
    if [[ $base =~ $SUFFIX_PATTERN ]]; then
        echo "Пропускаем (уже уменьшённая копия): $file"
        continue
    fi

    dir=$(dirname "$file")
    name="${base%.*}"

    # Получаем ширину исходного изображения
    orig_width=$(magick identify -format "%w" "$file")

    echo "Обрабатываем: $file (ширина: $orig_width px)"

    for width in "${WIDTHS[@]}"; do
        new_file="$dir/${name}-${width}px.jpg"

        # Пропускаем, если файл уже существует
        if [ -f "$new_file" ]; then
            echo "  Файл уже существует: $new_file"
            continue
        fi

        if [ "$orig_width" -le "$width" ]; then
            # Если исходная ширина меньше или равна целевой, просто копируем
            cp "$file" "$new_file"
            echo "  Копия без ресайза: $new_file"
        else
            # Resize + белый фон + оптимизация для web + удаление профилей
            magick "$file" -resize "${width}x" -background white -flatten -strip -interlace JPEG -quality 85 +profile '*' "$new_file"
            echo "  Создано: $new_file"
        fi
    done
done

echo "Готово!"