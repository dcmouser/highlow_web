# highlow_web
High &amp; Low Web Services

This repository is for software to support High & Low web services (online game authoring and playtesting)

# Instructions

THIS SECTION NEEDS A FULL WRITE UP

This project uses NodeJS and Python so both are required to install.
It also uses Poetry so be sure to install that globally with Python.

This assumes you are using windows.

(Optional: You can configure poetry to create virtual environment in project with `poetry config virtualenvs.in-project true`)
### To start back-end server:
1. Enter `poetry shell` in the terminal from the root folder
2. Install dependencies locally with `poetry install`
3. Go to src with `cd src`
4. Start server with `uvicorn hlweb:app`

### To start frontend server:
1. Open up a second terminal from the root folder
2. Go into the React folder with `cd frontend/react`
3. Install dependencies locally with `npm install`
4. Once done, start the front-end with `npm run start`