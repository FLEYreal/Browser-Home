"""Only run this script to install all dependencies for Backend / Frontend!"""

# Libs
import subprocess
import os

# Only if run as main script
if __name__ == "__main__":

    # Define frontend path
    frontend_path = os.path.join(os.path.dirname(__file__), "client")  # ./client
    backend_path = os.path.join(os.path.dirname(__file__), "")  # Same directory

    # Create local environment
    subprocess.run(["python", "-m", "venv", "venv"], cwd=frontend_path, text=True, shell=True)

    # Install dependencies
    subprocess.run(["npm", "install"], cwd=frontend_path, text=True, shell=True)
    subprocess.run(["pip", "install", "-r", "requirements.txt"], cwd=backend_path, text=True, shell=True)

    # Run the script
    subprocess.run(["python", "main.py"], cwd=backend_path, text=True, shell=True)
