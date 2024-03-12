from fastapi import FastAPI

app = FastAPI()

@app.get("/hi")

def greet():
    return "Hello? World?"








def runUvicorn():
    import uvicorn
    print("Running uvicorn...")
    uvicorn.run("hlweb:app", reload=False)

if __name__ == "__main__":
    print("Launching uvicorn as main..")
    runUvicorn()
