from flask import Flask, render_template

app = Flask(__name__, template_folder='/home/abrovinsch/abroquiz/templates')

# Edit interface
@app.route('/abroquiz/edit')
def edit():
    with app.app_context():
        return render_template("quizedit.html")
