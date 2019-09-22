import unicornhathd
from flask import Flask, request, jsonify, render_template
app = Flask(__name__)

width, height = unicornhathd.get_shape()
unicornhathd.brightness(1.0)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/paint', methods=['POST'])
def paint():
    try:
        result = request.json
        for x in range(width):
            for y in range(height):
                if result[x][y] == '1':
                    r, g, b = randint(0, 255), randint(0, 255), randint(0, 255)
                else:
                    r, g, b = 0, 0, 0
                unicornhathd.set_pixel(x, y, r, g, b)
                unicornhathd.show()
        return jsonify({'result': 0})
    except:
        unicornhathd.off()
        return jsonify({'result': 1})

if __name__ == '__main__':
    try:
        app.run(debug=True, host='0.0.0.0', port=8888)
    except KeyboardInterrupt:
        unicornhathd.off()

