import requests
import json
import codecs
import os
from PIL import Image

def resize_(d, s):
    image_path = 'data/characters/' + d + '/' + d + '.' + s
    img = Image.open(image_path)
    new_image = img.resize((128, 128))
    #new_image = img.resize((32, 32))
    new_image.save('data/characters/' + d + '/' + d + '_pv.' + s)

def dow(d):
    url = "https://enka.network/ui/UI_AvatarIcon_" + d + ".png"
    res = requests.get(url).content
    with open('data/characters/' + d + '/' + d + '.' + url.split('.')[-1], 'wb') as f:
        f.write(res)
    resize_(d, url.split('.')[-1])

fileObj = codecs.open( "data/data.json", "r", "utf_8_sig" )
text = fileObj.read()
jess_dict = json.loads(text)

i = 0
while i < len(jess_dict['data']['characters']):
    print(jess_dict['data']['characters'][i]['nid'])
    os.makedirs('data/characters/' + jess_dict['data']['characters'][i]['nid'], exist_ok=True)
    dow(jess_dict['data']['characters'][i]['nid'])
    i += 1

fileObj.close()