import time
import requests

BASE_URL = "http://127.0.0.1:8000"
DEVICE_ID = "gate-exit-001"


def get_commands():
    url = f"{BASE_URL}/devices/{DEVICE_ID}/commands"
    response = requests.get(url)

    if response.status_code != 200:
        print("Error obteniendo comandos")
        return []

    data = response.json()
    return data.get("commands", [])


def execute_command(command_id):
    url = f"{BASE_URL}/devices/{DEVICE_ID}/commands/{command_id}/execute"
    response = requests.post(url)

    if response.status_code == 200:
        print(f"✅ Comando {command_id} ejecutado")
    else:
        print(f"❌ Error ejecutando comando {command_id}")


def main():
    print(f"🚀 Simulador iniciado para {DEVICE_ID}")

    while True:
        commands = get_commands()

        if commands:
            print(f"📡 {len(commands)} comando(s) recibido(s)")

        for cmd in commands:
            print(f"➡️ Ejecutando {cmd['command_type']} (id={cmd['command_id']})")
            execute_command(cmd["command_id"])

        time.sleep(3)  # polling cada 3 segundos


if __name__ == "__main__":
    main()