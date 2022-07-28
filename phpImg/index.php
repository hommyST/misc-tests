<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css">
  <link rel="stylesheet" href="style.css">
  <title>Get img</title>
</head>

<body>
  <main>
    <div class="row">
      <div class="col col-sm-2"></div>
      <div class="col col-sm-4">
        <h1>Получить картинку</h1>
        <!-- <form action="." method="post"> -->
        <div class="selector">
          <label for="width">Ширина</label><input value="400" name="width" type="number">
          <label for="height">Высота</label><input value="300" name="height" type="number">
          <label for="bg_color">Цвет фона</label><input value="#46dc14" name="bg_color" type="color">
          <label for="font_color">Цвет текста</label><input value="#460114" name="font_color" type="color">
          <label for="capture">Подпись</label><input value="foobar" name="capture" type="text">
        </div>
        <p><button class="button button-warning button-round" onclick="getImg()">Получить картинку</button></p>
        <!-- </form> -->
      </div>
      <div class="col col-sm-4">
        <p><img src="" alt="your pic" id="uImg" style="display:none;"></p>
      </div>
      <div class="col col-sm-2"></div>
    </div>
  </main>

  <script>
    function getImg() {
      const uImg = document.querySelector('#uImg');
      const width = document.querySelector('[name="width"]').value;
      const height = document.querySelector('[name="height"]').value;
      const capture = document.querySelector('[name="capture"]').value;
      let bg_color = document.querySelector('[name="bg_color"]').value;
      bg_color = '%23' + bg_color.substr(1);
      let font_color = document.querySelector('[name="font_color"]').value;
      font_color = '%23' + font_color.substr(1);

      let query = `?width=${width}&height=${height}&bg_color=${bg_color}&font_color=${font_color}&capture=${capture}`;

      fetch(`./getImg.php${query}`)
        .then(response => {
          const reader = response.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();

              function pump() {
                return reader.read().then(({
                  done,
                  value
                }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }
          })
        })
        .then(stream => new Response(stream))
        // Create an object URL for the response
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        // Update image
        .then(url => {
          uImg.src = url;
          uImg.style.display = 'block';
        })
        .catch(err => console.warn(err));
    }
  </script>

</body>

</html>