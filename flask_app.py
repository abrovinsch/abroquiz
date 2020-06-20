from flask import Flask, render_template
from backend import abroquiz
from markupsafe import escape

app = Flask(__name__)

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

@app.teardown_appcontext
def teardown(exception):
    abroquiz.teardown(exception)
