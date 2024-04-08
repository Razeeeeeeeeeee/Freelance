# Quickstart
I have moved things around a bit, mostly to keep the backend and the frontend separate
To run the website locally, clone the repo and run


> [!TIP]
>Open two terminals, one for the backend and the other for frontend

Terminal 1
```bash
cd ./frontend
npm install
npm run dev
```

Terminal 2
```bash
cd ./backend/backend
#setup a virtual env if needed
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```




# Todo
- [x] Add support for the home page 
- [x] Add support for candidate page 
- [ ] Add support for candidate manual entry
- [x] Add support for employer page
- [ ] Add support for employer manual entry
- [x] Backend for file uploads
- [ ] Backend for the algorithm
