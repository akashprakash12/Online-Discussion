var image = document.getElementById("output");
var loadFile = function (event) {
    var inputed = URL.createObjectURL(event.target.files[0]);
    image.src = inputed;
};

var fileInput = document.getElementById("uploadVideoFile");
$("#uploadVideoFile").on("change", function () {
    var fileInput = document.getElementById("uploadVideoFile");
    if ("files" in fileInput) {
        if (fileInput.files.length === 0) {
            alert("Select a file to upload");
        } else {
            var $source = $("#videoSource");
            $source[0].src = URL.createObjectURL(this.files[0]);
            $source.parent()[0].load();
            $("#videoSourceWrapper").show();
        }
    }
});
