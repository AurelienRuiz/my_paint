$(document).ready(function () {

  var canvas = $("#canvas");
  var context = canvas[0].getContext('2d');
  var painting = false;
  var started = false;
  var cursorX, cursorY;
  var restoreCanvasArray = [];
  var restoreCanvasIndex = 0;
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

$("#size").oninput = function() {
}
  $('#color-picker').change(function () {
    color = $(this).val();
  })

  $('.tool').click(function () {
    $('.tool').removeClass('active');
    $(this).addClass('active');
  })

  canvas.mousedown(function (e) {
    switch ($('.active').attr('id')) {
      case "tool-eraser" :
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
        context.moveTo(cursorX, cursorY);
        break;
    }
  });

  canvas.mouseup(function (e) {
    switch ($('.active').attr('id')) {
      case "tool-eraser" : 
        color = $('#color-picker').val();
      case "tool-pen":
        painting = false;
        started = false;
        break;
      case "tool-line":        
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        context.lineTo(cursorX, cursorY);
        context.strokeStyle = color;
        context.lineWidth = size;
        context.stroke();
        break;
    }

  });

  canvas.mousemove(function (e) {
    switch ($('.active').attr('id')) {
      case "tool-eraser" :
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
    }
    else {
      context.lineTo(cursorX, cursorY);
      context.strokeStyle = color;
      context.lineWidth = size;
      context.stroke();
    }
  }

  $("#tool-eraser").click(function () {
    color = "#FFFFFF";
  })

  function clear_canvas() {
    context.clearRect(0, 0, canvas.width(), canvas.height());
  }

  $("#clear").click(function () {
    clear_canvas();
  });

  $("#save").click(function () {
    var canvas_tmp = document.getElementById("canvas");
    window.location = canvas_tmp.toDataURL("image/png");
  });

});