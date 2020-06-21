from flask import Flask, render_template, request
from backend import abroquiz
from markupsafe import escape

app = Flask(__name__)


@app.teardown_appcontext
def teardown(exception):
    abroquiz.teardown(exception)


# Landing page
@app.route('/')
def landingpage():
    with app.app_context():
        return render_template("home.html")

# Edit interface


@app.route('/abroquiz/edit')
def edit():
    with app.app_context():
        return render_template("quizedit.html")

### API ###


@app.route('/questions/<quiz_id>/<topic>')
def get_questions(quiz_id, topic):
    return abroquiz.get_questions(escape(quiz_id), escape(topic))


@app.route('/abroquiz/submit', methods=['POST'])
def add_question():
    content = request.get_json()
    abroquiz.submit_question(
        escape(content["question"]),
        escape(content["answer"]),
        escape(content["topic"]))
    return get_questions(0, content["topic"])
