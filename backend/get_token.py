import os 
import requests
from dotenv  import load_dotenv



def main():
    load_dotenv()

    api_key = os.environ['WEB_API_KEY']
    uri = f"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key={api_key}"

    # test
    EMAIL = 'test001@example.com'
    PASSWORD = 'password'

    data = {"email": EMAIL, "password": PASSWORD, "returnSecureToken": True}
    result = requests.post(url=uri, json=data).json()

    token = result['idToken']


if __name__ == '__main__':
    main()