let generateButton = document.querySelector("#generate-strokes");

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

function generate() {
    outputHolder.id = '';
    output.innerHTML = "";
    const strInput = input.value;

    for (let i = 0; i < strInput.length; i++) {
        const char = strInput[i];
        if (checkChinese(char)) {
            const id = `char${i}`;
            output.innerHTML += `<div class='gifObject' id='${id}'></div>`;
        }
    }

    for (let i = 0; i < strInput.length; i++) {
        const char = strInput[i];
        if (checkChinese(char)) {
            const id = `char${i}`;
            const gifObject = document.querySelector(`#${id}`);
            const gifWidth = gifObject.offsetWidth*0.95;
            const gifHeight = gifObject.offsetHeight*0.95;

            const writer = HanziWriter.create(id, char, {
                width: gifWidth,
                height: gifHeight,
                strokeColor: '#000',
                showCharacter: false,
                delayBetweenStrokes: 150,
                strokeAnimationSpeed: 3,
                delayBetweenLoops: 5000
            });

            writer.loopCharacterAnimation();
        }
    }
}