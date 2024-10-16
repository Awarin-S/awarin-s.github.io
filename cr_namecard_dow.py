import requests
import json
import codecs
import os
from PIL import Image

def resize_(d, s):
    image_path = 'data/characters/' + d + '/' + d + '_namecard.' + s
    img = Image.open(image_path)
    new_image = img.resize((267, 128))
    new_image.save('data/characters/' + d + '/' + d + '_namecard_pv.jpeg', "JPEG", quality=100, optimize=True, progressive=True)

def dow(d):
    if d == 'Momoka':
        d = 'Kirara'
    if d == 'Yae':
        d = 'Yae1'
    if d == 'PlayerBoy':
        d = '0'
    if d == 'PlayerGirl':
        d = 'Ysxf5'
    url = "https://enka.network/ui/UI_NameCardPic_" + d + "_P.jpg"
    if d == 'Kirara':
        d = 'Momoka'
    if d == 'Yae1':
        d = 'Yae'
    if d == '0':
        d = 'PlayerBoy'
    if d == 'Ysxf5':
        d = 'PlayerGirl'
    res = requests.get(url).content
    with open('data/characters/' + d + '/' + d + '_namecard.' + url.split('.')[-1], 'wb') as f:
        f.write(res)
    resize_(d, url.split('.')[-1])

fileObj = codecs.open( "data/data.json", "r", "utf_8_sig")
text = fileObj.read()
jess_dict = json.loads(text)

i = 0
while i < len(jess_dict['data']['characters']):
    print(jess_dict['data']['characters'][i]['nid'])
    os.makedirs('data/characters/' + jess_dict['data']['characters'][i]['nid'], exist_ok=True)
    dow(jess_dict['data']['characters'][i]['nid'])
    i += 1

fileObj.close()