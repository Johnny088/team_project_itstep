# Вибираємо офіційний образ Python
FROM python:3.13-slim

# Встановлюємо робочу директорію
WORKDIR /app

# Встановлюємо системні залежності (якщо потрібні для БД чи збірки)
RUN apt-get update && apt-get install -y libpq-dev gcc

# Встановлюємо залежності Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо весь проєкт бекенду
COPY . .

# Збираємо статичні файли та запускаємо сервер через gunicorn
EXPOSE 8000
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]