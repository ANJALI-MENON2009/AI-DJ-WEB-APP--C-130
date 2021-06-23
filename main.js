song ="" ;
rightWristScore = 0;
leftWristScore = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload() {
    song = loadSound("music.mp3") ;
}

function setup() {
    canvas = createCanvas(600, 500) ;
    canvas.position(500, 250) ;
    video = createCapture(VIDEO) ;
    video.hide() ;

    poseNet = ml5.poseNet(video, modelLoaded) ;
    poseNet.on('pose', gotResult) ;
}

function draw() {
    image(video, 0, 0, 600, 500) ;
    if(leftWristScore>0.2)  {
        console.log("left wrist =" + leftWristScore) ;
        fill('#ff0000') ;
        stroke('000000') ;
        circle(leftWristX, leftWristY, 20) ;
        NumberleftWristY = Number(leftWristY) ;
        NumberleftWristY = floor(NumberleftWristY) ;
        Volume = NumberleftWristY / 500 ;
        document.getElementById("volume_label").innerHTML = "Volume:" + Volume ;
        song.setVolume(Volume) ;
    }
    if(rightWristScore>0.2)  {
        console.log("right wrist =" + rightWristScore) ;
        fill('#ff0000') ;
        stroke('000000') ;
        circle(rightWristX, rightWristY, 20) ;
        if(rightWristY>0 && rightWristY <= 100) {
            song.rate(0.5) ;
            document.getElementById("speed_label").innerHTML = "Speed: 0.5x" ;
        }
        if(rightWristY>100 && rightWristY <= 200) {
            song.rate(1) ;
            document.getElementById("speed_label").innerHTML = "Speed: 1x" ;
        }
        if(rightWristY>200 && rightWristY <= 300) {
            song.rate(1.5) ;
            document.getElementById("speed_label").innerHTML = "Speed: 1.5x" ;
        }
        if(rightWristY>300 && rightWristY <= 400) {
            song.rate(2) ;
            document.getElementById("speed_label").innerHTML = "Speed: 2x" ;
        }
        if(rightWristY>400) {
            song.rate(2.5) ;
            document.getElementById("speed_label").innerHTML = "Speed: 2.5x" ;
        }
    }
}
function modelLoaded() {
    console.log("Model loaded.") ;
}

function gotResult(results) {
    console.log(results) ;

    rightWristScore = results[0].pose.keypoints[9].score ;
    // console.log("right wrist =" + rightWristScore) ;
    leftWristScore = results[0].pose.keypoints[10].score ;
    // console.log("left wrist =" + leftWristScore) ;
    rightWristY = results[0].pose.rightWrist.y ;
    rightWristX = results[0].pose.rightWrist.x - 25;
    leftWristY = results[0].pose.leftWrist.y;
    leftWristX = results[0].pose.leftWrist.x - 25 ;

}
function play() {
    song.play() ;
    song.rate(1) ;
    song.setVolume(1) ;
}