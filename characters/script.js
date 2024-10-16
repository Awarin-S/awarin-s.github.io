function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

const jsonUrl = 'https://raw.githubusercontent.com/Paddfoot/Paddfoot.github.io/main/data/data.json';
const charactersArr = [];

function rarity(star) {
    return '<img class="star" src="../data/res/star.webp">'.repeat(star);
}

async function dataLoad() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        sortCharacters(data['data']['characters']);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function sortCharacters(data) {
    charactersArr.push(...data.sort((a, b) => b.id - a.id));
    displayCharacters(charactersArr)
}

function displayCharacters(filteredCharacters) {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = ''; // Очищаем список перед отрисовкой

    filteredCharacters.forEach(character => {
        const charElement = document.createElement('div');
        charElement.classList.add('character');
        charElement.innerHTML = `
            <a href="${character.nid}/index.html">
                <img class="namecard" src="../data/characters/${character.nid}/${character.nid}_namecard.jpg">
                <div class="ca">
                    <img class="cr_icon" src="../data/characters/${character.nid}/${character.nid}.png">
                    <div class="cc">
                        <img class="cr_element" src="../data/elements/${character.element}.webp">
                        <img class="cr_weapon" src="../data/res/${character.weapon}.png">
                    </div>
                </div>
                <div class="ccd">
                    <span class="cr_name genshin-text">${character.name_ru}</span>
                    <div class="rarity">
                        ${rarity(character.rarity)}
                    </div>
                </div>
            </a>
        `;
        characterList.appendChild(charElement);
    });
}

function filterCharacters() {
    const nameFilter = document.getElementById('name').value.toLowerCase();
    const elementFilter = document.getElementById('element').value;
    const rarityFilter = document.getElementById('rarity').value;
    const weaponFilter = document.getElementById('weapon').value;

    const filteredCharacters = charactersArr.filter(character => {
        const matchesName = character.name_ru.toLowerCase().includes(nameFilter) || character.name.toLowerCase().includes(nameFilter);
        const matchesElement = elementFilter === '' || character.element === elementFilter;
        const matchesRarity = rarityFilter === '' || character.rarity === rarityFilter;
        const matchesWeapon = weaponFilter === '' || character.weapon === weaponFilter;
        
        return matchesName && matchesElement && matchesRarity && matchesWeapon;
    });

    displayCharacters(filteredCharacters);
}

dataLoad();