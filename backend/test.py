import os 
import json
from dotenv  import load_dotenv

load_dotenv()

key_path = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
print(key_path)

with open(key_path, "r") as f:
    json_data = json.load(f)
    #a = Person(**json_data)
    print(json_data)