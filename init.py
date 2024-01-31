"""Only run this script to install all dependencies for Backend / Frontend!"""

# Libs
import subprocess
import sys
import os
import platform
import shutil
import pyautogui


def create_startup_script():
    # Определение разделителя пути для текущей ОС
    path_separator = '\\' if platform.system() == 'Windows' else '/'

    # Получение кодировки файловой системы
    filesystem_encoding = sys.getfilesystemencoding()

    # Создание файла запуска в той же папке, где находится init.py
    current_directory = os.path.dirname(os.path.realpath(__file__))
    startup_script_path = os.path.join(current_directory, 'startup.bat')

    # Преобразование пути к main.py в байты и декодирование в кодировку файловой системы
    main_script_path_bytes = os.path.join(
        current_directory, 'main.pyw').encode(filesystem_encoding)
    main_script_path_decoded = main_script_path_bytes.decode(
        filesystem_encoding)

    # Запись команды запуска main.pyw в файл
    with open(startup_script_path, 'w', encoding=filesystem_encoding) as file:
        file.write(
            f'chcp 65001\nstart "Python" /B pythonw "{main_script_path_decoded}"\nexit')

    return startup_script_path


def add_to_startup():

    # Get path to startup script
    startup_script_path = create_startup_script()

    # Add script to startup apps
    if platform.system() == 'Windows':
        # Путь к папке автозагрузки
        startup_folder = os.path.join(
            os.environ['APPDATA'], 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup')

        # Копирование файла в папку автозагрузки
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

    # Create local environment
    subprocess.run(["python", "-m", "venv", "venv"],
                   cwd=frontend_path, text=True, shell=True)

    # Install dependencies
    subprocess.run(["npm", "install"], cwd=frontend_path,
                   text=True, shell=True)
    subprocess.run(["pip", "install", "-r", "requirements.txt"],
                   cwd=backend_path, text=True, shell=True)

    # Run the script
    subprocess.run(["python", "main.pyw"],
                   cwd=backend_path, text=True, shell=True)
