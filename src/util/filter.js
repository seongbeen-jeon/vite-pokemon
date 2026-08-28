export function normalizeKeyword(keyword){
    return keyword
        .trim()
        .toLowerCase();
}

export function cardCodeFilter(code){
    const [set_code, card_no] = code.split(" ");

    return {set_code, card_no};
}