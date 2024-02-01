# Imports
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Get config variables
from config import DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME


# Create database engine
engine = create_engine(f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}")

# Create Base for tables' models
Base = declarative_base()

# Create local session
LocalSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)


# Functions to work with Database
def get_db():
    """Provides instance of session that provides access to the database."""

    # Create instance of session
    db = LocalSession()

    try:
        yield db  # Provide session

    finally:
        db.close()  # Close when all work is done
