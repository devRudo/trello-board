
$(document).ready(() => {
    $('#addboard').click((event) => {
        $('#addboard').hide();
        $('#addboardform').toggleClass('d-none');
    });

    $('.deleteBoard').each((i, elem) => {
        $(elem).click((e) => {
            e.preventDefault();
            $(elem).next().toggleClass('d-none');
        });
    });

    $('.deleteBoardDiv').each((i, elem) => {
        $(elem).click((e) => {
            e.preventDefault();
            let obj = {};
            obj.boardId = $(elem).attr('boardId');
            fetch('/deleteBoard', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then((response) => response.json())
                .then((statusObj) => {
                    if (statusObj.statusType === 'success') {
                        $('#status').toggleClass('d-none');
                        $('#status').children().addClass('alert');
                        $('#status').children().addClass('alert-success');
                        $('#status').children().text(statusObj.statusText);
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }
                    else if (statusObj.statusType === 'error') {
                        $('#status').toggleClass('d-none');
                        $('#status').children().addClass('alert');
                        $('#status').children().addClass('alert-danger');
                        $('#status').children().text(statusObj.statusText);
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });
});