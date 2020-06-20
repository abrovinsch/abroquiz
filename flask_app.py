from flask import Flask, render_template

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
