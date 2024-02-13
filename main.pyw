"""Run this file to launch project. If it's the first launch, run 'init.py' first to initialize the project. """

# Libs
import uvicorn
import subprocess
import multiprocessing
import os

# Environment variables
from config import SERVER_PORT


# Launch Frontend Server : NextJS
def run_frontend_server():
    # Define path to NextJS frontend directory
    frontend_path = os.path.join(os.path.dirname(__file__), "client")

    # Define command to run frontend
    command = "npm start"

    # Launch NextJS frontend server
    subprocess.run(command, shell=True, text=True, cwd=frontend_path)


# Launch Backend Server : FastAPI
def run_backend_server():
    uvicorn.run("app:app", host="127.0.0.1", port=int(SERVER_PORT))


# If main.py is run
if __name__ == "__main__":

    # Get variables to work with processes of Backend and Frontend Servers
    frontend_server = multiprocessing.Process(target=run_frontend_server)
    backend_server = multiprocessing.Process(target=run_backend_server)

    # Start processes
    frontend_server.start()
    backend_server.start()
