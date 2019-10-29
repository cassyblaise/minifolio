const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

};

// Type method 
TypeWriter.prototype.type = function(){
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

   //checking if this word is deleting
   if(this.isDeleting){
       this.txt = fullTxt.substring(0, this.txt.length - 1);
   }else{
  this.txt = fullTxt.substring(0, this.txt.length + 1);
   }
   //insert text into this element
   this.txtElement.innerHTML =`<span class="txt">${this.txt}</span>`;

//initial typing speed
let typeSpeed = 300;

if(this.isDeleting){
  typeSpeed /= 2;
};

//if word is complete 
if(!this.isDeleting && this.txt === fullTxt){
  //make a push at the end
  typeSpeed = this.wait;
  //set delete to true 
  this.isDeleting = true;
}else if(this.isDeleting && this.txt === ''){
this.isDeleting = false;
//move to the next word
this.wordIndex++;
//push before typing again
typeSpeed = 500;
}
 setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener('DOMContentLoaded', init);

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init typewrite 
    new TypeWriter(txtElement, words, wait);
}