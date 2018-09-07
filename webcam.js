function webcam() {
    var video = document.querySelector("#video"),
        canvas = document.querySelector("#canvas"),
        context = canvas.getContext("2d"),
        photo = document.querySelector("#photo");

    var constraints = {
        audio: false,
        video: {
            width: 320,
            height: 240
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            var video = document.querySelector('video');
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        }).catch(function (err) {
            // Old browser support?
            navigator.getMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || // Mozilla
                navigator.msGetUsermedia; // Microsoft IE

            navigator.getMedia({
                video: true,
                audio: false // No need to capture audio
            }, function (stream) {

                video.srcObject = stream;
                video.play();
            }, function (err) {
                // An error occurred. Insert error code here.
            });
        });



    document.querySelector("#capture").addEventListener("click", function () {
        //What I want to draw on
        // (video, IDK, IDK, width, height)
        context.drawImage(video, 0, 0, 320, 240);

        // Grab from the canvas and placing into the photo src, which is the link and where the picture is saved.
        // The src of the file is transferred to "data:image/png;base64[picture's code]"
        // For example, take a picture. Right-click on the pic and you can see its address
        //              bar when you open it in a new tab; however, you cannot copy its image address.
        photo.setAttribute("src", canvas.toDataURL("image/jpeg", 1.0));

        //========================== Forces image to be downloaded ==========================//
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = image;
    });



};

webcam();