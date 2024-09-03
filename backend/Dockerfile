FROM  python:3.11-slim

# ENV PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libkrb5-3 \
    libkrb5support0 \
    libsqlite3-0 \
    perl-base \
    zlib1g \
    libk5crypto3 \
    libgssapi-krb5-2 \
    libexpat1 \
    gcc-12-base \
    libgcc-s1 \
    libgcrypt20 \
    libncursesw6 \
    libpam-modules \
    libssl3 \
    openssl \
    ncurses-bin \
    ncurses-base \
    login \
    libtinfo6 \
    && apt-get upgrade -y libkrb5-3 libkrb5support0 libsqlite3-0 perl-base zlib1g libk5crypto3 libgssapi-krb5-2 libexpat1 gcc-12-base libgcc-s1 libgcrypt20 libncursesw6 libpam-modules libssl3 openssl ncurses-bin ncurses-base login libtinfo6 \
    && apt-get purge -y --auto-remove && \
    rm -rf /var/lib/apt/lists/* /root/.cache /root/.local

# Working directory
WORKDIR /backend

# Copy files
COPY requirements.txt requirements.txt

# install python dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Add app User and Group
RUN addgroup --system python && adduser --system --group python

# Change ownership of the application files
RUN chown -R python:python /backend

# Set the user to use when running the container
USER python

# Use the virtual environment's Python to run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]