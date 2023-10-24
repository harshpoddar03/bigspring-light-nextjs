from flask import Flask, request, jsonify
from prophet import Prophet
import pandas as pd

app = Flask(__name__)

@app.route('/forecast', methods=['POST'])
def forecast_endpoint():
    data = request.json['data']
    df = pd.read_csv('RELIANCE.NS.csv')
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)
    return jsonify(forecast.to_dict())

if __name__ == '__main__':
    app.run(debug=True, port=5000)
