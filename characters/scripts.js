import { charactersList } from "./char-list.js";

// Установка lazy-loading для изображений
document.querySelectorAll("img").forEach(img => img.setAttribute("loading", "lazy"));

document.addEventListener("DOMContentLoaded", function () {
    const getStars = rating => "star ".repeat(rating);

    // Преобразуем все данные при инициализации, чтобы избежать лишних вычислений при рендере
    const characters = charactersList.map(char => ({
        ...char,
        name_lower: char.name.toLowerCase(),
        name_ru_lower: char.name_ru.toLowerCase(),
    })).sort((a, b) => b.rarity - a.rarity || b.id - a.id);

    const charactersContainer = document.getElementById("characters-list");
    const searchInput = document.getElementById("search");
    const sortElement = document.getElementById("sort-element");
    const sortWeapon = document.getElementById("sort-weapon");
    const sortRarity = document.getElementById("sort-rarity");
    const sortRegion = document.getElementById("sort-region");

    // Функция для создания карточки персонажа
    const createCharacterCard = character => `
        <a class="character-card" href="../character/index.html?name=${encodeURIComponent(character.name)}">
            <div class="namecard" style="background-image: url(../characters/${encodeURIComponent(character.name)}/${encodeURIComponent(character.name)}_namecard.webp);">
                <img class="character-icon" src="../characters/${encodeURIComponent(character.name)}/${encodeURIComponent(character.name)}_icon.webp">
                <img class="character-element" src="../res/elements/${encodeURIComponent(character.element).toLowerCase()}.png">
                <img class="character-weapon" src="../res/weaponType/${encodeURIComponent(character.weapon).toLowerCase()}.png">
            </div>
            <div class="bottom-namecard">
                <span class="character-name gen">${character.name_ru}</span>
                <span class="character-rarity mat">${getStars(character.rarity)}</span>
            </div>
        </a>
    `;

    // Функция рендеринга персонажей
    const renderCharacters = () => {
        const searchQuery = searchInput.value.toLowerCase();
        const elementFilter = sortElement.value;
        const weaponFilter = sortWeapon.value;
        const rarityFilter = sortRarity.value;
        const regionFilter = sortRegion.value;

        // Фильтрация персонажей
        const filteredCharacters = characters.filter(character =>
            (searchQuery === "" || character.name_lower.includes(searchQuery) || character.name_ru_lower.includes(searchQuery)) &&
            (elementFilter === "" || character.element == elementFilter || character.element === "None") &&
            (weaponFilter === "" || character.weapon === weaponFilter) &&
            (rarityFilter === "" || character.rarity.toString() === rarityFilter) &&
            (regionFilter === "" || character.region === regionFilter)
        );

        // Создание всех карточек и добавление их в контейнер
        const cardsHTML = filteredCharacters.map(createCharacterCard).join('');
        charactersContainer.innerHTML = cardsHTML;
    };

    // Дебаунс для оптимизации поиска
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedRenderCharacters = debounce(renderCharacters, 150);

    // Добавляем обработчики событий
    searchInput.addEventListener("input", debouncedRenderCharacters);
    sortElement.addEventListener("change", renderCharacters);
    sortWeapon.addEventListener("change", renderCharacters);
    sortRarity.addEventListener("change", renderCharacters);
    sortRegion.addEventListener("change", renderCharacters);

    renderCharacters();  // Первый рендер
});
