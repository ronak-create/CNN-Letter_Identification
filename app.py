# Import necessary libraries
from flask import Flask, request, jsonify
import base64
import cv2
from flask_cors import CORS
import numpy as np
import pandas as pd
from keras.models import load_model  # Assuming Keras for the model
# import train

# Counter
count = 0

# Define the list of labels for prediction
label_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

# Load the pre-trained OCR model (replace "OCR.h5" with your actual model path)
model = load_model("OCR CNN.h5")

# Load the Feedback CSV file where the corrected data will be saved for further fine-tuning
df = pd.read_csv("feedback.csv")

# External variable for the image data and the label
ext_var = np.array([])
label = ''
    

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for the specified origin (adjust as needed)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

# Define the route for image upload (POST request)
@app.route("/", methods=['POST'])
def upload_image():
    try:
        # Retrieve the image data from the request body
        data = request.get_json()
        if 'imageData' in data.keys():
            global ext_var 
            
            image_data = data.get('imageData')
            
            # Validate image data format (ensure it starts with the base64 data URI prefix)
            if not image_data.startswith('data:image/png;base64,'):
                raise ValueError('Invalid image data format')

            # Extract the base64-encoded image data
            image_base64 = image_data.split(',')[1]
            image_bytes = base64.b64decode(image_base64)

            # Convert base64-encoded bytes to a NumPy array
            nparr = np.frombuffer(image_bytes, np.uint8)

            # Decode the image from the NumPy array using OpenCV
            img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
            ext_var = img

            # Preprocessing the input image
            img = cv2.resize(img, (28, 28), interpolation = cv2.INTER_AREA)       # Resizing the input image to 28 pixels by 28 pixels

            image = img.reshape(-1, 28, 28, 1)                                 # Reshaping the image into the required shape (by the trained model) i.e. into 4D

            # Make prediction using the loaded OCR model
            predicted_label_index = np.argmax(model.predict(image))
            predicted_label = label_list[predicted_label_index]

            # Print the predicted label for debugging purposes
            print(predicted_label)

            # Handle potential errors (e.g., no prediction or invalid label)
            if not predicted_label:
                return 'Error processing image.', 400

            # Create a JSON response with the predicted label
            response = jsonify({'predicted_label': predicted_label})
            print("Image Uploaded Successfully")

            return response
        
        elif 'store_label' in data.keys():
            global label
            global df
            global count


            label_data = data.get('store_label')
            label = label_data
            
            # preprocessing the image before appending it to the CSV File
            ext_var = cv2.resize(ext_var, (28, 28), interpolation=cv2.INTER_AREA)
            ext_var = ext_var.reshape(1, 28 * 28)
            ext_var = pd.DataFrame(ext_var)
            ext_var["class"] = label_list.index(label)

            ext_var.columns = df.columns
            df = pd.concat([df, ext_var], ignore_index=True)

            # Saving the image array of (1, 784) along with class label into a CSV File
            df.to_csv("feedback.csv", index=False)
            print("Success")
            
            # count += 1

            # if count == 128:
            #     train.Train.fine_tune()

            return label_data

    except Exception as e:
        # Catch and handle any unexpected errors
        return f"Error uploading image: {e}", 400

if __name__ == '__main__':
    # Run the Flask development server in debug mode for easy testing
    app.run(debug=True, use_reloader=False)

# import train
# train.Train.fine_tune()