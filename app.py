from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def root():
    return render_template("index.html")


@app.route("/grade")
def grade():
    return render_template("grade-semanal.html")


@app.route("/disciplina/<name>")
def disciplina(name):
    return render_template("disciplina-page.html", disciplina=name)


if __name__ == "__main__":
    app.run(debug=True)
