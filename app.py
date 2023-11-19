from flask import Flask, render_template

app = Flask(__name__)


@app.route("/", methods=['GET'])
def home_page():
    return render_template("index.html")


@app.route("/grade-semanal", methods=['GET'])
def grade():
    return render_template("grade-semanal.html")


@app.route("/plano-de-curso", methods=['GET'])
def plano_de_curso():
    return render_template("grade-semanal.html")


@app.route("/disciplina/<name>")
def disciplina(name):
    return render_template("disciplina-page.html", disciplina=name)


if __name__ == "__main__":
    app.run(debug=True)
