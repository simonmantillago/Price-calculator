let counter = 1;

function add2Counter (counter){
    counter += 1;
    return knowPage(counter);
}

function sub2Counter (counter){
    counter -= 1;
    return knowPage(counter);
}

function knowPage (counter){
    switch (counter){
        case 1:
            return "page-1";
        case 2:
            return "page-2";
        case 2.1:
            return "page-2.1";
        case 3:
            return "page-3";
        case 4:
            return "page-4";
        case 5:
            return "page-5";
        case 6:
            return "page-6";
        case 7:
            return "page-7";
        case 8:
            return "page-8";
        case 9:
            return "page-9";
        case 10:
            return "page-10";
    }
}

function knowContainer(counter){
    const container = document.getElementById(`${knowPage(counter)}`);
    return container;
}

const btn = document.querySelectorAll('page-option');
const back = document.getElementById('back');

btn.forEach(button => {
    button.addEventListener('click', () => {
        let container = knowContainer(counter);
        container.style.display = 'none';
        counter = add2Counter(counter);
        container = knowContainer(counter);
        container.style.display = 'flex';
    });
})

back.addEventListener('click', () =>{
    let container = knowContainer(counter);
    container.style.display = 'none';
    counter = sub2Counter(counter);
    container = knowContainer(counter);
    container.style.display = 'flex';
});
