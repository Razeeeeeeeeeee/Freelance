#!/bin/bash

cd ./frontend

npm run dev &
NPM_PID=$!

cd ../backend
source .venv/bin/activate 

cd ./backend
python manage.py runserver &
PYTHON_PID=$!

stop_servers() {
  echo "Stopping servers..."
  kill $NPM_PID
  kill $PYTHON_PID
  echo "Servers stopped."
}

trap stop_servers SIGINT SIGTERM

wait $NPM_PID
wait $PYTHON_PID