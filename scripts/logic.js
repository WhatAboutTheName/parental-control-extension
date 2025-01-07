const action = document.getElementById('action');
const showButton = document.getElementById('show-button');

action.addEventListener('click', function (e) {
    e.stopPropagation();
    let form = document.forms[0];
    const data = new FormData(form);

    console.log(Object.fromEntries(data.entries()), '    form');
});

showButton.addEventListener('click', function (e) {
    e.stopPropagation();
    console.log(e, '   logic show e');
});
