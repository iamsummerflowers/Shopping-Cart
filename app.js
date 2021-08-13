//1. Establish variables
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

//2. Index Slides
slides.forEach(function(slide,index){
    slide.style.left = `${index * 100}%`;
});

//3. Set Counter Variable and setup click activation
let counter = 0;

nextBtn.addEventListener('click',function(){
    counter++;
    //5.invoke carousel
    carousel();

});
prevBtn.addEventListener('click',function(){
    counter--;
    //5.invoke carousel
    carousel();
});

//4. Create carousel functionality
function carousel(){
    //6A. working with slides
    if(counter===slides.length){
        counter=0;
    }
    if(counter < 0){
        counter=slides.length-1;
    }

// //6B.continued
// if(counter < slides.length-1){
//     nextBtn.style.display = "block"
// }
// else{
//     nextBtn.style.display="none";
// }
// if(counter > 0){
//     prevBtn.style.display="block";
// }
// else{
//     prevBtn.style.display="none";
// }
//4. continued
    slides.forEach(function(slide){
        slide.style.transform = `translateX(-${counter * 100}%)`
    })
}

// //6B. Or hide prev button
// prevBtn.style.display = "none";
