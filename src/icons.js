function importAll(r) {
    let icons = {};
    r.keys().forEach((item) => {
        const key = item.replace('./', '').replace('.svg', '');
        icons[key] = r(item);
    });
    return icons;
}

// Import all SVG files from the icons directory
const icons = importAll(require.context('../asset/icons', false, /\.svg$/));


export default icons;
