export function titleCase(s){
    return s.toLowerCase().split(' ').map(
    function (word){return word.charAt(0).toUpperCase() + word.slice(1)}).join(' ')
}

export function truncate(str){
    var dots = str.length > length ? '...' : '';
    return str.substring(0, length)+dots;
}