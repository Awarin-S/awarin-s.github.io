const char_name = new URL(window.location.href).searchParams.get("name");

function getElementInfo(element) {
    const elements = {
        Pyro: { color: "#FF4500", element: "Пиро" },
        Hydro: { color: "#00BFFF", element: "Гидро" },
        Anemo: { color: "#3CB371", element: "Анемо" },
        Electro: { color: "#8A2BE2", element: "Электро" },
        Dendro: { color: "#228B22", element: "Дендро" },
        Cryo: { color: "#ADD8E6", element: "Крио" },
        Geo: { color: "#DAA520", element: "Гео" }
    };

    return elements[element] || { color: "#FFFFFF", name: "Неизвестный элемент" };
}

function getWeaponType(weapon) {
    const weapons = {
        Sword: "одноручный мечник",
        Claymore: "двуручный мечник",
        Polearm: "копейщик",
        Bow: "лучник",
        Catalyst: "катализатор"
    };

    return weapons[weapon] || "Неизвестное оружие";
}

const weaponTypes = {
    'одноручный мечник': 'Одноручный',
    'двуручный мечник': 'Двуручный'
};

function formatDate(value) {
    const months = {
        1: "января", 2: "февраля", 3: "марта", 4: "апреля",
        5: "мая", 6: "июня", 7: "июля", 8: "августа",
        9: "сентября", 10: "октября", 11: "ноября", 12: "декабря"
    };

    let parts = value.toString().split(".");
    let day = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    let year = parts[2] ? parseInt(parts[2]) : null;

    if (!months[month]) return "Неверная дата";

    return year ? `${day} ${months[month]} ${year} г.` : `${day} ${months[month]}`;
}

async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        const charData = data[char_name]
        const charElement = getElementInfo(charData.ru.element);
        console.log(charData);
        console.log(charElement);

        document.getElementById("bg").innerHTML = `<source src="../res/elements/bg/${(charData.ru.element).toLowerCase()}.webm" type="video/webm">`;

        char_icon = document.querySelector('.character-prof-icon');
        char_icon.src = `../characters/${char_name}/${char_name}_icon.webp`;
        function getBG(num) {return num === 5 ? "linear-gradient(45deg, #FFD700, #FFAA00, #FF8000, #FF4500)" :
            "linear-gradient(45deg, #8A2BE2, #7A3FF3, #9B59B6, #8B00FF)";}
        char_icon.style.setProperty('background', getBG(charData.ru.rarity));

        char_element = document.querySelector('.character-prof-element');
        char_element.src = `../res/elements/${(charData.ru.element).toLowerCase()}.png`;

        char_prof_name = document.querySelector('.character-prof-name');
        char_prof_name.textContent = `${charData.ru.name_ru}`;

        char_prof_detail = document.querySelector('.character-prof-detail');
        char_prof_detail.textContent = `${charData.ru.more.detail}`;
        
        if (weaponTypes[getWeaponType(charData.ru.weapon)]) {
            char_prof_element = document.querySelector('.element');
            char_prof_element.textContent = `${(charElement.element).toLowerCase()}`;
            char_prof_element.style.color = `${charElement.color}`;

            document.styleSheets[0].insertRule(`.element::before { display: block; margin-right: 4px; content: "${weaponTypes[getWeaponType(charData.ru.weapon)]}"; color: var(--font-color-1); }`, 0);
            char_prof_weapon = document.querySelector('.weapon');
            char_prof_weapon.textContent = `${getWeaponType(charData.ru.weapon).split(' ')[1]}`;
        }else{
            char_prof_element = document.querySelector('.element');
            char_prof_element.textContent = `${charElement.element}`;
            char_prof_element.style.color = `${charElement.color}`;


            char_prof_weapon = document.querySelector('.weapon');
            char_prof_weapon.textContent = `${getWeaponType(charData.ru.weapon)}`;
        }
        char_prof_sub = document.querySelector('.level');
        char_prof_sub.textContent = `${(charData.ru.elevation.sub).replace(/[%\s]+$/, "")}`;

        char_prof_birthday = document.querySelector('.birthday');
        char_prof_birthday.textContent = `${formatDate(charData.ru.more.birthday)}`;

        char_prof_release = document.querySelector('.release');
        char_prof_release.textContent = `${formatDate(charData.ru.more.release)}`;

        char_prof_constellation = document.querySelector('.constellation');
        char_prof_constellation.textContent = `${charData.ru.more.constellation}`;
        
        char_prof_group = document.querySelector('.group');
        char_prof_group.textContent = `${charData.ru.more.group}`;

        char_gacha = document.querySelector('.gacha');
        char_gacha.src = `../characters/${char_name}/${char_name}_gacha.webp`;

    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

loadJSON(`../characters/${char_name}/${char_name}.json`);

document.addEventListener('scroll', function() {
    const gachaImage = document.querySelector('.gacha');
    const lPage = document.querySelector('.l-page');
    const gachaImageRect = gachaImage.getBoundingClientRect();
    const lPageRect = lPage.getBoundingClientRect();
    
    // Определяем, когда изображение начинает пересекаться с .l-page
    if (gachaImageRect.top < lPageRect.bottom) {
      // Вычисляем, насколько изображение пересекается с .l-page
      const overlap = Math.min(gachaImageRect.bottom - lPageRect.top, gachaImageRect.height);
      const percentage = (overlap / gachaImageRect.height) * 100;
  
      // Применяем clip-path, чтобы скрыть часть изображения
      gachaImage.style.clipPath = `inset(0 0 ${percentage}% 0)`;
    } else if (gachaImageRect.bottom <= lPageRect.top) {
      // Если изображение полностью за элементом .l-page, скрываем его полностью
      //gachaImage.style.clipPath = 'inset(0 0 100% 0)';
    } else {
      // Если изображение полностью видимо, сбрасываем clip-path
      gachaImage.style.clipPath = 'inset(0 0 0 0)';
    }
  });