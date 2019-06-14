'use strict';

function Image(inImage) {
  this.image_url = inImage.image_url;
  this.title = inImage.title;
  this.description = inImage.description;
  this.keyword = inImage.keyword;
  this.horns = inImage.horns;
  const dropDown = $('#drop-down');
  dropDown.append(new Option(this.title, this.keyword));
}

Image.allImages = [];

Image.prototype.render = function() {
  
  $('main').append('<div class="clone"></div>');
  const imgClone = $('div[class="clone"]');
  const imgHtml = $('#photo-template').html();

  imgClone.html(imgHtml);

  imgClone.find('h2').text(this.title);
  imgClone.find('img').attr('src', this.image_url);
  imgClone.find('img').attr('alt', this.title);
  imgClone.find('p').text(this.description);
  imgClone.removeClass('clone');
  imgClone.attr('class', this.keyword);
  imgClone.hide();
};

Image.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then((data) => {
      data.forEach((item) => {
        Image.allImages.push(new Image(item));
      });
    });
};

Image.loadImages = () => {
  Image.allImages.forEach(image => image.render());
};


$('select').on('change', (e) => {
  console.log(e);
  console.log(e.target.value);
  Image.loadImages();
  const imgKeyword = e.target.value;
  $(`.${imgKeyword}`).show();
});


$(() => Image.readJson());
