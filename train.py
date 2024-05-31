import keras
import tensorflow as tf
import numpy as np
import pandas as pd
import csv

class Train:
    @staticmethod
    def fine_tune():
        # Loading the model
        model = keras.models.load_model("OCR CNN.h5")
        
        # Loading the original and the feedback CSV files
        # df = pd.read_csv("combined_ocr_dataset.csv")
        # new_df = pd.read_csv("feedback.csv")
        
        # Appending the new data with the original dataset
        # df = pd.concat([df, new_df])

        # Freezing the layers
        for layer in model.layers[:3]:
            layer.trainable = False
            print(f"Layer {layer.name} in use: {layer.trainable}")

        print("============================================================================")
        
        for layer in model.layers:
            print(f"Layer {layer.name}: Trainable = {layer.trainable}")


        # Loading the model
        print(model.summary())

Train().fine_tune()