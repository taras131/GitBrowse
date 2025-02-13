# Тестовое задание для Junior React Developer

## Описание

Веб-приложение для поиска и просмотра репозиториев пользователей GitHub с использованием GitHub API.
deploy: `https://gitbrowse.netlify.app/`

### Основные функции

- Поиск репозиториев по имени пользователя GitHub
- Отображение информации о репозиториях в виде карточек
- Бесконечная прокрутка с пагинацией (20 репозиториев на страницу)
- История поиска
- Индикатор загрузки
- Обработка ошибок и информативные сообщения
- Адаптивный дизайн (320px - 1920px)
- reducer покрыт unit тестами
- ui компоненты раздела repos покрыты unit тестами

## Технологии

Основной стек технологий включает:

- React – для создания пользовательского интерфейса.
- Material-UI (MUI) – для стилизации компонентов.
- Redux Toolkit – для управления состоянием.
- TypeScript – для типизации и повышения надежности кода.
- Docker
- Jest для тестирования

## Требования

- Node.js 16+
- npm 6+
- Docker (опционально)

## Деплой

`https://gitbrowse.netlify.app/`

## CI CD

перед мержем в ветку main проверяются тесты и build приложения

## EsLint

`npx eslint --fix .` - форматирование всех файлов

## Установка и запуск

### Стандартная установка

`git clone [URL репозитория]`

`cd git_browse`

`npm install`

# Запуск в режиме разработки

`npm start`

# Сборка проекта

`npm run build`

# Запуск тестов

`npm test`

# Docker

## Сборка и запуск через Docker

`npm run docker:up`

## Или по отдельности:

`npm run docker:build`    # Сборка образа

`npm run docker:run`     # Запуск контейнера

`npm run docker:open`    # Открытие приложения в браузере

## Структура проекта

    └── components/       - Общие компоненты
    └── features/         - Функциональные модули
        └── repos/        - Модуль репозиториев
            └── api/      - запросы на сервер
            └── model/    -  Slice, actions, selectors
            └── ui/       - Компоненты модуля
    └── models/           - типы и интерфейсы
    └── utils/            - Утилиты и константы

## Тестирование

Проект включает unit-тесты для Redux slice с использованием Jest. Тесты покрывают:

-Начальное состояние
-Синхронные actions
-Асинхронные actions (API запросы)
-Комбинированные действия

# Запуск тестов

`npm test`

# Запуск тестов с покрытием

npm test -- --coverage

## API

Приложение использует GitHub API для получения данных о репозиториях:

Базовый URL: https://api.github.com

Endpoint: /users/{username}/repos

### Особенности реализации

- Дебаунсинг поисковых запросов
- Кэширование истории поиска
- Оптимизированные повторные рендеры
- Обработка ошибок API
- Адаптивный дизайн с использованием MUI
- Конфигурация Docker
- Приложение может быть развернуто в Docker-контейнере:


