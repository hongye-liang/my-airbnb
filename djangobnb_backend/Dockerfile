FROM python:3.12-slim

WORKDIR /usr/src/djangobnb_backend

ENV PYTHONDONTWRITEBYECODE 1

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
 && apt-get install -y --no-install-recommends netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/djangobnb_backend/entrypoint.sh
RUN chmod +x /usr/src/djangobnb_backend/entrypoint.sh

COPY . .

ENTRYPOINT [ "/usr/src/djangobnb_backend/entrypoint.sh" ]