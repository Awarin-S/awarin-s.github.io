function getHashParams() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return {
        theme: params.get("theme") || "light",
        lang: params.get("lang") || "en"
    };
}
const settings = getHashParams();
console.log("Настройки:", settings);
