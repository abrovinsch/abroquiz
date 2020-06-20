app = Flask(__name__, template_folder='/home/abrovinsch/abroquiz/templates')

@app.route('/abroquiz/edit')
def edit():
    with app.app_context():
        return render_template("quizedit.html")
