# 🎨 Дизайн-система Dead Man's Loadout

## 📋 Обзор

Современная дизайн-система в стиле киберпанк/неон с акцентом на визуальные эффекты, плавные анимации и отличный UX.

## 🎨 Цветовая палитра

### Основные цвета

**Primary (Основной) - Неоновый голубой**
```css
--color-primary: #00e7f8
```
- 50: #f0fdff (очень светлый)
- 500: #00e7f8 (основной)
- 900: #002b30 (очень темный)

**Secondary (Вторичный) - Неоновый зеленый**
```css
--color-secondary: #5eff9c
```

**Accent (Акцент) - Яркий голубой**
```css
--color-accent: #00f7ff
```

**Danger (Опасность) - Красный**
```css
--color-danger: #ff4e4e
```

**Warning (Предупреждение) - Оранжевый**
```css
--color-warning: #ffae00
```

**Success (Успех) - Зеленый**
```css
--color-success: #00ff68
```

### Темная палитра

**Dark (Темные оттенки)**
- 950: #020617 (самый темный)
- 900: #0f172a (очень темный)
- 800: #1e293b (темный)
- 700: #334155 (средне-темный)

## 🎭 Типографика

### Шрифты

**Cinzel** - Заголовки
```css
font-family: 'Cinzel', serif;
```
- Используется для: h1, h2, h3, заголовки модалок
- Вес: 400, 500, 600, 700

**Inter** - Основной текст
```css
font-family: 'Inter', sans-serif;
```
- Используется для: основной текст, UI элементы
- Вес: 300, 400, 500, 600, 700

**JetBrains Mono** - Моноширинный
```css
font-family: 'JetBrains Mono', monospace;
```
- Используется для: код, числовые значения
- Вес: 400, 500, 600

### Размеры

- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)

## ✨ Эффекты и тени

### Свечение (Glow)

**Базовое свечение**
```css
box-shadow: 0 0 20px rgba(0, 231, 248, 0.5);
```

**Сильное свечение**
```css
box-shadow: 0 0 40px rgba(0, 231, 248, 0.6);
```

**Неоновое свечение**
```css
box-shadow: 0 0 5px #00e7f8, 0 0 10px #00e7f8, 0 0 15px #00e7f8;
```

### Backdrop Blur

**Стекломорфизм**
```css
background: rgba(30, 41, 59, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(0, 231, 248, 0.2);
```

## 🎬 Анимации

### Базовые анимации

**Fade In**
```css
animation: fadeIn 0.5s ease-in-out;
```

**Slide Up**
```css
animation: slideUp 0.3s ease-out;
```

**Scale In**
```css
animation: scaleIn 0.2s ease-out;
```

**Float**
```css
animation: float 3s ease-in-out infinite;
```

**Glow Pulse**
```css
animation: glow 2s ease-in-out infinite alternate;
```

### Hover эффекты

**Масштабирование**
```css
hover:scale-105
transition: all 0.3s ease-out;
```

**Свечение при наведении**
```css
hover:shadow-glow
```

## 🧩 Компоненты

### Button

**Варианты:**
- `primary` - Градиент от primary до accent
- `secondary` - Градиент от secondary до success
- `danger` - Градиент красных оттенков
- `ghost` - Прозрачная с границей

**Размеры:**
- `sm` - Маленькая (px-4 py-2)
- `md` - Средняя (px-6 py-3)
- `lg` - Большая (px-8 py-4)

**Эффекты:**
- Shimmer эффект при hover
- Масштабирование при hover (scale-105)
- Активное состояние (scale-95)

### Modal

**Особенности:**
- Backdrop blur
- Анимированное появление (fade-in + scale-in)
- Градиентные заголовки
- Декоративные элементы
- Закрытие по клику на backdrop

### Card

**Стили:**
```css
background: var(--bg-secondary);
border: 1px solid var(--bg-tertiary);
border-radius: 12px;
padding: 1.5rem;
```

**Hover эффект:**
```css
hover:border-color: var(--color-primary);
hover:box-shadow: var(--shadow-glow);
hover:transform: translateY(-4px);
```

## 🎯 Паттерны использования

### Градиентный текст

```tsx
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-accent">
  Заголовок
</h1>
```

### Стекломорфизм контейнер

```tsx
<div className="bg-dark-800/60 backdrop-blur-md rounded-3xl p-6 border border-primary-500/30 shadow-glow">
  Содержимое
</div>
```

### Декоративные элементы

```tsx
<div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
```

### Hover эффект с overlay

```tsx
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  Содержимое
</div>
```

## 🔧 Утилиты

### Spacing

- 18: 4.5rem
- 88: 22rem
- 128: 32rem

### Border Radius

- xl: 0.75rem
- 2xl: 1rem
- 3xl: 1.5rem

### Background Patterns

**Cyber Grid**
```css
background-image: 
  linear-gradient(rgba(0, 231, 248, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 231, 248, 0.03) 1px, transparent 1px);
background-size: 20px 20px;
```

## 📱 Адаптивность

### Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Мобильные улучшения

```css
@media (max-width: 768px) {
  h1 { font-size: 2.5em; }
  button { padding: 0.5em 1em; font-size: 0.9em; }
  .card { padding: 1rem; }
}
```

## ♿ Доступность

- Все интерактивные элементы имеют focus состояния
- Цветовой контраст соответствует WCAG AA
- Aria-labels для важных элементов
- Keyboard navigation поддерживается

## 🎨 Примеры

### Пример карточки с эффектами

```tsx
<div className="bg-gradient-to-br from-dark-700/80 to-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-500/30 shadow-glow">
  <div className="flex items-center space-x-3 mb-4">
    <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent font-cinzel">
      Заголовок
    </h3>
  </div>
  <p className="text-gray-300">Содержимое карточки</p>
</div>
```

### Пример кнопки с иконкой

```tsx
<Button onClick={handleClick} className="hover:scale-105 transition-transform duration-300">
  <span className="flex items-center space-x-2">
    <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
    <span>Сохранить</span>
  </span>
</Button>
```

---

**Последнее обновление:** 15.10.2025
**Версия:** 1.0.0

