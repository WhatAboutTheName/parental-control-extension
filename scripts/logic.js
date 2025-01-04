const action = document.getElementById('action');

action.addEventListener('click', function () {
    let form = document.forms[0];
    const data = new FormData(form);

    console.log(Object.fromEntries(data.entries()), '    entries');
});
