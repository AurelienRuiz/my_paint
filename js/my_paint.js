$(document).ready(function () {

  var canvas = $("#canvas");
  var context = canvas[0].getContext('2d');
  var painting = false;
  var started = false;
  var cursorX, cursorY;
  var size = $("#size").val();
  var color = $('#color-picker').val();
  context.lineJoin = 'round';
  context.lineCap = 'round';
  var output = $("#range-value");
  output.html($('#size').val());
  $('#size').on("input", function () {
    output.html($(this).val());
    size = $(this).val();
  });

  $("#size").oninput = function () {}
  $('#color-picker').change(function () {
    color = $(this).val();
  })

  $('.tool').click(function () {
    $('.tool').removeClass('active');
    $(this).addClass('active');
  })

  canvas.mousedown(function (e) {
    switch ($('.active').attr('id')) {
      case "tool-eraser":
        color = "#FFFFFF";
      case "tool-pen":
        painting = true;
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        break;
      case "tool-line":
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = size;
        context.moveTo(cursorX, cursorY);
        break;
      case "tool-circle1":
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = size;
        context.fillStyle = color;
        break;
      case "tool-circle2":
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = size;
        break;
      case "tool-rect1":
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = size;
        context.fillStyle = color;
        break;
      case "tool-rect2":
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = size;
        break;
      case "tool-text":
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.font = size + 'px Arial';
        context.fillStyle = color;
        text = prompt('Enter text');
        context.fillText(text, cursorX, cursorY);
    }
  });

  canvas.mouseup(function (e) {
    switch ($('.active').attr('id')) {
      case "tool-eraser":
        color = $('#color-picker').val();
      case "tool-pen":
        painting = false;
        started = false;
        break;
      case "tool-line":
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.lineTo(cursorX, cursorY);
        context.stroke();
        break;
      case "tool-circle1":
        cursorX2 = (e.pageX - this.offsetLeft);
        cursorY2 = (e.pageY - this.offsetTop);
        l = Math.pow(cursorX - cursorX2, 2);
        L = Math.pow(cursorY - cursorY2, 2);
        r = Math.sqrt(l + L);
        context.arc(cursorX, cursorY, r, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
        break;
      case "tool-circle2":
        cursorX2 = (e.pageX - this.offsetLeft);
        cursorY2 = (e.pageY - this.offsetTop);
        l = Math.pow(cursorX - cursorX2, 2);
        L = Math.pow(cursorY - cursorY2, 2);
        r = Math.sqrt(l + L);
        context.arc(cursorX, cursorY, r, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
        break;
      case "tool-rect1":
        cursorX2 = (e.pageX - this.offsetLeft) - cursorX;
        cursorY2 = (e.pageY - this.offsetTop) - cursorY;
        context.rect(cursorX, cursorY, cursorX2, cursorY2);
        context.fill();
        context.closePath();
        break;
      case "tool-rect2":
        cursorX2 = (e.pageX - this.offsetLeft) - cursorX;
        cursorY2 = (e.pageY - this.offsetTop) - cursorY;
        context.rect(cursorX, cursorY, cursorX2, cursorY2);
        context.stroke();
        context.closePath();
        break;
    }

  });

  canvas.mousemove(function (e) {
    switch ($('.active').attr('id')) {
      case "tool-eraser":
      case "tool-pen":
        if (painting) {
          cursorX = (e.pageX - this.offsetLeft) - 10;
          cursorY = (e.pageY - this.offsetTop) - 10;
          drawLine();
        }
        break;
    }
  });

  function drawLine() {
    if (!started) {
      context.beginPath();
      context.moveTo(cursorX, cursorY);
      started = true;
    } else {
      context.lineTo(cursorX, cursorY);
      context.strokeStyle = color;
      context.lineWidth = size;
      context.stroke();
    }
  }

  function clear_canvas() {
    context.clearRect(0, 0, canvas.width(), canvas.height());
  }

  $("#clear").click(function () {
    clear_canvas();
  });

  // $("#save").click(function () {
  //   var canvas = $('#canvas');
  //   var img = canvas[0].toDataURL("image/png");
  //   var w=window.open('about:blank','image from canvas');
  //   w.document.write('<img src="' + img + '"/>');
  // });

  $('#open-file').change(function() {
    var img = $('#open-file').val();
    setTimeout(function() {
      context.drawImage(img, 10, 10);
    }, 1000);
  })

  $('#save').click(function(){
    download(canvas, 'canvas.png');
  })

  function download(canvas, filename) {
    var lnk = document.createElement('a'), e;
    lnk.download = filename;
    lnk.href = canvas.toDataURL("image/png, base64");
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }
});
