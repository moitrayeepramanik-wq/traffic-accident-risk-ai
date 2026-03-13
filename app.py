from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = pd.read_csv("../dataset/accidents.csv")

X = data[['Visibility','Temperature']]
y = data['Severity']

model = RandomForestClassifier()
model.fit(X,y)

@app.get("/predict")
def predict(visibility: float, temperature: float):

    prediction = model.predict([[visibility,temperature]])

    if prediction[0] == 1:
        risk = "LOW RISK"
    elif prediction[0] == 2:
        risk = "MEDIUM RISK"
    else:
        risk = "HIGH RISK"

    return {"risk": risk}