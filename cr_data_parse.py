import os
import json
from bs4 import BeautifulSoup
import requests
import json
import codecs
import re

def par(nid, n, e, r, w, el, i):
    #temp = bs.find('h2', 'pi-item pi-item-spacing pi-title pi-secondary-background')
    #print(temp.text)
    url = 'https://genshin-impact.fandom.com/ru/wiki/' + n
    url2 = 'https://genshin-impact.fandom.com/en/wiki/' + e
    response = requests.get(url)
    response2 = requests.get(url2)
    bs = BeautifulSoup(response.text,"lxml")
    bs2 = BeautifulSoup(response2.text,"lxml")
    name_ru = bs.find('h2', 'pi-item pi-item-spacing pi-title pi-secondary-background')
    briefly = bs.find('div', 'pi-data-value pi-font')
    if bs.find('div', 'description__text') == None:
        description = 'Отсутствует'
    else:
        description = bs.find('div', 'description__text')
        description = str(description).replace('<br/>', '\n')
        description = re.sub(r'<.*?>', '', description)
        #description = description.text
    print(description)
    #else:
        #description = bs.find('span', 'mw-page-title-main')
    #birthday = bs.find_all('div', 'pi-data-value pi-font')
    constellation = bs.find_all('div', 'pi-data-value pi-font')
    region = bs.find_all('div', 'pi-data-value pi-font')
    #group = bs.find_all('div', 'pi-data-value pi-font')
    skill_1 = bs.find_all('table', 'wikitable talent_table')
    constellations = bs.find_all('table', 'wikitable tdc1 tdc2')
    ele = bs.find_all('table', 'wikitable')
    mat = bs2.find_all('table', 'wikitable ascension-stats')
    data = {nid: {
                'name': e,
                'name_ru': name_ru.text,
                'element': el,
                'weapon': w,
                'rarity': r,
                'briefly': briefly.text,
                #'birthday': birthday[5].text,
                'constellation': constellation[6].text,
                'region': region[7].text,
                #'group': group[0].text,
                'description': str(description),
                'skills': [
                    {
                        'skill_name': skill_1[0].find_all('td')[1].text.rstrip(),
                        'skill_desc': skill_1[0].find_all('td')[3].text.rstrip()
                    },{
                        'skill_name': skill_1[0].find_all('td')[5].text.rstrip(),
                        'skill_desc': skill_1[0].find_all('td')[7].text.rstrip()
                    },{
                        'skill_name': skill_1[0].find_all('td')[9].text.rstrip(),
                        'skill_desc': skill_1[0].find_all('td')[11].text.rstrip()
                    },{
                        'skill_name': skill_1[0].find_all('td')[13].text.rstrip(),
                        'skill_desc': skill_1[0].find_all('td')[15].text.rstrip()
                    },{
                        'skill_name': skill_1[0].find_all('td')[17].text.rstrip(),
                        'skill_desc': skill_1[0].find_all('td')[19].text.rstrip()
                    },{
                        'skill_name': skill_1[0].find_all('td')[21].text.rstrip(),
                        'skill_desc': skill_1[0].find_all('td')[23].text.rstrip()
                    }
                ],
                'constellations': [
                    {
                        'const_name': constellations[0].find_all('td')[2].text.rstrip(),
                        'const_desc': constellations[0].find_all('td')[3].text.rstrip()
                    },{
                        'const_name': constellations[0].find_all('td')[6].text.rstrip(),
                        'const_desc': constellations[0].find_all('td')[7].text.rstrip()
                    },{
                        'const_name': constellations[0].find_all('td')[10].text.rstrip(),
                        'const_desc': constellations[0].find_all('td')[11].text.rstrip()
                    },{
                        'const_name': constellations[0].find_all('td')[14].text.rstrip(),
                        'const_desc': constellations[0].find_all('td')[15].text.rstrip()
                    },{
                        'const_name': constellations[0].find_all('td')[18].text.rstrip(),
                        'const_desc': constellations[0].find_all('td')[19].text.rstrip()
                    },{
                        'const_name': constellations[0].find_all('td')[22].text.rstrip(),
                        'const_desc': constellations[0].find_all('td')[23].text.rstrip()
                    }
                ],
                'elevation': [
                    {
                        '0': {
                            'hp': ele[0].find_all('td')[2].text.rstrip(),
                            'atc': ele[0].find_all('td')[3].text.rstrip(),
                            'def': ele[0].find_all('td')[4].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[5].text.rstrip()
                            }
                        },
                        '20': {
                            'hp': ele[0].find_all('td')[7].text.rstrip(),
                            'atc': ele[0].find_all('td')[8].text.rstrip(),
                            'def': ele[0].find_all('td')[9].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[5].text.rstrip()
                            }
                        }
                    },{
                        '20+': {
                            'hp': ele[0].find_all('td')[12].text.rstrip(),
                            'atc': ele[0].find_all('td')[13].text.rstrip(),
                            'def': ele[0].find_all('td')[14].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[15].text.rstrip()
                            }
                        },
                        '40': {
                            'hp': ele[0].find_all('td')[17].text.rstrip(),
                            'atc': ele[0].find_all('td')[18].text.rstrip(),
                            'def': ele[0].find_all('td')[19].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[15].text.rstrip()
                            }
                        }
                    },{
                        '40+': {
                            'hp': ele[0].find_all('td')[22].text.rstrip(),
                            'atc': ele[0].find_all('td')[23].text.rstrip(),
                            'def': ele[0].find_all('td')[24].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[25].text.rstrip()
                            }
                        },
                        '50': {
                            'hp': ele[0].find_all('td')[27].text.rstrip(),
                            'atc': ele[0].find_all('td')[28].text.rstrip(),
                            'def': ele[0].find_all('td')[29].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[25].text.rstrip()
                            }
                        }
                    },{
                        '50+': {
                            'hp': ele[0].find_all('td')[32].text.rstrip(),
                            'atc': ele[0].find_all('td')[33].text.rstrip(),
                            'def': ele[0].find_all('td')[34].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[35].text.rstrip()
                            }
                        },
                        '60': {
                            'hp': ele[0].find_all('td')[37].text.rstrip(),
                            'atc': ele[0].find_all('td')[38].text.rstrip(),
                            'def': ele[0].find_all('td')[39].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[35].text.rstrip()
                            }
                        }
                    },{
                        '60+': {
                            'hp': ele[0].find_all('td')[42].text.rstrip(),
                            'atc': ele[0].find_all('td')[43].text.rstrip(),
                            'def': ele[0].find_all('td')[44].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[45].text.rstrip()
                            }
                        },
                        '70': {
                            'hp': ele[0].find_all('td')[47].text.rstrip(),
                            'atc': ele[0].find_all('td')[48].text.rstrip(),
                            'def': ele[0].find_all('td')[49].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[45].text.rstrip()
                            }
                        }
                    },{
                        '70+': {
                            'hp': ele[0].find_all('td')[52].text.rstrip(),
                            'atc': ele[0].find_all('td')[53].text.rstrip(),
                            'def': ele[0].find_all('td')[54].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[55].text.rstrip()
                            }
                        },
                        '80': {
                            'hp': ele[0].find_all('td')[57].text.rstrip(),
                            'atc': ele[0].find_all('td')[58].text.rstrip(),
                            'def': ele[0].find_all('td')[59].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[55].text.rstrip()
                            }
                        }
                    },{
                        '80+': {
                            'hp': ele[0].find_all('td')[62].text.rstrip(),
                            'atc': ele[0].find_all('td')[63].text.rstrip(),
                            'def': ele[0].find_all('td')[64].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[65].text.rstrip()
                            }
                        },
                        '90': {
                            'hp': ele[0].find_all('td')[67].text.rstrip(),
                            'atc': ele[0].find_all('td')[68].text.rstrip(),
                            'def': ele[0].find_all('td')[69].text.rstrip(),
                            'sub': {
                                'attr': ele[0].find('span').text.rstrip(),
                                'par': ele[0].find_all('td')[65].text.rstrip()
                            }
                        }
                    }
                ],
                'mat': {}
            }
        }
    
    ascension_table = mat[0]
    ascension_rows = ascension_table.find_all('tr', id='mw-customcollapsible-toggle-ascension')
    ascension_stages = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6']
    stage_idx = 0
    for row in ascension_rows:
        items = row.find_all('span', class_='card-text card-font')
        if items:
            ascension_data = {}
            for idx, item in enumerate(items):
                name = item.find_previous('a')['title']
                qty = item.text.strip()
                ascension_data[idx] = {'name': name, 'len': qty}
            data[nid]['mat'][ascension_stages[stage_idx]] = ascension_data
            stage_idx += 1
    print(n)
    os.makedirs('characters/' + jess_dict['data']['characters'][i]['nid'] + '/', exist_ok=True)
    with open('characters/' + jess_dict['data']['characters'][i]['nid'] + '/' + jess_dict['data']['characters'][i]['nid'] + '.json', 'w', encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

fileObj = codecs.open( "data/data.json", "r", "utf_8_sig" )
text = fileObj.read()
jess_dict = json.loads(text)

print(len(jess_dict['data']['characters']))
i = 0
while i < 90:
    if jess_dict['data']['characters'][i]['nid'] == 'PlayerBoy':
        i += 1
    elif jess_dict['data']['characters'][i]['nid'] == 'PlayerGirl':
        i += 1
    elif jess_dict['data']['characters'][i]['nid'] == 'Tohma':
        i += 1
    else:
        par(jess_dict['data']['characters'][i]['nid'],
            jess_dict['data']['characters'][i]['name_ru'],
            jess_dict['data']['characters'][i]['name'],
            jess_dict['data']['characters'][i]['rarity'],
            jess_dict['data']['characters'][i]['weapon'],
            jess_dict['data']['characters'][i]['element'], i)
        i += 1

fileObj.close()