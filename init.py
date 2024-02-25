"""Only run this script to install all dependencies for Backend / Frontend!"""

# Libs
import subprocess
import sys
import os
import platform
import shutil

def create_startup_script():

    # Get file system's encoding
    filesystem_encoding = sys.getfilesystemencoding()

    # Creation of bat file for startup on system startup
    current_directory = os.path.dirname(os.path.realpath(__file__))
    startup_script_path = os.path.join(current_directory, 'startup.bat')

    # Path's transformation into bytes
    main_script_path_bytes = os.path.join(current_directory, 'client').encode(filesystem_encoding)
    main_script_path_decoded = main_script_path_bytes.decode(filesystem_encoding)

    # Create insides of "startup.bat"
    with open(startup_script_path, 'w', encoding=filesystem_encoding) as file:
        file.write(f'@echo off\nchcp 65001\n\nREM Start FastAPI (uvicorn)\nstart "FastAPI" /B cmd /C uvicorn "app:app" --reload --port 8001\n\nREM Wait for a moment to allow FastAPI to start before launching Next.js\ntimeout /t 5 /nobreak >nul\n\nREM Start Next.js (Node.js)\nstart "NextJS" /B cmd /C npm start --prefix "{main_script_path_decoded}"\n\nexit')

    # Return path
    return startup_script_path


def add_to_startup():

    # Get path to startup script
    startup_script_path = create_startup_script()

    # Add script to startup apps
    if platform.system() == 'Windows':

        # Path to window's startup folder
        startup_folder = os.path.join(
            os.environ['APPDATA'], 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup')

        # Copying file into window's startup folder
        try:
            shutil.copy(startup_script_path, startup_folder)
            print('Browser-Home successfully added to startup page')

        except Exception as e:
            print(
                f'Error happened while trying to add Browser-Home to startup page: {e}')

    elif platform.system() == 'Linux':
        # Legends say that one day... this "pass" will be gone!
        pass


# Only if run as main script
if __name__ == "__main__":

    # Define frontend path
    frontend_path = os.path.join(
        os.path.dirname(__file__), "client")  # ./client
    backend_path = os.path.join(
        os.path.dirname(__file__), "")  # Same directory

    # Add script to startup apps
    add_to_startup()

    # Install backend dependencies
    subprocess.run(["pip", "install", "-r", "requirements.txt"],
                cwd=backend_path, text=True, shell=True)

    # Install frontend dependencies
    subprocess.run(["npm", "install"], cwd=frontend_path,
                text=True, shell=True)

    # Build a fronted application
    subprocess.run(["npm", "run", "build"], cwd=frontend_path,
                text=True, shell=True)