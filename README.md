# Angeom Live

### [https://angeomlive.github.io/](https://angeomlive.github.io/)

## Что внутри
- React + TypeScript проект (Vite)
- KaTeX для рендеринга формул (быстро и эффективно)
- Bootstrap 5 через CDN для аккуратного современного оформления
- Файлы групп: `groups.json` в корне
- Вопросы в `/data/grp-*.json`
- Куки для сохранения счётчика

## Запуск (локально)
1. `npm install`
2. `npm run dev`
3. Открыть `http://localhost:5173`

Для деплоя в GitHub Pages: собрать `npm run build` и скопировать содержимое `dist` в ветку main (публикация без gh-pages).

KaTeX используется как наш LaTeX-интерпретатор — быстрый, компактный и подходящий для статических сайтов.
