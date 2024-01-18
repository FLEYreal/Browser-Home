# Libs
import uvicorn

# If main.py is run
if __name__ == "__main__":

    # Launch FastAPI server
    uvicorn.run("app:app", host="0.0.0.0", port=8000)
