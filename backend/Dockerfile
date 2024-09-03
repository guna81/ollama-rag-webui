FROM  python:3.11.5-bookworm

ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

WORKDIR /backend

COPY . . 

RUN pip install -r requirements.txt
# copy from the current directory of the Dockerfile to /api in the image

EXPOSE 8000