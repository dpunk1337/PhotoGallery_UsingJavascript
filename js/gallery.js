let galleryImages= document.querySelectorAll(".gallery-img");
let numberOfImages=galleryImages.length;
let getLatestOpenedImg;
let imgIsOpened=false;

if(galleryImages){
  galleryImages.forEach(function(image,index){
    image.onclick=function(){openImg(image,index);}
    document.body.onresize=function(){if(imgIsOpened){closeImg();openImg(galleryImages[getLatestOpenedImg],getLatestOpenedImg);}}

  });

}

function closeImg(){
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
  imgIsOpened=false;

}

function openImg(image,index){
  imgIsOpened=true;
  let getElementCss=window.getComputedStyle(image);
  let getFullImgUrl=getElementCss.getPropertyValue("background-image");
  let getImgUrlPos=getFullImgUrl.split("/img/thumbs/");
  let setNewImgUrl=getImgUrlPos[1].replace('")',"");

  getLatestOpenedImg=index;

  let container=document.body;
  let newImgWindow=document.createElement("div");
  container.appendChild(newImgWindow);
  newImgWindow.setAttribute("class","img-window");
  newImgWindow.setAttribute("onclick","closeImg()");

  let newImg=document.createElement("img");
  newImgWindow.appendChild(newImg);
  newImg.setAttribute("src",'img/'+setNewImgUrl+'');

  newImg.onload= function() {
    let windowWidth= window.innerWidth;
    let imgWidth=this.width;
    let calcImgToEdge=((windowWidth-imgWidth)/2)-80;

    let newNextBtn=document.createElement("a");
    let btnNextText=document.createTextNode("Next");
    newNextBtn.appendChild(btnNextText);
    container.appendChild(newNextBtn);
    newNextBtn.setAttribute("class","img-btn-next");
    newNextBtn.setAttribute("onclick","changeImg(1)");
    newNextBtn.style.cssText="right:"+calcImgToEdge+"px ;";

    let newPrevBtn=document.createElement("a");
    let btnPrevText=document.createTextNode("Prev");
    newPrevBtn.appendChild(btnPrevText);
    container.appendChild(newPrevBtn);
    newPrevBtn.setAttribute("class","img-btn-prev");
    newPrevBtn.setAttribute("onclick","changeImg(0)");
    newPrevBtn.style.cssText="left:"+(calcImgToEdge)+"px ;";
  }
}

function changeImg(changeDir){
  if(changeDir==1)
  {
    closeImg();
    getLatestOpenedImg=(getLatestOpenedImg+1)%numberOfImages;
    openImg(galleryImages[getLatestOpenedImg],getLatestOpenedImg);
  }
  else
  {
    closeImg();
    getLatestOpenedImg=(numberOfImages+getLatestOpenedImg-1)%numberOfImages;
    openImg(galleryImages[getLatestOpenedImg],getLatestOpenedImg);
  }
}
