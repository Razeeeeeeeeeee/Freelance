# Quickstart
I have moved things around a bit, mostly to keep the backend and the frontend separate
The backend is configured in `django` and the frontend with `ReactJS`
To run the website locally, clone the repo and run

> [!TIP]
> Open two terminals, one for the backend and the other for frontend

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

## Alternatively
```bash
./start.sh
```

> [!IMPORTANT]
> The backend endpoints are configured as follows
>   `/api/employee_upload` for uploading files of the employer
>   `/api/candidate_upload` for uploading files of the candidate
> The files are configured to be saved in the `/uploads` folder in the backend in their own respective folders

# Todo
- [x] Add support for the home page 
- [x] Add support for candidate page 
- [x] Add support for candidate manual entry
- [x] Add support for employer page
- [x] Add support for employer manual entry
- [x] Backend for file uploads
- [x] Add final admin page
- [x] Add support for data visualization in the admin page
- [ ] Backend for the algorithm
