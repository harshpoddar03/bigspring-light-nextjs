from flask import Flask, jsonify
import requests
from prophet import Prophet
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route('/forecast', methods=['POST'])
def forecast_endpoint():
    # Fetch data from the external API
    response = requests.get("http://localhost:3000/api/historicaldata")
    data = response.json()

    # Convert the data to a pandas DataFrame
    df = pd.DataFrame({
        'ds': data['dates'],
        'y': data['values']
    })

    # Use Prophet for forecasting
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)

    # Return forecasted data
    result = {
        'actual_dates': data['dates'],
        'actual_values': data['values'],
        'forecasted_dates': forecast['ds'].tolist(),
        'forecasted_values': forecast['yhat'].tolist()
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
