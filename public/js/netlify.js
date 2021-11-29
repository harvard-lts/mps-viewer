
function getObjectType() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var letters = /^[A-Za-z]+$/;
    var objectType = url.searchParams.get("type");
    if (!letters.test(objectType) || objectType === undefined || objectType === null ) {
        objectType='ids';
    }
    return objectType;
}

function getObjectId() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var numbers = /^[0-9]+$/;
    var objectId = url.searchParams.get("id");
    if (!numbers.test(objectId)) {
        objectId = 44753773;
    }
    return objectId;
}
