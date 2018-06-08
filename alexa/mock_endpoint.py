from flask import Flask, jsonify, request

app = Flask(__name__)
people_locations = {}


@app.route('/<name>', methods=['GET',])
def get_office(name):
    data = {
        'location': people_locations[name]
    }
    return jsonify(data)


@app.route('/<name>/update', methods=['POST',])
def set_office(name):
    # TODO this is coming in as some sort of binary blob, FIXME
    people_locations[name] = request.json['location']
    return jsonify({'status': 'success'})


if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5001)
