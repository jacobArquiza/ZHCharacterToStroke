let generateButton = document.querySelector("#generate-strokes");
let speakButton = document.querySelector("#speak-button");
let clearButton = document.querySelector("#clear-button");

clearButton.addEventListener('click', clear);

let output = document.querySelector('#output');
generateButton.addEventListener('click', function(event) {
    event.preventDefault();
    generate();
});

let outputHolder = document.querySelector("#output-holder")

let input = document.querySelector("#input")


function checkChinese(char){
    const chineseRegex = /[\u4e00-\u9fff]/;
    if (chineseRegex.test(char)) {
        return true;
    } else {
        return false;
    }
}

function clear(e){
    e.preventDefault();
    outputHolder.id = 'output-holder';
    output.innerHTML = "";
}

function generate() {
    outputHolder.id = '';
    output.innerHTML = "";
    const strInput = input.value;
    let hasChinese = false;

    for (let i = 0; i < strInput.length; i++) {
        const char = strInput[i];
        if (checkChinese(char)) {
            const id = `char${i}`;
            output.innerHTML += `<div class='gifObject' id='${id}'></div>`;
            hasChinese = true;
        }
    }

    for (let i = 0; i < strInput.length; i++) {
        const char = strInput[i];
        if (checkChinese(char)) {
            const id = `char${i}`;
            const gifObject = document.querySelector(`#${id}`);
            const gifWidth = gifObject.offsetWidth*0.70;
            const gifHeight = gifObject.offsetHeight*0.70;

            const writer = HanziWriter.create(id, char, {
                width: gifWidth,
                height: gifHeight,
                strokeColor: '#000',
                showCharacter: false,
                delayBetweenStrokes: 150,
                strokeAnimationSpeed: 3,
                delayBetweenLoops: 5000,
                padding:0
            });

            writer.loopCharacterAnimation();
        }
    }
    if(!hasChinese){
        outputHolder.id = 'output-holder';
    }
}