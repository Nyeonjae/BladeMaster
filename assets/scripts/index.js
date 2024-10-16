const $select = document.getElementById('select');

$select.addEventListener('change', () => {
    const firstOption = $select.options[0];
    if ($select.selectedIndex !== 0) {
        firstOption.style.display = 'none';
    }
    else {
        firstOption.style.display = 'block';
    }
});

const boardText = document.getElementById("boardText");
const titleText = document.querySelector("span.text:nth-of-type(2)");
const contentText = document.querySelector("span.text:nth-of-type(3)");


function focusText(change, text) {
    change.addEventListener("focus", function() {
        text.style.color = "#2196f3";
    });
    change.addEventListener("blur", function() {
        text.style.color = "";
    });
}
const $selectText = document.getElementById("select");
focusText($selectText, boardText);

const $titleText = document.querySelector("input[name='title']");
focusText($titleText, titleText);

const $contentText = document.querySelector("textarea[name='content']");
focusText($contentText, contentText);


{
    const $form = document.getElementById('form');

    $form.onsubmit = (e) => {
        e.preventDefault();
        const $board = $form.querySelector('[name= "board"]');
        const $title = $form.querySelector('[name= "title"]');
        const $content = $form.querySelector('[name= "content"]');
        const $result = document.body.querySelector('.result');



        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            if (xhr.status < 200 || xhr.status >= 300) {

                return;
            }
            const responseTEXT = xhr.responseText;
            const response = JSON.parse(responseTEXT);

            if (response['result'] === 'success') {

                $result.innerText = `성공적으로 게시글을 작성하였습니다. 글 번호: ${response.index}`;
                $result.style.color = 'green';
            }
            else {
                $result.innerText = '글 작성에 실패하였습니다. 잠시 후 다시 시도해 주세요.'
                $result.style.color = 'red';
            }
            console.log(response);

        };

        console.log($board.value, $title.value, $content.value)
        const url = new URL(' http://192.168.4.252:24122/article/write');
        url.searchParams.set('board', $board.value)
        url.searchParams.set('title', $title.value)
        url.searchParams.set('content', $content.value)

        xhr.open('GET', url.toString());
        xhr.send();
    $title.value = '';
    $content.value = '';

    }
}







