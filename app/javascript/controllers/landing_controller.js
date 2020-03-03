import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ['login_by', 'password']
  connect() {
    this.setupTypewriter().type()
  }
  disconnect() { }
  initialize() { }

  onSubmit(event) {
    console.log('----------------onSumit------------------')
    event.preventDefault()
    console.log(event)
    console.log(this.login_byTarget.value)
    console.log(this.passwordTarget.value)
  }

  onClick(event) {
    console.log(event)
    $('#button-submit').click()
  }

  setupTypewriter() {
    let t = document.getElementById('typewriter')
    var HTML = t.innerHTML;

    t.innerHTML = "";

    let cursorPosition = 0,
      tag = "",
      writingTag = false,
      tagOpen = false,
      typeSpeed = 80,
      tempTypeSpeed = 0;

    if ($('#on-mobile').length > 0) {
      typeSpeed = 60
    }

    let type = function () {

      if (writingTag === true) {
        tag += HTML[cursorPosition];
      }

      if (HTML[cursorPosition] === "<") {
        tempTypeSpeed = 0;
        if (tagOpen) {
          tagOpen = false;
          writingTag = true;
        } else {
          tag = "";
          tagOpen = true;
          writingTag = true;
          tag += HTML[cursorPosition];
        }
      }
      if (!writingTag && tagOpen) {
        tag.innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
        if (HTML[cursorPosition] === " ") {
          tempTypeSpeed = 0;
        }
        else {
          tempTypeSpeed = (Math.random() * typeSpeed) + 50;
        }
        t.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === ">") {
        tempTypeSpeed = (Math.random() * typeSpeed) + 50;
        writingTag = false;
        if (tagOpen) {
          var newSpan = document.createElement("span");
          t.appendChild(newSpan);
          newSpan.innerHTML = tag;
          tag = newSpan.firstChild;
        }
      }

      cursorPosition += 1;
      if (cursorPosition < HTML.length - 1) {
        setTimeout(type, tempTypeSpeed);
      }

    };

    return {
      type: type
    };
  }
}