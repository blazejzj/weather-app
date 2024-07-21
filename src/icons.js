function importAll(r) {
    let icons = {};
    r.keys().forEach((item, index) => { icons[item.replace('./', '')] = r(item); });
    return icons;
}

const icons = importAll(require.context('../asset/icons', false, /\.(png|jpe?g|svg)$/));

export default icons;