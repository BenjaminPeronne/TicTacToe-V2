const getElementOnClick = (element) => {
    const onclick = element.getAttribute('element');
    if (onclick) {
        return onclick;
    }
    return '';
}