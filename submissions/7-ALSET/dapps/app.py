from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder="src")

# The address of the deployed smart contract
contract_address = "0xbb514cb8a330cecf1cc0b17db8adb317925696c6"


@app.route('/build/<path:filename>')
def build_static(filename):
    return send_from_directory('build', filename)


@app.route('/')
def home():
    # return redirect(url_for("coins"))
    return render_template("index.html", contract_address=contract_address)


@app.route('/coins')
def coins():
    return render_template("coins.html", contract_address=contract_address)


@app.route('/jobs')
def jobs():
    return render_template("jobs.html", contract_address=contract_address)


@app.route('/claim')
def claim():
    return render_template("claim.html", contract_address=contract_address)


@app.route('/team')
def team():
    return render_template("team.html", contract_address=contract_address)


if __name__ == "__main__":
    app.run()
