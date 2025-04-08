const submitForm = () => {
    let formData = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        password: $('#password').val(),
        email: $('#email').val()
    };
    console.log("Form Data Submitted:", formData);
    M.toast({ html: 'Form submitted successfully!', classes: 'rounded' });
};

const addCards = (items) => {
    $("#card-section").empty();

    // Load cards from database
    items.forEach(item => {
        let itemToAppend = `
        <div class="col s4 center-align">
          <div class="card medium">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${item.image}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">
                ${item.title}<i class="material-icons right">more_vert</i>
              </span>
              <p><a href="#">${item.link}</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">
                ${item.title}<i class="material-icons right">close</i>
              </span>
              <p class="card-text">${item.description}</p>
            </div>
          </div>
        </div>`;
        $("#card-section").append(itemToAppend);
    });
};

const getProjects = () => {
    $.get('/api/projects', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
};

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('#formSubmit').click(submitForm);
    getProjects();
});
