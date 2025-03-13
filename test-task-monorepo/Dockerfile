# Используем официальный образ Node.js
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем Angular приложение
RUN npx nx build auth-form --prod

# Используем nginx для раздачи статики
FROM nginx:alpine

# Копируем собранные файлы в nginx
COPY --from=builder /app/dist/apps/auth-form /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]