# Scaleragency full stack project

## Time log

- Django, django rest api research: **4 hours**
- Django rest api choice (Django-Ninja): **1 hour**
- Django install, first steps: **3 hours**
- Select react UI library (Mantine): **1 hour**
- Reading, parsing Mantine docs: **4 hours**
- Basic db planning: **1 hour**
- Installing postgres on an ubuntu box and connect to it with psycopg: **2 hours**
- Implementing project db models: **3 hours**
- Implementing django-ninja schemes: **2 hours**
- Implementing django-ninja rest api: **4 hours**
- Setting up Mantine project via template: **1 hour**
- Implementing react ui of the project: **10 hours**
- Debug, bug track: **3 hours**
- Implementing populate.py: **2 hours**

## Usage

### prerequisites
- install postgres, create database "scaleragency", user "scaleruser", password: "scalerpwd"
- install python venv
- install django from github (5.2)
- install nodejs>=v20.9.0, npm>=10.9.0

### run project
- activate venv
- in the "populate" folder
- run: python populate.py
- in the "server" folder
- install requirements defined in requirements.txt
- run python manage.py migrate
- run python manage.py runserver 5000
- in the "client" directory
- npm install
- nom run dev
- point your browser to http://localhost:5173

## Missing features
- server tests
- integration tests (however, populate.py is a kind of integration test)
- custom Mantine component, displaying the calendar events
- client tests
- appointment edit function
- appointment delete function
- I misunderstood the specification or the sketch at the end of the specification document (about the employee/employees at an appointment)
- client side notification system (toast?)
- custom exception handling
