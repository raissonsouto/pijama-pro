from flask import Flask, render_template


app = Flask(__name__)


@app.route("/", methods=['GET'])
def home_page():
    return render_template("index.html")


@app.route("/grade-semanal", methods=['GET'])
def grade():
    return render_template("grade-semanal.html")


@app.route("/sobre", methods=['GET'])
def sobre():
    return render_template("sobre.html")


if __name__ == "__main__":
    app.run('0.0.0.0', debug=False)
