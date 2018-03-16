//--------------- TIMELINE --------------------


(function(){
  function VerticalTimeline( element ) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName("js-cd-block");
    this.images = this.element.getElementsByClassName("js-cd-img");
    this.contents = this.element.getElementsByClassName("js-cd-content");
    this.offset = 0.8;
    this.hideBlocks();
  };

  VerticalTimeline.prototype.hideBlocks = function() {
    //hide timeline blocks which are outside the viewport
    if ( !"classList" in document.documentElement ) {
      return;
    }
    var self = this;
    for( var i = 0; i < this.blocks.length; i++) {
      (function(i){
        if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
          self.images[i].classList.add("cd-is-hidden"); 
          self.contents[i].classList.add("cd-is-hidden"); 
        }
      })(i);
    }
  };

  VerticalTimeline.prototype.showBlocks = function() {
    if ( ! "classList" in document.documentElement ) {
      return;
    }
    var self = this;
    for( var i = 0; i < this.blocks.length; i++) {
      (function(i){
        if( self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
          // add bounce-in animation
          self.images[i].classList.add("cd-timeline__img--bounce-in");
          self.contents[i].classList.add("cd-timeline__content--bounce-in");
          self.images[i].classList.remove("cd-is-hidden");
          self.contents[i].classList.remove("cd-is-hidden");
        }
      })(i);
    }
  };

  var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
    verticalTimelinesArray = [],
    scrolling = false;
  if( verticalTimelines.length > 0 ) {
    for( var i = 0; i < verticalTimelines.length; i++) {
      (function(i){
        verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
      })(i);
    }

    //show timeline blocks on scrolling
    window.addEventListener("scroll", function(event) {
      if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
      }
    });
  }

  function checkTimelineScroll() {
    verticalTimelinesArray.forEach(function(timeline){
      timeline.showBlocks();
    });
    scrolling = false;
  };
})();




//--------------- GOOGLE ANALYTICS -----------------

$(document).ready(function() {
  initializePage();
  $('.addbtn').click(function(e) {
    ga('send', 'event', 'add', 'click')
  });
});

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
  // your code here
}

// --------------- TASK --------------------------

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

function saveTasks(p){
 var arr = document.getElementById("myUL"+p);
            //console.log(typeof(arr));
            var li = arr.getElementsByTagName('li');
            var thisList = new Array();
            for (var i=0; i<li.length; i++){
              thisList.push(li[i].innerText)
            }
            var taskList = JSON.parse(localStorage.getItem("taskList"));
            taskList[p]= thisList;
            localStorage.setItem("taskList", JSON.stringify(taskList));
          }

//---------------- LOCAL STORAGE --------------------

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const clearButton = document.querySelector('clearButton');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  liMaker(input.value);
  input.value = "";
});

data.forEach(item => {
  liMaker(item);
});

clearButton.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});

//-------------- get current date / DATE PICKER----------------
var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleDateString();

$('.datetimepicker').datetimepicker({
  icons: {
    time: "fa fa-clock-o",
    date: "fa fa-calendar",
    up: "fa fa-chevron-up",
    down: "fa fa-chevron-down",
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-screenshot',
    clear: 'fa fa-trash',
    close: 'fa fa-remove'
  }
});

//-------------- LOGIN: currently incomplete -----------------

function login() {
 var email = $('#email').val();
 var password = $('#password').val();
 $.post('/login', {email: email, password: password}, function(data, err) {
  console.log(data);
  window.location.href = "/home";
})
 .fail(function(err) {
  showFormError(
  {
    title: "Error",
    text: err.responseText
  }

  );
  console.log(err.responseText);
});
}

$("#login-btn").click(function(e) {
  login();
});

$('#password').keypress(function (e) {
  var key = e.which;
  if(key == 13 &&  okPressed) 
  {
    okPressed = false;
    login();
    return false;
  }
});

$("#register-btn").click(function(e) {
  var name = $('#reg-name').val();
  var email = $('#reg-email').val();
  var password = $('#reg-password').val();
  if (name == "") {
    showFormError({title: "Error", text: "Please enter a name"});
    return;
  } else if (email == "") {
    showFormError({title: "Error", text: "Please enter an email."});
    return;
  } else if (password == "") {
    showFormError({title: "Error", text: "Please enter a password."});
    return;
  }
  $.post('/register', {
    name: name,
    email: email
    password: password,

  }, function(data) {
    console.log("Successfully created an account!");
    showSuccess({title: "Success!", text: "Sign up success!"});

  }).fail(function(err) {
    showFormError({title: "Error", text: "Email already exists!"});
    console.log("Email already exists!");
  });


});

$('#email').keypress(function (e) {
  var key = e.which;
    if(key == 13 & okPressed)  // the enter key code
    {
      okPressed = false;
      login();
      return false;
    }
  });

});

// Modal from Materials
$('#myModal').modal(options) 


// UPLOAD FILES
var input = document.querySelector('input');
var preview = document.querySelector('.preview');

input.style.opacity = 0;
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  var curFiles = input.files;
  if(curFiles.length === 0) {
    var para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    var list = document.createElement('ol');
    preview.appendChild(list);
    for(var i = 0; i < curFiles.length; i++) {
      var listItem = document.createElement('li');
      var para = document.createElement('p');
      if(validFileType(curFiles[i])) {
        para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
        var image = document.createElement('img');
        image.src = window.URL.createObjectURL(curFiles[i]);

        listItem.appendChild(image);
        listItem.appendChild(para);

      } else {
        para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

var fileTypes = [
'image/jpeg',
'image/pjpeg',
'image/png'
'image/jpg'
'image/gif'
'audio/mp3'
'audio/ogg'
'audio/wav'
'video/mp4'
'video/ogg'
'video/wmv'
'video/avi'
]

function validFileType(file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number > 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number > 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}