$(document).ready(onReady);

let calculations = [];

function onReady() {
  console.log("ready now");
    // Handling events here
    $(document).on('click', '#equalInput', onSubmit);
    $('#clearBtn').on('click', onClear);
};
function onClear() {
    $('.numInput').val('');

    render();
};
function onSubmit(evt) {
    evt.preventDefault();
        // Get index values
        let num1 = $('#numInput1').val();
        let num2 = $('#numInput2').val();
        let operator = $('.operator').val();

        let calcToHappen = {
            num1,
            num2,
            operator
        }
        calculations.push(calcToHappen);
        console.log(calculations);

        // Sending object to the server
        $.ajax({
            url: '/calculator',
            method: 'POST',
            data: calcToHappen
        })
            .then((response) => {
                console.log('POST /calculator is created:', response)

                getData();
            })
    };      
// function for getting data
// GET //
function getData() {
    $.ajax({
        url: '/calculator',
        method: 'GET'
    })
        .then((response) => {
            calculations = response;
            console.log('GET /calculator', calculations)
            // Rendering the new data
            render();
        })
};
// RENDER //
// emptying the inputs  
function render() {
    $('#historyParent').empty();
    for (let calculation of calculations) {
        $('#historyParent').append(`
            <ul>${calculation.num1} + ${calculation.num2} = ${calculation.total}</ul>
        `);
    }
    // clearing form inputs by setting new value to empty string
    // $('.numInput').val('');
};
