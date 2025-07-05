from flask import Flask, render_template, request, jsonify
import numpy as np
import cv2
from detector import detect_drowsiness  # Gọi từ file bạn vừa tạo

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect():
    file = request.files['frame']
    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    result = detect_drowsiness(img)  # Kết quả xử lý từ AI
    return jsonify({'status': result})

if __name__ == '__main__':
    app.run(debug=True)
