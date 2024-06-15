import os
from dotenv import load_dotenv
from azure.communication.email import EmailClient
from flask import Flask, request, jsonify, render_template

load_dotenv()

app = Flask(__name__, template_folder='templates')  # Especifica la carpeta de plantillas

def validate_email_data(data):
    if "address" not in data or "subject" not in data or "plainText" not in data:
        return False
    return True

@app.route('/send_email', methods=['POST'])
def send_email():
    correo = request.get_json()
    print(correo)
    if not validate_email_data(correo):
        return jsonify({"error": "Datos de correo electrónico incompletos"}), 400

    try:
        connection_string = os.environ.get("CONNECTION_STRING")
        client = EmailClient.from_connection_string(connection_string)

        message = {
            "senderAddress": os.environ.get("SENDER_ADDRESS"),
            "recipients": {
                "to": [{"address": correo["address"]}],
            },
            "content": {
                "subject": correo["subject"],
                "html": render_template('html.html', subject=correo["subject"], plainText=correo["plainText"]),
            }
        }

        poller = client.begin_send(message)
        result = poller.result()

        return jsonify({"message": "Correo electrónico enviado correctamente"}), 200

    except KeyError as ex:
        return jsonify({"error": "Campo faltante en los datos de correo electrónico: " + str(ex)}), 400

    except Exception as ex:
        return jsonify({"error": "Error al enviar el correo electrónico: " + str(ex)}), 500

if __name__ == "__main__":
    app.run(debug=True)