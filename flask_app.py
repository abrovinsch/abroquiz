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

# A quiz where users can try things out


@app.route('/quiz')
def quiz():
    with app.app_context():
        return render_template("quiztest.html")


# Edit interface
@app.route('/abroquiz/edit')
def edit():
    with app.app_context():
        return render_template("quizedit.html")

### API ###


@app.route('/questions/<quiz_id>')
def get_questions(quiz_id):
    return abroquiz.get_questions(escape(quiz_id))


@app.route('/abroquiz/submit', methods=['POST'])
def add_question():
    content = request.get_json()
    abroquiz.submit_question(
        escape(content["question"]),
        escape(content["answer"]),
        escape(content["quiz_id"]),
        escape(content["question_type"]))
    return get_questions(int(content["quiz_id"]))
