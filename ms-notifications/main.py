import os
from dotenv import load_dotenv
from azure.communication.email import EmailClient
from flask import Flask, request, jsonify

load_dotenv()

app = Flask(__name__)

@app.route('/send_email', methods=['POST'])
def send_email():
    correo = request.get_json()
    print(correo)
    try:
        connection_string = os.environ.get("CONECTION_STRING")
        client = EmailClient.from_connection_string(connection_string)

        message = {
            "senderAddress": os.environ.get("SENDER_ADRESS"),
            "recipients": {
                "to": [{"address": correo["address"]}],
            },
            "content": {
                "subject": correo["subject"],
                "plainText": correo["plainText"],
            }
        }

        poller = client.begin_send(message)
        result = poller.result()

        return jsonify({"message": "Correo electrónico enviado correctamente"}), 200

    except Exception as ex:
        return jsonify({"error": str(ex)}), 500

if __name__ == "__main__":
    app.run(debug=True)
