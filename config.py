# Imports
from dotenv import load_dotenv
from os import environ

# Load environment variables
load_dotenv()

# Assign environment variables
DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")

DB_NAME = environ.get("DB_NAME")
DB_HOST = environ.get("DB_HOST")
DB_PORT = environ.get("DB_PORT")

SERVER_PORT = environ.get("SERVER_PORT")
