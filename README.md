# Dead Man's Loadout - Миграция на современный стек

## 🎯 Цель проекта

Миграция интерактивного стримингового приложения "Набор мертвеца" с Vanilla JS на современный технологический стек для улучшения производительности, масштабируемости и поддержки.

## 🚀 Целевой технологический стек

### Frontend
```typescript
// Основной стек
React 18 + TypeScript + Vite

// UI библиотеки
- Tailwind CSS (стилизация)
- Headless UI (доступные компоненты)
- React Hook Form (формы)
- React Query/TanStack Query (управление состоянием сервера)

// Интерактивность
- Framer Motion (анимации)
- React Hot Toast (уведомления)
- React Modal (модальные окна)

// Утилиты
- Zod (валидация схем)
- Date-fns (работа с датами)
- Lodash (утилиты)
```

### Backend
```csharp
// Основной стек
.NET 8 + ASP.NET Core + SignalR

// ORM и данные
- Entity Framework Core (ORM)
- AutoMapper (маппинг объектов)
- FluentValidation (валидация)

// Real-time и кэш
- SignalR (WebSocket)
- Redis (кэширование)
- Hangfire (фоновые задачи)

// API и документация
- Swagger/OpenAPI (документация API)
- MediatR (CQRS паттерн)
```

### База данных и инфраструктура
```yaml
# База данных
SQL Server + Redis

# Контейнеризация
Docker + Docker Compose

# Мониторинг
Serilog (логирование)
Application Insights (метрики)

# Тестирование
xUnit (unit тесты)
Playwright (E2E тесты)
```

## 📋 Полная структура стека

```typescript
// Frontend
React 18 + TypeScript + Vite
├── UI: Tailwind CSS + Headless UI + Lucide React
├── State: React Query + Zustand
├── Forms: React Hook Form + Zod
├── Animations: Framer Motion
├── Modals: React Modal + React Hot Toast
└── Utils: Date-fns + Lodash

// Backend  
.NET 8 + ASP.NET Core + SignalR
├── ORM: Entity Framework Core + AutoMapper
├── Validation: FluentValidation
├── Real-time: SignalR + Redis
├── Background: Hangfire
├── API: Swagger/OpenAPI + MediatR
└── Logging: Serilog + Application Insights

// Infrastructure
├── Database: SQL Server + Redis
├── Container: Docker + Docker Compose
└── Testing: xUnit + Playwright
```

## 🎨 Специфика для проекта

### Для лодаутов
- **Framer Motion** - анимации открытия карточек
- **React Query** - синхронизация состояний
- **Zod** - валидация формул очков

### Для модификаторов
- **React Hot Toast** - уведомления о применении
- **SignalR** - real-time обновления

### Для лидерборда
- **React Query** - автоматическое обновление
- **Framer Motion** - анимации сортировки

## 📊 Преимущества миграции

### Frontend
- ✅ **Tailwind CSS** - быстрая стилизация, responsive дизайн
- ✅ **Headless UI** - доступность из коробки
- ✅ **React Query** - автоматическая синхронизация с сервером
- ✅ **Framer Motion** - красивые анимации для карточек
- ✅ **Zod** - типизированная валидация данных

### Backend
- ✅ **Entity Framework** - удобная работа с БД
- ✅ **SignalR** - надёжный real-time
- ✅ **Redis** - быстрый кэш для частых запросов
- ✅ **MediatR** - чистая архитектура

### Общие
- ✅ **Типизация** - меньше ошибок
- ✅ **Производительность** - быстрее расчёты
- ✅ **Масштабируемость** - готовность к росту
- ✅ **Поддержка** - современные инструменты

## 🗂️ Структура проекта

```
Dead-Man-s-Loadout/
├── OldСode/                    # Исходный код (Vanilla JS)
├── frontend/                  # React приложение
│   ├── src/
│   │   ├── components/        # React компоненты
│   │   ├── pages/            # Страницы приложения
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API сервисы
│   │   └── types/            # TypeScript типы
│   ├── public/               # Статические файлы
│   └── package.json          # Frontend зависимости
├── backend/                   # .NET API
│   ├── Controllers/           # API контроллеры
│   ├── Services/             # Бизнес логика
│   ├── Models/               # Модели данных
│   ├── Data/                # Entity Framework контекст
│   └── Program.cs           # Точка входа
├── database/                 # SQL скрипты и миграции
├── docker/                   # Docker конфигурации
└── docs/                     # Документация
```

## 🚀 План миграции

### Фаза 1: Frontend скелет (текущая)
- [x] Аудит исходного кода
- [x] Выбор технологического стека
- [ ] Создание React скелета
- [ ] Реализация базовой функциональности

### Фаза 2: Backend миграция
- [ ] Создание .NET API
- [ ] Миграция данных в SQL Server
- [ ] Реализация SignalR

### Фаза 3: Интеграция и тестирование
- [ ] Интеграция Frontend и Backend
- [ ] Тестирование функциональности
- [ ] Оптимизация производительности

## 📚 Документация

- [ProjectInfo.md](./ProjectInfo.md) - Полный анализ исходного проекта
- [Migration Plan.md](./docs/Migration-Plan.md) - Детальный план миграции
- [API Documentation.md](./docs/API-Documentation.md) - Документация API

## 🤝 Участие в разработке

Проект находится в активной разработке. Для получения актуальной информации о статусе миграции обращайтесь к ProjectInfo.md и документации в папке `docs/`.
