# Handwriting to Text (OCR – Optical Character Recognition Model)

## Purpose
This project aims to build a simple OCR (Optical Character Recognition) system as a learning exercise to understand the basics of Artificial Intelligence and Machine Learning.

## Description
The system allows users to write a single capital letter (A-Z) or number (0-9) in a designated area. The image is then analyzed using a trained model, and the predicted character is displayed in an output box. This interactive system provides a user-friendly way to test the recognition capabilities of the OCR model.

## Languages and Libraries Used

### Python (v3.10.13)
- **Flask**
- **OpenCV**
- **Matplotlib**
- **TensorFlow**
- **Keras**
- **Pandas**
- **Numpy**
- **SciKit-Learn**
- **CSV**
- **Random**

### HTML5

### CSS3

### JavaScript
- **JQuery**
- **Ajax**

## Dataset
- **Total Samples**: 884,900
  - Originally 442,450 samples were duplicated and inversed in color scale, then combined with the original dataset.
- **Train-Test Split Ratio**: 70-30
  - **Training Set**: 619,429
  - **Testing Set**: 265,470

## Model Summary
- **Total Parameters**: 683,044 (2.61 MB)
- **Trainable Parameters**: 683,044 (2.61 MB)

## Model Compilation
- **Loss Function**: Categorical Cross Entropy
- **Optimizer**: Adam
- **Model Accuracy**: 97.94% (0.9794289469718933)

## Future Scope
The current OCR model is trained using an Artificial Neural Network (ANN), which may not recognize patterns effectively. For improved accuracy and pattern recognition, the model should be trained using a Convolutional Neural Network (CNN).

## References
- [Kaggle Datasets](https://www.kaggle.com/)

## Guided By
- Mr. Sheel Shah

## Efforts By
- Mr. Neelotpal Debasis Santra
- Mr. Ronak Manishkumar Parmar

---
